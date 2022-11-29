/*
 * @Author: wangzhenggui jianjia.wzg@raycloud.com
 * @Date: 2022-11-21 15:09:46
 * @LastEditors: wangzhenggui jianjia.wzg@raycloud.com
 * @LastEditTime: 2022-11-29 09:54:13
 * @FilePath: /monitor/src/cache/failQueue.js
 * @Description: 
 * 
 * Copyright (c) 2022 by wangzhenggui jianjia.wzg@raycloud.com, All Rights Reserved. 
 */
const CACHE_FAIL_SEND_QUEUE = 'monitor_fail_send_queue'

export const saveFailQueue = (list) => {
    const queue = JSON.parse(localStorage.getItem(CACHE_FAIL_SEND_QUEUE) || '[]')
    queue.push(list)
}

export const resetFailQueue = (list = []) => {
    localStorage.setItem(CACHE_FAIL_SEND_QUEUE, JSON.stringify(list))
}

export const getFailQueue = () => {
    const queue = JSON.parse(localStorage.getItem(CACHE_FAIL_SEND_QUEUE) || '[]')
    return queue
}

export const clearFailQueue = () => {
    localStorage.setItem(CACHE_FAIL_SEND_QUEUE, '[]')
}