<template>
  <div>
    <div class="text-subtitle1">{{ title }}</div>
    <div class="text-subtitle2">{{ subtitle }}</div>
    <div v-if="hasProperties && components">
      <div v-for="(property,name) in properties">
        <component
            :is="components[name]"
            :name="name"
            :schema="properties[name].schema"
            :properties="properties[name].properties"
            :additional="properties[name].additional"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {props, setup} from "./common"
import {shallowRef, defineAsyncComponent} from 'vue'

export default {
  name: "ObjectItem",
  props: {
    ...props
  },
  setup(props, ...args) {
    return setup(props, ...args)
  },
  data() {
    return {
      components: null
    }
  },
  watch: {
    properties() {
      this.loadComponents()
    }
  },
  computed: {
    title() {
      return this.schema ? this.schema.title || this.name : ""
    },
    subtitle() {
      return this.schema ? this.schema.description : ""
    },
    hasProperties() {
      if (!this.properties)
        return false
      for (let i in this.properties)
        return true
      return false
    }
  },
  methods: {
    loadComponents() {
      this.components = {}
      if (!this.properties)
        return
      for (let name in this.properties) {
        this.components[name] = shallowRef(defineAsyncComponent(this.properties[name].component))
      }
    }
  },
  mounted() {
    this.loadComponents()
  }
}
</script>

<style scoped>

</style>