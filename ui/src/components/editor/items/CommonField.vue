<template>
  <div>
    <q-input :rules="rules" v-model="modelValue.name" :label="i18n.get('name')" filled/>
    <q-input v-model="modelValue.schema.title" :label="i18n.get('title')" filled/>
    <q-input v-model="modelValue.schema.description" :label="i18n.get('description')" autogrow filled/>
  </div>
</template>

<script>
import Validate from './validate'
import {props} from "./common";

export default {
  name: "CommonField",
  props: {
    ...props
  },
  data() {
    return {
      rules: []
    }
  },
  mounted() {
    this.rules.push(...new Validate(this.i18n).notEmpty)
  }
}
</script>

<style scoped>

</style>