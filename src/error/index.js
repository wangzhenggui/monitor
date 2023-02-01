/*
 * @Author: wangzhenggui jianjia.wzg@raycloud.com
 * @Date: 2022-11-21 15:09:46
 * @LastEditors: wangzhenggui jianjia.wzg@raycloud.com
 * @LastEditTime: 2022-11-22 17:01:00
 * @FilePath: /monitor/src/error/index.js
 * @Description: 
 * 
 * Copyright (c) 2022 by wangzhenggui jianjia.wzg@raycloud.com, All Rights Reserved. 
 */
import { lazySendCache } from '../report'
import { getPageInfo, formatTime, some } from '../utils/util'
import config from '../config'
import options from '../options'

const watchRunTimeError = () => {
    const originalOnError = window.onerror
  
    function errorProxy(errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
        if (originalOnError) {
            originalOnError.call(window, errorMessage, scriptURI, lineNumber, columnNumber, errorObj)
        }
  
        if (errorObj != null) {
            const now = Date.now()
            // 上报脚本错误
            lazySendCache({
                type: 'error',
                subType: 'js-runtime-error',
                startTime: now,
                startTimeFm: formatTime(now),
                info: {
                    errorMessage,
                    scriptURI,
                    lineNumber,
                    columnNumber,
                    errorObj,
                },
                pageSource: getPageInfo(),
            })
        }
    }
  
    window.onerror = function (errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
        errorProxy(errorMessage, scriptURI, lineNumber, columnNumber, errorObj)
    }
}

const watchConsoleError = () => {
    const originConsoleError = window.console.error
    window.console.error = (...args) => {
        originConsoleError.apply(this, args)
        const now = Date.now()
        lazySendCache({
            type: 'error',
            subType: 'console-error',
            startTime: now,
            startTimeFm: formatTime(now),
            info: {
                content: args,
            },
            options,
            pageSource: getPageInfo(),
        })
    }
}

const watchResourceLoadError = () => {
    window.addEventListener('error', e => {
        const target = e.target
        if (!target) return
        const now = Date.now()
        const url = target.src || target.href
        if (url && !some(config.blackUrlList, (name) => url.includes(name))) {
            lazySendCache({
                type: 'error',
                subType: 'resource-load-error',
                startTime: now,
                startTimeFm: formatTime(now),
                info: {
                    url,
                    type: target.tagName,
                    html: target.outerHTML,
                    paths: e?.path?.map(item => item.tagName)?.filter(Boolean),
                },
                pageSource: getPageInfo(),
            })
        }
    }, true)
}

const errorHandle = () => {
    // 对错误日志进行上报
    watchConsoleError()
    // 运行时错误
    watchRunTimeError()
    // 资源加载型错误
    watchResourceLoadError()
}

export default errorHandle