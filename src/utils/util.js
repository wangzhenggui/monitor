/*
 * @Author: wangzhenggui jianjia.wzg@raycloud.com
 * @Date: 2022-11-21 15:09:46
 * @LastEditors: wangzhenggui jianjia.wzg@raycloud.com
 * @LastEditTime: 2022-11-29 11:16:24
 * @FilePath: /monitor/src/utils/util.js
 * @Description: 
 * 
 * Copyright (c) 2022 by wangzhenggui jianjia.wzg@raycloud.com, All Rights Reserved. 
 */
import { getFailQueue, resetFailQueue } from '../cache/failQueue'
import { sendDataFn, send } from '../report'
import { getRecords, clearRecordPool } from '../cache/index'
import config from '../config'

export const cloneDeep = (origin) => {
    if (typeof origin === 'object') {
        const result = Array.isArray(origin) ? [] : {}
        for (const key in origin) {
            if (typeof origin[key] == 'object') {
                result[key] = cloneDeep(origin[key])
            } else {
                result[key] = origin[key]
            }
        }

        return result
    }

    return origin
}

export const some = (list, fn) => list.reduce((cur, nxt) => cur || fn(nxt), false)

export const getUUid = (len = 16, radix = 10) => {
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
    let uuid = [], i
    radix = radix || chars.length

    if (len) {
    // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
    } else {
    // rfc4122, version 4 form
        let r

        // rfc4122 requires these characters
        uuid[8] = '-'
        uuid[13] = '-'
        uuid[18] = '-'
        uuid[23] = '-'
        uuid[14] = '4'

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r]
            }
        }
    }

    return uuid.join('')
}

export const isSupportSendBeacon = () => !!window.navigator?.sendBeacon
export const getPageInfo = () => decodeURIComponent(window.location.href)

export const formatTime = (time) => {
    let today = time ? new Date(time) : new Date()
    // 日期
    let DD = String(today.getDate()).padStart(2, '0') // 获取日
    let MM = String(today.getMonth() + 1).padStart(2, '0') // 获取月份，1 月为 0
    let yyyy = today.getFullYear() // 获取年

    // 时间
    const hh = String(today.getHours()).padStart(2, '0') // 获取当前小时数(0-23)
    const mm = String(today.getMinutes()).padStart(2, '0') // 获取当前分钟数(0-59)
    const ss = String(today.getSeconds()).padStart(2, '0') // 获取当前秒数(0-59)
    today = yyyy + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss
    return today
}

// 上报 上报错误的日志信息
export const failRecordSend = () => {
    const queue = getFailQueue()
    if (queue?.length === 0) return undefined
    const sendData = sendDataFn()
    queue.splice(0, 6).map(item => sendData(config.url, item))
    resetFailQueue(queue)
}

export const listenPageHide = () => {
    window.addEventListener('beforeunload', () => {
        const data = getRecords()
        if (data.length) {
            send(data, true)
            clearRecordPool()
        }
    })
}

export function listenPageLoad(callback) {
    if (document.readyState === 'complete') {
        callback()
    } else {
        const onLoad = () => {
            callback()
            window.removeEventListener('load', onLoad, true)
        }

        window.addEventListener('load', onLoad, true)
    }
}

export function listenPageStart(callback) {
    window.addEventListener('pageshow', event => {
        if (event.persisted) {
            callback(event)
        }
    }, true)
}

export const isSupportPerformanceObserver = () => !!window.PerformanceObserver

export const chunk = (list = [], number) => {
    let finalList = []
    if (number === 0) return finalList
    for (let i = 0; i < Math.ceil(list?.length / number); i++) {
        finalList.push(list.slice(i * number, (i + 1) * number))
    }
    return finalList
}