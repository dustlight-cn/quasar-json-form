<template>
  <draggable
      class="dragArea"
      :list="list"
      :move="onMove"
      :group="{ name: rootName }"
      item-key="name"
      @click.stop="(e) => this.onSelect(e,null)"
  >
    <template #header>
      <div class="q-pa-sm">
        <div class="text-h6">{{ title }}</div>
        <div class="text-grey text-caption">{{ subtitle }}</div>
      </div>
    </template>
    <template #item="{ element,index }">
      <div class="q-gutter-sm q-pa-sm"
           @click.stop="(e) => this.onSelect(e,index,element)">
        <nested-draggable v-if="element.schema.type == 'object' || element.schema.type == 'array'"
                          @select="(e)=>this.$emit('select', e)"
                          :root-name="rootName"
                          :name="element.name"
                          :schema="element.schema"
                          :ui-schema="element.additional"/>
        <div v-else-if="element.component">
          <component
              :is="element.component"
              :schema="element.schema"
              :name="element.name"
              :additional="element.additional"
              :item-val="null"
              :properties="element.properties"/>
        </div>
      </div>
    </template>
  </draggable>
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
    uiSchema: Object
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
        children: this.list
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
      if (evt && evt.to && evt.to.__draggable_component__ && evt.to.__draggable_component__.$parent) {
        let node = evt.to.__draggable_component__.$parent
        if (node.schema.type == "array" && node.list.length > 0)
          return false
      }

    },
    onSelect(e, index, element) {
      if (index != null)
        this.$emit("select", element);
      else {
        this.self.children = this.list
        this.$emit("select", this.self);
      }
    },
    getSchema() {
      if (this.schema.type == 'object') {
        this.schema.properties = {}
        let childSet = new Set
        if (this.schema.required) {
          this.schema.required.forEach(n => childSet.add(n))
        }
        this.list.forEach(ele => {
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
        if (this.list.length >= 1)
          this.schema.items = this.list[0].schema
        else
          delete this.schema.items
      }
      return this.schema
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
            let additional = this.uiSchema ? this.uiSchema[name] : {}
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
              additional: additional
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
            additional: {}
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
  min-height: 50px;
  outline: 1px dashed;
}
</style>