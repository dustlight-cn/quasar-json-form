<template>
  <div>
    <q-select v-model="modelValue.schema.format"
              :options="formatOptions"
              hint=" "
              map-options
              emit-value
              filled :label="i18n.get('string.format')"/>
    <q-input v-model="modelValue.schema.pattern"
             :rules="rulesPattern"
             filled :label="i18n.get('string.pattern')"/>
    <q-input v-model.number="modelValue.schema.minLength"
             :rules="rulesMin"
             type="number"
             filled :label="i18n.get('string.minLength')"/>
    <q-input v-model.number="modelValue.schema.maxLength"
             :rules="rulesMax"
             type="number"
             filled :label="i18n.get('string.maxLength')"/>
  </div>
</template>

<script>
import Validate from "./validate";
import {props} from "./common";

const formats = [
  null,
  "date-time",
  "date",
  "time",
  "email",
  "hostname",
  "ipv4",
  "ipv6",
  "uri",
  "uri-reference"
]

export default {
  name: "StringField",
  props: {...props},
  data() {
    let validate = new Validate(this.i18n)
    let fOptions = formats.map((v) => {
      return {
        value: v,
        label: this.i18n.get("string.formatName." + v)
      }
    })
    return {
      formatOptions: fOptions,
      rulesMin: [
        ...validate.gteZero
      ],
      rulesMax: [
        ...validate.gteZero,
        val => validate.gteMin(val, this.modelValue.schema.minLength)
      ],
      rulesPattern: [
        val => {
          if (val == null)
            return true
          try {
            new RegExp(val)
            return true
          } catch (e) {
            return e.message || e
          }
        }
      ]
    }
  },
  watch: {
    "modelValue.schema.format"() {
      if (this.modelValue.schema.format == null)
        delete this.modelValue.schema.format
    }
  }
}
</script>

<style scoped>

</style>