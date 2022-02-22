<template>
  <draggable
      class="dragArea"
      tag="ul"
      :list="list"
      :group="{ name: 'root' }"
      item-key="name"
  >
    <template #header>
      <p>{{ name }}</p>
    </template>
    <template #item="{ element }">
      <li>
        <nested-draggable v-if="element.schema.type == 'object'" :schema="element.schema" :name="element.name"/>
        <div v-else-if="element.component">
          <component
              :is="element.component"
              :schema="element.schema"
              :name="element.name"
              :additional="null"
              :item-val="null"
              :properties="element.properties"/>
        </div>
      </li>
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
    name: String,
    schema: Object
  },
  components: {
    draggable
  },
  data() {
    return {
      list: []
    }
  },
  watch: {
    schema() {
      this.adapt()
    }
  },
  computed: {
    type() {
      return this.schema ? this.schema.type : ""
    }
  },
  methods: {
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
          console.log(child.type, properties)
          this.list.push({
            name: name,
            schema: child,
            component: shallowRef(defineAsyncComponent(c instanceof Function ? c : () => Promise.resolve(c))),
            properties: properties
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