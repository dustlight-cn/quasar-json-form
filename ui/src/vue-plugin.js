import JsonForm from "./components/JsonForm";
import JsonFormEditor from "./components/JsonFormEditor";

const version = "0.0.1-alpha"

function install(app) {
  app.component(JsonForm.name, JsonForm)
  app.component(JsonFormEditor.name, JsonFormEditor)

}

export {
  version,
  JsonForm,
  JsonFormEditor,
  install
}
