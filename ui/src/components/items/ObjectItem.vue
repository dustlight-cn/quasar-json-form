<template>
  <div>
    <div class="text-h6">{{ title }}</div>
    <div class="text-grey text-caption">{{ subtitle }}</div>
    <div class="text-negative text-caption">{{ errorMessage }}</div>
    <div v-if="hasProperties && components" class="q-gutter-sm">
      <component
          v-for="(property,name) in properties"
          :ref="name"
          :is="components[name]"
          :readonly="readonly"
          :name="name"
          :item-val="itemVal ? itemVal[name] : null"
          :schema="properties[name].schema"
          :properties="properties[name].properties"
          :additional="properties[name].additional"
      />
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
      components: null,
      errorMessage: ""
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
    },
    getValue() {
      let v = {}
      for (let key in this.$refs) {
        v[key] = this.$refs[key][0].getValue()
      }
      return v
    },
    validate() {
      for (let key in this.$refs) {
        let r = this.$refs[key][0].validate()
        if (r != true)
          return false
      }

      this.errorMessage = ""
      let val = this.getValue();
      for (let i in this.rules) {
        let result = this.rules[i](val)
        if (result != true) {
          this.errorMessage = result
          return false
        }
      }
      return true
    }
  },
  mounted() {
    this.loadComponents()
  }
}
</script>

<style scoped>

</style>