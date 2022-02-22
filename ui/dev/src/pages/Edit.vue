<template>
  <q-page padding>
    <json-form-editor ref="jf" :schema="client" :ui-schema="clientUi" :meta-schema="metaSchema">
      <q-btn type="submit" label="Value" color="primary"/>
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
      let result = this.validate()
      console.log(result)
      if (!result)
        return
      console.log(this.$refs.jf)
      let obj = this.$refs.jf.getValue()
      console.log(obj)
      alert(JSON.stringify(obj, undefined, 2))
    },
    validate() {
      return this.$refs.jf.validate()
    }
  },
  mounted() {
  }
}

</script>

<style scoped lang="sass">

</style>
