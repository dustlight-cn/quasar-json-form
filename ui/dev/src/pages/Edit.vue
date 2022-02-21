<template>
  <q-page padding>
    <q-form @submit="test">
      <my-json-form ref="jf" :schema="client" :ui-schema="clientUi" :meta-schema="metaSchema">

        <q-btn type="submit" label="Value" color="primary"/>
      </my-json-form>
    </q-form>
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
    test(...args) {
      console.log(...args)
      this.getValue()
    },
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

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
