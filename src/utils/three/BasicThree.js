import * as THREE from 'three';
export default  class BasicThree {
    renderer = null
    // 当前场景的名字
    sceneName = null
    // 场景
    scene = {}
    functionList = []
    camera = null
    textureLoader = null

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
        if(options.IsTextureLoader) {
            this.createTextureLoader()
        }
    }
    setCamera(camera) {
        this.camera = camera
    }
    getRenderer() {
        return this.renderer
    }
    createScene(sceneName) {
     this.sceneName = sceneName
     return this.scene[sceneName] = new THREE.Scene()
    }
    getCurrentScene() {
        return this.scene[this.sceneName]
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
         window.requestAnimationFrame(() => {
             this.render()
         });
    }
    AddFunctionList (functionEvent) {
        this.functionList.push(functionEvent)
    }
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
    dispose() {

    }
}
