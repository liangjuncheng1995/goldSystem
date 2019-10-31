const Router = require('koa-router')

const {RegisterValidator} = require('../../validators/validator')

const router = new Router({
    prefix: '/v1/user'
});//实例化

//注册
router.post('/register',async (ctx)=> {
    console.log(ctx)
    const v = new RegisterValidator().validate(ctx)
    ctx.body = "注册成功"
    // 思维路径
    // 接收参数 Linvalidator
    // email password1 password2
})

module.exports = router