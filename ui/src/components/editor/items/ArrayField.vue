<template>
  <div>
    <q-input v-model.number="modelValue.schema.minItems"
             hint=" "
             type="number"
             filled :label="i18n.get('array.minItems')"/>
    <q-input v-model.number="modelValue.schema.maxItems"
             hint=" "
             type="number"
             filled :label="i18n.get('array.maxItems')"/>

    <div class="text-subtitle2">
      {{ i18n.get("array.items") }}
    </div>
    <field-edit v-if="itemElement.schema" :model-value="itemElement" :i18n="i18n"/>
  </div>
</template>

<script>
import {props} from "./common";
import FieldEdit from "../FieldEdit";

export default {
  name: "ArrayField",
  components: {FieldEdit},
  props: {
    ...props
  },
  data() {
    return {
      itemElement: {
        schema: this.modelValue.schema.items
      }
    }
  }
}
</script>

<style scoped>

</style>