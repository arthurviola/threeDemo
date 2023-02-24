<template>
  <div class="demo">
    <map-chart-panel :chartOption="options" height="80vh"></map-chart-panel>
  </div>
</template>
<script>

import MapChartPanel from "@/components/map-chart-panel/index.vue";
import {getBasicMapOption} from "@/components/map-chart-panel/chartOption/map/getBasicMapOption.js"
import {getAnimationLinesOptions} from "@/components/map-chart-panel/chartOption/lines/animationLinesOptions.js"
import {getAnimationScatter} from "@/components/map-chart-panel/chartOption/scatter/getAnimationScatter.js"
import { getImgScatter } from '@/components/map-chart-panel/chartOption/scatter/getImgScatter'
import {chinaDatas, chinaGeoCoordMap} from "@/components/map-chart-panel/data.js";
import grass from '@/assets/img/grass.png'
import {getLine} from "@/components/map-chart-panel/chartOption/lines/getLine.js";
export default {
  components: {
    MapChartPanel
  },
  data() {
    return {
      startTime: new Date().getTime(),
      height: 10,
      options:{},
      geoCoordMap: {
        黑龙江绿电厂: [127.9688, 45.368,11],
        海南: [110.3893, 19.8516,8],
        上海: [121.4648, 31.2891,15],
        台湾: [120.8893, 23.6516,1],
        长线大厦: [113.351343, 23.117884,4]
      },
      mapData: [
         [127.9688, 45.368,11],
         [110.3893, 19.8516,2],
         [121.4648, 31.2891,4],
         [120.8893, 23.6516,6],
         [113.351343, 23.117884,1]
      ],
      customerBatteryCityData: [
        {name: '黑龙江绿电厂', value: 200000},
        {name: '海南', value: 200000},
        {name: '上海', value: 200000},
        {name: '台湾', value: 200000},
        {name: '长线大厦', value: 200000}
      ],
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
    lineData(name, height ) {
      // let height = name === 'china' ? 5 : 1

      if (this.customerBatteryCityData && this.customerBatteryCityData.length) {
        let data = []
        this.customerBatteryCityData.map((item) => {
          data.push({coords: [this.geoCoordMap[item.name], [Number(this.geoCoordMap[item.name][0]), Number(this.geoCoordMap[item.name][1]) + height % Number(this.geoCoordMap[item.name][2]) , item.name]]})
        })
        // data.push({
        //     coords:[["114.141447", "21.433950"],["114.141447", "21.433950"]]
        // })
        this.coordsTemp = data
        return data
      }
    },
    scatterData2() {
      if (this.customerBatteryCityData && this.customerBatteryCityData.length) {
        return this.customerBatteryCityData.map((item) => {
          if (item.value > 0) {
            return {
              name: item.name,
              value: this.geoCoordMap[item.name]
            }
          }
        })
      }
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
            value: 100
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
              ...getAnimationScatter(this.scatterData2('china'),{}),
            getAnimationLinesOptions(this.lineData('china',this.height),{}),
            // getImgScatter([{
            //     name: chinaGeoCoordMap[chinaDatas[0][0].name],
            //     value:list[0][1].coord
            //   }],
            //     {
            //       symbolSize: 10,
            //       symbolCallback: (value,params) => {
            //         console.log(value,params)
            //         return 'image://data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7'
            //       }
            //     })

            // getLine(this.mapData,{})
            // getAnimationScatter({},this.scatterData2('china'))
          ])
      // this.animate()
    },
    animate() {
      if(new Date().getTime() - this.startTime > 1000) {
        this.startTime = new Date().getTime();
        this.height ++;
        this.options =
            // 基础底图
            getBasicMapOption({},[
              // ...getAnimationScatter(this.scatterData2('china'),{}),
              // getAnimationLinesOptions(this.lineData('china',this.height),{}),
              getAnimationLinesOptions(this.mapData,{}),
            ])
      }
      requestAnimationFrame(this.animate.bind(this))
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
