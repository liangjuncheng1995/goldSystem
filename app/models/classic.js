const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

const classicFileds = {
    image: Sequelize.STRING,
    content: Sequelize.STRING,
    pubdate: Sequelize.STRING,
    fav_nums: Sequelize.STRING,
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