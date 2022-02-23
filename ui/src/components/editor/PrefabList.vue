<template>
  <div class="q-pr-md">
    <div class="q-mb-sm" v-for="(prefab,index) in prefabs" :key="index">
      <prefab-item :prefab="prefab" :root-name="rootName"/>
      <q-separator class="q-mt-sm"/>
    </div>
  </div>
</template>

<script>
import prefabs from "./prefabs";
import PrefabItem from "./PrefabItem";

function getComponent(schema) {
  if (schema.type && items[schema.type]) {
    return items[schema.type]
  } else if (schema.enum) {
    return items._enum
  }

  return items[""]
}

export default {
  name: "PrefabList",
  components: {PrefabItem},
  props: {
    rootName: String,
    prefabs: {
      type: Array,
      default() {
        return prefabs
      }
    },
    i18n: Object,
  },
  data() {
    return {}
  },
  watch: {},
  methods: {},
  mounted() {
  }
}
</script>

<style scoped>

</style>