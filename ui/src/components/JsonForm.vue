<template>
  <div>
    <VueForm
        v-model="formData"
        :schema="schema"
        :ui-schema="uiSchema"
        :fallback-label="true"
        @submit="$emit('submit',formData)"
        @cancel="$emit('cancel',formData)"
        :form-footer="{
          show: true,
          okBtn: ok || this.$q.lang.label.ok,
          cancelBtn: ok || this.$q.lang.label.cancel,
          okBtnProps: {  type: 'primary' , loading: loading},
          cancelBtnProps: { disabled: loading }
        }"
    >
    </VueForm>
  </div>
</template>

<script>
import VueForm from '@lljj/vue3-form-element';

import 'element-plus/dist/index.css'
import './JsonForm.css'

export default {
  name: "JsonForm",
  components: {VueForm},
  emits: ['submit', 'cancel'],
  props: {
    schema: Object || {},
    uiSchema: Object || {},
    ok: String,
    cancel: String,
    loading: Boolean,
    refs: {
      type: Object,
      default() {
        return {
          record: {
            "$schema": "http://json-schema.org/draft-06/schema#",
            "$id": "https://datacenter.dustlight.cn/v1/schemas/record",
            "type": "string"
          }
        }
      }
    }
  },
  data() {
    return {
      formData: {},
    }
  },
  watch: {
  },
  methods: {
    getValue() {
      return this.formData
    },
    setValue(val) {
      this.formData = val || {}
    }
  },
  mounted() {

  }
}
</script>
