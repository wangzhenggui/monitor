/*
 * @Author: wangzhenggui jianjia.wzg@raycloud.com
 * @Date: 2022-11-29 11:15:28
 * @LastEditors: wangzhenggui jianjia.wzg@raycloud.com
 * @LastEditTime: 2022-11-29 11:45:18
 * @FilePath: /monitor/src/performance/watchFp.js
 * @Description: 
 * 
 * Copyright (c) 2022 by wangzhenggui jianjia.wzg@raycloud.com, All Rights Reserved. 
 */
import { isSupportPerformanceObserver, getPageInfo } from '../utils/util'
import { lazySendCache } from '../report'
const watchFp = () => {
    if (!isSupportPerformanceObserver()) return
    const entryHandler = (list) => {        
        for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
                observer.disconnect()
            }

            const json = entry.toJSON()
            delete json.duration

            const reportData = {
                info: {
                    ...json,
                },
                subType: entry.name,
                type: 'performance',
                pageURL: getPageInfo(),
            }

            lazySendCache(reportData)
        }
    }
    const observer = new PerformanceObserver(entryHandler)
    observer.observe({ type: 'paint', buffered: true })
}

export default watchFp