const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken');

class Auth {
    constructor(level) {
        this.level = level || 1
        Auth.USER = 8
        Auth.ADMIN = 16
        Auth.SUPER_ADMIN = 32
    }
    get m() {
        return async (ctx,next) => {
            const userToken = basicAuth(ctx.req)
            let errMsg = "token不合法"
            // console.log(this.level)
            let decode = {}
            if(!userToken || !userToken.name) {
                console.log("403")
                throw new global.errs.Forbbiden()
            }
            try {
                decode = jwt.verify(userToken.name,global.config.security.secretKey)
            } catch (error) {
                // token 不合法
                // token 过期
                if(error.name == "TokenExpiredError") {
                    errMsg = "token已过期"
                } 
                throw new global.errs.Forbbiden(errMsg)
            }

            if(decode.scope < this.level) {
                errMsg = '权限不足'
                throw new global.errs.Forbbiden(errMsg)
            }
            console.log(35)
            console.log(decode)

            ctx.auth = {
                uid: decode.uid,
                scope: decode.scope
            }
            await next()
            // ctx.body = token
            //token 检测
            // req Node.js request
            // 获取token
            // body header 约定
            // http 协议  身份验证机制 httpBasicAuth

        }
    }
    static verifyToken(token) {
        console.log("验证token")
        console.log(token)
        try {
            jwt.verify(token,global.config.security.secretKey)
            return true
        } catch (error) {
            return false
        }
    }
}

module.exports = {
    Auth
}