<template>
  <div>
    <div class="text-h6">{{ title }}</div>
    <div class="text-grey text-caption">{{ subtitle }}</div>
    <div class="text-negative text-caption">{{ errorMessage }}</div>
    <q-list separator>
      <q-item
          class="q-pl-xs"
          v-for="(key,index) in children"
          :key="key">
        <q-item-section>
          <component
              :is="component[key]"
              ref="component"
              :name="this.name + ' ' + (index + 1)"
              :schema="properties.schema"
              :properties="properties.properties"
              :additional="properties.additional"
          />
        </q-item-section>
        <q-item-section v-if="!minItems || (children.length > minItems)" side top>
          <q-btn round flat icon="remove" color="primary" @click="()=>removeChild(key)"/>
        </q-item-section>
      </q-item>

      <div class="text-center" v-if="!maxItems || (children.length < maxItems)">
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
      increment: 0,
      errorMessage: ""
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
    },
    minItems() {
      return this.schema ? this.schema.minItems : null
    },
    maxItems() {
      return this.schema ? this.schema.maxItems : null
    }
  },
  methods: {
    addChild() {
      let key = this.increment++;
      this.children.push(key)
      this.component[key] = shallowRef(defineAsyncComponent(this.properties.component))
    },
    removeChild(key) {
      let index = this.children.indexOf(key)
      if (index == -1)
        return
      this.children.splice(index, 1)
      delete this.component[key]
    },
    getValue() {
      let v = []
      if (!this.$refs.component)
        return v
      for (let i in this.$refs.component) {
        v.push(this.$refs.component[i].getValue())
      }
      return v
    },
    validate() {
      if (!this.$refs.component)
        return true
      for (let i in this.$refs.component) {
        let r = this.$refs.component[i].validate()
        if (r != true)
          return false
      }
      this.errorMessage = ""
      let val = this.getValue();
      for (let i in this.rules) {
        let result = this.rules[i](val)
        if (result != true) {
          this.errorMessage = result
          return false
        }
      }
      return true
    }
  },
  mounted() {
    if (this.minItems) {
      for (let i = 0; i < this.minItems; i++)
        this.addChild()
    }
  }
}
</script>

<style scoped>

</style>