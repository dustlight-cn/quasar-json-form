<template>
  <div>
    <q-input v-model="value" filled :label="label" :hint="hint"/>
    <div>
      {{ JSON.stringify(schema) }}
    </div>
    <div>
      {{ JSON.stringify(additional) }}
    </div>
    <div>
      {{ JSON.stringify(itemVal) }}
    </div>
  </div>
</template>

<script>
import AjvUtil from "./AjvUtil"

export default {
  name: "StringItem",
  props: {
    schema: Object,
    additional: Object,
    name: String,
    itemVal: Object
  },
  computed: {
    label() {
      return this.schema ? this.schema.title || this.name : ""
    },
    hint() {
      return this.schema ? this.schema.description : ""
    }
  },
  data() {
    return {
      value: ""
    }
  }
}
</script>

<style scoped>

</style>