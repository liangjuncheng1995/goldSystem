
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
    if(true) {
        //动态 面向对象定义一个类
        // const error = new HttpException("为什么错误",10001, 400)
        const error = new global.errs.ParameterException()
        // global 的使用
        // error.requestUrl = `${ctx.method} ${ctx.path}` 
        throw error
    }
    ctx.body = {
        key: "classic"
    }
    throw new Error('Api Exception')


    // AOP 面向切面编程
    //监听错误
    // 输出一段有意义的提示信息
    // KOA 的中间件
    // try {
        
    // } catch (error) {
        
    // }
    // 异常处理
})

module.exports = router
