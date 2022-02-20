<template>
  <q-page padding>
    <my-json-form :schema="client" :ui-schema="clientUi" :meta-schema="metaSchema"/>
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
    onSubmit(val) {
      alert(JSON.stringify(val, undefined, 2))
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
