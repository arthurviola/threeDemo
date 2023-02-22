<script setup>
import { ref} from 'vue';
import demo from '@/assets/img/img_3.png'
import threeDemo from '@/assets/img/threeDemo.png'
import { useRouter } from 'vue-router';
const router = useRouter();
const list = ref([
  {
    routerName: 'echart',
    name: 'ecahrt3D示例1',
    src: demo
  },
  {
    routerName: 'gradient',
    name: 'three 渐变',
    src: threeDemo
  },
  {
    routerName: 'modelTest',
    name: 'gltf压缩测试',
    src: threeDemo
  }
]);

const clickItem = (item) => {
  // console.log(useRouter())
  router.push({
    name: item.routerName,
  })
}
</script>
<template>
  <div class="title">demo</div>
  <div class="container">
    <div class="item" v-for="item in list" :key="item.name" @click="clickItem(item)">
      <img :src="item.src">
      <span>{{item.name}}</span>
    </div>
  </div>
</template>
<style lang="scss">
.title{
  font-size: 30px;
  text-align: center;
}
.container{
  width: 100%;
  display: flex;
  justify-content: flex-start;
  .item{
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    img{
      width: 150px;
      height: 100px;
    }
    span{
      font-size: 14px;
      text-align: center;
    }
  }
}
</style>
