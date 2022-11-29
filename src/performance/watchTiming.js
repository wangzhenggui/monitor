/*
 * @Author: wangzhenggui jianjia.wzg@raycloud.com
 * @Date: 2022-11-29 10:07:22
 * @LastEditors: wangzhenggui jianjia.wzg@raycloud.com
 * @LastEditTime: 2022-11-29 11:16:28
 * @FilePath: /monitor/src/performance/watchTiming.js
 * @Description: 
 * 
 * Copyright (c) 2022 by wangzhenggui jianjia.wzg@raycloud.com, All Rights Reserved. 
 */
import { listenPageLoad, isSupportPerformanceObserver } from '../utils/util'
import { lazySendCache } from '../report'

// 监控PerformanceNavigation 指标
const watchTiming = () => {
    listenPageLoad(() => {
        observeEvent('resource')
        observeEvent('navigation')
    })
}
let hasAlreadyCollected = false
const observeEvent = (entryType) => {
    const entryHandler = (list) => {
        for (const entry of list.getEntries()) {
            // 对于navigation 类型的监听，只要上报一次既可以
            if (entryType === 'navigation') {
                if (hasAlreadyCollected) return

                if (observer) {
                    observer.disconnect()
                }

                hasAlreadyCollected = true
            }
            // nextHopProtocol 属性为空，说明资源解析错误或者跨域
            // beacon 用于上报数据，所以不统计。xhr fetch 单独统计
            if ((!entry.nextHopProtocol && entryType !== 'navigation') || filter(entry.initiatorType)) {
                return
            }
            lazySendCache({
                type: 'performance',
                subType: entryType,
                startTime: Date.now(),
                info: {
                    name: entry.name, // 资源名称
                    sourceType: entry.initiatorType, // 资源类型
                    duration: entry.duration, // 资源加载耗时
                    dns: entry.domainLookupEnd - entry.domainLookupStart, // DNS 耗时
                    tcp: entry.connectEnd - entry.connectStart, // 建立 tcp 连接耗时
                    redirect: entry.redirectEnd - entry.redirectStart, // 重定向耗时
                    ttfb: entry.responseStart, // 首字节时间
                    protocol: entry.nextHopProtocol, // 请求协议
                    responseBodySize: entry.encodedBodySize, // 响应内容大小
                    responseHeaderSize: entry.transferSize - entry.encodedBodySize, // 响应头部大小
                    resourceSize: entry.decodedBodySize, // 资源解压后的大小
                    isCache: isCache(entry), // 是否命中缓存
                },
            })
        }
    }
    let observer
    if (isSupportPerformanceObserver()) {
        observer = new PerformanceObserver(entryHandler)
        observer.observe({ type: entryType, buffered: true })
    } else {
        const data = window.performance.getEntriesByType(entryType)
        entryHandler(data)
    }
}

// 不统计以下类型的资源
const preventType = ['fetch', 'xmlhttprequest', 'beacon']
const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
if (isSafari) {
    // safari 会把接口请求当成 other
    preventType.push('other')
}

function filter(type) {
    return preventType.includes(type)
}

function isCache(entry) {
    // 直接从缓存读取或 304
    return entry.transferSize === 0 || (entry.transferSize !== 0 && entry.encodedBodySize === 0)
}
export default watchTiming