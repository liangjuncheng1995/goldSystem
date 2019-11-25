const util = require('util')
const axios  = require('axios')
const { sequelize } = require('../../core/db')
const { Sequelize, Model, Op} = require('sequelize')

// const { Favor } = require('./favor')

class Book extends Model {
    constructor(id) {
        super()
        this.id = id
    }
    async detail(id) {
        const url = util.format(global.config.yushu.detailUrl, this.id)
        const detail = await axios.get(url)
        return detail.data
    }
}

Book.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    fav_nums: {
        type: Sequelize.INTEGER,
        defalt: 0,
    }
},{
    sequelize,
    tableName: 'book'
})

module.exports = {
    Book
}
