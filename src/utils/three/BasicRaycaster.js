import * as THREE from 'three';

let _width = null;
let _height = null;
let pointer = new THREE.Vector2();
export default class BasicRaycaster {
    raycaster = new THREE.Raycaster();
    constructor(width, height) {
        _width = width
        _height = height
        window.addEventListener( 'pointermove', this.onPointerMove );
    }
    onPointerMove( event ) {
        // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
        pointer.x = ( event.clientX / _width) * 2 - 1;
        pointer.y = - ( event.clientY / _height ) * 2 + 1;
    }
    getObject(scene, camera, objects = scene.children) {
       this.raycaster.setFromCamera(pointer, camera)
       return this.raycaster.intersectObjects(objects);
    }
    dispose() {
        this.raycaster = null
        pointer = null
        window.removeEventListener( 'pointermove', this.onPointerMove );
    }
}
