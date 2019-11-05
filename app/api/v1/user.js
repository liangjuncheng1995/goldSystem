const Router = require('koa-router')
const { User } = require('../../models/user')

const { RegisterValidator } = require('../../validators/validator')

const {success} = require('../../lib/helper')

const router = new Router({
    prefix: '/v1/user'
});//实例化

//注册
router.post('/register', async (ctx) => {
    // new 实例化
    // 10 实例化10次
    // 全局一个validator
    // 密码 需要明文 加密 不同 彩虹攻击
    const v = await new RegisterValidator().validate(ctx)
    // ctx.body = "注册成功"
    // 登录 session 不考虑状态 token
    // token jwt
    // token 无意义的随机字符串
    // 携带数据
    // uid jwt
    // 令牌 获取token
    // rest webservice 有状态看，
    const user = {
        email: v.get("body.email"),
        password: v.get('body.password2'),
        nickname: v.get('body.nickname')
    }
    await User.create(user)
    success()
    // 思维路径
    // 接收参数 Linvalidator
    // email password1 password2
    // SQL Model
})

module.exports = router