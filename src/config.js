/*
 * @Author: wangzhenggui jianjia.wzg@raycloud.com
 * @Date: 2022-11-21 15:09:46
 * @LastEditors: wangzhenggui jianjia.wzg@raycloud.com
 * @LastEditTime: 2022-11-22 14:06:44
 * @FilePath: /monitor/src/config.js
 * @Description: 
 * 
 * Copyright (c) 2022 by wangzhenggui jianjia.wzg@raycloud.com, All Rights Reserved. 
 */
const config = {
    url: '', // 上报地址
    frequency: 3000, // 默认当3s钟无新日志上报时，我们进行日志上报
    open: true, // 是否开启上报功能, 有些场景和环境可能不需要上报
    sendPV: false, // 是否上报页面 PV
    sendError: true, // 是否上报 js error
    sendRequest: true, //  是否上报request请求
    sendPerf: false, // 是否上报页面性能
    startBehavior: true, // 是否开启行为上报
    blackUrlList: [], // 黑名单列表 - 针对加载资源和接口错误上报控制
    singleSendMax: 10,
}

export default config

export function setConfig(configs) {
    for (const key in configs) {
        if (Reflect.has(configs, key)) {
            config[key] = configs[key]
        }
    }
}