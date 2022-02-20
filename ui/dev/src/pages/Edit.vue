<template>
  <q-page padding>
    <my-json-form ref="jf" :schema="client" :ui-schema="clientUi" :meta-schema="metaSchema"/>
    <q-btn label="Value" color="primary" @click="getValue"/>
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
      metaSchema: {}
    }
  },
  methods: {
    getValue() {
      console.log(this.$refs.jf)
      let obj = this.$refs.jf.getValue()
      console.log(obj)
      alert(JSON.stringify(obj, undefined, 2))
    }
  },
  mounted() {
  }
}

</script>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
