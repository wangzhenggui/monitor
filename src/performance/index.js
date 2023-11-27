/*
 * @Author: wangzhenggui jianjia.wzg@raycloud.com
 * @Date: 2022-11-22 13:53:10
 * @LastEditors: wangzhenggui jianjia.wzg@raycloud.com
 * @LastEditTime: 2022-11-29 11:47:03
 * @FilePath: /monitor/src/performance/index.js
 * @Description: 
 * 
 * Copyright (c) 2022 by wangzhenggui jianjia.wzg@raycloud.com, All Rights Reserved. 
 */
// import watchFp from './watchFp'
// import watchTiming from './watchTiming'
// import watchLcp from './watchLcp'
import { onCLS, onFCP, onFID, onINP, onLCP, onTTFB } from 'web-vitals'
import { getPageInfo } from '../utils/util'
import { lazySendCache } from '../report'

const sendPerformance = ({ id, name, delta, rating }) => {
    const reportData = {
        performanceInfo: {
            id, name, delta, rating,
        },
        subType: name,
        type: 'performance',
        pageURL: getPageInfo(),
    }
    lazySendCache(reportData)
}

const performanceHandle = () => {
    onCLS(sendPerformance)
    onFCP(sendPerformance)
    onFID(sendPerformance)
    onINP(sendPerformance)
    onLCP(sendPerformance)
    onTTFB(sendPerformance)
    // watchTiming()
    // watchFp()
    // watchLcp()
}

export default performanceHandle