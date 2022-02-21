<template>
  <q-field :color="color"
           ref="target"
           :filled="filled"
           :label="label"
           :hint="hint"
           :rules="rules"
           v-model="val"
           :loading="loading">
    <template v-slot:control>
      {{ showValue }}
    </template>
    <template v-if="dateEnable" v-slot:prepend>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-date v-model="val" :mask="mask">
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
          <q-time v-model="val" :mask="mask" format24h>
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
import {date} from 'quasar'

export default {
  name: "DateTime",
  props: {
    modelValue: {
      type: String
    },
    rules: Array,
    type: String,
    label: String,
    hint: String,
    loading: Boolean,
    filled: Boolean,
    color: String
  },
  emits: ['update:modelValue'],
  data() {
    return {
      val: this.modelValue || ""
    }
  },
  watch: {
    val() {
      this.$emit("update:modelValue", this.val);
    }
  },
  computed: {
    dateEnable() {
      return !this.type || this.type == "date" || this.type == "date-time" || this.type != "time"
    },
    timeEnable() {
      return !this.type || this.type == "time" || this.type == "date-time" || this.type != "date"
    },
    mask() {
      if (this.dateEnable && this.timeEnable) {
        return "YYYY-MM-DDTHH:mm:ssZ"
      } else if (this.dateEnable) {
        return "YYYY-MM-DD"
      } else {
        return "HH:mm:ssZ"
      }
    },
    showValue() {
      if (this.dateEnable && this.timeEnable) {
        return date.formatDate(this.val, "YYYY-MM-DD HH:mm")
      } else if (this.dateEnable) {
        return this.val
      } else {
        if (!this.val)
          return this.val
        let index = this.val.lastIndexOf('+')
        index = this.val.lastIndexOf(':', index)
        return index == -1 ? this.val : this.val.substring(0, index)
      }
    }
  },
  methods: {
    validate() {
      return this.$refs.target.validate(this.val)
    }
  }
}
</script>

<style scoped>

</style>