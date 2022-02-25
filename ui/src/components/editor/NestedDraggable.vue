<template>
  <q-card class="q-ma-xs" flat bordered>
    <draggable
        class="dragArea"
        :list="list"
        :move="onMove"
        :group="rootName"
        item-key="name"
        @click.stop="(e) => this.onSelect(e,null)"
    >
      <template #header>
        <div class="q-pa-sm">
          <div class="text-h6">{{ title }}</div>
          <div class="text-grey text-caption">{{ subtitle }}</div>
        </div>
        <div v-if="schema.type=='array' && !schema.items" class="text-center q-pa-md text-grey text-caption">
          {{ i18n.get('array.items') }}...
        </div>
        <div v-if="schema.type=='object' && list.length == 0" class="text-center q-pa-md text-grey text-caption">
          {{ i18n.get('object.fields') }}...
        </div>
      </template>
      <template #item="{ element,index }">
        <div class="q-gutter-sm q-pa-sm"
             style="cursor: move"
             @click.stop="(e) => this.onSelect(e,index,element)">
          <nested-draggable v-if="element.schema.type == 'object' || element.schema.type == 'array'"
                            @select="onChildSelect"
                            :root-name="rootName"
                            :i18n="i18n"
                            :is-root="false"
                            :name="element.name"
                            :schema="element.schema"
                            :ui-schema="element.additional"/>
          <div v-else-if="element.component">
            <component
                :is="element.component"
                :schema="element.schema"
                :readonly="true"
                :name="element.name"
                :additional="element.additional"
                :item-val="null"
                :properties="element.properties"/>
          </div>
        </div>
      </template>
    </draggable>
  </q-card>
</template>

<script>
import draggable from "vuedraggable";
import items from '../items'
import {defineAsyncComponent, shallowRef} from "vue";

export default {
  name: "NestedDraggable",
  props: {
    rootName: String,
    name: String,
    schema: Object,
    uiSchema: Object,
    i18n: Object,
    isRoot: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  emits: ["select"],
  components: {
    draggable
  },
  data() {
    return {
      list: [],
      self: {
        name: this.name,
        schema: this.schema,
        additional: this.uiSchema,
        children: this.list,
        isRoot: this.isRoot
      }
    }
  },
  watch: {
    schema() {
      this.adapt()
    },
    list: {
      handler() {
        this.getSchema()
        this.list.forEach(ele => {
          if (!ele.additional)
            ele.additional = this.uiSchema[ele.name] = {}
        })
        this.getUiSchema()
      },
      deep: true
    }
  },
  computed: {
    type() {
      return this.self.schema ? this.self.schema.type : ""
    },
    title() {
      return this.self.schema ? this.self.schema.title || this.name : ""
    },
    subtitle() {
      return this.self.schema ? this.self.schema.description : ""
    },
  },
  methods: {
    onMove(evt, originalEvent) {
      if (evt && evt.to && evt.to.__draggable_component__
          && evt.to.__draggable_component__.$parent && evt.to.__draggable_component__.$parent.$parent) {
        let node = evt.to.__draggable_component__.$parent.$parent
        if (node.schema.type == "array" && node.list.length > 0)
          return false
      }
      return true
    },
    onSelect(e, index, element) {
      if (index != null)
        this.$emit("select", element, () => this.list.splice(this.list.indexOf(element), 1));
      else {
        this.self.children = this.list
        this.$emit("select", this.self);
      }
    },
    onChildSelect(element, deleteFun) {
      if (deleteFun == null) {
        for (let i in this.list) {
          let item = this.list[i]
          if (item.name == element.name) {
            deleteFun = () => this.list.splice(this.list.indexOf(item), 1)
            break
          }
        }
      }
      this.$emit("select", element, deleteFun);
    },
    getSchema() {
      if (this.schema.type == 'object') {
        this.schema.properties = {}
        let childSet = new Set
        if (this.schema.required) {
          this.schema.required.forEach(n => childSet.add(n))
        }
        this.list.forEach(ele => {
          ele.isArrayItem = false
          if (!ele.name) {
            ele.name = (ele.schema.type || "enum") + "_" + new Date().getTime().toString(32)
          }
          this.schema.properties[ele.name] = ele.schema
          childSet.delete(ele.name)
        })
        childSet.forEach(left => {
          let index = this.schema.required.indexOf(left)
          if (index > -1)
            this.schema.required.splice(index, 1)
        })
        if (this.schema.required && this.schema.required.length == 0)
          delete this.schema.required
      } else if (this.schema.type == 'array') {
        if (this.list.length >= 1) {
          this.list[0].isArrayItem = true
          this.schema.items = this.list[0].schema
        } else
          delete this.schema.items
      }
      return this.schema
    },
    getUiSchema() {
      if (this.schema.type == 'array')
        return this.uiSchema

      function hasField(obj) {
        if (obj) {
          for (let key in obj)
            return true
        }
        return false
      }

      function clear(obj) {
        if (obj == null || obj == undefined)
          return obj
        if (typeof obj == 'object') {
          let newObj = {}
          for (let k in obj) {
            let c = clear(obj[k])
            if (c != null && c != undefined && c != '') {
              if (typeof c == 'object') {
                if (hasField(c))
                  newObj[k] = c
              } else if (typeof c == 'array') {
                if (c.length > 0)
                  newObj[k] = c
              } else
                newObj[k] = c
            }
          }
          return newObj
        } else if (typeof obj == 'array')
          return [...obj]
        return obj
      }

      let childSet = new Set
      for (let k in this.uiSchema)
        childSet.add(k)
      this.list.forEach(element => {
        childSet.delete(element.name)
      })
      childSet.forEach(k => {
        delete this.uiSchema[k]
      })
      return clear(this.uiSchema)
    },
    adapt() {
      this.list = []
      if (this.schema) {
        if (this.schema.type == "object" && this.schema.properties) {
          let i = 0;
          for (let name in this.schema.properties) {
            let child = this.schema.properties[name]
            let c = null
            let properties = {}
            let additional = this.uiSchema ? (this.uiSchema[name]) : {}
            if (child) {
              if (child.type != 'object') {
                if (child.type) {
                  c = items[child.type]
                } else if (child.enum) {
                  c = items['_enum']
                }
              }
              if (child.type == 'array') {
                properties.component = child.items ? items[child.items.type] : null
                properties.schema = child.items
              }
            }

            this.list.push({
              name: name,
              schema: child,
              component: shallowRef(defineAsyncComponent(c instanceof Function ? c : () => Promise.resolve(c))),
              properties: properties,
              additional: additional,
              isRoot: false,
              isArrayItem: false
            })
            i++;
          }
        } else if (this.schema.type == "array" && this.schema.items) {
          let item = this.schema.items
          let c = null
          if (item.type) {
            c = items[item.type]
          } else if (item.enum) {
            c = items._enum
          }

          this.list.push({
            name: null,
            schema: item,
            component: shallowRef(defineAsyncComponent(c instanceof Function ? c : () => Promise.resolve(c))),
            properties: {},
            additional: this.uiSchema,
            isRoot: false,
            isArrayItem: true
          })
        }
      }
    }
  },
  mounted() {
    this.adapt()
  }
}
</script>

<style scoped>
.dragArea {
  /*min-height: 50px;*/
  /*outline: 1px dashed;*/
}
</style>