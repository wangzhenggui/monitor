/*
 * @Author: wangzhenggui jianjia.wzg@raycloud.com
 * @Date: 2022-11-22 13:37:10
 * @LastEditors: wangzhenggui jianjia.wzg@raycloud.com
 * @LastEditTime: 2022-11-22 15:33:09
 * @FilePath: /monitor/src/request/fetch.js
 * @Description: 
 * 
 * Copyright (c) 2022 by wangzhenggui jianjia.wzg@raycloud.com, All Rights Reserved. 
 */
import { lazySendCache } from '../report'
import { getPageInfo, formatTime, some } from '../utils/util'
import monitorConfig from '../config'
import options from '../options'

const handleFetch = () => {
    const originFetch = window.fetch
    window.fetch = (url, config) => {
        const now = Date.now()
        const reportData = {
            type: 'request',
            subType: 'fetch',
            startTime: now,
            startTimeFm: formatTime(now),
            info: {
                ...config,
                url: url?.url || url,
                method: (config?.method || 'GET').toUpperCase(),
            },
            pageSource: getPageInfo(),
        }
        return originFetch(url, config)
        .then(res => {
            reportData.endTime = Date.now()
            reportData.endTimeFm = formatTime(reportData.endTime)
            reportData.info.time = reportData.endTime - reportData.startTime
            const data = res.clone()
            reportData.info.status = data.status
            reportData.options = options
            if (!some(monitorConfig.blackUrlList, (name) => url.includes(name))) {
                lazySendCache(reportData)
                return res
            }
        })
        .catch(err => {
            reportData.endTime = Date.now()
            reportData.endTimeFm = formatTime(reportData.endTime)
            reportData.info.time = reportData.endTime - reportData.startTime
            reportData.info.status = 0
            reportData.info.success = false
            reportData.options = options
            lazySendCache(reportData)
            throw err
        })
    }
}

export default handleFetch