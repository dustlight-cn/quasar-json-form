<template>
  <q-page padding>
    <q-form @submit="onSubmit">
      <json-form ref="form"
                 :schema="schema"
                 :ui-schema="ui"
                 :meta-schema="metaSchema"
                 :formData="formData"
                 @submit="onSubmit">
        <q-btn :label="$q.lang.label.ok" color="primary" type="submit"/>
      </json-form>
    </q-form>
  </q-page>
</template>

<script>
import schema from "../resources/client.json"
import ui from "../resources/client.ui.json"
import defaultData from "../resources/data.json"

export default {
  name: "Test",
  data() {
    return {
      schema: schema,
      ui: ui,
      metaSchema: {},
      formData: defaultData
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
