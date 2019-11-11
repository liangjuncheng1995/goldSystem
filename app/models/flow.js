const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class Flow extends Model {

}

Flow.init({
    index: Sequelize.INTEGER,//期数
    art_id: Sequelize.INTEGER,//实体的id号
    type: Sequelize.INTEGER
    
}, {
    sequelize,
    tableName: 'flow'
})

module.exports = {
    Flow
}


//数据库的表之间需要关联
    //外键 100movie 200 music 300sentence