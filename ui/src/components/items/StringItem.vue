<template>
  <div>
    <q-input ref="input"  v-model="val" :rules="rules" filled :label="label" :hint="hint" :type="inputType"/>
  </div>
</template>

<script>
import {props, setup} from "./common"

export default {
  name: "StringItem",
  setup(props, ...args) {
    return setup(props, ...args)
  },
  props: {
    ...props
  },
  computed: {
    label() {
      return this.schema ? this.schema.title || this.name : ""
    },
    hint() {
      return this.schema ? this.schema.description : ""
    },
    format(){
      return this.schema ? this.schema.format : ""
    },
    inputType(){
      switch (this.format){

        default:
          return this.format
      }
    }
  },
  methods: {
    getValue() {
      return this.val
    },
    validate(){
      return this.$refs.input.validate(this.val)
    }
  }
}
</script>

<style scoped>

</style>