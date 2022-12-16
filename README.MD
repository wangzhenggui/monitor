<!-- 监控SDK主要分为3个模块
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
    - 当有采集信息录入的时候，使用防抖函数进行处理，当超过设置频次时间之外，我们触发我们的日志上报 -->

<!-- ### 项目测试
```
  yarn run build
  http-server -p 1234
  cd server && node index.js
``` -->
### usage
```
  yarn add kmkf-monitor
  或者 通过cdn 方式引入  https://unpkg.com/kmkf-monitor/dist/umd/kmkf-monitor.min.js

  import Monitor from 'kmkf-monitor';

  Monitor.init(
  {
    appId: '', // 应用ID
    appName: '', // 应用名称
  },
  {
    url: '', // 上报地址
    frequency: 3000, // 默认当3s钟无新日志上报时，我们进行日志上报
    open: true, // 是否开启上报功能, 有些场景和环境可能不需要上报
    sendError: true, // 是否上报 js error
    sendRequest: true, //  是否上报request请求
    sendPerf: false, // 是否上报页面性能
    blackUrlList: [], // 黑名单列表 - 针对加载资源和接口错误上报控制
  }
);
```

### options
options为当前上报日志时的一些常用信息，appId/appName为固定字段; 该字段可以根据
Monitor.setOptions({
  buyerNick: '买家昵称',
  buyerOpenUid: '买家🆔',
  shopId: '店铺ID'
})
来设置一些我们当前环境信息；一旦设置之后，所有上报的日志都会添加上这些信息

### config
config为日志上报功能配置项
- url 上报地址
- frequency 上报频率
- open 是否开启上报功能 有些在测试环境下可能不需要开启上报功能
- sendError 上报错误 包括js允许时异常、资源加载异常、console.error 这些都会上报
- sendRequest 上报请求错误异常
- sendPerf 开启性能检测
- blackUrlList 上报黑名单 针对一些内嵌的方式接入，会上报很多其他网站的日志信息到ES中，这里加个上报黑名单；上报黑名单只会针对资源加载和接口调用有效；一般配置域名既可以 例如：['im.kwaixiaodian.com'] 不希望快手的接口上报

### API
- setOptions({})
  - 配置options

- automaticReport({})
 - 手动上报日志
