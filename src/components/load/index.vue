<template>
  <div class="loadBox" v-show="show">
    <div class="box" id="div_box">
      <div class="load" :style="{width: result * 3 + 'px'}"></div>
    </div>
    <span class='result' style="">{{`${result.toFixed(2)}%`}}</span>
  </div>
</template>

<script>
export default {
  name: "index.vue",
  data() {
    return {
      show: true
    }
  },
  props: {
    result: {
      default: 0,
      type: Number
    },
  },
  watch: {
    result: {
      deep: true,
      handler(newVal) {
        if(newVal >= 99.9) {
          this.$emit('loaded')
          this.show = false
        }
      }

    }
  }
}
</script>

<style scoped lang="scss">
.box{
  width: 300px;
  height:10px;
  border:1px solid #9e9e9e;
}
.load {
  width: 0px;
  height: 10px;
  background: #325976;
}
.loadBox{
  font-size:70px;
  position:absolute;
  display: inline-block;
  //left: calc(100% - 150px);
  //top: calc(100% - 5px);
  left: 39%;
  /* left: 50%; */
  top: 42%;
  /*style="left:10%;position:absolute;top: 20%;font-size:70px"*/
}
.result{
  position: relative;
  top: 58px;
  left: 57px;
}
</style>
