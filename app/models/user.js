const bcrypt = require('bcryptjs')
const {sequelize} = require('../../core/db')



const {Sequelize,Model} = require('sequelize')

// defind
class User extends Model {
    static async verifyEmailPassword(email, plainPassword) {
        const user = await User.findOne({
            where: {
                email
            }
        })
        if(!user) {
            throw new global.errs.AuthFailed('账号不存在')
        }
        // user.password === plainPassword
        const correct = bcrypt.compareSync(plainPassword,user.password)
        if(!correct) {
            throw new global.errs.AuthFailed('密码不正确')
        }
        return user
    }

    static async getUserByOpenid(openid) {
        const user = await User.findOne({
            where: {
                openid
            }
        })
        return user
    }

    static async registerByOpenid(openid) {
        return await User.create({
            openid
        })
    }
}
User.init({ //mysql 一种类型
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true //自动增长的id编号
    },
    nickname: Sequelize.STRING,
    email: {
        type: Sequelize.STRING(128),
        unique: true
    },
    password: {
        //扩展 设计模式 观察者模式
        // ES6 Reflect Vue 3.0
        type: Sequelize.STRING,
        set(val) {
            const salt = bcrypt.genSaltSync(10) // 10 成本
            const psw = bcrypt.hashSync(val,salt)
            this.setDataValue("password",psw)
        }
    },
    openid: {
        type: Sequelize.STRING(64),
        unique: true
    },
}, {
    sequelize,
    tableName: 'user' //数据库表的名称
})

module.exports = {
    User
}

//数据迁移 SQL 更新

 // 主键 关系型数据库
// 主键不能重复 不能为空
// 注册 User 设计用户的id的系统 自动增长的id编号 (数字类型) 不要使用随机字符串 GUID
// 并发 1000 注册 自动增长 容易猜出用户编号
// 即使别人知道用户编号， 也无法做坏事
// 接口保护 权限 访问接口 Token

//用户 小程序 openid 不变 且唯一
// 小程序 公众号 用户 unionID