class Validate {
    i18n
    constructor(i18n) {
        this.i18n = i18n
    }

    notEmpty = [
        val => val && val.trim().length > 0 || this.i18n.get("rule.notEmpty")
    ]
}
export default Validate