export default {
    name: "名称",
    title: "标题",
    description: "描述",
    type: "类型",
    const: "常量",
    typeName: {
        "string": "字符串",
        "object": "对象",
        "number": "数字",
        "integer": "整数",
        "boolean": "布尔值",
        "array": "数组",
        "enum": "枚举值"
    },
    string: {
        pattern: "正则模式",
        minLength: "最小长度",
        maxLength: "最大长度",
        format: "格式",
        formatName: {
            null: "无",
            "date-time": "日期时间",
            date: "日期",
            time: "时间",
            email: "电子邮件",
            hostname: "主机名",
            ipv4: "IPv4 地址",
            ipv6: "IPv6 地址",
            uri: "URI",
            "uri-reference": "URI 引用"
        }
    },
    number: {
        multipleOf: "倍数",
        minimum: "最小值",
        maximum: "最大值",
        exclusiveMinimum: "不含边界最小值",
        exclusiveMaximum: "不含边界最大值"
    },
    rule: {
        notEmpty: "不可为空！",
        gteZero: "必须大于或等于零！",
        gtZero: "必须大于零！",
        gteMin: "必须大于或等于最小长度！"
    }
}