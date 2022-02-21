<template>
  <q-page padding>
    <json-form ref="form" :schema="client" @submit="onSubmit">
    </json-form>
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
    onSubmit(val) {
      alert(JSON.stringify(val, undefined, 2))
    }
  }
}

</script>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
