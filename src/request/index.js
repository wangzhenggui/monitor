/*
 * @Author: wangzhenggui jianjia.wzg@raycloud.com
 * @Date: 2022-11-22 13:53:10
 * @LastEditors: wangzhenggui jianjia.wzg@raycloud.com
 * @LastEditTime: 2022-11-22 14:30:17
 * @FilePath: /monitor/src/request/index.js
 * @Description: 
 * 
 * Copyright (c) 2022 by wangzhenggui jianjia.wzg@raycloud.com, All Rights Reserved. 
 */
import handleXhr from './xhr'
import handleFetch from './fetch'
const requestHandle = () => {
    // XHR 请求上报
    window.XMLHttpRequest && handleXhr()
    window.fetch && handleFetch()
}

export default requestHandle