<template>
  <div>
    <q-item v-if="widget == 'toggle'" tag="label" v-ripple>
      <q-item-section>
        <q-item-label>{{ label }}</q-item-label>
        <q-item-label caption>
          {{ hint }}
        </q-item-label>
      </q-item-section>
      <q-item-section avatar side>
        <q-toggle v-model="val"/>
      </q-item-section>
    </q-item>
    <q-item v-else tag="label" v-ripple>
      <q-item-section>
        <q-item-label>{{ label }}</q-item-label>
        <q-item-label caption>
          {{ hint }}
        </q-item-label>
      </q-item-section>
      <q-item-section avatar side>
        <q-checkbox v-model="val"/>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import {props, setup} from "./common"

export default {
  name: "NumberItem",
  setup(props, ...args) {
    return setup(props, ...args)
  },
  props: {
    ...props
  },
  computed: {
    label() {
      return this.schema ? this.schema.title || this.name : ""
    },
    hint() {
      return this.schema ? this.schema.description : ""
    },
    widget() {
      return this.additional ? this.additional.widget : "";
    }
  },
  methods: {
    getValue() {
      return this.val
    }
  }
}
</script>

<style scoped>

</style>