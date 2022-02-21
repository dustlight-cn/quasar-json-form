import JsonForm from "./components/JsonForm";


const version = "0.0.1-alpha"

function install(app) {
  app.component(JsonForm.name, JsonForm)

  app.config.unwrapInjectedRef = true
}

export {
  version,
  JsonForm,
  install
}
