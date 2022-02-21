import AjvUtil from "./AjvUtil"
import {ref, toRefs, reactive, watch, onMounted, getCurrentInstance} from 'vue'
import {fasLeaf} from "@quasar/extras/fontawesome-v5";

const props = {
    metaSchema: Object,
    schema: Object,
    additional: Object,
    name: String,
    itemVal: Object,
    properties: Object,
}

function getDefaultValue(schema) {
    if (schema == null || schema.type == null)
        return null
    switch (schema.type) {
        case "string":
            return ""
        case "boolean":
            return false
        case "integer":
            return 0
        case "number":
            return 0.0
        default:
            return null
    }
}

function setup(props) {
    let ajv = new AjvUtil(getCurrentInstance().appContext.config.globalProperties.$q.lang.isoName, props.metaSchema)

    let data = reactive({
        val: props.itemVal || getDefaultValue(props.schema),
        rules: [
            v => ajv.validate(v, props.name)
        ],
        ajv: ajv
    })
    let w = watch(() => props.schema, (val) => ajv.setSchema(val))

    onMounted(() => {
        ajv.setSchema(props.schema)
    })

    let refData = toRefs(data)
    return {
        props,
        ...refData,
        w
    }

}

export {
    props,
    setup
}