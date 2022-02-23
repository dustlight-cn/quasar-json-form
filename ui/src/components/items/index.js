

export default {
    "": () => import('./UnknownItem'),
    "string": () => import('./StringItem'),
    "number": () => import('./NumberItem'),
    "integer": () => import('./NumberItem'),
    "boolean": () => import('./BooleanItem'),
    "object": () => import('./ObjectItem'),
    "array": () => import('./ArrayItem'),
    "_enum": () => import('./EnumItem')
}