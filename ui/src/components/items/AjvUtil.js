import Ajv from "ajv"
import AjvI18n from 'ajv-i18n'

/**
 * 获取语言
 * 例如：
 *
 *  zh-CN -> zh
 *
 *  en-US -> en
 * @param input
 * @returns {String|string|*}
 */
function getLang(input) {
    if (!(input instanceof String) && (typeof input != 'string'))
        return input
    let index = input.indexOf('-')
    if (index > -1)
        return input.slice(0, index)
    return input
}

class AjvUtil {

    /**
     * @type any
     */
    schema

    /**
     * @type string
     */
    lang

    ajv
    validation

    /**
     *
     * @param {string} lang 语言
     * @param {any} metaSchema Meta Schema
     */
    constructor(lang, metaSchema) {
        this.lang = getLang(lang)
        this.ajv = new Ajv()
        if (metaSchema) {
            for (let key in metaSchema) {
                this.ajv.addMetaSchema(metaSchema[key], key)
            }
        }
    }

    /**
     * 设置 Schema
     *
     * @param schema
     */
    setSchema(schema) {
        this.schema = schema
        this.validation = this.ajv.compile(schema)
    }

    /**
     * 校验数据
     * @param target 目标数据
     * @param name 当前对象名称，当前 title 为空时生效
     * @returns {string|boolean} 成功返回 true ，失败返回具体原因
     */
    validate(target, name) {
        if (this.validation(target))
            return true
        if (AjvI18n[this.lang])
            AjvI18n[this.lang](this.validation.errors)
        return this.ajv.errorsText(this.validation.errors, {
            separator: '\n',
            dataVar: this.schema.title || name
        })
    }
}

export default AjvUtil