<template>
  <div>
    <q-splitter
        v-model="split">
      <template v-slot:before>
        <nested-draggable
            ref="nested"
            :root-name="name || 'root'"
            :name="name || 'root'"
            :schema="schema"
            @select="(element)=>this.selected = element"
            :ui-schema="uiSchema"/>
      </template>
      <template v-slot:after>
        <field-edit :i18n="i18n_" v-model="selected"/>
      </template>
    </q-splitter>
    <slot/>
  </div>
</template>

<script>
import JsonForm from "./JsonForm";
import draggable from 'vuedraggable'
import NestedDraggable from "./editor/NestedDraggable";
import FieldEdit from "./editor/FieldEdit";
import i18nTool from './editor/i18n'
import languages from '../resources/i18n'

export default {
  name: "JsonFormEditor",
  components: {FieldEdit, NestedDraggable, JsonForm, draggable},
  props: {
    name: String,
    schema: Object,
    uiSchema: Object,
    metaSchema: Object,
    i18n: Object,
    defaultLanguage: String
  },
  data() {
    return {
      drag: false,
      selected: null,
      split: 75,
      i18n_: null,
      languages: languages
    }
  },
  methods: {
    getSchema(){
      return this.$refs.nested.getSchema()
    }
  },
  mounted() {
    let df = this.defaultLanguage
    if (!df)
      df = this.$q.lang.isoName
    if (this.i18n) {
      for (let k in this.i18n) {
        this.languages[k] = this.i18n[k]
      }
    }
    this.i18n_ = new i18nTool(this.languages, df, "zh-CN")
  }
}
</script>

<style scoped>

</style>