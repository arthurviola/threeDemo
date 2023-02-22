<template>
 <div class="three" >
   <div class="three"  id="three"></div>
   <loading :result="result"></loading>
 </div>
</template>

<script>
import loading from '@/components/load/index.vue'
import  ModelUtil from '@/utils/three/modelUtil'
import ThreeApp from "@/utils/three/threeApp";
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import SingletonViewer from "@/utils/three/SingletonViewer.js";
import * as THREE from "three";
let threeInstance = null
let modelUtils = null
export default {
  components: {
    loading
  },
  name: "modelTest",
  data() {
    return {
      result: 0
    }
  },
  methods: {
    createModel() {
      modelUtils = new ModelUtil()
      modelUtils.loadModel({
        // receiveShadow: true,
        // castShadow: true,
        path: './Draco/modelDracotest.gltf',
        onProgress: (progress) => {
          console.log('progress', Number(progress.loaded / progress.total * 100).toFixed(2) + '%');
          // console.log(progress)
          this.result = progress.loaded / progress.total * 100
        }
      }).then((gltf) => {
        // debugger
        // var material1 = new THREE.Material();
        // material1.polygonOffset = true;
        // material1.depthTest = true;
        // material1.polygonOffsetFactor = 1;
        // material1.polygonOffsetUnits = 0.1;
        // gltf.scene.overrideMaterial = material1
        threeInstance.scene.add(gltf.scene)
        gltf.scene.position.set( 1, 1, 0 );
        // gltf.scene.scale.set( 100, 100, 100 );
        threeInstance.camera.position.set(100, 100,0);
        threeInstance.camera.lookAt(1, 1, 0);
        // debugger
        // threeInstance.camera.position = new Vector3(0,0,0)
        // console.log(gltf)
        const pmremGenerator = new THREE.PMREMGenerator( threeInstance.renderer );
        threeInstance.scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.1 ).texture;
        threeInstance.needsUpdate = true
      })
      console.log(threeInstance)
    },
    createLight(scene) {
      var directionalLight = new THREE.DirectionalLight(0xffffff, 0.9)
      directionalLight.position.set(400, 200, 300)
      scene.add(directionalLight)
      // // // 平行光2
      var directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.9)
      directionalLight2.position.set(-400, -200, -300)
      scene.add(directionalLight2)
      threeInstance.needsUpdate = true
      //环境光
      var ambient = new THREE.AmbientLight(0xffffff, 1)
      scene.add(ambient)
    },
  },
  mounted() {
    threeInstance = new ThreeApp(document.getElementById('three'))
    // threeInstance.renderer.logarithmicDepthBuffer = true;
    this.createModel()
    // this.createLight(threeInstance.scene)
  }
}
</script>

<style scoped>
.three,#three{
  width: 100%;
  height: 100%;
}
</style>
