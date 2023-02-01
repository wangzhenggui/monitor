/*
 * @Author: wangzhenggui jianjia.wzg@raycloud.com
 * @Date: 2022-11-21 15:09:46
 * @LastEditors: wangzhenggui jianjia.wzg@raycloud.com
 * @LastEditTime: 2022-11-28 09:53:28
 * @FilePath: /monitor/src/report/index.js
 * @Description: 
 * 
 * Copyright (c) 2022 by wangzhenggui jianjia.wzg@raycloud.com, All Rights Reserved. 
 */
import { isSupportSendBeacon, getUUid, chunk } from '../utils/util'
import { saveRecord, getRecords, clearRecordPool } from '../cache'
import { saveFailQueue } from '../cache/failQueue'
import config from '../config'
import options from '../options'

let timer
/**
 * 降级处理，有些浏览器不兼容sendBeacon这个API，使用XHR方式发送
 */
export const sendData = isSupportSendBeacon() ? window.navigator.sendBeacon.bind(window.navigator) : sendByXhr
const sendDataWrap = (id, list) => {
    list.map(i => {
        sendData(config.url, JSON.stringify({
            id,
            data: i,
        }))
        return null
    })
}
export const send = (data = [], immediately = false) => {
    if (!config.url) {
        return console.error('监控系统,必须拥有url属性配置')
    }
    const id = `${options.appId}_${new Date().getTime()}_${getUUid()}`
    const chunkData = chunk(data, config.singleSendMax || 10)
    if (immediately) {
        sendDataWrap(id, chunkData)
        return
    }
    if (window.requestIdleCallback) {
    // 在浏览器空闲时刻发送数据
        window.requestIdleCallback(() => {
            sendDataWrap(id, chunkData)
        }, { timeout: 1000 })
    } else {
        setTimeout(() => {
            sendDataWrap(id, chunkData)
        })
    }
}

export const lazySendCache = (data) => {
    saveRecord(data)
    // 防抖
    clearTimeout(timer)
    timer = setTimeout(() => {
        const data = getRecords()
        if (data.length) {
            send(data)
            clearRecordPool()
        }
    }, config.frequency)
}

const sendByXhr = (url, data) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && +xhr.status !== 200) {
            saveFailQueue(data)
        }
    }
    xhr.withCredentials = true
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhr.send(data)
}
