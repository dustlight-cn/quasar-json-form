import AjvUtil from "./AjvUtil"
import {ref, toRefs, reactive, watch, onMounted, getCurrentInstance} from 'vue'

const props = {
    metaSchema: Object,
    schema: Object,
    additional: Object,
    name: String,
    itemVal: Object,
    properties: Object,
}

function setup(props) {
    let ajv = new AjvUtil(getCurrentInstance().appContext.config.globalProperties.$q.lang.isoName, props.metaSchema)
    let data = reactive({
        val: props.itemVal || null,
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