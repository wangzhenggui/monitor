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
import { getPageInfo, formatTime } from '../utils/util'

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

            lazySendCache({
                type: 'request',
                subType: 'xhr',
                startTime,
                startTimeFm: formatTime(startTime),
                endTime,
                endTimeFm: formatTime(endTime),
                info: {
                    url,
                    status,
                    time: endTime - startTime,
                    method: (method || 'GET').toUpperCase(),
                },
                pageSource: getPageInfo(),
            })
          
            this.removeEventListener('loadend', onLoadend, true)
        }

        this.addEventListener('loadend', onLoadend, true)
        originalSend.apply(this, args)
    }
}

export default handleXhr