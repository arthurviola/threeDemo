import { echartFontSize } from '@/utils/echartFlexible'
export function getDoubleLineAndBarOption (data, colors, config) {
  let label = []
  let legend = []
  colors = colors || ['#017DEC', '#2FC25B']
  const colorlen = colors.length
  let series = []
  const opt = Object.assign({
    label: [],
    rotate: 0,
    barWidth: 16,
    unit: '人',
    title: '',
    legendPosition: 'top',
    legendSize: 12,
    left: 10,
    right: 10,
    top: 0,
    showLabel: true,
    xAxisFontSize: 14,
    xMax: null,
    yAxisFontSize: 14,
    yMax: null,
    splitColor: ''
  }, config)
  let bottom = 10
  label = data[0].list[0].list
  // window.console.log(data[0].list, '看下data里的value怎么分')
  for (let i = 0; i < data[0].list.length; i++) {
    let item = data[0].list[i]
    const thisColor = colors[i % colorlen]
    item.name && legend.push(item.name)
    series.push({
      name: data[0].list[i].name,
      type: 'bar',
      barWidth: echartFontSize(opt.barWidth),
      data: data[0].list[i].value,
      label: { normal: { show: opt.showLabel, position: 'top', distance: echartFontSize(7), fontSize: echartFontSize(12), color: '#efefef' } },
      itemStyle: { normal: { color: thisColor } }
    })
  }
  let yData = data[0].list[0].value
  let yData1 = data[0].list[1].value
  series.push({
        name: '上部圆',
        type: 'pictorialBar',
        silent: true,
        symbol: 'diamond',
        symbolSize: [echartFontSize(16), echartFontSize(8)],
        symbolOffset: [echartFontSize(-10), echartFontSize(-4)],
        symbolPosition: 'end',
        z: 12,
        label: {
          normal: {
            show: false,
            position: 'top',
            padding: [0, 22, 0, 0],
            fontSize: echartFontSize(15),
            fontWeight: 'bold',
            color: '#017DEC'
          }
        },
        color: 'rgba(68,178,255, 1)',
        data: yData
      },
      {
        name: '上部圆1',
        type: 'pictorialBar',
        silent: true,
        symbol: 'diamond',
        symbolSize: [echartFontSize(16), echartFontSize(8)],
        symbolOffset: [echartFontSize(10), echartFontSize(-4)],
        symbolPosition: 'end',
        z: 12,
        label: {
          normal: {
            show: false,
            position: 'top',
            fontSize: echartFontSize(15),
            padding: [0, 0, 0, 20],
            fontWeight: 'bold',
            color: '#FFDD34'
          }
        },
        color: 'rgba(255,195,120,1)',
        data: yData1
      },
      {
        name: '底部圆',
        type: 'pictorialBar',
        silent: true,
        symbol: 'diamond',
        symbolSize: [echartFontSize(16), echartFontSize(8)],
        symbolOffset: [echartFontSize(-10), echartFontSize(4)],
        z: 12,
        color: 'rgba(68,178,255, 1)',
        data: yData
      },
      {
        name: '底部圆1',
        type: 'pictorialBar',
        silent: true,
        symbol: 'diamond',
        symbolSize: [echartFontSize(16), echartFontSize(8)],
        symbolOffset: [echartFontSize(10), echartFontSize(4)],
        z: 12,
        color: 'rgba(255,195,120,1)',
        data: yData1
      })
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
      opt.top = opt.top + 40
      legendPos = Object.assign({}, legendPos, { top: echartFontSize(10) })
    }
  }
  return {
    title: { show: !!opt.title, text: opt.title, icon: 'circle', left: 'center', textStyle: { color: '#989898', fontSize: echartFontSize(16) } },
    legend: { show: false, data: legend, itemWidth: echartFontSize(10), itemHeight: echartFontSize(10), textStyle: { color: '#989898', fontSize: echartFontSize(opt.legendSize) }, ...legendPos },
    tooltip: { show: true, trigger: 'item', axisPointer: { type: 'shadow' } },
    grid: { left: echartFontSize(opt.left), top: echartFontSize(opt.top), bottom: echartFontSize(bottom), right: echartFontSize(opt.right), containLabel: true },
    yAxis: {
      name: opt.unit,
      nameTextStyle: { color: '#BFDAEB', fontSize: echartFontSize(16) },
      // nameGap: 20,
      position: 'top',
      max: opt.yMax,
      type: 'value',
      axisLabel: { show: true, textStyle: { color: '#bfdaeb', fontSize: echartFontSize(opt.yAxisFontSize) } },
      axisLine: { show: true, lineStyle: { color: 'rgba(144, 144, 144, 0.2)' } },
      axisTick: { show: false },
      splitArea: { show: false },
      splitLine: { show: true, lineStyle: { width: echartFontSize(1), opacity: 0.4, color: '#ffffff', type: 'dashed' } }
    },
    xAxis: {
      type: 'category',
      min: 0,
      nameTextStyle: { color: '#FFF', fontSize: echartFontSize(12) },
      axisLabel: { margin: echartFontSize(15), textStyle: { color: '#bfdaeb', fontSize: echartFontSize(opt.xAxisFontSize) }, interval: 0, rotate: opt.rotate },
      axisLine: { show: true, lineStyle: { color: 'rgba(144, 144, 144, 0.2)' } },
      splitLine: { show: false },
      axisTick: { show: false },
      data: label
    },
    series: series
  }
}
