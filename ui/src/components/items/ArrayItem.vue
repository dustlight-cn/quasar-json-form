<template>
  <div>
    <div class="text-subtitle1">{{ title }}</div>
    <div class="text-subtitle2">{{ subtitle }}</div>
    <q-list separator>
      <q-item
          v-for="(key,index) in children"
          :key="key">
        <q-item-section>
          <component
              :is="component[key]"
              :ref="name"
              :name="this.name + ' ' + (index + 1)"
              :schema="properties.schema"
              :properties="properties.properties"
              :additional="properties.additional"
          />
        </q-item-section>
        <q-item-section side top>
          <q-btn round flat icon="remove" color="primary" @click="()=>removeChild(key)"/>
        </q-item-section>
      </q-item>

      <div class="text-center">
        <q-btn round flat icon="add" color="primary" @click="addChild"/>
      </div>
    </q-list>
  </div>
</template>

<script>
import {props, setup} from "./common"
import {shallowRef, defineAsyncComponent} from 'vue'

export default {
  name: "ObjectItem",
  props: {
    ...props
  },
  setup(props, ...args) {
    return setup(props, ...args)
  },
  data() {
    return {
      children: [],
      component: {},
      length: 0,
      increment: 0
    }
  },
  watch: {
    properties() {
      this.children = []
      this.component = {}
    }
  },
  computed: {
    title() {
      return this.schema ? this.schema.title || this.name : ""
    },
    subtitle() {
      return this.schema ? this.schema.description : ""
    },
    hasProperties() {
      if (!this.properties)
        return false
      for (let i in this.properties)
        return true
      return false
    }
  },
  methods: {
    addChild() {
      let key = this.increment++;
      this.children.push(key)
      this.component[key] = shallowRef(defineAsyncComponent(this.properties.component))
      console.log(this.component)
      console.log(this.children)
    },
    removeChild(key) {
      console.log(key)
      console.log(this.component)
      console.log(this.children)
      let index = this.children.indexOf(key)
      if (index == -1)
        return
      this.children.splice(index, 1)
      delete this.component[key]
    },
    getValue() {
      let v = []
      for (let key in this.$refs) {
        v.push(this.$refs[key][0].getValue())
      }
      return v
    }
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>