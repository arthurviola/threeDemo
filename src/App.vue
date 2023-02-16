<script setup>
// import HelloWorld from './view/HelloWorld.vue'
// import gradientTest from '@/view/gradientTest.vue'
import { ref, toRefs, onMounted, onBeforeUnmount, watch } from 'vue';
import demo from '@/assets/img/img_3.png'
const list = ref([
  {
    path: '/demo',
    name: 'echart 3D 点',
    src: demo
  }
]);

const clickItem = (item) => {

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
#app{
  height: 100vh;
}
.title{
  font-size: 30px;
  text-align: center;
}
.container{
  width: 100%;
  display: flex;
  justify-content: flex-start;
  .item{
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
  //height: 100%;
}
</style>
