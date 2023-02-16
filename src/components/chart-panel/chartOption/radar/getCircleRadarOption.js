import echarts from 'echarts'
import { echartFontSize } from '@/utils/echartFlexible'
export function getCircleRadarOption (data, config) {
  const opt = Object.assign({
    indicator: [],
    radius: '60%',
    totalValue: {}
  }, config)
  function contains (arr, obj) {
    let i = arr.length
    while (i--) {
      if (arr[i].name === obj) {
        return i
      }
    }
    return false
  }
  // 格式化数据
  function formatNumber (n) {
    let b = parseInt(n).toString()
    let len = b.length
    if (len <= 3) { return b }
    let r = len % 3
    return r > 0 ? b.slice(0, r) + ',' + b.slice(r, len).match(/\d{3}/g).join(',') : b.slice(r, len).match(/\d{3}/g).join(',')
  }
  return {
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: function () {
        return opt.indicator[0].name + '：' + data[0].value[0] + `</br>` + opt.indicator[1].name + '：' + data[0].value[1] + `</br>` + opt.indicator[2].name + '：' + data[0].value[2] + `</br>` + opt.indicator[3].name + '：' + data[0].value[3] + `</br>` + opt.indicator[4].name + '：' + data[0].value[4] + `</br>` + opt.indicator[5].name + '：' + data[0].value[5] + `</br>` + opt.indicator[6].name + '：' + data[0].value[6]
      }
    },
    radar: {
      center: ['50%', '53%'], // 外圆的位置
      radius: opt.radius,
      triggerEvent: true,
      // name: {
      //   textStyle: {
      //     color: '#fff',
      //     fontSize: echartFontSize(16),
      //     fontWeight: 400,
      //     padding: [echartFontSize(-10), echartFontSize(-10), echartFontSize(-10), echartFontSize(-10)],
      //     fontFamily: 'PingFangSC-Regular,PingFang SC',
      //     fontStyle: 'normal'
      //   }
      // },
      name: {
        textStyle: {
          padding: [echartFontSize(-10), echartFontSize(-10), echartFontSize(-10), echartFontSize(-10)]
        },
        rich: {
          a: {
            fontSize: echartFontSize(16),
            color: '#ccc',
            lineHeight: echartFontSize(20)
          },
          b: {
            color: '#00E4FF',
            fontSize: echartFontSize(16),
            fontWeight: 700,
            padding: [0, echartFontSize(10), 0, 0],
            align: 'center'
          },
          c: {
            color: '#fff',
            fontSize: echartFontSize(16)
          },
          triggerEvent: true
        },
        formatter: (a, index) => {
          let values = a.length > 4 ? a.slice(0, 4) + '...' : a
          let i = contains(opt.indicator, a) // 处理对应要显示的样式
          return `{a| ${values}} {b| ${formatNumber(data[0].value[i])}}`
        }
      },
      indicator: opt.indicator,
      splitArea: {
        // 坐标轴在 grid 区域中的分隔区域，默认不显示。
        show: true,
        areaStyle: {
          // 分隔区域的样式设置。
          color: ['rgba(2,179,163,0.1)'] // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
        }
      },
      axisLine: {
        // 指向外圈文本的分隔线样式
        lineStyle: {
          color: 'rgba(2,179,163,0.1)'
        }
      },
      splitLine: {
        lineStyle: {
          type: 'solid',
          color: 'rgba(2,179,163,0.9)', // 分隔线颜色
          width: echartFontSize(1) // 分隔线线宽
        }
      }
    },
    series: [
      {
        name: '',
        type: 'radar',
        areaStyle: {
          normal: {
            color: 'rgba(54,253,254,0.20)'
          }
        },
        symbolSize: 0,
        lineStyle: {
          normal: {
            color: '#36fdfe',
            width: echartFontSize(2)
          }
        },
        data: data
      }
    ]
  }
}
