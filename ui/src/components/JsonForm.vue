<template>
  <div>
    <slot name="header"/>
    <component ref="root" v-if="component_"
               :is="component_"
               :name="name || ''"
               :meta-schema="metaSchema"
               :schema="schema_"
               :additional="additional_"
               :item-val="data_" :properties="properties_"/>
    <slot/>
    <slot name="footer"/>
  </div>
</template>

<script>
import {JsonForm as JsonFormCore } from "@dustlight/json-form-core";
import items from './items'
import {shallowRef, defineAsyncComponent} from 'vue'

export default {
  name: "JsonForm",
  components: {},
  props: {
    name: Object,
    schema: Object,
    uiSchema: Object,
    formData: Object,
    metaSchema: Object
  },
  data() {
    return {
      component_: null,
      properties_: null,
      schema_: null,
      additional_: null,
      data_: null
    }
  },
  methods: {
    getValue() {
      return this.$refs.root.getValue()
    },
    validate() {
      return this.$refs.root.validate()
    }
  },
  mounted() {
    JsonFormCore.from(this.schema, this.formData, this.uiSchema)
        .then(jf => {
          let {component, schema, data, additional, properties} = jf.render((name, body, data, additional, obj) => {
            let c = items[body['type']]
            if (!c) {
              if (body['enum'])
                c = items["_enum"]
              else
                c = items[""]
              if (!c)
                return null
            }
            return {
              component: c instanceof Function ? c : () => Promise.resolve(c),
              schema: body,
              data: data,
              additional: additional,
              properties: obj
            }
          })
          this.component_ = shallowRef(defineAsyncComponent(component))
          this.schema_ = schema
          this.data_ = data
          this.additional_ = additional
          this.properties_ = properties
        })
  }
}
</script>

<style scoped>

</style>