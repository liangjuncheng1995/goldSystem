module.exports = {
    //prod
    environment: 'dev',
    database: {
        // dev
        // dbName: 'cheng',
        // host: 'localhost',
        // password: '123456',
        // online
        dbName: 'cheng2Online',
        host: '134.175.129.92',
        password: '855420',

        port: 3306,
        user: 'root',
       
    },
    security: {
        secretKey: "abcdefg",
        expiresIn: 60*60*24*30 //一小时
    },
    wx: {
        appId: 'wx96ede89c1842a507',
        appSecret: '203c40c673db47d88f9c8d3a1674b0be',
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    },
    yushu: {
        detailUrl: 'http://t.yushu.im/v2/book/id/%s',
        keywordUrl: 'http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s'
    },
    host: 'http://192.168.1.40:3000/'
}