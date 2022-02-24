<template>
  <draggable
      :list="list"
      :group="{ name: rootName, pull: 'clone', put: false }"
      :clone="clone"
      :move="onMove"
      item-key="index"
  >
    <template #header>
      <div class="text-subtitle2 text-grey">
        {{ prefab.name }}
      </div>
    </template>
    <template #item="{ element }">
      <q-card
          style="cursor: move"
          class="q-ma-xs q-pa-xs"
          v-if="element.component"
          flat bordered>
        <component :is="element.component"
                   :readonly="true"
                   :schema="element.schema"/>
      </q-card>
    </template>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";

import items from "../items"
import {shallowRef, defineAsyncComponent, toRaw} from 'vue'

function getComponent(schema) {
  if (schema.type && items[schema.type]) {
    return items[schema.type]
  } else if (schema.enum) {
    return items._enum
  }

  return items[""]
}

function cloneObject(obj) {
  if (obj == undefined || obj == null)
    return obj
  if (typeof obj == 'object') {
    if (Array.isArray(obj)) {
      let newArr = []
      newArr.push(...obj)
      return newArr
    }
    let newObj = {}
    for (let key in obj)
      newObj[key] = cloneObject(obj[key])
    return newObj
  }
  return obj
}

export default {
  name: "PrefabItem",
  props: {
    prefab: Object,
    rootName: String
  },
  components: {draggable},
  data() {
    return {
      list: []
    }
  },
  watch: {
    prefab() {
      this.adapt()
    }
  },
  methods: {
    onMove(evt, originalEvent) {
      if (evt && evt.to && evt.to.__draggable_component__
          && evt.to.__draggable_component__.$parent && evt.to.__draggable_component__.$parent.$parent) {
        let node = evt.to.__draggable_component__.$parent.$parent
        if (node.schema && node.schema.type == "array" && node.list.length > 0)
          return false
      }
      return true
    },
    adapt() {
      this.list = []
      if (this.prefab && this.prefab.prefabs) {
        let i = 0
        this.prefab.prefabs.forEach(schema => {
          let c = getComponent(schema)
          this.list.push({
            index: i++,
            schema: schema,
            component: shallowRef(defineAsyncComponent(c instanceof Function ? c : () => c)),
          })
        })
      }
    },
    clone(element) {
      return {
        component: shallowRef(element.component),
        schema: cloneObject(toRaw(element.schema))
      }
    }
  },
  mounted() {
    this.adapt()
  }
}
</script>

<style scoped>

</style>