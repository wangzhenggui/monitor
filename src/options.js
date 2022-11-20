const originOptions = {
  appId: '', // 应用ID
}

export default originOptions

export function setOptions(options) {
  for (const key in options) {
    if (options[key]) {
      originOptions[key] = options[key]
    }
  }
}