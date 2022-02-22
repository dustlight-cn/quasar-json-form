const components = {
    "": () => import('./UnknownField'),
    "string": () => import('./StringField'),
    "number": () => import('./NumberField'),
    "integer": () => import('./NumberField'),
    "boolean": () => import('./BooleanField'),
    // "object": () => import('./ObjectItem'),
    // "array": () => import('./ArrayItem'),
    // "_enum": () => import('./EnumItem')
}

function getComponent(schema) {
    if(schema){
        if(schema.type && components[schema.type])
            return components[schema.type]
        // if(schema.enum)
            // return components[]
    }
    return components[""]
}

export default getComponent