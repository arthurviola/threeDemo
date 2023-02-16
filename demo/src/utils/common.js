// 防抖
export const debounce = (fn, time) => {
    let timeout = null

    return (...args) => {
        timeout && clearTimeout(timeout)
        timeout = setTimeout(() => {
            fn(...args)
        }, time)
    }
}

// 节流
export const throttle = (fn, time) => {
    let timeout = null

    return (...args) => {
        if (!timeout) {
            fn(...args)
            timeout = setTimeout(() => {
                timeout = null
            }, time)
        }
    }
}
