<template>
  <div>
    <q-input v-if="modelValue.name != null" :rules="nameRules" v-model="modelValue.name" :label="i18n.get('name')" filled/>
    <q-input hint=" " v-model="modelValue.schema.title" :label="i18n.get('title')" filled/>
    <q-input hint=" " v-model="modelValue.schema.description" :label="i18n.get('description')" autogrow filled/>
    <q-field hint=" " :label="i18n.get('type')" filled v-model="type">
      <template v-slot:control>
        {{ type }}
      </template>
    </q-field>
    <q-input hint=" " :debounce="500" :rules="jsonRule" v-model="schemaConst" :label="i18n.get('const')"
             autogrow filled/>
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
    let validate = new Validate(this.i18n)

    return {
      nameRules: [
        ...validate.notEmpty
      ],
      jsonRule: [
        validate.jsonRule
      ],
      schemaConst: null
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
  methods: {
    loadConst() {
      this.schemaConst = JSON.stringify(this.modelValue.schema.const, null, 2)
    }
  },
  watch: {
    "modelValue.schema.const"() {
      this.loadConst()
    },
    schemaConst() {
      try {
        if (this.schemaConst == "") {
          delete this.modelValue.schema.const
          return
        }
        let obj = JSON.parse(this.schemaConst)
        this.modelValue.schema.const = obj
      } catch (e) {

      }
    }
  },
  mounted() {
    this.loadConst()
  }
}
</script>

<style scoped>

</style>