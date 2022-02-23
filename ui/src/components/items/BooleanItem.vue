<template>
  <div>
    <q-item class="q-pl-xs" v-if="widget == 'toggle'" tag="label" v-ripple>
      <q-item-section>
        <q-item-label>{{ label }}</q-item-label>
        <q-item-label caption>
          {{ hint }}
        </q-item-label>
        <q-item-label>
          <transition
              appear
              v-if="errorMessage"
              enter-active-class="animated fadeInUp"
          >
            <div class="text-negative text-caption">{{ errorMessage }}</div>
          </transition>
        </q-item-label>
      </q-item-section>
      <q-item-section avatar side>
        <q-toggle :disable="readonly" v-model="val"/>
      </q-item-section>
    </q-item>
    <q-item class="q-pl-xs" v-else tag="label" v-ripple>
      <q-item-section>
        <q-item-label>{{ label }}</q-item-label>
        <q-item-label caption>
          {{ hint }}
        </q-item-label>
        <q-item-label>
          <transition
              appear
              v-if="errorMessage"
              enter-active-class="animated fadeInUp"
          >
            <div class="text-negative">{{ errorMessage }}</div>
          </transition>
        </q-item-label>
      </q-item-section>
      <q-item-section avatar side>
        <q-checkbox :disable="readonly" v-model="val"/>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import {props, setup} from "./common"
import {inject, onBeforeUnmount, getCurrentInstance} from 'vue'


export default {
  name: "NumberItem",
  setup(props, ...args) {
    let INJECT = inject("_q_fo_", false)
    let {proxy} = getCurrentInstance()

    if (INJECT) {
      onBeforeUnmount(() => INJECT.unbindComponent(proxy))
      INJECT.bindComponent(proxy)
    }
    let c = setup(props, ...args)
    return {
      ...c,
      INJECT
    }
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
  data() {
    return {
      errorMessage: ""
    }
  },
  watch: {
    val() {
      this.validate()
    }
  },
  methods: {
    getValue() {
      return this.val
    },
    validate() {
      this.errorMessage = ""
      for (let i in this.rules) {
        let result = this.rules[i](this.val)
        if (result != true) {
          this.errorMessage = result
          return false
        }
      }
      return true
    }
  },
  resetValidation() {
    this.errorMessage = ""
  }
}
</script>

<style scoped>

</style>