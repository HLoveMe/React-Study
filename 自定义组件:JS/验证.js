/*
 * @Author: 爱上无名氏 
 * @Date: 2018-08-10 11:11:35 
 * @Last Modified by: 猪猪
 * @Last Modified time: 2018-08-15 09:14:36
 */

/**
 * 并集为true 无任何响应 如果为false 会红屏 但不会阻止代码运行
 * @param {*} args (bool,bool,bool,desc) 
 */

if (process && process.env.NODE_ENV == "development") {
    global.RNValidate = function (...args) {
        if (process && process.env.NODE_ENV == "development") {
            desc = args.pop()
            if (!args.reduce((one, two) => { return (one && two) }, true)) {
                throw new Error(desc)
                return
            }
        }
    }

    global._console = console
    global.console = {
        ...global._console,
        log: (...args) => {
            _log = args[0]
            if (typeof _log == "boolean") {
                return global._console.log.call(this, ...args.splice(1, args.length - 1))
            } else {
            }
        }
    }
} else {
    global.RNValidate = function () { };
}