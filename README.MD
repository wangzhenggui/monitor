<!--
 * @Author: wangzhenggui jianjia.wzg@raycloud.com
 * @Date: 2022-11-21 15:09:46
 * @LastEditors: wangzhenggui jianjia.wzg@raycloud.com
 * @LastEditTime: 2022-11-22 15:46:33
 * @FilePath: /monitor/README.MD
 * @Description: 
 * 
 * Copyright (c) 2022 by wangzhenggui jianjia.wzg@raycloud.com, All Rights Reserved. 
-->
监控SDK主要分为3个模块
- 采集
- 存储
  - 内存
  - 缓存
- 上报
  - 上报方式
    - xhr
    - fetch
    - sendBeacon
  - 上报时机
    - 当有采集信息录入的时候，使用防抖函数进行处理，当超过设置频次时间之外，我们触发我们的日志上报

### 项目测试
```
  yarn run build
  http-server -p 1234
  cd server && node index.js
```