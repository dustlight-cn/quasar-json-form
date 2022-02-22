<template>
  <div>
    <q-input :rules="rules" v-model="modelValue.name" :label="i18n.get('name')" filled/>
    <q-input hint=" " v-model="modelValue.schema.title" :label="i18n.get('title')" filled/>
    <q-input hint=" " v-model="modelValue.schema.description" :label="i18n.get('description')" autogrow filled/>
    <q-field hint=" " :label="i18n.get('type')" filled v-model="type">
      <template v-slot:control>
        {{ type }}
      </template>
    </q-field>
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
  computed: {
    type() {
      if (!this.modelValue || !this.modelValue.schema)
        return "-"
      let schema = this.modelValue.schema
      if (schema.type) {
        return this.i18n.get("typeName." + schema.type)
      } else if (schema.enum) {
        return this.i18n.get("typeName.enum")
      }
      return "-"
    }
  },
  mounted() {
    this.rules.push(...new Validate(this.i18n).notEmpty)
  }
}
</script>

<style scoped>

</style>