<template>
  <q-card bordered class="shadow-0">
    <q-item style="word-break: break-all;">
      <q-item-section>
        <q-item-label>
          Name
        </q-item-label>
        <q-item-label caption>
          {{ name || '-' }}
        </q-item-label>
      </q-item-section>
      <q-item-section>
        <q-item-label>
          Schema
        </q-item-label>
        <q-item-label caption>
          {{ schema || '-' }}
        </q-item-label>
      </q-item-section>
      <q-item-section>
        <q-item-label>
          Additional
        </q-item-label>
        <q-item-label caption>
          {{ additional || '-' }}
        </q-item-label>
      </q-item-section>

      <q-item-section>
        <q-item-label>
          Value
        </q-item-label>
        <q-item-label>
          <q-input ref="input" :rules="rules" v-model="val" type="textarea" outlined/>
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-card>
</template>

<script>
import {props, setup} from "./common"

export default {
  name: "UnknownItem",
  props: {
    ...props
  },
  setup(props, ...args) {
    return setup(props, ...args)
  },
  methods: {
    getValue() {
      return this.val
    },
    validate() {
      return this.$refs.input.validate(this.val)
    }
  }
}
</script>

<style scoped>

</style>