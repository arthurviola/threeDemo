import { echartFontSize } from '@/utils/echartFlexible'
export function get3DLineAndBarOption (data, colors, config) {
  let label = []
  let legend = []
  colors = colors || ['#1890FF', '#2FC25B']
  const colorlen = colors.length
  let series = []
  const opt = Object.assign({
    label: [],
    rotate: 0,
    barWidth: 12,
    barColor: '',
    unit: [],
    title: '',
    lineColor: '',
    legendPosition: 'bottom',
    legendSize: 12,
    left: 0,
    right: 10,
    top: 0,
    showLabel: true,
    xAxisFontSize: 14,
    xMax: null,
    yAxisFontSize: 14,
    yMax: null,
    isSort: true,
    splitColor: ''
  }, config)
  let bottom = 0
  function sortprice (a, b) {
    return b.value - a.value
  }
  for (let i = 0; i < data.length; i++) {
    let item = data[i]
    const thisColor = colors[i % colorlen]
    item.name && legend.push(item.name)
    if (opt.isSort) {
      data[i].list.sort(sortprice)
    }
    if (item.type === 'bar') {
      series.push({
        name: opt.unit[0],
        type: 'bar',
        barWidth: echartFontSize(opt.barWidth),
        data: data[i].list,
        label: { normal: { show: opt.showLabel, position: 'top', fontSize: echartFontSize(10), color: '#efefef' } },
        itemStyle: { normal: { color: thisColor } }
      })
    } else {
      series.push({
        name: opt.unit[1],
        symbol: 'emptyCircle',
        symbolSize: echartFontSize(7),
        smooth: true,
        showSymbol: true,
        type: 'line',
        data: item.list,
        itemStyle: { normal: { color: opt.lineColor } }
      })
    }
  }
  // window.console.log(data[0].list, '看下这种柱状图里data是啥')
  let yData = data[0].list
  series.push({
        name: '上部圆',
        type: 'pictorialBar',
        silent: true,
        symbol: 'diamond',
        symbolSize: [16, 8],
        symbolOffset: [0, -4],
        symbolPosition: 'end',
        z: 12,
        label: {
          normal: {
            show: false,
            position: 'top',
            padding: [0, 22, 0, 0],
            fontSize: echartFontSize(15),
            fontWeight: 'bold',
            color: opt.barColor
          }
        },
        color: opt.barColor,
        data: yData
      },
      {
        name: '底部圆',
        type: 'pictorialBar',
        silent: true,
        symbol: 'diamond',
        symbolSize: [16, 8],
        symbolOffset: [0, 4],
        z: 12,
        color: opt.barColor,
        data: yData
      }
  )
  // window.console.log(data, '看下data')
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
      opt.top = opt.top + 20
      legendPos = Object.assign({}, legendPos, { top: 0 })
    }
  }
  return {
    title: { show: !!opt.title, text: opt.title, icon: 'circle', left: 'center', textStyle: { color: '#989898', fontSize: echartFontSize(16) } },
    legend: { data: legend, itemWidth: echartFontSize(10), itemHeight: echartFontSize(10), textStyle: { color: '#989898', fontSize: echartFontSize(opt.legendSize) }, ...legendPos },
    tooltip: { show: true, trigger: 'item', axisPointer: { type: 'shadow' } },
    grid: { left: echartFontSize(opt.left), top: echartFontSize(opt.top), bottom: echartFontSize(12), right: echartFontSize(opt.right), containLabel: true },
    yAxis: [{
      type: 'value',
      name: opt.unit[0],
      nameTextStyle: { color: '#FFF', fontSize: echartFontSize(12) },
      nameGap: echartFontSize(10),
      position: 'top',
      yAxisIndex: 0,
      // max: opt.yMax,
      axisLabel: { show: true, textStyle: { color: '#bfdaeb', fontSize: echartFontSize(opt.yAxisFontSize) } },
      axisLine: { show: false },
      axisTick: { show: false },
      splitArea: { show: false },
      splitLine: { show: true, lineStyle: { color: opt.splitColor, type: 'solid' } }
    }, {
      type: 'value',
      name: opt.unit[1],
      nameTextStyle: { color: '#BFDAEB', fontSize: echartFontSize(12) },
      nameGap: echartFontSize(10),
      position: 'top',
      yAxisIndex: 1,
      // max: opt.yMax,
      axisLabel: { show: true, textStyle: { color: '#bfdaeb', fontSize: echartFontSize(opt.yAxisFontSize) } },
      axisLine: { show: false },
      axisTick: { show: false },
      splitArea: { show: false },
      splitLine: { show: true, lineStyle: { color: opt.splitColor, type: 'solid' } }
    }],
    xAxis: {
      type: 'category',
      min: 0,
      nameTextStyle: { color: '#BFDAEB', fontSize: echartFontSize(12) },
      axisLabel: { margin: echartFontSize(15), textStyle: { color: '#bfdaeb', fontSize: echartFontSize(opt.xAxisFontSize) }, interval: 0, rotate: opt.rotate },
      axisLine: { show: true, lineStyle: { color: 'rgba(144, 144, 144, 0.2)' } },
      splitLine: { show: false },
      axisTick: { show: false },
      data: label
    },
    series: series
  }
}
