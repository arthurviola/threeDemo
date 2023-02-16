/* eslint-disable */
<template>
    <div class="page-wrap">
        <div ref="main" class="main"></div>
        <div class="loading-mask" :class="{ show: loadingModel }">
            模型加载中，请耐心等待...
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import * as THREE from "three";
import ThreeApp from "./threeUtils/threeApp";
import ModelUtil from "./threeUtils/modelUtil";
import EventUtil from "./threeUtils/eventUtil";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
export default {
    data() {
        return {
            loadingModel: false,
        };
    },
    mounted() {
        this.map = {};
        this.init();
        this.loadBaseModel();

        window.THREE = THREE;
        window.vm = this;
    },
    methods: {
        init() {
            this.threeApp = new ThreeApp(this.$refs.main);
            this.modelUtil = new ModelUtil();
            this.eventUtil = new EventUtil(
                this.$refs.main,
                this.threeApp.camera
            );

            this.bindClickFn = (e, intersects) => {
                this.handleClickMesh(e, intersects);
            };

            this.bindMouseOverFn = (e, intersects) => {
                this.handleMouseOverMesh(e, intersects);
            };

            this.eventUtil.bind("click", this.bindClickFn);
            this.eventUtil.bind("mouseover", this.bindMouseOverFn);

            this.threeApp.needsUpdate = true;
        },
        // 加载渲染机房场景需要用到的必要基础模型
        loadBaseModel() {
            console.time();
            const modelOptList = [
                {
                    key: "park",
                    type: "simple",
                    path: "/models/park/03.fbx",
                    castShadow: true,
                    receiveShadow: true,
                },
            ];

            let loader = new FBXLoader();
            loader.load("/models/park/park-02.fbx", async (obj) => {
                console.log("obj");
                console.log(obj);
                obj.traverse(function (item) {
                    if (item instanceof THREE.Mesh) {
                        item.material.opacity = 0.7;
                        // that.meshArr2.push(item);
                    }
                });
                // this.scene.add(obj);
                this.threeApp.scene.add(obj);
                this.threeApp.renderer.render( this.threeApp.scene,  this.threeApp.camera);
                // this.renderer.render(this.scene, this.camera);
            });
            // if (opt.key === 'park') {
            //     object3D.traverse(item => {
            //         if (item.type === 'Mesh') {
            //             if (item.name !== 'F1') {
            //                 item.material.depthWrite = false
            //                 item.material.depthTest = true
            //                 // item.material.colorWrite = false
            //                 // item.material.size = THREE.DoubleSide
            //             }
            //             // item.material.depthWrite = item.material.transparent
            //             // item.material.transparent = false
            //             // item.material.opacity = 1
            //             // item.material.polygonOffset = item.name === 'F1' || item.name === 'F2'
            //             // item.material.polygonOffsetFactor = item.name === 'F1' ? 2 : (item.name === 'F2') ? 1 : 0
            //             // item.material.polygonOffsetUnits = item.name === 'F1' ? 4 : (item.name === 'F2') ? 2 : 0
            //             this.map[item.name] = item
            //         }
            //     })
            // }

            // this.threeApp.needsUpdate = true

            // Promise.all(promistList).then(() => {
            //     console.timeEnd();
            //     this.eventUtil.setCheckList(this.threeApp.scene.children);
            //     this.loadingModel = false;
            // });
        },
        handleClickMesh(e, intersects) {
            console.info(intersects[0].object);
        },
        handleMouseOverMesh(e, intersects) {},
    },
};
</script>

<style lang="scss" scoped>
.page-wrap::v-deep {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    .main {
        height: 100%;
    }
    .loading-mask {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 20;
        background: rgba(0, 0, 0, 0.1);
        color: #ffd700;
        font-size: 20px;
        display: none;
        justify-content: center;
        align-items: center;

        &.show {
            display: flex;
        }
    }
}
</style>
