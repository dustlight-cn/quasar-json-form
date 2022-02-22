<template>
  <draggable
      class="dragArea"
      :list="list"
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
        <nested-draggable v-if="element.schema.type == 'object'"
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
    onSelect(e, index, element) {
      if (index != null)
        this.$emit("select", element);
      else {
        this.self.children = this.list
        this.$emit("select", this.self);
      }
    },
    computeSchema(index) {
      if (index < 0 || index > this.list.length)
        return null
      let node = this.list[index]
      return node.schema
    },
    adapt() {
      this.list = []
      if (this.schema && this.schema.type == "object" && this.schema.properties) {
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