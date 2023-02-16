import echarts from 'echarts'
import { echartFontSize } from '@/utils/echartFlexible'
export function getDoubleBarOption (data, colors, config) {
  let label = []
  let legend = []
  colors = colors || ['#1890FF', '#2FC25B']
  const colorlen = colors.length
  let series = []
  const opt = Object.assign({
    label: [],
    rotate: 0,
    barWidth: 12,
    unit: '',
    title: '',
    legendPosition: 'bottom',
    legendSize: 12,
    left: 0,
    right: 40,
    showLabel: true,
    xAxisFontSize: 14,
    xMax: null,
    yAxisFontSize: 14,
    yMax: null,
    maxValue: 0,
    splitColor: ''
  }, config)
  let top = 10
  let bottom = 10
  // function sortprice (a, b) {
  //   return a.value - b.value
  // }
  // window.console.log(data, '这是双柱图里的data')
  for (let i = 0; i < data.length; i++) {
    let item = data[i]
    const thisColor = colors[i % colorlen]
    item.name && legend.push(item.name)
    // data[i].list.sort(sortprice)
    if (item.type === 'bar') {
      series.push({
        name: data[i].name,
        type: 'bar',
        barWidth: echartFontSize(opt.barWidth),
        data: data[i].list,
        label: { normal: { show: opt.showLabel, position: 'right', fontSize: echartFontSize(10), color: '#efefef' } },
        itemStyle: { normal: { color: thisColor } }
      })
    } else {
      series.push({
        name: item.name,
        symbol: 'emptyCircle',
        symbolSize: echartFontSize(7),
        smooth: true,
        showSymbol: true,
        type: 'line',
        data: item.list,
        itemStyle: { normal: { color: thisColor } }
      })
    }
  }
  if (opt.label.length) {
    label = opt.label
  } else {
    for (let i = 0; i < data[0].list.length; i++) {
      let item = data[0].list[i]
      label.push(item.name)
    }
  }
  let pos = opt.legendPosition.split(' ')
  let legendPos = { left: 'center' }
  if (pos.length > 1) {
    const hori = pos[1]
    if (hori === 'left') legendPos = { left: 0 }
    else if (hori === 'right') legendPos = { right: 0 }
  }
  const veri = pos[0]
  if (legend.length) {
    if (veri === 'bottom') {
      bottom = bottom + 20
      legendPos = Object.assign({}, legendPos, { bottom: echartFontSize(10) })
    } else if (veri === 'top') {
      top = top + 20
      legendPos = Object.assign({}, legendPos, { top: 0 })
    }
  }
  return {
    title: { show: !!opt.title, text: opt.title, icon: 'circle', left: 'center', textStyle: { color: '#989898', fontSize: echartFontSize(16) } },
    legend: { data: legend, itemWidth: echartFontSize(10), itemHeight: echartFontSize(10), textStyle: { color: '#989898', fontSize: echartFontSize(opt.legendSize) }, ...legendPos },
    tooltip: { show: true, trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: [
      {
        show: false,
        left: 0,
        top: echartFontSize(top),
        bottom: echartFontSize(bottom),
        width: '65%',
        containLabel: true
      },
      {
        show: false,
        left: 0,
        top: echartFontSize(top),
        bottom: echartFontSize(bottom),
        width: '0'
      },
      {
        show: false,
        right: echartFontSize(20),
        top: echartFontSize(top),
        bottom: echartFontSize(bottom),
        width: '30.5%',
        containLabel: true
      }
    ],
    xAxis: [
      {
        type: 'value',
        triggerEvent: true,
        inverse: true,
        max: opt.maxValue,
        // minInterval: 1,
        axisLine: {
          show: false,
          lineStyle: {
            color: '#6B787B',
            type: 'dashed',
            width: echartFontSize(1)
          }
        },
        axisTick: {
          show: false
        },
        position: 'bottom',
        axisLabel: {
          show: true,
          textStyle: {
            color: '#BFDAEB',
            fontSize: echartFontSize(14)
          }
        },
        splitLine: { show: true, lineStyle: { width: echartFontSize(1), opacity: 0.4, color: '#ffffff', type: 'dashed' } },
        splitNumber: 3
      },
      {
        gridIndex: 1,
        show: false
      },
      {
        gridIndex: 2,
        type: 'value',
        max: opt.maxValue,
        axisLine: {
          show: false,
          lineStyle: {
            color: '#6B787B',
            type: 'dashed',
            width: echartFontSize(1)
          }
        },
        axisTick: {
          show: false
        },
        position: 'bottom',
        axisLabel: {
          show: true,
          textStyle: {
            color: '#BFDAEB',
            fontSize: echartFontSize(14)
          }
        },
        splitLine: { show: true, lineStyle: { width: echartFontSize(1), opacity: 0.4, color: '#ffffff', type: 'dashed' } },
        // minInterval: 1,
        splitNumber: 3
      }
    ],
    yAxis: [
      {
        type: 'category',
        inverse: true,
        position: 'left',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#BFDAEB',
            fontSize: echartFontSize(14)
          }
        },
        data: data[0].list[0].label
      },
      {
        gridIndex: 1,
        type: 'category',
        inverse: true,
        position: 'left',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false,
          textStyle: {
            color: '#ffffff',
            fontSize: echartFontSize(14)
          }
        }
      },
      {
        gridIndex: 2,
        type: 'category',
        inverse: true,
        position: 'left',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false,
          textStyle: {
            color: '#BFDAEB',
            fontSize: echartFontSize(14)
          }
        },
        data: data[0].list[0].label
      }
    ],
    series: [
      {
        name: '男',
        type: 'bar',
        stack: 'one',
        barGap: echartFontSize(20),
        barWidth: echartFontSize(12),
        label: {
          normal: {
            show: false,
            position: 'left',
            textStyle: {
              color: '#fff',
              fontSize: echartFontSize(12)
            }
          },
          emphasis: {
            show: false,
            position: 'left',
            offset: [0, 0],
            textStyle: {
              color: '#fff',
              fontSize: echartFontSize(12)
            }
          }
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
              offset: 1,
              color: 'rgba(77,146,250,1)'
            },
              {
                offset: 0,
                color: 'rgba(92,206,255,1)'
              }
            ])
          },
          emphasis: {
            opacity: 1
          }
        },
        data: data[0].list[0].value
      },
      {
        name: '女',
        stack: 'right',
        type: 'bar',
        barGap: echartFontSize(20),
        barWidth: echartFontSize(12),
        xAxisIndex: 2,
        yAxisIndex: 2,
        label: {
          normal: {
            show: false,
            position: 'right',
            textStyle: {
              color: '#fff',
              fontSize: echartFontSize(12)
            }
          },
          emphasis: {
            show: false,
            position: 'right',
            offset: [0, 0],
            textStyle: {
              color: '#fff',
              fontSize: echartFontSize(12)
            }
          }
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
              offset: 1,
              color: 'rgba(253,172,89,1)'
            },
              {
                offset: 0,
                color: 'rgba(255,207,137,1)'
              }
            ])
          },
          emphasis: {
            opacity: 1
          }
        },
        data: data[0].list[1].value
      }
    ]
  }
}
