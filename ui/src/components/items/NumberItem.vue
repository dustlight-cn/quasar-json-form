<template>
  <div>
    <q-input v-model.number="val" type="number" :rules="rules" filled :label="label" :hint="hint"/>
  </div>
</template>

<script>
import {props, setup} from "./common"

export default {
  name: "NumberItem",
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
    }
  }
}
</script>

<style scoped>

</style>