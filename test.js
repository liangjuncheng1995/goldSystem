var obj = {
    age: 18,
    toJSON: function() {
        return {
            name1: 'cheng'
        }
    }
}
console.log(obj)
console.log(JSON.stringify(obj))

//机制 监听任何异常
// test1()
// async function test1(params) {
//     try{
//         await test2()
//     } catch(error) {
//         throw error
//     }
// }
// async function test2(params) {
//     try {
//         await test3()
//     } catch(error) {
//         console.log('error')
//     }
// }

// //全局异常处理
// // console.log(test3())
// async function test3(params) {
//     // try{
//     //     console.log(0/a)
//     // } catch(error) {
//     //     throw error
//     // }
//     // return 'success'
//     // await setTimeout(function () {
//     //     throw new Error('error')
//     // },1000)
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const r = Math.random()
//             console.log(r)
//             if(r < 0.5)  {
//                 reject('error')
//             }
//         },1000)
//     })
// }

// 全局异常处理
// 函数设计
// 判断处理方案 return false null
// throw new Error 编程规范
// 代码大全2

// 后端： 读写数据库 API
// 写出好的代码
// 提高开发效率
// 悲观锁 乐观锁 事务 脏读 幻读

// NodeJs Web
// API 低级 基础 不方便

// KOA Express

// 洋葱圈模型 精简 KOA 二次开发
// 定制化能力强
// Lin CMS KOA + Vue