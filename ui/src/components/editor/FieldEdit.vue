<template>
  <div class="q-gutter-xs" v-if="modelValue">
    <common-field @onDelete="(...args)=>this.$emit('onDelete',...args)"
                  :ignore-name="ignoreName || modelValue.isRoot || modelValue.isArrayItem"
                  :removable="!modelValue.isRoot"
                  :i18n="i18n"
                  class="q-gutter-xs" v-model="modelValue"/>
    <q-separator class="q-mb-md"/>
    <component v-if="fieldEditor" :is="fieldEditor" :i18n="i18n" v-model="modelValue" class="q-gutter-xs"/>
  </div>
</template>

<script>
import CommonField from "./items/CommonField";
import items from './items'
import {shallowRef, defineAsyncComponent} from 'vue'

export default {
  name: "FieldEdit",
  components: {CommonField},
  props: {
    modelValue: Object,
    i18n: Object,
    ignoreName: Boolean
  },
  emits: ['onDelete'],
  data() {
    return {
      fieldEditor: null
    }
  },
  methods: {
    loadComponent() {
      if (this.modelValue == null) {
        this.fieldEditor = null
        return
      }
      let c = items(this.modelValue.schema)
      this.fieldEditor = shallowRef(defineAsyncComponent(c instanceof Function ? c : () => c))
    }
  },
  watch: {
    modelValue() {
      this.loadComponent()
    }
  },
  mounted() {
    this.loadComponent()
  }
}
</script>

<style scoped>

</style>