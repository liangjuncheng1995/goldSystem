const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

//静态资源 图片 消耗流量
// 1 网站目录
// 2 静态资源服务器 微服务 带宽要足够
// 3 云服务 OSS 贵 ECS RDS OSS, CDN
// 4 github gitpage 免费静态资源 300mb

// js css html
// vue / react 前端单页面  (seo特别差)
// nuxt ssr(动态) 服务端的模板渲染(PHP,java) (seo)
// vue 用最多 cms WebApp H5

// access_token
// refresh_token


const classicFileds = {
    image: {
        type: Sequelize.STRING,
    },
    content: Sequelize.STRING,
    pubdate: Sequelize.STRING,
    fav_nums: {
       type: Sequelize.STRING, 
       defaultValue: 0,
    },
    title: Sequelize.STRING,
    type: Sequelize.STRING
}
//电影
class Movie extends Model {

}
Movie.init(classicFileds, {
    sequelize,
    tableName: 'movie'
})
//句子
class Sentence extends Model {

}
Sentence.init(classicFileds, {
    sequelize,
    tableName: 'sentence'
})
//音乐
class Music extends Model {

}

const musicFiled = Object.assign({
    url: Sequelize.STRING
},classicFileds)

Music.init(musicFiled, {
    sequelize,
    tableName: 'music'
})

module.exports = {
    Movie,
    Sentence,
    Music
}
// class Base extends Model {

// }


// class Book extends Model {

// }


// Image
// title
// content
// fav_nums
// pubdate
// type //代号

// 定义基类

// 语言 英文 易语言
// 一些贴切的单词 变量/类 名字
// 词汇量
// 阻塞
// 一辈子不可能只写javascript