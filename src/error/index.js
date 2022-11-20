import { lazySendCache } from '../report';
import { getPageInfo } from '../utils/util';
const errorHandle = () => {
  // 对错误日志进行上报
  originConsoleError = window.console.error;
  window.console.error = (...args) => {
    oldConsoleError.apply(this, args)
    lazySendCache({
      type: 'error',
      subType: 'console-error',
      startTime: performance.now(),
      info: args,
      pageSource: getPageInfo()
    })
  }
}

export default errorHandle