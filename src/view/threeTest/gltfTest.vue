<template>
<div class="modelTest">
  <modelTest url="./Draco/modelDracotest.gltf" key="./Draco/modelDracotest.gltf"></modelTest>
  <modelTest url="./szyq.glb" key="./szyq.glb"></modelTest>
  <modelTest url="./model.gltf" key="./model.gltf"></modelTest>
</div>
</template>

<script>
import modelTest  from "@/view/threeTest/modelTest.vue";
export default {
  name: "gltfTest.vue",
  components: {
    modelTest
  }
}
</script>

<style scoped lang="scss">
.modelTest{
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  flex-wrap: nowrap;
}
</style>
