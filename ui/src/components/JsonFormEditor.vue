<template>
  <div>
    <json-form :schema="schema"/>
  </div>
</template>

<script>
import JsonForm from "./JsonForm";

export default {
  name: "JsonFormEditor",
  components: {JsonForm},
  props: {
    name: Object,
    schema: Object,
    uiSchema: Object,
    formData: Object,
    metaSchema: Object
  },
  setup(props) {
    console.log(props)
  }
}
</script>

<style scoped>

</style>