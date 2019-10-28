const {HttpException} = require('../core/http-exception')

const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        // error 简化 堆栈调用的信息  给前端
        // HTTP Status Code 2xx 4xx 5xx

        if(error instanceof HttpException) {
            ctx.body = {
                msg: error.msg,
                error_code: error.errorCode,
                request: `${ctx.method} ${ctx.path}` 
            }
            ctx.status = error.code
        }
        
        // ctx.body = "服务器有点问题，你等两线下"
        // error_code 详细 开发者自己定义 10001 20003
        // request_url 当前请求的url

        //已知型错误
        //未知型错误 程序潜在的错误
        // 连接数据库 账号 密码 输错了 属于未知型错误
    }
}


module.exports = catchError