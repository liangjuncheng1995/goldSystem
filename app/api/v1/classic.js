
const Router = require('koa-router')
const router = new Router();//实例化

router.post('/v1/:id/classic/latest', (ctx, next) => {
    //前端向服务器传参
    // 链接中间 /v1/{data}/classic/latest
    // 链接后面
    // header
    // body
    console.log("进入接口处")
    const path = ctx.params //链接中间的参数
    const query = ctx.request.query //链接后面的参数
    const headers = ctx.request.header // header参数，比如token令牌
    const body = ctx.request.body // body json 数据

    // 校验 LinValidator

    ctx.body = {
        key: "classic"
    }
})

module.exports = router
