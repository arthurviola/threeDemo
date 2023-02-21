<!--
 * @Author: 徐梦韵
 * @Date: 2023-02-14 17:12:49
 * @LastEditors: 徐梦韵
 * @LastEditTime: 2023-02-14 17:13:36
 * @FilePath: \vite-project\src\components\three\test.vue
 * @Description: 合并Geometries的测试代码
 *
-->
<template>
  <div class="three">
    <div ref="three" id="three" />
  </div>
</template>
<script>
import SingletonViewer from "@/utils/three/SingletonViewer.js";
import BasicThree  from "@/utils/three/BasicThree.js";
import mapData from '@/assets/three/china.json'
import * as THREE from 'three';
import {mergeBufferGeometries} from "three/addons/utils/BufferGeometryUtils.js";
// import BasicRaycaster from "@/utils/three/BasicRaycaster.js";
import Stats from 'three/addons/libs/stats.module.js';
let stats = new Stats();
import { vertexShader, fragmentShader } from '@/utils/three/shader/gradient.js'
export default {
  name: 'three',
  data() {
    return {}
  },
  mounted () {
    let instance = SingletonViewer.getInstance()
    let dom = document.getElementById("three")
    dom.appendChild( stats.dom );
    instance.setCustomClass('three',new BasicThree(dom, {
      width: dom.offsetWidth,
      height: dom.offsetHeight
    }))
    let test = instance.getCustomClass('three')
    let scene = test.createScene('test')
    // test.createMainCamera(dom)
    this.k = dom.offsetWidth / dom.offsetHeight
    this.s = 30
    let camera = new THREE.OrthographicCamera( -this.s * this.k, this.s * this.k, this.s, -this.s, 1, 1000)
    camera.position.set(104, 20, 80);
    camera.lookAt(104,28 ,0);
    test.setCamera(camera)
    this.createLight()
    this.createMesh()
    // let basicRaycaster = new BasicRaycaster(dom.offsetWidth , dom.offsetHeight)
    // debugger
    // test.AddFunctionList(() => {
    //   stats.update();
    //   let objects = basicRaycaster.getObject(scene, camera)
    //   if(objects.length > 0) {
    //     console.log('object', objects[0],objects[0].object.name)
    //   }
    // })

  },
  methods: {
    createLight() {
      let instance = SingletonViewer.getInstance().getCustomClass('three')
      let scene = instance.getCurrentScene()
      var directionalLight = new THREE.DirectionalLight(0xffffff, 0.9)
      directionalLight.position.set(400, 200, 300)
      scene.add(directionalLight)
      // // // 平行光2
      var directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.9)
      directionalLight2.position.set(-400, -200, -300)
      scene.add(directionalLight2)
      //环境光
      var ambient = new THREE.AmbientLight(0xffffff, 0.4)
      scene.add(ambient)
    },
    createMesh() {
      let instance = SingletonViewer.getInstance().getCustomClass('three')
      let scene = instance.getCurrentScene()
      let mapGroup = new THREE.Group()
      let childAreaArr = this.getChildAreaArrFun(mapData)
      this.extrudeMeshFun(childAreaArr, mapGroup)
      // debugger
      scene.add(mapGroup)

    },
    async extrudeMeshFun(childAreaArr, mapGroup, h) {
      let geometries = [];
      let NameList = []
      let materialList = []
      let test = SingletonViewer.getInstance().getCustomClass('three')
      let textureLoader = test.getTextureLoader()
      // let box = {
      //   "isBox3": true,
      //     "min": {
      //       "x": 73.50235748291016,
      //       "y": 3.3971619606018066,
      //       "z": 0
      //     },
      //     "max": {
      //         "x": 135.09567260742188,
      //         "y": 53.563270568847656,
      //         "z": 10
      //   }
      // }
      childAreaArr.forEach((childArea, i) => {
        var shapeArr = []
        childArea.geo.forEach((vertices) => {
          var shape = new THREE.Shape(vertices)
          shapeArr.push(shape)
        })
        // NameList.push(childArea.name)
        var geometry = new THREE.ExtrudeGeometry(
            shapeArr,
            //拉伸参数
            {
              // name: childArea.name,
              depth: 10,//拉伸长度
              bevelEnabled: false //无倒角
            }
        )
        // geometry.userData.name = childArea.name
        // geometries.push(geometry)
        // let material = new THREE.MeshPhongMaterial({
        //   // color: 0x1aa790,
        //   map: texture
        // }) //材质对象
        // materialList.push(material)
      })
      // debugger
      // 这里融合 Geometries 进行优化
      const shaderMaterial = new THREE.ShaderMaterial( {
        uniforms: {
          // maxY -MinY
          step: { value: 53.563270568847656 - 3.3971619606018066 },
          // #1da781
          beginColor: { value: new THREE.Color(29.0,167.0,129.0) },
          endColor: { value: new THREE.Color(15,169,195) },
          beginTransparency: { value: 1},
          endTransparency: { value: 0.3},
          minY: { value: 3.3971619606018066},
        },
        vertexShader,
        fragmentShader
      } );
      let geometry = mergeBufferGeometries( geometries, true );
      var mesh = new THREE.Mesh(geometry, shaderMaterial) //网格模型对象
      // mesh.name = childArea.name
      mapGroup.add(mesh)
      geometry.userData.nameList = NameList
    },
    //提取行政区域所有子区域边界数据
    getChildAreaArrFun(data) {
      var childAreaArr = []
      data.features.forEach(function (childArea) {
        var area = {
          geo: [],
          name: childArea.properties.name
        }
        childAreaArr.push(area)
        // "Polygon"：子行政单元childArea有一个封闭轮廓
        if (childArea.geometry.type === 'Polygon') {
          area.geo[0] = []
          childArea.geometry.coordinates[0].forEach((elem) => {
            area.geo[0].push(new THREE.Vector2(elem[0], elem[1]))
          })
          //"MultiPolygon"：子行政单元childArea有多个封闭轮廓
        } else if (childArea.geometry.type === 'MultiPolygon') {
          // 解析所有封闭轮廓边界坐标childArea.geometry.coordinates
          childArea.geometry.coordinates.forEach((range, index) => {
            area.geo[index] = []
            range[0].forEach((elem) => {
              area.geo[index].push(new THREE.Vector3(elem[0], elem[1], 0))
            })
          })
        }else{
        }
      })
      return childAreaArr
    },
  }

}
</script>
<style scoped>
.three, #three {
  background: #000;
  width: 100%;
  height: 100%;
}
</style>
