const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class Favor extends Model {
    //业务表

}
Favor.init({
    uid: Sequelize.INTEGER,//uid
    art_id: Sequelize.INTEGER,//实体的id号
    type: Sequelize.INTEGER,
})

module.exports = {
    Favor
}