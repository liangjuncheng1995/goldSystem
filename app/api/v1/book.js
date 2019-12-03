
const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/book'
});//实例化
const {HotBook} = require('@module/hot-book')
const {
    PositiveIntegerValidator,
    SearchValidator,
    AddShortCommentValidator
} = require('@validator')
const {Book} = require('@module/book')
const {Auth} = require('../../../middlewares/auth')
const {Favor} = require('@module/favor')
const {Comment} = require('@module/book-comment')
const {success} = require('../../lib/helper')


router.get('/hot_list', async(ctx, next) => {
    const books = await HotBook.getAll()
    ctx.body = books
})

router.get('/:id/detail', async ctx => {
    const v = await new PositiveIntegerValidator().validate(ctx)
    const book =  new Book()
    ctx.body = await book.detail(v.get('path.id'))
})

router.get('/search', async ctx => {
    const v = await new SearchValidator().validate(ctx)
    const result = await Book.searchFromYuShu(v.get('query.q'),v.get('query.start'),v.get('query.count'))
    ctx.body = result
})

router.get('/favor/count', new Auth().m, async ctx => {
    const count = await Book.getMyFavorBookCount(ctx.auth.uid)
    ctx.body = {
        count
    }
})

router.get('/:book_id/favor', new Auth().m, async ctx => {
   const v = await new PositiveIntegerValidator().validate(ctx,{
       id: 'book_id'
   })
   const favor = await Favor.getBookFavor(ctx.auth.uid,v.get('path.book_id'))
   ctx.body = favor
})

router.post('/add/short_comment', new Auth().m, async ctx => {
    const v = await new AddShortCommentValidator().validate(ctx, {
        id: 'book_id'
    })
    Comment.addComment(v.get('body.book_id'),v.get('body.content'))
    success()
})

router.get('/:book_id/short_comment', new Auth().m, async ctx => {
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id: 'book_id'
    })
    const book_id = v.get('path.book_id')
    const comments = await Comment.getComments(book_id)
    ctx.body = {
        comments,
        book_id
    }
})

router.get('/hot_keyword', async ctx => {
    ctx.body = {
        'hot': [
            'Python',
            '村上春树',
            '犬夜叉',
            '高桥留美子',
            '野良神'
        ]
    }
})

//爬虫 必备工具 数据处理和分析
//python 爬虫工具 request BF4 Scrapy


module.exports = router

// 图书基础数据 服务
// 数据的公用性
// 中间层 微服务
// book相关的数据库表