<template>
  <div>
    <q-input :debounce="500" :rules="rules" filled v-model="schemaJson" label="Schema" autogrow/>
  </div>
</template>

<script>
import {props} from "./common";

export default {
  name: "UnknownField",
  props: {
    ...props
  },
  emits: ['update:modelValue'],
  data() {
    return {
      schemaJson: "",
      rules: [
        val => {
          try {
            JSON.parse(val)
            return true
          } catch (e) {
            return e.message || e
          }
        }
      ]
    }
  },
  methods: {
    loadJson() {
      this.schemaJson = JSON.stringify(this.modelValue.schema, null, 2)
    }
  },
  watch: {
    schemaJson() {
      try {
        let obj = JSON.parse(this.schemaJson)
        this.modelValue.schema = obj
      } catch (e) {

      }
    },
    modelValue() {
      this.loadJson()
    }
  },
  mounted() {
    this.loadJson()
  }
}
</script>

<style scoped>

</style>