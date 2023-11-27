/*
 * @Author: wangzhenggui jianjia.wzg@raycloud.com
 * @Date: 2022-11-29 11:15:28
 * @LastEditors: wangzhenggui jianjia.wzg@raycloud.com
 * @LastEditTime: 2022-11-29 13:33:56
 * @FilePath: /monitor/src/performance/watchLcp.js
 * @Description: 
 * 
 * Copyright (c) 2022 by wangzhenggui jianjia.wzg@raycloud.com, All Rights Reserved. 
 */
import { isSupportPerformanceObserver, getPageInfo } from '../utils/util'
import { lazySendCache } from '../report'
const watchLcp = () => {
    if (!isSupportPerformanceObserver()) return
    const entryHandler = (list) => {
        if (observer) {
            observer.disconnect()
        }
        for (const entry of list.getEntries()) {
            const reportData = {
                lcpInfo: {
                    duration: entry.startTime,
                },
                subType: 'largest-contentful-paint',
                type: 'performance',
                pageURL: getPageInfo(),
            }

            lazySendCache(reportData)
        }
    }
    const observer = new PerformanceObserver(entryHandler)
    observer.observe({ type: 'largest-contentful-paint', buffered: true })
}

export default watchLcp