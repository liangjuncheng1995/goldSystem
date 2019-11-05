// const { LinValidator, Rule } = require('../../core/lin-validator')
const {
    LinValidator,
    Rule
} = require('../../core/lin-validator-v2')
const { User } = require('../models/user')
const { LoginType } = require("../lib/enum") 

class PositiveIntegerValidator extends LinValidator {
    constructor() {
        super()
        this.id = [ //多个Rule 是且的关系
            new Rule('isInt', '需要正整数', { min: 1 })
        ]
    }
}

class RegisterValidator extends LinValidator {
    constructor() {
        super()
        this.email = [
            new Rule('isEmail', '不符合Email规范')
        ]
        this.password1 = [
            // 用户指定范围 123456 $…^
            new Rule('isLength', '密码至少6个字符，最多32个字符', { min: 6, max: 32 }),
            new Rule('matches', '密码不符合规范', "^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![,\.#%'\+\*\-:;^_`]+$)[,\.#%'\+\*\-:;^_`0-9A-Za-z]{6,20}$")

        ]
        this.password2 = this.password1
        this.nickname = [
            new Rule('isLength', '密码至少4个字符，最多32个字符', { min: 4, max: 32 }),
        ]
    }
    validatePassword(vals) {
        const psw1 = vals.body.password1
        const psw2 = vals.body.password2
        if (psw1 !== psw2) {
            throw new Error('密码和确认密码不一致')
        }
    }

    async validateEmail(vals) {
        const email = vals.body.email
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if (user) {
            throw new Error("email已存在")
        }
    }
}

class TokenValidator extends LinValidator {
    constructor() {
        // 隐藏错误
        super()
        this.account = [
            new Rule('isLength','不符合账号规则', {min: 4,max: 32})
        ]
        this.secret = [
            // 登录多元化
            // 1.可以为空，可以不传
            new Rule('isOptional'),
            new Rule('isLength','至少6个字符',{min: 6,max: 128})
        ]

        // type
    }
    validateLoginType(vals) {
        if(!vals.body.type) {
            throw new Error('type是必须参数')
        }
        if(!LoginType.isThisType(vals.body.type)) {
            throw new Error('type参数不合法')
        }
    }
}

class NotEmptyValidator extends LinValidator {
    constructor() {
        super()
        this.token = [
            new Rule('isLength','不允许为空', {min: 1})
        ]
    }
}

module.exports = {
    PositiveIntegerValidator,
    RegisterValidator,
    TokenValidator,
    NotEmptyValidator
}