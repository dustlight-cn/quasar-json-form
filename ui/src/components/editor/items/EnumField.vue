<template>
  <div>
    <div class="text-subtitle2">{{ i18n.get('enum.options') }}</div>
    <q-list v-if="modelValue.schema.enum" dense separator>
      <q-input :debounce="500" autogrow v-model="options[index]" dense filled
               v-for="(item,index) in options"
               :rules="jsonRules"
               :key="index">
        <template v-slot:prepend>
          <div class="text-caption">
            {{ index + 1 }}
          </div>
        </template>
        <template v-slot:after>
          <q-btn round dense flat icon="remove"/>
        </template>
      </q-input>
    </q-list>
  </div>
</template>

<script>
import {props} from "./common";
import Validate from "./validate";

export default {
  name: "EnumField",
  props: {
    ...props
  },
  data() {
    let validate = new Validate(this.i18n)
    let computed = []
    if (this.modelValue && this.modelValue.schema && this.modelValue.schema.enum) {
      for (let i in this.modelValue.schema.enum) {
        computed.push(JSON.stringify(this.modelValue.schema.enum[i]))
      }
    }
    return {
      options: computed,
      jsonRules: [
        validate.jsonRule
      ]
    }
  },
  watch: {
    options() {
      try {
        console.log("???")
        let arr = []
        for (let i in this.options) {
          arr.push(JSON.parse(this.options[i]))
        }
        this.modelValue.schema.enum = arr
        console.log(arr)
      } catch (e) {

      }
    }
  }
}
</script>

<style scoped>

</style>