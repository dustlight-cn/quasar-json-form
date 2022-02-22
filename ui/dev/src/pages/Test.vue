<template>
  <q-page padding>
    <q-form @submit="onSubmit">
      <json-form ref="form" :schema="client" @submit="onSubmit">
        <q-btn :label="$q.lang.label.ok" color="primary" type="submit"/>
      </json-form>
    </q-form>
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
      alert(JSON.stringify(this.$refs.form.getValue(), undefined, 2))
    }
  }
}

</script>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
