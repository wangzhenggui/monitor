/*
 * @Author: wangzhenggui jianjia.wzg@raycloud.com
 * @Date: 2022-11-21 15:09:46
 * @LastEditors: wangzhenggui jianjia.wzg@raycloud.com
 * @LastEditTime: 2022-11-29 10:30:48
 * @FilePath: /monitor/src/index.js
 * @Description: 
 * 
 * Copyright (c) 2022 by wangzhenggui jianjia.wzg@raycloud.com, All Rights Reserved. 
 */
import { setOptions } from './options'
import config, { setConfig } from './config'
import { lazySendCache } from './report'
import errorHandle from './error'
import requestHandle from './request'
import performanceHandle from './performance'
import { formatTime, getPageInfo, failRecordSend, listenPageHide } from './utils/util'

const Monitor = {
    init(options = {}, customizeConfig = {}) {
        failRecordSend()
        setOptions(options)
        setConfig(customizeConfig)
        if (!config.open) {
            return console.warn('监控功能已关闭')
        }
        config.sendError && errorHandle()
        config.sendRequest && requestHandle()
        config.sendPerf && performanceHandle()
        listenPageHide()
    },
    setOptions,
    automaticReport(params = {}) {
        const now = Date.now()
        lazySendCache({
            type: 'log',
            subType: 'custom',
            startTime: now,
            startTimeFm: formatTime(now),
            info: {
                ...params,
            },
            pageSource: getPageInfo(),
        })
    },
}

export default Monitor