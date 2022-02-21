<template>
  <q-field :color="color"
           ref="target"
           :filled="filled"
           :label="label"
           :hint="hint"
           :loading="loading">
    <template v-slot:control>
      {{ val }}
    </template>
    <template v-if="dateEnable" v-slot:prepend>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-date v-model="val" mask="YYYY-MM-DD HH:mm">
            <div class="row items-center justify-end">
              <q-btn v-close-popup :label="$q.lang.label.ok" color="primary" flat/>
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>

    <template v-if="timeEnable" v-slot:append>
      <q-icon name="access_time" class="cursor-pointer">
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-time v-model="val" mask="YYYY-MM-DD HH:mm" format24h>
            <div class="row items-center justify-end">
              <q-btn v-close-popup :label="$q.lang.label.ok" color="primary" flat/>
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-field>
</template>

<script>
export default {
  name: "DateTime",
  props: {
    value: {
      type: String
    },
    rules: Array,
    type: String,
    label: String,
    hint: String,
    loading: Boolean,
    filled: Boolean,
    color: Boolean
  },
  data() {
    return {
      val: ""
    }
  },
  watch: {
    val() {
      this.$emit("input", new Date(this.val).toISOString());
    }
  },
  computed: {
    dateEnable() {
      return !this.type || this.type == "date" || this.type == "datetime" || this.type != "time"
    },
    timeEnable() {
      return !this.type || this.type == "time" || this.type == "datetime" || this.type != "date"
    }

  }
}
</script>

<style scoped>

</style>