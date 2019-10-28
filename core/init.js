const Router = require('koa-router')
const requireDirectory = require('require-directory')


class InitManager {
    static initCore(app) {
        //入口方法
        InitManager.app = app
        InitManager.initLoadRouters()
        InitManager.loadHttpException()
    }

    static initLoadRouters() {
        // path config 使用绝对的路径
        const apiDirectory = `${process.cwd()}/app/api`

        requireDirectory(module, apiDirectory, { //全部导出api的路由
            visit: whenLoadModule
        })
        function whenLoadModule(obj) {
            if (obj instanceof Router) {
                InitManager.app.use(obj.routes())
            }
        }
    }

    static loadHttpException() {
        const errors = require("./http-exception")
        global.errs = errors
    }
}

module.exports = InitManager