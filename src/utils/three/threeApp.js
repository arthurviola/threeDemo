/* eslint-disable */
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'

export default class ThreeApp {
    // 构造函数
    constructor (element) {
        this.THREE = THREE
        this.element = element
        this.width = this.element.offsetWidth
        this.height = this.element.offsetHeight
        this.renderer = null
        this.scene = null
        this.camera = null
        this.spotLight = null
        this.spotLightSp = null
        this.ambientLight = null
        this.orbitControls = null
        this.raf = null
        this.animateFnPool = {}
        this.needsUpdate = false

        this.initApp()
        this.animate()

        window.addEventListener('resize', () => {
            this.handleResize()
        })
    }

    // 初始化应用（创建渲染器、场景、相机、灯光）
    initApp () {
        // 渲染器
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            // logarithmicDepthBuffer: true
        })
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(this.width, this.height)
        this.element.appendChild(this.renderer.domElement)
        this.renderer.setViewport(0, 0, this.width, this.height)
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
        this.renderer.sortObjects = true

        // 场景
        this.scene = new THREE.Scene()
        // this.scene.background = new THREE.Color(0x003474)

        // 相机
        this.camera = new THREE.PerspectiveCamera(40, this.width / this.height, 1, 1000)
        this.camera.position.set(0,0,0)
        this.camera.rotation.set(0,0,0)

        // // 聚光灯，产生阴影
        // this.spotLight = new THREE.SpotLight(0xffffff, 0.8, 200, Math.PI / 6, 0, 1)
        // this.spotLight.castShadow = true
        // // 下面两行影响阴影质量
        // this.spotLight.shadow.mapSize.width = 512 * 4
        // this.spotLight.shadow.mapSize.height = 512 * 4
        // this.spotLight.position.set(500, 500, 500)
        // this.scene.add(this.spotLight)
        //
        // // 聚光灯，不产生阴影
        // this.spotLightSp = new THREE.SpotLight(0xffffff, 0, 200, Math.PI / 6, 0, 0.1)
        // this.scene.add(this.spotLightSp)
        //
        // // 环境光，均匀照亮场内物体
        // this.ambientLight = new THREE.AmbientLight(0xffffff, 1)
        // this.scene.add(this.ambientLight)

        let grid = new THREE.GridHelper(1000, 20, 0x122562, 0x122562);
        this.scene.add(grid);


        // 相机控制器（鼠标左右中键控制相机）
        this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
        this.orbitControls.enableKeys = false
        // this.orbitControls.minDistance = 400
        // this.orbitControls.maxDistance = 800

        this.orbitControls.addEventListener('change', (e) => {
            this.needsUpdate = true
        })

        // 物体移动控制器 (键盘操作说明：W - change position， E - change rotation， R - change scale， X、Y、Z - toggle X、Y、Z)
        this.transformControls = new TransformControls(this.camera, this.renderer.domElement)

        this.transformControls.addEventListener('dragging-changed', (e) => {
            this.orbitControls.enabled = !e.value
        })
    }

    // 页面大小变更后的处理函数
    handleResize () {
        this.width = this.element.offsetWidth
        this.height = this.element.offsetHeight

        this.renderer.setSize(this.width, this.height)
        this.camera.aspect = this.width / this.height
        this.camera.updateProjectionMatrix()
        this.needsUpdate = true
    }

    // 执行帧动画
    animate (time = 0) {
        if (this.animateFnPool) {
            Object.values(this.animateFnPool).forEach(fn => {
                fn(time, {
                    width: this.width,
                    height: this.height
                })
            })
        }

        if (this.needsUpdate) {
            // 一定要放在这里，先置为 false，否则会影响动画执行
            this.needsUpdate = false
            this.renderer.render(this.scene, this.camera)
        }

        this.raf = requestAnimationFrame(this.animate.bind(this))
    }

    // 添加帧动画执行函数
    addAnimateFn (key, fn) {
        if (this.animateFnPool[key]) {
            console.warn('[threeApp] - 请注意,该key已设置对应贞动画函数，旧函数将被新函数覆盖！')
        }
        this.animateFnPool[key] = fn
    }

    // 移除帧动画执行函数
    removeAnimateFn (key) {
        delete this.animateFnPool[key]
    }

    // 指定可变换的3D对象
    attachTransformObject (object3D) {
        this.transformControls.attach(object3D)
        this.scene.add(this.transformControls)
    }

    // 移除可变换的3D对象
    detachTransformObject (object3D) {
        this.transformControls.detach(object3D)
        this.scene.remove(this.transformControls)
    }
}
