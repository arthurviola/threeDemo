import echarts from 'echarts'
import { echartFontSize } from '@/utils/echartFlexible'
export function getSimpleRadarOption (data, config) {
  const opt = Object.assign({
    indicator: [],
    totalValue: {}
  }, config)
  return {
    radar: {
      radius: '60%',
      indicator: opt.indicator,
      shape: 'circle',
      splitNumber: 5,
      name: {
        textStyle: {
          color: '#FFF',
          fontSize: echartFontSize(14)
        },
        formatter (params) {
          const data = params.split('-')
          const name = data[0]
          const value = data[1]
          return `{num|${value}}\n{name|${name}}`
        },
        rich: { num: { color: '#00FF00', fontSize: echartFontSize(20) }, name: { color: '#FFF', fontSize: echartFontSize(14) } }
      },
      splitLine: { show: false },
      splitArea: { show: false },
      axisLine: { show: false }
    },
    series: [{
      type: 'radar',
      data: data,
      itemStyle: {
        color: '#33E5FE'
      },
      areaStyle: {
        opacity: 0.1
      },
      markPoint: {
        data: [{
          symbol: 'roundRect',
          symbolSize: echartFontSize(10),
          name: '男性',
          itemStyle: { color: 'transparent' },
          x: '50%',
          y: '50%',
          value: opt.totalValue,
          label: {
            normal: {
              show: true,
              formatter (params) {
                return `{num|${params.value.value}}\n{name|${params.value.name}}`
              },
              rich: { num: { color: '#FFF', fontSize: echartFontSize(20), padding: [10, 0, 0, 0], align: 'center' }, name: { align: 'center', color: '#FFF', fontSize: echartFontSize(14) } }
            }
          }
        }]
      }
    }]
  }
}
