/*
 * @Author: wangzhenggui jianjia.wzg@raycloud.com
 * @Date: 2022-11-22 13:37:10
 * @LastEditors: wangzhenggui jianjia.wzg@raycloud.com
 * @LastEditTime: 2022-11-22 15:31:05
 * @FilePath: /monitor/src/request/xhr.js
 * @Description: 
 * 
 * Copyright (c) 2022 by wangzhenggui jianjia.wzg@raycloud.com, All Rights Reserved. 
 */
import config from '../config'
import { lazySendCache } from '../report'
import { getPageInfo, formatTime, some } from '../utils/util'
import options from '../options'

const handleXhr = () => {
    const proto = window.XMLHttpRequest.prototype
    const originalOpen = proto.open
    const originalSend = proto.send
    proto.open = function open(...args) {
        this.url = args[1]
        this.method = args[0]
        originalOpen.apply(this, args)
    }
    proto.send = function send(...args) {
        this.startTime = Date.now()

        const onLoadend = () => {
            this.endTime = Date.now()

            const { status, startTime, endTime, url, method } = this
            // 剔除 SDK 发出的上报请求
            if (url.indexOf(config.url) > -1) {
                return
            }
            if (!some(config.blackUrlList, (name) => url.includes(name))) {
                lazySendCache({
                    type: 'request',
                    subType: 'xhr',
                    startTime,
                    startTimeFm: formatTime(startTime),
                    endTime,
                    endTimeFm: formatTime(endTime),
                    info: {
                        body: typeof args === 'object'
                            ? JSON.stringify(args)
                            : args,
                        url,
                        status,
                        time: endTime - startTime,
                        method: (method || 'GET').toUpperCase(),
                    },
                    options: { ...options },
                    pageSource: getPageInfo(),
                })
            }
          
            this.removeEventListener('loadend', onLoadend, true)
        }

        this.addEventListener('loadend', onLoadend, true)
        originalSend.apply(this, args)
    }
}

export default handleXhr