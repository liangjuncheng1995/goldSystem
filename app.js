const Koa = require("koa")
const parser = require("koa-bodyparser")
const InitManager = require('./core/init')

const app = new Koa()

app.use(parser())
InitManager.initCore(app)

app.listen(3000)




// web 开发 阅读 利于维护 提高编程效率
// 数据的类型 主题的划分
// 抽象概念 思考 Model
// api 版本 需求的变动
// api 携带版本号
// 1 路径
// 2 查询的参数
// 3 header
// 分层
// 注册
// app.use(async (ctx, next) => {
//     // 上下文ctx 洋葱模型
//     // 下一个中间件函数 next
//     console.log("hello")
//     await next()
//     console.log("helo1")
// })
// app.use(async (ctx, next) => {
//     console.log("hello2")
//     await next()
//     console.log("helo3")
// })

// app.use(async(ctx, next) => {
//     // 上下文ctx 洋葱模型
//     // 下一个中间件函数 next
//     console.log("1")
//     // const a = await next()
//     await next()
//     const test = ctx.r
//     console.log(test)
//     //求值关键字 表达试
//     console.log(2)
//     // a.then(res =>{
//     //     console.log("proNide")
//     //     console.log(res) 
//     // })
// })
// app.use(async (ctx, next) => {
//     console.log("3")
//     // next()
//     // await 会阻塞线程
//     // 读文件，发http请求，操作数据库（对资源的拿取）
//     // async await 解决异步的终极方案
//     const axios = require('axios')
//     const res = await axios.get('https://4g.dzkandian.com/a/video.list')

//     ctx.r = res

//     await next()

// })

// get 查询 
// post 新增
// put  更新
// REST
// delete 删除

// app.use(async (ctx, next) => {
//     console.log(ctx.path)
//     console.log(ctx.method)
//     if (ctx.path === "/classic/latest" && ctx.method === "GET") {
//         ctx.body = {key: "classic"}
//     } 
// })




// 应用程序对象 中间件

// babel ES5
// TS Typescript

// commonJS ES6 