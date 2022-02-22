<template>
  <div>
    <nested-draggable
        :root-name="name || 'root'"
        :name="name || 'root'"
        :schema="schema"
        :ui-schema="uiSchema"/>
  </div>
</template>

<script>
import JsonForm from "./JsonForm";
import draggable from 'vuedraggable'
import NestedDraggable from "./editor/NestedDraggable";

export default {
  name: "JsonFormEditor",
  components: {NestedDraggable, JsonForm, draggable},
  props: {
    name: String,
    schema: Object,
    uiSchema: Object,
    metaSchema: Object
  },
  data() {
    return {
      drag: false,
    }
  },
  methods: {},
  mounted() {

  }
}
</script>

<style scoped>

</style>