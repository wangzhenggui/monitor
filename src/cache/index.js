/*
 * @Author: wangzhenggui jianjia.wzg@raycloud.com
 * @Date: 2022-11-21 15:09:46
 * @LastEditors: wangzhenggui jianjia.wzg@raycloud.com
 * @LastEditTime: 2022-11-21 16:40:39
 * @FilePath: /monitor/src/cache/index.js
 * @Description: 
 * 
 * Copyright (c) 2022 by wangzhenggui jianjia.wzg@raycloud.com, All Rights Reserved. 
 */
import { cloneDeep } from '../utils/util'
// 存储模块
let cache = []
export const saveRecord = (record) => {
    cache.push(record)
}

export const clearRecordPool = () => {
    cache = []
}

export const getRecords = () => cloneDeep(cache)