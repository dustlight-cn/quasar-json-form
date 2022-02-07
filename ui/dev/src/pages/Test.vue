<template>
  <q-page padding>
    <JsonForm ref="form" :schema="client"/>
    <q-btn label="Submit" @click="getValue"/>
  </q-page>
</template>

<script>
import client from "../resources/client.json"

export default {
  name: "Test",
  data() {
    return {
      client: client
    }
  },
  methods: {
    getValue() {
      alert(JSON.stringify(this.$refs.form.getValue(), undefined, "  "))
    }
  }
}

</script>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
