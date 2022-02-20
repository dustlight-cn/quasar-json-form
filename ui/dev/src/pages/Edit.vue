<template>
  <q-page padding>
    <!--    <JsonEditor />-->
    <component :is="gg"/>
    <my-json-form :schema="client" :ui-schema="clientUi"/>
  </q-page>
</template>

<script>
import client from "../resources/client.json"
import clientUi from "../resources/client.ui.json"
import {QBtn} from "quasar";
import {shallowRef, defineAsyncComponent} from 'vue'

export default {
  name: "Edit",
  data() {
    return {
      client: client,
      clientUi: clientUi,
      gg: shallowRef(defineAsyncComponent(() => Promise.resolve(QBtn)))
    }
  },
  methods: {
    onSubmit(val) {
      alert(JSON.stringify(val, undefined, 2))
    }
  },
  mounted() {
    // let btn = createApp(QBtn)
    //
    // console.log(btn)
    // let p = document.createElement("div")
    // console.log(this.$refs.container.$el)
    // this.$refs.container.$el.append(p)
    // btn.mount(p)
    //
    // // let qbtn = new QBtn()
    // let node = createElementVNode(QBtn,null,null)
    //
    // console.log(node)
    // console.log(this.$refs.container)
    // this.$refs.container.ad(node)
    // createVNode()
  }
}

</script>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
