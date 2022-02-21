<template>
  <div>
    <date-time v-if="isDateOrTime"
               filled
               ref="input"
               v-model="val"
               :rules="rules"
               :label="label"
               :hint="hint"
               :type="format"/>
    <q-input v-else
             filled
             ref="input"
             v-model="val"
             :rules="rules"
             :label="label"
             :hint="hint"
             :type="inputType"/>
  </div>
</template>

<script>
import {props, setup} from "./common"
import DateTime from "./DateTime";

export default {
  name: "StringItem",
  components: {DateTime},
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
    format() {
      return this.schema ? this.schema.format : ""
    },
    isDateOrTime() {
      return this.format == 'date' || this.format == 'time' || this.format == 'date-time'
    },
    inputType() {
      switch (this.format) {

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