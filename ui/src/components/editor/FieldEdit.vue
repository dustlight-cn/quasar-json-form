<template>
  <div class="q-gutter-xs" v-if="modelValue">
    <common-field :i18n="i18n" class="q-gutter-xs" v-model="modelValue"/>
  </div>
</template>

<script>
import CommonField from "./items/CommonField";

export default {
  name: "FieldEdit",
  components: {CommonField},
  props: {
    modelValue: Object,
    i18n: Object
  },
  data() {
    return {}
  },
  methods: {

  },
  watch: {
  }
}
</script>

<style scoped>

</style>