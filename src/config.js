const config = {
  url: '', // 上报地址
  frequency: 3000, // 默认当3s钟无新日志上报时，我们进行日志上报
  open: false, // 是否开启上报功能, 有些场景和环境可能不需要上报
  sendPV: false, // 是否上报页面 PV
  sendError: true, // 是否上报 js error
  sendPerf: false, // 是否上报页面性能
}

export default config

export function setConfig(configs) {
  for (const key in configs) {
    if (configs[key]) {
      config[key] = configs[key]
    }
  }
}