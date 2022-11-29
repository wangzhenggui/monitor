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
import watchFp from './watchFp'
import watchTiming from './watchTiming'
import watchLcp from './watchLcp'

const performanceHandle = () => {
    watchTiming()
    watchFp()
    watchLcp()
}

export default performanceHandle