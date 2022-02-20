<template>
  <div>
    <!--    <div v-for="(c,key) in instances" :key="key">-->
    <!--      <component :is="c" :name="key" :schema="schemas[key]" :additional="additional[key]" :itemVal="data[key]"/>-->
    <!--    </div>-->
    <ObjectItem v-if="component_" :name="null" :meta-schema="metaSchema" :schema="schema_" :additional="additional_"
                :item-val="data_" :properties="properties_"/>
  </div>
</template>

<script>
import {JsonForm} from "@dustlight/json-form-core";
import items from './items'

import {shallowRef, defineAsyncComponent} from 'vue'
import ObjectItem from "./items/ObjectItem";

export default {
  name: "MyJsonForm",
  components: {ObjectItem},
  props: {
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
  mounted() {
    JsonForm.from(this.schema, this.formData, this.uiSchema)
        .then(jf => {
          let {component, schema, data, additional, properties} = jf.render((name, body, data, additional, obj) => {
            // console.log(name, body, data, additional)
            let c = items[body['type']]
            if (!c) {
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
          this.component_ = component
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