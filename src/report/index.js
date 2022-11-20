import { isSupportSendBeacon, uuid } from '../utils/util'
import { saveRecord, getRecords, clearRecordPool } from '../cache';
import { saveFailQueue } from '../cache/failQueue';
import config from '../config';
import options from '../options';

let timer;
/**
 * 降级处理，有些浏览器不兼容sendBeacon这个API，使用XHR方式发送
 */
export const sendData = isSupportSendBeacon() ? window.navigator.sendBeacon : sendByXhr
export const send = (data = {}, immediately = false) => {
  if (!config.url) {
    return console.error('监控系统,必须拥有url属性配置')
  }
  const body = JSON.stringify({
    id: `${config.appId}_${new Date().getTime}_${uuid()}`,
    data: JSON.stringify({
      ...options,
      ...data,
    })
  })
  if (immediately) {
    return sendData(config.url, body);
  }
  if (window.requestIdleCallback) {
    // 在浏览器空闲时刻发送数据
    window.requestIdleCallback(() => {
      sendData(config.url, body)
    }, { timeout: 1000 })
  } else {
    setTimeout(() => {
      sendData(config.url, body)
    })
  }
}

export const lazySendCache = (data) => {
  saveRecord(data)
  // 防抖
  clearTimeout(timer)
  timer = setTimeout(() => {
    const data = getRecords()
    if (data.length) {
      send(data)
      clearRecordPool()
    }
  }, timeout)
}

const sendByXhr = (url, data) => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && +xhr.status !== 200) {
      saveFailQueue(data);
    }
  };
  xhr.withCredentials = true;
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.send(data);
}

export default report;