/*
 * @Author: wangzhenggui jianjia.wzg@raycloud.com
 * @Date: 2022-11-21 15:09:46
 * @LastEditors: wangzhenggui jianjia.wzg@raycloud.com
 * @LastEditTime: 2022-11-22 13:53:20
 * @FilePath: /monitor/src/index.js
 * @Description: 
 * 
 * Copyright (c) 2022 by wangzhenggui jianjia.wzg@raycloud.com, All Rights Reserved. 
 */
import { setOptions } from './options'
import config, { setConfig } from './config'
import errorHandle from './error'
import requestHandle from './request'
const Monitor = {
    init(options = {}, customizeConfig = {}) {
        setOptions(options)
        setConfig(customizeConfig)
        if (!config.open) {
            return console.warn('监控功能已关闭')
        }
        config.sendError && errorHandle()
        config.sendRequest && requestHandle()
    },
}

export default Monitor