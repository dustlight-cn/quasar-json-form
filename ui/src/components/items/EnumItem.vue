<template>
  <div>
    <q-select v-model="val" :options="options" :rules="rules" filled :label="label" :hint="hint"/>
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
    },
    options() {
      if (!this.schema || !this.schema.enum)
        return []
      return this.schema.enum
    }
  },
  methods: {
    getValue() {
      return this.val
    }
  }
}
</script>

<style scoped>

</style>