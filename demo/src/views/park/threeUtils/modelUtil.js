/* eslint-disable */
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

export default class ModelUtil {
    // 构造函数
    constructor () {
        const objLoader = new OBJLoader()
        const fbxLoader = new FBXLoader()
        const gltfLoader = new GLTFLoader()
        const dracoLoader = new DRACOLoader()

        dracoLoader.setDecoderPath(`${process.env.BASE_URL}static/draco/`)

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
                        if (item.type === 'Mesh') {
                            item.castShadow = _opts.castShadow
                            item.receiveShadow = _opts.receiveShadow
                        }
                    })

                    resolve(res)
                },
                (xhr) => {},
                (err) => { reject(err) }
            )
        })
    }
}
