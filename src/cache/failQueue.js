const CACHE_FAIL_SEND_QUEUE = 'monitor_fail_send_queue'

export const saveFailQueue = (list) => {
  const queue = JSON.parse(localStorage.getItem(CACHE_FAIL_SEND_QUEUE) || '[]')
  queue.push(list);
}

export const getFailQueue = () => {
  const queue = JSON.parse(localStorage.getItem(CACHE_FAIL_SEND_QUEUE) || '[]')
  return queue
}