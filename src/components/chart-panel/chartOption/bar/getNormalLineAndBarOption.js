import { echartFontSize } from '@/utils/echartFlexible'
export function getNormalLineAndBarOption (data, colors, config) {
  let label = []
  let legend = []
  colors = colors || ['#1890FF', '#2FC25B']
  const colorlen = colors.length
  let series = []
  const opt = Object.assign({
    label: [],
    rotate: 0,
    barWidth: 12,
    barBorderRadius: [0, 0, 0, 0],
    unit: '',
    title: '',
    legendPosition: 'bottom',
    legendSize: 14,
    left: 0,
    right: 10,
    top: 0,
    showLabel: true,
    xAxisFontSize: 16,
    xMax: null,
    yAxisFontSize: 16,
    yMax: null,
    splitColor: '#666E75'
  }, config)
  let bottom = 0
  function sortprice (a, b) {
    return b.value - a.value
  }
  for (let i = 0; i < data.length; i++) {
    let item = data[i]
    const thisColor = colors[i % colorlen]
    item.name && legend.push(item.name)
    data[i].list.sort(sortprice)
    if (item.type === 'bar') {
      series.push({
        name: data[i].name,
        type: 'bar',
        barWidth: echartFontSize(opt.barWidth),
        data: data[i].list,
        label: { normal: { show: opt.showLabel, position: 'top', fontSize: echartFontSize(10), color: '#efefef' } },
        itemStyle: { normal: { color: thisColor, barBorderRadius: opt.barBorderRadius } }
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
      opt.top = opt.top + 20
      legendPos = Object.assign({}, legendPos, { top: 0 })
    }
  }
  return {
    title: { show: !!opt.title, text: opt.title, icon: 'circle', left: 'center', textStyle: { color: '#989898', fontSize: echartFontSize(16) } },
    legend: { data: legend, itemWidth: echartFontSize(10), itemHeight: echartFontSize(10), textStyle: { color: '#989898', fontSize: echartFontSize(opt.legendSize) }, ...legendPos },
    tooltip: { show: true, trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: echartFontSize(opt.left), top: echartFontSize(opt.top), bottom: echartFontSize(bottom), right: echartFontSize(opt.right), containLabel: true },
    yAxis: {
      // name: opt.unit,
      nameTextStyle: { color: '#FFF', fontSize: echartFontSize(12) },
      // nameGap: 20,
      position: 'top',
      max: opt.yMax,
      type: 'value',
      axisLabel: { show: true, textStyle: { color: '#bfdaeb', fontSize: echartFontSize(opt.yAxisFontSize) } },
      axisLine: { show: true, lineStyle: { color: '#666E75', width: echartFontSize(1) } },
      axisTick: { show: false },
      splitArea: { show: false },
      splitLine: { show: true, lineStyle: { width: echartFontSize(1), opacity: 0.4, color: '#ffffff', type: 'dashed' } }
    },
    xAxis: {
      type: 'category',
      min: 0,
      nameTextStyle: { color: '#FFF', fontSize: echartFontSize(12) },
      axisLabel: { margin: echartFontSize(15), textStyle: { color: '#bfdaeb', fontSize: echartFontSize(opt.xAxisFontSize) }, interval: 0, rotate: opt.rotate },
      axisLine: { show: true, lineStyle: { color: '#666E75' } },
      splitLine: { show: false },
      axisTick: { show: false },
      data: label
    },
    series: series
  }
}
