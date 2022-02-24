<template>
  <div>
    <q-input :debounce="500" v-if="!ignoreName" :rules="nameRules" v-model="modelValue.name" :label="i18n.get('name')"
             filled/>
    <q-input :debounce="500" hint=" " v-model="modelValue.schema.title" :label="i18n.get('title')" filled/>
    <q-input :debounce="500" hint=" " v-model="modelValue.schema.description" :label="i18n.get('description')" autogrow
             filled/>
    <q-field :debounce="500" hint=" " :label="i18n.get('type')" filled v-model="type">
      <template v-slot:control>
        {{ type }}
      </template>
    </q-field>
    <q-input :debounce="500" hint=" " :rules="jsonRule" v-model="schemaConst" :label="i18n.get('const')"
             autogrow filled/>
    <div class="text-right">
      <q-btn v-if="removable" icon="delete" round flat dense @click="(...args)=>this.$emit('onDelete',...args)"/>
    </div>
  </div>
</template>

<script>
import Validate from './validate'
import {props} from "./common";

export default {
  name: "CommonField",
  props: {
    ...props,
    ignoreName: Boolean,
    removable: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  emits: ['onDelete'],
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