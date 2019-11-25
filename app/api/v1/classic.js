
const Router = require('koa-router')
const basicAuth = require('basic-auth')

const router = new Router({
    prefix: '/v1/classic'
});//实例化
const {
    Flow
} = require('../../models/flow')
// const { PositiveIntegerValidator } = require('../../validators/validator')
const {
    PositiveIntegerValidator,
    ClassicValidator
} = require('@validator')

const {Auth} = require('../../../middlewares/auth')
const {Art} = require('../../models/art')
// const {Favor} = require('../../models/favor')

// const {Favor} = require('@root/app/models/favor')
const {Favor} = require('@module/favor')




// ,, 
//获取最新期刊
router.get('/latest',new Auth().m, async (ctx, next) => {
    // const test = basicAuth(ctx.req)
    // console.log(test)

    //排序
    const flow = await Flow.findOne({
        order: [
            ['index', 'DESC']
        ]
    })
    const art = await Art.getData(flow.art_id, flow.type)
    const likeLatest = await Favor.userLikeIt(flow.art_id,flow.type,ctx.auth.uid)
    // const newData = {
    //     index: flow.index,
    //     image: art.image
    // }
    // art.dataValues.index = flow.index //不推荐
    art.setDataValue('index', flow.index)
    art.setDataValue('like_status', likeLatest)
    ctx.body = art
    //序列化 对象 转换成 json
    // ctx.body = ctx.auth.uid
    // ctx.body = "success"
})
// 获取下一期刊
router.get('/:index/next', new Auth().m, async(ctx) => {//下一期
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id: 'index'
    })
    const index = v.get('path.index')
    const flow = await Flow.findOne({
        where: {
            index: index + 1
        }
    })
    if(!flow) {
        throw new global.errs.NotFound()
    }
    const art = await Art.getData(flow.art_id, flow.type)
    const likeNext = await Favor.userLikeIt(flow.art_id,flow.type,ctx.auth.uid)
    art.setDataValue('index', flow.index)
    art.setDataValue('like_status', likeNext)
    ctx.body = art
})
//获取上一期刊
router.get('/:index/previous', new Auth().m, async(ctx) => { //上一期
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id: 'index'
    })
    const index = v.get('path.index')
    const flow = await Flow.findOne({
        where: {
            index: index - 1
        }
    })
    if(!flow) {
        throw new global.errs.NotFound()
    }
    const art = await Art.getData(flow.art_id, flow.type)
    const likePrevious = await Favor.userLikeIt(flow.art_id,flow.type,ctx.auth.uid)
    art.setDataValue('index', flow.index)
    art.setDataValue('like_status', likePrevious)
    ctx.body = art
})
//获取期刊详情
router.get('/:type/:id', new Auth().m, async ctx => {
    const v = await new ClassicValidator().validate(ctx) 
    const id = v.get('path.id')
    const type = parseInt(v.get('path.type')) 
    // 单元测试
    const artDetail = await new Art(id, type).getDetail(ctx.auth.uid)
    artDetail.art.setDataValue("like_status", artDetail.like_status)
    ctx.body = artDetail.art
    // ctx.body = {
    //     art: artDetail.art,
    //     like_status: artDetail.like_status
    // }
})

//获取期刊的点赞情况
router.get('/:type/:id/favor', new Auth().m, async ctx => {
    const v = await new ClassicValidator().validate(ctx) 
    const id = v.get('path.id')
    const type = parseInt(v.get('path.type')) 
    // const art = await Art.getData(id, type)
    // if(!art) {
    //     throw new global.errs.NotFound()
    // }
    // const like = await Favor.userLikeIt(id,type,ctx.auth.uid)
    const artDetail = await new Art(id, type).getDetail(ctx.auth.uid)
    // artDetail.art.setDataValue("like_status", artDetail.like_status)
    ctx.body = {
        fav_nums: artDetail.art.fav_nums,
        like_status: artDetail.like_status
    }

})
//获取我最喜欢的期刊
router.get('/favor', new Auth().m, async ctx => {
    const uid = ctx.auth.uid
    ctx.body = await Favor.getMyClassicFavors(uid)
})


module.exports = router

    // 服务器缓存 redis  前端缓存 解决性能 （缺陷，有条件的限制）

    // 别名 alias

    // 权限 复杂
    // token 限制 角色
    // 普通用户
    // 分级 scope
    // 8(普通用户) 16(admin)
    //前端向服务器传参
    // 链接中间 /v1/{data}/classic/latest
    // 链接后面
    // header
    // body
    // console.log("进入接口处")
    // const path = ctx.params //链接中间的参数
    // const query = ctx.request.query //链接后面的参数
    // const headers = ctx.request.header // header参数，比如token令牌
    // const body = ctx.request.body // body json 数据

   
    // 校验 LinValidator
    // TP SpringBoot KOA
    // const v = await new PositiveIntegerValidator().validate(ctx)
    // const id = v.get('body.a', parsed = false)
    // console.log(31)
    // console.log(id)
    // ctx.body = "success"

// User
    // 用户系统
    // 账号 密码 附属信息 ：昵称 email 手机
    // 注册 登录
    // Sequelize 链接数据库 配置一些数据的参数


    // 数据库类型
    // 关系型数据库
    // 非关系型的数据库
    // MYSQL （关系型） CRUD ORM
    // MS SQL Server  Access（关系型）
    // Oracle （关系型）
    // PostgresSQL（关系型）

    // Redis （非关系型 key :value） (做缓存)
    // MongoDB （文档型数据库） （非关系型） ODM
    // 持久存储数据 持久化


    // if(true) {
    //     //动态 面向对象定义一个类
    //     // const error = new HttpException("为什么错误",10001, 400)
    //     const error = new global.errs.ParameterException()
    //     // global 的使用
    //     // error.requestUrl = `${ctx.method} ${ctx.path}` 
    //     throw error
    // }
    // ctx.body = {
    //     key: "classic"
    // }
    // throw new Error('Api Exception')

    //原型链
    // AOP 面向切面编程
    //监听错误
    // 输出一段有意义的提示信息
    // KOA 的中间件
    // try {

    // } catch (error) {

    // }
    // 异常处理

    //model code first 表 model
    // 面向对象 model class
    // 初始化数据 期刊 书籍 SQL
    // model 
    // 主题 粗到细
    // user
    // 期刊 粗
    // movie Sentence music 扩展性 相似性
    // Flow
    // 怎么设计数据库 感觉
    // 实体 表/model 记录本身相关的信息 事物 （实体表【映射】）
    // Flow 具体实体，抽象 记录业务 解决业务问题（业务表）好的业务表，性能好，查询快
    // 一切都是实体表 自己来设计 
    