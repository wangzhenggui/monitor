import { setOptions } from './options';
import config, { setConfig } from './config';
import errorHandle from './error';

const Monitor = {
  init(options = {}, customizeConfig = {}) {
    setOptions(options);
    setConfig(customizeConfig);
    if (!config.open) {
      return console.warn('监控功能已关闭')
    }
    config.sendError && errorHandle()
  }
}

export default Monitor