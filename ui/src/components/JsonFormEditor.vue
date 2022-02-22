<template>
  <div>
    <q-tree node-key="name" label-key="name"
            :selected="select"
            default-expand-all
            :nodes="treeNodes"/>
    <json-form
        ref="jsonForm"
        :schema="schema"
        :editable="true"
        :ui-schema="uiSchema"
        :form-data="formData"
        :meta-schema="metaSchema"/>
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
  data() {
    return {
      treeNodes: []
    }
  },
  methods: {
    select(...args) {
      console.log(args)
    }
  },
  mounted() {
    this.$refs.jsonForm.getTree(this.name || "root")
        .then(tree => {
          console.log([tree])
          this.treeNodes = [tree]
        })
  }
}
</script>

<style scoped>

</style>