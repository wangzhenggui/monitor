export const cloneDeep = (origin) => {
  if (typeof origin === 'object') {
    const result = Array.isArray(origin) ? [] : {}
    for (const key in origin) {
      if (typeof origin[key] == 'object') {
        result[key] = deepCopy(origin[key])
      } else {
        result[key] = origin[key]
      }
    }

    return result
  }

  return origin
}

export const getUUid = (len = 16, radix = 10) => {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [], i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('');
}

export const isSupportSendBeacon = () => !!window.navigator?.sendBeacon
export const getPageInfo = () => window.location.href