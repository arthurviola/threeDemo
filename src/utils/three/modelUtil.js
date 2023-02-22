/* eslint-disable */
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import * as THREE from 'three'
export default class ModelUtil {
    // 构造函数
    constructor () {
        const objLoader = new OBJLoader()
        const fbxLoader = new FBXLoader()
        const gltfLoader = new GLTFLoader()
        const dracoLoader = new DRACOLoader()

        dracoLoader.setDecoderPath(`https://threejs.org/examples/jsm/libs/draco/`)

        // gltfloader 使用 dracoLoader
        gltfLoader.setDRACOLoader(dracoLoader)

        // 模型池（缓存）
        this.pool = {}
        this.loaderMap = {
            obj: objLoader,
            fbx: fbxLoader,
            gltf: gltfLoader,
            glb: gltfLoader
        }
    }

    // 加载模型
    loadModel (opts) {
        const _opts = {
            key: '', // 3D对象标识
            path: '', // 模型加载路径
            castShadow: false, // 模型是否生成阴影
            receiveShadow: false, // 模型是否接收阴影
            ...opts
        }

        if (this.pool[_opts.key]) {
            // 模型已在模型池中缓存起来了，直接返回
            return Promise.resolve(this.pool[_opts.key])
        }

        const arr = _opts.path.split('.')
        const extName = arr[arr.length - 1]

        return new Promise((resolve, reject) => {
            console.log("this.loaderMap[extName]")
             console.log(this.loaderMap[extName])
            this.loaderMap[extName].load(
                _opts.path,
                (res) => {

                    console.log("res")
                   console.log(res)


                    const object3D = ['glb', 'gltf'].includes(extName) ? res.scene : res

                    this.pool[_opts.key] = object3D

                    object3D.traverse(item => {
                        console.log(item.material)
                        if(item?.material) {
                            item.material.depthTest = true
                            item.material.polygonOffset = true
                            item.material.polygonOffsetFactor= 0.75
                            item.material.polygonOffsetUnits= 4.0
                        }

                        if (item.type === 'Mesh') {
                            // item.material.depthWrite = false
                            // console.log(item.material)
                            // item.material.map.magFilter = THREE.LinearFilter
                            // item.material.map.minFilter  = THREE.LinearMipMapLinearFilter
                            item.castShadow = _opts.castShadow
                            item.receiveShadow = _opts.receiveShadow
                        }
                    })

                    resolve(res)
                },
                (xhr) => {
                    _opts.onProgress && _opts.onProgress(xhr)
                },
                (err) => {
                    _opts.onError && _opts.onError(err)
                    reject(err) }
            )
        })
    }
}
