import { formatTime, getPageInfo } from '../utils/util'
import { lazySendCache } from '../report'
import options from '../options'
export default function onclick() {
    ['mousedown', 'touchstart'].forEach(eventType => {
        window.addEventListener(eventType, event => {
            const target = event.target
            if (Reflect.has(target?.dataset, 'spmClick')) {
                lazySendCache({
                    type: 'behavior',
                    subType: 'click',
                    startTime: event.timeStamp,
                    startTimeFm: formatTime(event.timeStamp),
                    info: {
                        target: target.tagName,
                        paths: event.path?.map(item => item.tagName).filter(Boolean),
                        dataset: target?.dataset,
                    },
                    options,
                    pageSource: getPageInfo(),
                })
            }
        })
    })
}