const util = require('util')
const axios  = require('axios')
const { sequelize } = require('../../core/db')
const { Sequelize, Model, Op} = require('sequelize')

const { Favor } = require('./favor')

class Book extends Model {
    // constructor(id) {
    //     super()
    //     this.id = id
    // }
    async detail(id) {
        const url = util.format(global.config.yushu.detailUrl, id)
        const detail = await axios.get(url)
        return detail.data
    }

    static async getMyFavorBookCount(uid) {
        const count = await Favor.count({
            where: {
                type: 400,
                uid: uid
            }
        })
        return count
    }

    static async searchFromYuShu(q,start,count,summary=1) {
        const url = util.format(global.config.yushu.keywordUrl, encodeURI(q), count, start, summary)
        console.log(url)
        const result = await axios.get(url)
        return result.data
    }
}

Book.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    fav_nums: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    }
},{
    sequelize,
    tableName: 'book'
})

module.exports = {
    Book
}
