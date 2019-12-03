const {Sequelize,Model} = require('sequelize')
const {unset, clone, isArray} = require('lodash')
const {
    dbName,
    host,
    port,
    user,
    password
} = require('../config/config').database

const sequelize = new Sequelize(dbName,user,password,{
    dialect: 'mysql',
    host: host,
    port: port,
    loading: true,
    timezone: '+08:00',
    define: {
        // create_time updatp_time delete_time
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true,//驼峰 转换成 下划线
        freezeTableName: true,
        scopes: {
            bh: {
                attributes: {
                    exclude: ['updated_at','deleted_at','created_at']
                }
            }
        }
    }
})

sequelize.sync({
    force: false // 生产环境的时候不能为true,会把原来的表的记录删除掉，重新创表 
})

Model.prototype.toJSON = function() {
    let data = clone(this.dataValues) 
    unset(data, 'updated_at')
    unset(data, 'created_at')
    unset(data, 'deleted_at')

    for(key in data) {
        if(key === 'image') {
            if(!data[key].startsWith('http')) {
                data[key] = global.config.host + data[key]
            }
        }
    }

    if(isArray(this.exclude)) {
        this.exclude.forEach(
            (value) => {
                unset(data,value)
            }
        )
    }
    return data
}

module.exports = {
    sequelize
}