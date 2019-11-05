module.exports = {
    //prod
    environment: 'dev',
    database: {
        dbName: 'cheng',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '855420',
    },
    security: {
        secretKey: "abcdefg",
        expiresIn: 60*60*24*30 //一小时
    },
    wx: {
        appId: 'wx96ede89c1842a507',
        appSecret: '203c40c673db47d88f9c8d3a1674b0be',
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    }
}