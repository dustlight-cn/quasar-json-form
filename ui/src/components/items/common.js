import AjvUtil from "./AjvUtil"
import {ref, toRefs, reactive, watch, onMounted, getCurrentInstance} from 'vue'

const props = {
    schema: Object,
    additional: Object,
    name: String,
    itemVal: Object
}

function setup(props) {
    let ajv = new AjvUtil(getCurrentInstance().appContext.config.globalProperties.$q.lang.isoName)
    let {schema, name} = toRefs(props)

    let data = reactive({
        val: new String(props.itemVal || ""),
        rules: [
            v => ajv.validate(v, name)
        ],
        ajv: ajv
    })
    let w = watch(() => schema, (val) => ajv.setSchema(val))

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