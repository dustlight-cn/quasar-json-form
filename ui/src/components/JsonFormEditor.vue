<template>
  <div>
    <q-layout view="hHh lpr fFf">
      <q-drawer v-model="left"
                show-if-above
                :mini="leftMini"
                @mouseover="leftMini = false"
                @mouseout="leftMini = true"
                :breakpoint="0"
                :width="200"
                side="left" bordered>
        <q-scroll-area class="fit">
          <prefab-list
              :root-name="name" :i18n="i18n_" :prefabs="prefabs"/>
        </q-scroll-area>
      </q-drawer>

      <q-drawer ref="right" v-model="right" side="right" bordered class="q-pr-sm q-pt-md">
        <field-edit @onDelete="onDelete" :i18n="i18n_" v-model="selected"/>
      </q-drawer>

      <q-page-container>
        <q-page>
          <component
              :is="c"
              ref="nested"
              :i18n="i18n_"
              :root-name="name"
              :name="name"
              :schema="schema"
              @select="onSelect"
              :ui-schema="uiSchema"/>
          <slot/>
        </q-page>
      </q-page-container>

    </q-layout>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import NestedDraggable from "./editor/NestedDraggable";
import FieldEdit from "./editor/FieldEdit";
import i18nTool from './editor/i18n'
import languages from '../resources/i18n'
import PrefabList from "./editor/PrefabList";
import {shallowRef, defineAsyncComponent} from 'vue'
export default {
  name: "JsonFormEditor",
  components: {PrefabList, FieldEdit, NestedDraggable, draggable},
  props: {
    name: {
      type: String,
      default() {
        return "root"
      }
    },
    schema: Object,
    uiSchema: Object,
    metaSchema: Object,
    i18n: Object,
    defaultLanguage: String,
    prefabs: Array
  },
  data() {
    return {
      left: false,
      leftMini: true,
      right: false,
      selected: null,
      deleteFun: null,
      i18n_: null,
      languages: languages,
      c: shallowRef(defineAsyncComponent(() => import('./editor/NestedDraggable'))) // 必须以这种方式引用，否则无法拖动根部节点，不知为何
    }
  },
  watch: {
    selected() {
      if (!this.selected)
        this.$refs.right.hide()
    }
  },
  methods: {
    onDelete(...args) {
      if (this.deleteFun) {
        this.$q.dialog({
          title: this.i18n_.get("messages.deleteItemTitle"),
          message: this.i18n_.get("messages.deleteItem"),
          cancel: {
            flat: true,
            color: "grey"
          },
          ok: {
            color: "negative"
          }
        })
            .onOk(() => {
              this.deleteFun()
              this.selected = null
              this.deleteFun = null
            })
      }
    },
    onSelect(element, deleteFun) {
      this.selected = element
      this.deleteFun = deleteFun
      if (this.selected)
        this.$refs.right.show()
    },
    getSchema() {
      return this.$refs.nested.getSchema()
    },
    getUiSchema() {
      return this.$refs.nested.getUiSchema()
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