const util = require('util')
const axios = require('axios')
const {User} = require('../models/user')
const {generateToken} = require('../../core/util')
const {Auth} = require('../../middlewares/auth')
class WXManager {
    static async codeToToken(code) {
        // code 小程序生成 
        // openid 唯一标识 依靠微信鉴定

        // code 
        // appid appsecret
        // url

        const url = util.format(global.config.wx.loginUrl,
            global.config.wx.appId,
            global.config.wx.appSecret,code)

        const result = await axios.get(url)
        if(result.status !== 200) {
            throw new global.errs.AuthFailed('openId获取失败')
        } 
        const errCode = result.data.errcode
        const errmsg = result.data.errmsg
       
        if(errCode) {
            throw new global.errs.AuthFailed('openId获取失败:' + result)
        }
        // openid
        // 档案 user uid openid 长
        // openid 考虑有没有
        let user = await User.getUserByOpenid(result.data.openid)
        if(!user) {
            user = await User.registerByOpenid(result.data.openid) // 写入数据库
        }
        return generateToken(user.id, Auth.USER)

    }
}

module.exports = {
    WXManager
}