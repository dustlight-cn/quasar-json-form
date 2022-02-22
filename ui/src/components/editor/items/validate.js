class Validate {
    i18n
    constructor(i18n) {
        this.i18n = i18n
    }

    notEmpty = [
        val => val && val.trim().length > 0 || this.i18n.get("rule.notEmpty")
    ]

    gteZero = [
        val => !val || val && val >= 0 || this.i18n.get("rule.gteZero")
    ]

    gteMin = (val,min) => !min || val >= min || this.i18n.get("rule.gteMin")
}
export default Validate