import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
export default class BasicGLIFLoader {
    loader = new GLTFLoader()
    load(path, scene) {
        this.loader.load( path, function ( gltf ) {
            scene.add( gltf.scene );
        },
        (progress) => {
        console.log('加载模型中', path ,progress)
        }, function ( error ) {
        console.error( error );
    } );
    }
}
