const {sequelize} = require('../../core/db')


const {Sequelize,Model} = require('sequelize')


class User extends Model {

}
User.init({ //mysql 一种类型
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true //自动增长的id编号
    },
    nickname: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    openid: {
        type: Sequelize.STRING(64),
        unique: true
    },
}, {
    sequelize,
    tableName: 'user' //数据库表的名称
})

//数据迁移 SQL 更新

 // 主键 关系型数据库
// 主键不能重复 不能为空
// 注册 User 设计用户的id的系统 自动增长的id编号 (数字类型) 不要使用随机字符串 GUID
// 并发 1000 注册 自动增长 容易猜出用户编号
// 即使别人知道用户编号， 也无法做坏事
// 接口保护 权限 访问接口 Token

//用户 小程序 openid 不变 且唯一
// 小程序 公众号 用户 unionID