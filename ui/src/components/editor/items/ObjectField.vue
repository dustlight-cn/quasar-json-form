<template>
  <div>
    <div class="text-subtitle2" v-if="modelValue.children && modelValue.children.length > 0">
      {{ i18n.get("object.required") }}
    </div>
    <q-list>
      <q-item tag="label" v-for="(child,index) in modelValue.children" clickable v-ripple>
        <q-item-section avatar>
          <q-checkbox v-model="modelValue.schema.required" :val="child.name"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>
            {{ child.schema.title }}
          </q-item-label>
          <q-item-label caption>
            {{ child.name }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import {props} from "./common";

export default {
  name: "ObjectField",
  props: {
    ...props
  },
  data() {
    return {}
  },
  methods: {},
  watch: {
    "modelValue.children"() {
      if (this.modelValue.schema.required == null)
        return
      let childSet = new Set
      for (let i in this.modelValue.children) {
        childSet.add(this.modelValue.children[i].name)
      }
      let noExists = []
      for (let i in this.modelValue.schema.required) {
        if (!childSet.has(this.modelValue.schema.required[i]))
          noExists.push(this.modelValue.schema.required[i])
      }
      noExists.forEach(name => {
        let index = this.modelValue.schema.required.indexOf(name)
        if (index > -1)
          this.modelValue.schema.required.splice(index, 1)
      })
    }
  },
  mounted() {
    if (this.modelValue.schema.required == null)
      this.modelValue.schema.required = []
  }
}
</script>

<style scoped>

</style>