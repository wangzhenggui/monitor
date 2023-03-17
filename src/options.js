/*
 * @Author: wangzhenggui jianjia.wzg@raycloud.com
 * @Date: 2022-11-21 15:09:46
 * @LastEditors: wangzhenggui jianjia.wzg@raycloud.com
 * @LastEditTime: 2022-11-22 15:31:36
 * @FilePath: /monitor/src/options.js
 * @Description: 
 * 
 * Copyright (c) 2022 by wangzhenggui jianjia.wzg@raycloud.com, All Rights Reserved. 
 */
const originOptions = {
    appId: '', // 应用ID
    appName: '', // 应用名称
}

export default originOptions

export function setOptions(options) {
    for (const key in options) {
        if (Reflect.has(options, key)) {
            originOptions[key] = options[key]
        }
    }
}