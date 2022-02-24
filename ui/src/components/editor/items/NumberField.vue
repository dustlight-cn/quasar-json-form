<template>
  <div>
    <q-input :debounce="500" v-model.number="modelValue.schema.multipleOf"
             hint=" "
             type="number"
             :rules="multipleRules"
             filled :label="i18n.get('number.multipleOf')"/>

    <q-input :debounce="500" v-model.number="modelValue.schema.minimum"
             hint=" "
             type="number"
             filled :label="i18n.get('number.minimum')"/>

    <q-input :debounce="500" v-model.number="modelValue.schema.maximum"
             hint=" "
             type="number"
             filled :label="i18n.get('number.maximum')"/>

    <q-input :debounce="500" v-model.number="modelValue.schema.exclusiveMinimum"
             hint=" "
             type="number"
             filled :label="i18n.get('number.exclusiveMinimum')"/>

    <q-input :debounce="500" v-model.number="modelValue.schema.exclusiveMaximum"
             hint=" "
             type="number"
             filled :label="i18n.get('number.exclusiveMaximum')"/>
  </div>
</template>

<script>
import Validate from "./validate";
import {props} from "./common";

export default {
  name: "NumberField",
  props: {
    ...props
  },
  data() {
    let validate = new Validate(this.i18n)
    return {
      multipleRules: [
        ...validate.gtZero
      ]
    }
  }
}
</script>

<style scoped>

</style>