<template>
  <div ref="editor_holder">
  </div>
</template>

<script>
import {JSONEditor} from "@json-editor/json-editor/src/core";

import 'spectre.css/dist/spectre.min.css'
import 'spectre.css/dist/spectre-exp.min.css'
import 'spectre.css/dist/spectre-icons.min.css'

export default {
  name: "JsonForm",
  components: {},
  props: {
    schema: Object || {}
  },
  data() {
    return {
      editor: null
    }
  },
  watch: {
    schema() {
      if (this.schema)
        this.loadSchema(this.schema)
    }
  },
  methods: {
    loadSchema(schema) {
      let options = {
        ajax: true,
        schema: schema,
        theme: 'spectre',
        disable_collapse: true,
        disable_edit_json: true,
        disable_properties: true,
        refs: {
          record: {
            "$schema": "http://json-schema.org/draft-06/schema#",
            "$id": "https://datacenter.dustlight.cn/v1/schemas/record",
            "type": "string"
          }
        }
      }
      this.editor = new JSONEditor(this.$refs.editor_holder, options)
    },
    getValue() {
      return this.editor.getValue()
    }
  },
  mounted() {
    if (this.schema)
      this.loadSchema(this.schema)
  }
}
</script>

<style scoped>

</style>