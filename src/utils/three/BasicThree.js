import * as THREE from 'three';
export default  class BasicThree {
    renderer = null
    // 场景
    scene = {}
    functionList = []
    camera = null
    textureLoader = null
    requestAnimationFrameId = null

    constructor(dom, options = {
        width: dom.offsetWidth,
        height: dom.offsetHeight,
        IsTextureLoader: true
    }) {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true, //开启锯齿
            alpha: true
        })
        this.renderer.setSize(options.width, options.height) //设置渲染区域尺寸
        dom.appendChild(this.renderer.domElement) //body元素中插入canvas对象
        window.requestAnimationFrame(() => {
            this.render()
        });
        // 是否创建纹理加载器
        if(options.IsTextureLoader) {
            this.createTextureLoader()
        }
    }
    // 设置摄像头
    setCamera(camera) {
        this.camera = camera
    }
    getRenderer() {
        return this.renderer
    }
    // 创建场景
    createScene() {
     return this.scene = new THREE.Scene()
    }
    getCurrentScene() {
        return this.scene
    }

     render() {
        if(this.functionList.length > 0) {
            this.functionList.map(item => {
                try {
                    item()
                }catch (e) {
                    console.log(e)
                }
            })
        }
        this.renderer.render( this.getCurrentScene(), this.camera );
        this.requestAnimationFrameId = window.requestAnimationFrame(() => {
             this.render()
         });
    }
    // 可以把多个需要更新的动画等等放进里面
    AddFunctionList (functionEvent) {
        this.functionList.push(functionEvent)
    }
    // 清除动画
    ClearFunctionList() {
        this.functionList = []
    }
    createTextureLoader () {
        if(this.textureLoader) return
        this.textureLoader = new THREE.TextureLoader();
    }
    getTextureLoader() {
        this.createTextureLoader()
        return this.textureLoader
    }
    clearThree(obj){
        while(obj.children.length > 0){
            this.clearThree(obj.children[0])
            obj.remove(obj.children[0]);
        }
        if(obj.geometry) obj.geometry.dispose()

        if(obj.material){
            //in case of map, bumpMap, normalMap, envMap ...
            Object.keys(obj.material).forEach(prop => {
                if(!obj.material[prop])
                    return
                if(typeof obj.material[prop].dispose === 'function')
                    obj.material[prop].dispose()
            })
            obj.material.dispose()
        }
    }
    dispose() {
        this.clearThree(this.scene)
        this.textureLoader && this.textureLoader.dispose()
        this.requestAnimationFrameId && cancelAnimationFrame(this.requestAnimationFrameId)
    }
}
