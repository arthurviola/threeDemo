<template>
  <div class="demo">
    <dic class="button-list">
      <button type="button" @click="changeItem('showPin')">增加点</button>
      <button type="button" @click="changeItem('showPic')">增加图标</button>
      <button type="button" @click="changeItem('showFlyLine')">增加飞线</button>
    </dic>
    <map-chart-panel :chartOption="options" height="80vh"></map-chart-panel>
  </div>
</template>
<script>

import MapChartPanel from "@/components/map-chart-panel/index.vue";
import {getBasicMapOption} from "@/components/map-chart-panel/chartOption/map/getBasicMapOption"
import {getLinesMapOption} from "@/components/map-chart-panel/chartOption/lines/getLinesMapOption.js";
import {chinaDatas,chinaGeoCoordMap} from "@/components/map-chart-panel/data.js";
import {convertData} from "../components/map-chart-panel/tool.js";
import {getScatterMapOption} from "../components/map-chart-panel/chartOption/scatter/getScatterMapOption.js";
import {getEffectScatterMapOption} from "../components/map-chart-panel/chartOption/scatter/getEffectScatter.js";
export default {
  components: {
    MapChartPanel
  },
  data() {
    return {
      options:{},
      showPin: false,
      showPic: false,
      showFlyLine: false
    }
  },
  mounted() {
    this.setOption()
  },
  methods:{
    changeItem(name) {
      this[name] = !this[name]
      this.setOption()
    },
    setOption() {
      let list = []
      let effectScatterList = []

      chinaDatas.map((item,index) => {
        // debugger
        if(index !== 0) {
          let beginPos = chinaGeoCoordMap[chinaDatas[0][0].name]
          let endPos = chinaGeoCoordMap[item[0].name]
          list.push([{
            coord: beginPos,
          }, {
            coord: endPos,
            value: 0
          }])
          effectScatterList.push({
            mame: item[0].name,
            value: [ ...endPos, 0]
          })
        }
      })
      this.options =
          // 基础底图
          getBasicMapOption({},[
            //这里是飞线的数据 及样式
            this.showFlyLine && getLinesMapOption(list),
            //打点 pin
            this.showPin && getScatterMapOption([{
              name: chinaGeoCoordMap[chinaDatas[0][0].name],
              value:list[0][1].coord
            }]),
            this.showPic && getEffectScatterMapOption(effectScatterList),
          ])
    }
  }
}
</script>

<style scoped>
.button-list{
  display: inline-block;
  width: 300px;
  height: 100px;
}
.demo button {
  /*width: 10px;*/
  /*height: 10px;*/
  font-size: 14px;
}
</style>
