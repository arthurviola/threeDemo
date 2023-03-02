<template>
 <div class="test" >
   <div class="three"  :id="url"></div>
   <div class="font">{{`花费时间 ${time}`}}</div>
   <loading :result="result"></loading>
 </div>
</template>

<script>
// import status from 'three/examples/js/libs/stats.min.js'
import loading from '@/components/load/index.vue'
import  ModelUtil from '@/utils/three/modelUtil'
import ThreeApp from "@/utils/three/threeApp";
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import Stats from 'three/addons/libs/stats.module.js';
import * as THREE from "three";
// let threeInstance = null
// let modelUtils = null
// let stats = new Stats();
export default {
  components: {
    loading
  },
  name: "modelTest",
  data() {
    return {
      result: 0,
      time: null
    }
  },
  props: {
    url:{
      type: String,
      default: './szyq.glb'
    }
  },
  methods: {
    createData() {
      this.threeInstance = null,
      this.modelUtils= null,
      this.stats =  new Stats()
    },
    async createModel() {
      this.modelUtils = new ModelUtil()
      let gltf = await this.modelUtils.loadModel({
        // receiveShadow: true,
        // castShadow: true,
        path: this.url,
        onProgress: (progress) => {
          // console.log('progress', Number(progress.loaded / progress.total * 100).toFixed(2) + '%');
          // console.log(progress)
          this.result = progress.loaded / progress.total * 100
        }
      })
      this.threeInstance.scene.add(gltf.scene)
      gltf.scene.position.set( 1, 1, 0 );
      // gltf.scene.scale.set( 100, 100, 100 );
      this.threeInstance.camera.position.set(100, 100,0);
      this.threeInstance.camera.lookAt(1, 1, 0);
      const pmremGenerator = new THREE.PMREMGenerator( this.threeInstance.renderer );
      this.threeInstance.scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.1 ).texture;
      this.threeInstance.needsUpdate = true
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
  async mounted() {
    let  t0 = performance.now();
    this.createData()
    this.threeInstance = new ThreeApp(document.getElementById(this.url))
    // threeInstance.renderer.logarithmicDepthBuffer = true;
    await this.createModel()
    this.stats.dom.style.position = 'absolute';  // 样式， 坐标
    this.stats.dom.style.left = '0px';
    this.stats.dom.style.top = '0px';
    this.threeInstance.animateFnPool.updateStaus = () => {
      this.stats.update()
    }
    document.getElementById(this.url).appendChild(this.stats.domElement);  // 添加到canvas-frame
    let t1 = performance.now();
    this.time = (t1 - t0) / 1000
    // this.createLight(threeInstance.scene)
  }
}
</script>

<style scoped>
.three,#three{
  width: 100%;
  height: 100%;
}
.font{
  display: inline-block;
  font-size: 16px;
  position: absolute;
  top: 100px;
  font-weight: 600;
  color: #f9f9f9;
}
.test{
  flex: 1;
}
</style>
