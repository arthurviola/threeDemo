<!--
    图表
    @params: width 宽度
    @params: height 高度
    @params: autoResize 是否自动调整大小
    @params: chartOption 图标的配置
-->
<template>
  <div class="chart">
    <div ref="chart" :style="{ height: height, width: width }" />
  </div>
</template>
<script>
import echarts from 'echarts'
import {echartFontSize} from '@/utils/echartFlexible'
// require('echarts/theme/macarons') // echarts 主题
export default {
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
        default: '350px'
    },
      autoResize: {
          type: Boolean,
          default: true
      },
      isLineChart: {
          type: Boolean,
          default: false
      },
      // isTitle
      isTitle: {
          type: Boolean,
          default: false
      },
    isVideoPie: {
      type: Boolean,
      default: false
    },
      chartOption: {
          type: Object,
          required: true
      }
  },
  data () {
    return {
      chart: null,
      normalTimer: null,
      circleTimer: null
    }
  },
  watch: {
    chartOption: {
      deep: true,
      handler (newVal) {
        this.setOptions(newVal)
      }
    },
    isVideoPie: {
      deep: true,
      handler (newVal) {
        if (newVal === true) {
          this.echartsLoopValue(this.chart, 3000)
        }
      }
    }
  },
  mounted () {
    // window.console.log(this.isToolTip, '看下這個傳到沒')
    this.initChart()
    if (this.autoResize) {
      window.addEventListener('resize', this.resizeHandler)
    }
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.resizeHandler)
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    resizeHandler () {
      this.chart.resize()
    },
    echartsLoop (echartsName, time) {
      let currentIndex = -1
      // let isTitle = this.isTitle
      // let that = this
      setInterval(function () {
        let dataLen = echartsName._model.option.series[0].data.length
        // 取消之前高亮的图形
        this.normalTimer = null
        clearInterval(this.normalTimer)
        this.normalTimer = echartsName.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: currentIndex,
        })
        currentIndex = (currentIndex + 1) % dataLen
        // 高亮当前图形
        echartsName.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: currentIndex
        })
        // 显示 tooltip
        echartsName.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex
        })
      }, time)
      // 销毁定时器
      this.$once('hook:beforeDestroy', () => {
        clearInterval(this.normalTimer)
      })
    },
    echartsLoopValue (echartsName, time) {
      let currentIndex = -1
      this.circleTimer = null
      clearInterval(this.circleTimer)
      this.circleTimer = setInterval(function () {
        let dataLen = echartsName._model.option.series[0].data.length
        // 取消之前高亮的图形
        echartsName.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: currentIndex,
        })
        currentIndex = (currentIndex + 1) % dataLen
        // 高亮当前图形
        echartsName.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: currentIndex
        })
      }, time)
      // 销毁定时器
      this.$once('hook:beforeDestroy', () => {
        clearInterval(this.circleTimer)
      })
    },
    initChart () {
      this.chart = echarts.init(this.$refs.chart, 'macarons')
      this.chart.setOption(this.chartOption)
      this.extension(this.chart)
      if (this.isLineChart) {
        this.echartsLoop(this.chart, 3000)
      }
      if (this.isTitle) {
        this.echartsLoopValue(this.chart, 3000)
      }
      // 图例点击事例
      // this.chart.on('legendselectchanged', function (obj) {
      //   window.console.log(obj, '看下点击图例obj是啥')
      // })
    },
    setOptions (option) {
      this.clearChart()
      this.resizeHandler()
      if (this.chart) {
        this.chart.setOption(option)
      }
    },
    refresh () {
      this.setOptions(this.chartOption)
    },
    clearChart () {
      this.chart && this.chart.clear()
    },
    extension (myChart) {
      let elementDiv = document.getElementById('extension')
      if (!elementDiv) {
        let div = document.createElement('div')
        div.setAttribute('id', 'extension')
        div.style.display = 'block'
        document.querySelector('body').appendChild(div)
      }
      myChart.on('mouseover', function (params) {
        if (params.componentType == 'yAxis') {
          let elementDiv = document.querySelector('#extension')
          let elementStyle =
              'position: absolute;z-index: 99999;color: #fff;font-size: 12px;padding: 5px;display: inline;border-radius: 4px;background-color: #303133;box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 8px'
          elementDiv.style.cssText = elementStyle
          elementDiv.innerHTML = params.value
          document.querySelector('html').onmousemove = function (event) {
          let elementDiv = document.querySelector('#extension')
            let xx = event.pageX - 10
            let yy = event.pageY + 15
          elementDiv.style.top = yy + 'px'
          elementDiv.style.left = xx + 'px'
          }
        }
      })
      myChart.on('mouseout', function (params) {
        if (params.componentType == 'yAxis') {
          let elementDiv = document.querySelector('#extension')
          elementDiv.style.cssText = 'display:none'
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
</style>
