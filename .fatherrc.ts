/*
 * @Author: wangzhenggui jianjia.wzg@raycloud.com
 * @Date: 2022-11-21 15:29:40
 * @LastEditors: wangzhenggui jianjia.wzg@raycloud.com
 * @LastEditTime: 2022-11-21 15:49:49
 * @FilePath: /monitor/.fatherrc.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by wangzhenggui jianjia.wzg@raycloud.com, All Rights Reserved. 
 */
export default {
  // more father 4 config: https://github.com/umijs/father-next/blob/master/docs/config.md
  esm: { output: 'dist/esm' },
  umd: {
    output: 'dist/umd',
    name: 'Monitor',
  },
};
