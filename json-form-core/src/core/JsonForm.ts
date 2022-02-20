// @ts-nocheck
class JsonForm {
    private schema: object
    private additional: object
    private data: object

    private constructor(schema: object, data?: object | null, additional?: object | null) {
        this.schema = schema
        this.data = data
        this.additional = additional
    }

    public render(handler: Function): any {
        return this.handle(null, this.schema, handler, this.data, this.additional)
    }

    protected handle(name: string | null, body: object, handler: Function, data?: object, additional?: object): any {
        let type = body['type']
        if (type == 'object') {
            let properties = body['properties']
            let obj = {}
            if (properties) {
                for (let key in properties) {
                    obj[key] = this.handle(key, properties[key], handler,
                        data ? data[key] : undefined,
                        additional ? additional[key] : undefined)
                }
            }
            return handler(name, body, data, additional, obj)
        } else {
            return handler(name, body, data, additional)
        }
    }

    public static from(schema: String | Promise<String> | object, data?: object | null, additional?: object | null): Promise<JsonForm> {
        if (schema instanceof String)
            return new Promise<JsonForm>((resolve, reject) => {
                try {
                    // @ts-ignore
                    resolve(new JsonForm(JSON.parse(schema), data, additional))
                } catch (e) {
                    reject(e)
                }
            })
        else if (schema instanceof Promise) { // @ts-ignore
            return schema.then(s => new JsonForm(JSON.parse(s), data, additional))
        }
        return Promise.resolve(new JsonForm(schema, data, additional))
    }
}

export default JsonForm