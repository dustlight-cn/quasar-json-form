class Validate {
    i18n
    constructor(i18n) {
        this.i18n = i18n
    }

    notEmpty = [
        val => val && val.trim().length > 0 || this.i18n.get("rule.notEmpty")
    ]

    gteZero = [
        val => (val == null) || val >= 0 || this.i18n.get("rule.gteZero")
    ]
    gtZero = [
        val => (val == null) || val > 0 || this.i18n.get("rule.gtZero")
    ]

    jsonRule = val => {
        try {
            if (val == undefined || val == "")
                return true
            JSON.parse(val)
            return true
        } catch (e) {
            return e.message || e
        }
    }
    gteMin = (val, min) => !min || val >= min || this.i18n.get("rule.gteMin")
}
export default Validate