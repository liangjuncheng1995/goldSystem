
const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/classic'
});//实例化
const {HotBook} = require('@module/hot-book')
const {PositiveIntegerValidator} = require('@validator')
const {Book} = require('@module/book')



router.get('/book', async(ctx, next) => {
    const books = await HotBook.getAll()
    ctx.body = {
        books
    }
})

router.get('/:id/detail', async ctx => {
    const v = await new PositiveIntegerValidator().validate(ctx)
    const book =  new Book(v.get('path.id'))
    ctx.body = await book.detail()
})




module.exports = router

// 图书基础数据 服务
// 数据的公用性
// 中间层 微服务
// book相关的数据库表