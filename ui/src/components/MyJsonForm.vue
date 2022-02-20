<template>
  <div>
    <div v-for="(c,key) in instances" :key="key">
      <component :is="c" :name="key" :schema="schemas[key]" :additional="additional[key]" :itemVal="data[key]"/>
    </div>

  </div>
</template>

<script>
import {JsonForm} from "@dustlight/json-form-core";
import items from './items'

import {shallowRef, defineAsyncComponent} from 'vue'

export default {
  name: "MyJsonForm",
  props: {
    schema: Object,
    uiSchema: Object,
    formData: Object
  },
  data() {
    return {
      instances: null,
      schemas: null,
      data: {},
      additional: {}
    }
  },
  mounted() {

    console.log(this.uiSchema)
    JsonForm.from(this.schema, this.formData, this.uiSchema)
        .then(jf => {
          let obj = jf.render((name, body, data, additional) => {
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
              additional: additional
            }
          })
          this.instances = {}
          this.schemas = {}
          this.additional = {}
          this.data = {}
          for (let i in obj) {
            this.instances[i] = shallowRef(defineAsyncComponent(obj[i].component))
            this.schemas[i] = obj[i].schema
            this.additional[i] = obj[i].additional
            this.data[i] = obj[i].data
          }
          // this.instances = obj

        })
  }
}
</script>

<style scoped>

</style>