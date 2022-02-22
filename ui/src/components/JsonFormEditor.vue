<template>
  <div>
    <nested-draggable
        :name="name || 'root'"
        :schema="schema"/>
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
    formData: Object,
    metaSchema: Object
  },
  data() {
    return {
      treeNodes: [],
      drag: false,
      list: []
    }
  },
  methods: {},
  mounted() {

  }
}
</script>

<style scoped>

</style>