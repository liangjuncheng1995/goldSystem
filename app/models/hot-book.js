const { sequelize } = require('../../core/db')
const { Sequelize, Model, Op} = require('sequelize')
const { Favor } = require('./favor')

class HotBook extends Model {
    static async getAll() {
        const books = await HotBook.findAll({
            order: [
                'index'
            ]
        })
        const ids = []
        books.forEach((book) => {
            ids.push(book.id)
        })
        const favors = await Favor.findAll({
            where: {
                art_id: {
                    [Op.in]: ids,
                },
                type: 400
            },
            group: ['art_id'],
            attributes: ['art_id', [Sequelize.fn('COUNT','*'),'count']]
        })
        books.forEach(book => {
            HotBook._getEachBookStatus(book, favors)
        })
        //python 二维矩阵
        return books
        //group
        // Favor
    }

    static _getEachBookStatus(book, favors) {
        let count = 0
        favors.forEach(favor => {
            if(book.id === favor.art_id) {
                count = favor.get('count')
            } 
        })
        book.setDataValue('fav_nums',count)
        return book
    }
    // for()
    // count
}

HotBook.init({
    index: Sequelize.INTEGER, //排序
    image: Sequelize.STRING,
    author: Sequelize.STRING,
    title: Sequelize.STRING
}, {
    sequelize,
    tableName: 'hot_book'
})

module.exports = {
    HotBook
}

        //并发执行
        // 并发 并行
        // 高并发
        // python 并行 单线程 伪线程
        // javascript 单线程 宏任务 微任务 EventLoop
        // cpu密集型 资源密集型
        // 多线程 线程同步 lock
        // 同步选项 node 天生异步