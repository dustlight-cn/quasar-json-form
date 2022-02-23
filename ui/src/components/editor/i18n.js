class i18n {
    lang
    defaultLanguage
    fallbackLanguage

    constructor(lang, defaultLanguage, fallbackLanguage) {
        this.lang = lang
        this.defaultLanguage = defaultLanguage
        this.fallbackLanguage = fallbackLanguage
    }

    get(key, lang = this.defaultLanguage) {
        let l = this.lang[lang]
        let path = key.split('.')
        let r = l
        for (let i = 0; i < path.length - 1; i++) {
            if (r == null || typeof r != 'object') {
                if (lang == this.fallbackLanguage)
                    return key
                return this.get(key, this.fallbackLanguage)
            }
            r = r[path[i]]
        }
        if (r == null) {
            if (lang == this.fallbackLanguage)
                return key
            return this.get(key, this.fallbackLanguage)
        }
        let s = r[path[path.length - 1]]
        if (s != null && typeof s == 'string')
            return s
        if (lang == this.fallbackLanguage)
            return key
        return this.get(key, this.fallbackLanguage)
    }
}

export default i18n