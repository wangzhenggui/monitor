import { cloneDeep } from '../utils/util';
// 存储模块
const cache = [];
export const saveRecord = (record) => {
  cache.push(record);
}

export const clearRecordPool = () => {
  cache = [];
}

export const getRecords = () => {
  return cloneDeep(cache)
}