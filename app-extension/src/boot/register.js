import { boot } from 'quasar/wrappers'
import VuePlugin from '@dustlight/quasar-ui-json-form'

export default boot(({ app }) => {
  app.use(VuePlugin)
})
