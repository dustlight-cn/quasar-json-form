<template>
  <q-page padding>
    <json-form-editor ref="editor" :schema="client" :ui-schema="clientUi" :meta-schema="metaSchema">
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
      miniState: false
    }
  },
  methods: {
    getValue() {
      let schema = this.$refs.editor.getSchema()
      console.log(schema)
      let json = JSON.stringify(schema, undefined, 2)
      console.log(json)
      alert(json)
    }
  },
  mounted() {
  }
}

</script>

<style scoped lang="sass">

</style>
