

export default {
    "": () => import('./UnknownItem'),
    "string": () => import('./StringItem'),
    "number": () => import('./NumberItem'),
    "integer": () => import('./NumberItem'),
    "object": () => import('./ObjectItem'),
    "boolean": () => import('./BooleanItem'),
    "_enum": () => import('./EnumItem')
}