import JsonForm from "./components/JsonForm";
import MyJsonForm from "./components/MyJsonForm";

import * as ep from 'element-plus/lib/components/index'

const version = "0.0.1-alpha"

function install(app) {
  app.component(JsonForm.name, JsonForm)
  app.component(MyJsonForm.name, MyJsonForm)

  for (let k in ep) {
    if (!ep[k].name || !(typeof(ep[k].name) == 'string'))
      continue
    app.component(ep[k].name, ep[k])
  }
  app.config.unwrapInjectedRef = true
}

export {
  version,
  JsonForm,
  MyJsonForm,
  install
}
