<template>
  <q-page padding>
    <json-form-editor v-if="form" ref="editor" :name="form.name" :schema="form.schema" :ui-schema="form.additional.uiSchema" :meta-schema="null">
      <q-btn @click="getValue" label="Value" color="primary"/>
    </json-form-editor>
  </q-page>
</template>

<script>
import client from "../resources/client.json"
import clientUi from "../resources/client.ui.json"

export default {
  name: "Edit",
  data() {
    return {
      client: client,
      clientUi: clientUi,
      metaSchema: {},
      miniState: false,
      form: null,
      schemaIgnore: null
    }
  },
  methods: {
    getValue() {
      let schema = this.$refs.editor.getSchema()
      console.log(schema)
      let json = JSON.stringify(schema, undefined, 2)
      console.log(json)
      alert(json)

      let uiSchema = this.$refs.editor.getUiSchema()
      console.log(uiSchema)
      let uiJon = JSON.stringify(uiSchema, undefined, 2)
      console.log(uiJon)
      alert(uiJon)
    }
  },
  mounted() {
    this.schemaIgnore = {
      "$id": "this.$options.ext.basePath" + '/v1/schemas/',
      "$schema": "this.$options.ext.basePath" + '/v1/schemas/form'
    }
    this.form = {
      name: "form_" + new Date().getTime().toString(32),
      schema: {
        type: "object",
        title: "",
        description: "",
        additionalProperties: false,
      },
      additional: {
        uiSchema: {}
      }
    }
  }
}

</script>

<style scoped lang="sass">

</style>
