
const Router = require('koa-router')
const router = new Router();//实例化

router.get('/v1/classic/book', (ctx, next) => {
    ctx.body = {key: "book"}
})



module.exports = router