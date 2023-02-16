import * as THREE from 'three'

// 节流
const throttle = (fn, time) => {
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

export default class EventUtil {
    // 构造函数
    constructor (element, camera) {
        this.event = {
            click: [],
            mouseover: []
        }
        this.element = element
        this.camera = camera
        this.mouseInfo = { x: null, y: null }
        this.raycaster = new THREE.Raycaster()
        this.checkList = []

        const handleMouseDown = (e) => {
            if (e.button.toString() !== '0') return false
            this.mouseInfo.x = e.clientX
            this.mouseInfo.y = e.clientY
        }

        const handleMouseUp = (e) => {
            if (e.button.toString() !== '0') return false

            const x = e.clientX
            const y = e.clientY
            const distance = Math.pow(x - this.mouseInfo.x, 2) + Math.pow(y - this.mouseInfo.y, 2)

            if (distance <= 25) {
                const point = {
                    x: (x / this.element.offsetWidth) * 2 - 1,
                    y: -(y / this.element.offsetHeight) * 2 + 1
                }

                this.raycaster.setFromCamera(point, this.camera)
                const intersects = this.raycaster.intersectObjects(this.checkList, true)

                if (intersects.length > 0) {
                    this.event.click.forEach(act => {
                        act(e, intersects)
                    })
                }
            }
        }

        const handleMouseOver = (e) => {
            const x = e.clientX
            const y = e.clientY
            const point = {
                x: (x / this.element.offsetWidth) * 2 - 1,
                y: -(y / this.element.offsetHeight) * 2 + 1
            }

            this.raycaster.setFromCamera(point, this.camera)
            const intersects = this.raycaster.intersectObjects(this.checkList, true)

            this.event.mouseover.forEach(act => {
                act(e, intersects)
            })
        }

        this.handleMouseDown = handleMouseDown.bind(this)
        this.handleMouseUp = handleMouseUp.bind(this)
        this.handleMouseOver = throttle(handleMouseOver.bind(this), 50)

        this.element.addEventListener('mousedown', this.handleMouseDown, false)
        this.element.addEventListener('mouseup', this.handleMouseUp, false)
        this.element.addEventListener('mousemove', this.handleMouseOver, false)
    }

    // 设置射线穿透检测模型列表
    setCheckList (list) {
        this.checkList = list
    }

    // 绑定事件
    bind (eventType, callback) {
        this.event[eventType].push(callback)
    }

    // 解绑事件
    unbind (eventType, callback) {
        const index = this.event[eventType].indexOf(callback)
        if (index > -1) {
            this.event[eventType].splice(index, 1)
        }
    }
}
