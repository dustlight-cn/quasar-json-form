import JsonForm from "./components/JsonForm";


const version = __UI_VERSION__

function install (app) {
  app.component(JsonForm.name, JsonForm)

}

export {
  version,

  JsonForm,

  install
}
