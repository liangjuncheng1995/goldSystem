const { sequelize } = require('../../core/db')
const { Sequelize, Model,Op } = require('sequelize')
const {Art} = require('./art')

class Favor extends Model {
    //业务表
    static async like(art_id, type, uid) {
        // 1. 添加记录
        // 2. classic fav_nums
        // 数据库事务

        // 数据一致性
        // ACID 原子性 一致性 隔离性 持久性
        const favor = await Favor.findOne({
            where: {
                art_id,
                type,
                uid
            }
        })
        if(favor) {
            throw new global.errs.LikeError()
        }
        return sequelize.transaction(async t => {
            await Favor.create({
                art_id,
                type,
                uid
            },{transaction: t})
            const art = await Art.getData(art_id,type,false)
            await art.increment('fav_nums', {by: 1,transaction: t})
        })
    } 
    static async dislike(art_id, type, uid) {
        const favor = await Favor.findOne({
            where: {
                art_id,
                type,
                uid
            }
        })
        if(!favor) {
            throw new global.errs.dislikeError()
        }
        // Favor 表 favor 表里的记录
        return sequelize.transaction(async t => {
            await favor.destroy({
                force: true,//false软删除,true物理删除
                transaction: t
            })
            const art = await Art.getData(art_id,type,false)
            await art.decrement('fav_nums', {by: 1,transaction: t})
        })
    }

    static async userLikeIt(art_id, type, uid) {
        const favor = await Favor.findOne({
            where: {
                uid,
                art_id,
                type
            }
        })
        return favor ? true : false
    }

    static async getMyClassicFavors(uid) {
        // es5 对象的key 都是字符串
        // es6 Symbol
        // a = 100
        // [a]: 1, a 是表达式
        // a: 100
        const arts = await Favor.findAll({
            where: {
                uid,
                type: {
                    [Op.not]: 400
                }
            }
        })
        if(!arts) {
            throw new global.errs.NotFound()
        }
        // 循环查询数据库是 危险的内容
        // 不可控
        // [ids]
        return await Art.getList(arts)
    }

    static async getBookFavor(uid,bookID) {
        const favorNums = await Favor.count({
            where: {
                art_id: bookID,
                type: 400
            }
        })
        const myFavor = await Favor.findOne({
            where: {
                art_id: bookID,
                uid,
                type: 400
            }
        })
        return {
            fav_nums: favorNums,
            like_status: myFavor?1:0
        }
    }

}
Favor.init({
    uid: Sequelize.INTEGER,//uid
    art_id: Sequelize.INTEGER,//实体的id号
    type: Sequelize.INTEGER,
}, {
    sequelize,
    tableName: 'favor'
})

module.exports = {
    Favor
}