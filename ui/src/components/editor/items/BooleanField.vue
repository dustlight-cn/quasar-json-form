<template>
  <div>
    {{ JSON.stringify(modelValue.additional) }}
    <q-select v-model="modelValue.additional.widget"
              :options="widgetOptions"
              map-options
              emit-value
              filled
              :label="i18n.get('boolean.widgetLabel')"/>
  </div>
</template>

<script>
import {props} from "./common";

const widgetOptionsValue = ["", "toggle"]
export default {
  name: "BooleanField",
  props: {
    ...props
  },
  data() {
    let widgetOpts = []
    widgetOptionsValue.forEach(opt => {
      widgetOpts.push({
        label: this.i18n.get("boolean.widget." + opt),
        value: opt
      })
    })
    return {
      widgetOptions: widgetOpts
    }
  }
}
</script>

<style scoped>

</style>