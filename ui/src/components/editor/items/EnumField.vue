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
          <q-btn round dense flat icon="remove" @click="()=>removeOption(index)"/>
        </template>
      </q-input>
      <div class="text-center">
        <q-btn round dense flat icon="add" @click="addOption"/>
      </div>
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
    options: {
      handler() {
        try {
          let arr = []
          for (let i in this.options) {
            arr.push(JSON.parse(this.options[i]))
          }
          this.modelValue.schema.enum = arr
        } catch (e) {

        }
      },
      deep: true
    }
  },
  methods: {
    addOption() {
      this.options.push("\"\"")
    },
    removeOption(index) {
      if (index < 0 || index >= this.options.length)
        return
      this.options.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>