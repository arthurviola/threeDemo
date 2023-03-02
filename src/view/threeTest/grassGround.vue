<template>
  <div class="test" >
    <div class="three"  :id="url"></div>
    <loading :result="result"></loading>
  </div>
</template>

<script>
// import Stats  from 'three/examples/jsm/libs/stats.module.js'
import loading from '@/components/load/index.vue'
import  ModelUtil from '@/utils/three/modelUtil'
import ThreeApp from "@/utils/three/threeApp";
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import SingletonViewer from "@/utils/three/SingletonViewer.js";
import * as THREE from "three";
let threeInstance = null
let modelUtils = null
let stats;
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
  props: {
    url:{
      type: String,
      default: './szyq.glb'
    }
  },
  methods: {
    createModel() {
      modelUtils = new ModelUtil()
      modelUtils.loadModel({
        // receiveShadow: true,
        // castShadow: true,
        path: this.url,
        onProgress: (progress) => {
          // console.log('progress', Number(progress.loaded / progress.total * 100).toFixed(2) + '%');
          // console.log(progress)
          this.result = progress.loaded / progress.total * 100
        }
      }).then((gltf) => {
        threeInstance.scene.add(gltf.scene)
        gltf.scene.position.set( 1, 1, 0 );
        // gltf.scene.scale.set( 100, 100, 100 );
        threeInstance.camera.position.set(100, 100,0);
        threeInstance.camera.lookAt(1, 1, 0);
        const pmremGenerator = new THREE.PMREMGenerator( threeInstance.renderer );
        threeInstance.scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.1 ).texture;
        threeInstance.needsUpdate = true
      })
      // console.log(threeInstance)
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
    threeInstance = new ThreeApp(document.getElementById(this.url))
    // threeInstance.renderer.logarithmicDepthBuffer = true;
    this.createModel()
    // stats = new Stats();  // 创建一个性能监视器
    // stats.domElement.style.position = 'absolute';  // 样式， 坐标
    // stats.domElement.style.left = '0px';
    // stats.domElement.style.top = '0px';
    // threeInstance.animateFnPool.updateStaus = () => {
    //   stats.update()
    // }
    // document.getElementById(this.url).appendChild(stats.domElement);  // 添加到canvas-frame
    // this.createLight(threeInstance.scene)
  }
}
</script>

<style scoped>
.three,#three{
  width: 100%;
  height: 100%;
}
.test{
  flex: 1;
}
</style>
