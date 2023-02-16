import { echartFontSize } from '@/utils/echartFlexible'
export function getProgressBarOption (data, colors, config) {
  let label = []
  colors = colors || '#33E5FE'
  const bgColor = '#1F2C44'
  const dataValue = data.map(item => item.value)
  const datamax = Math.max.apply(null, dataValue) + 10
  let series = []
  let maxList = []
  const opt = Object.assign({
    label: [],
    barWidth: 12
  }, config)
  for (let i = 0; i < data.length; i++) {
    maxList.push(datamax)
  }
  series.push({
    type: 'bar',
    data: maxList,
    barWidth: echartFontSize(opt.barWidth),
    silent: true,
    itemStyle: { normal: { color: bgColor } }
  })
  series.push({
    type: 'bar',
    barWidth: echartFontSize(opt.barWidth),
    data: data,
    barGap: '-100%',
    label: {
      normal: {
        show: true,
        textStyle: {
          color: '#FFF',
          fontSize: echartFontSize(16)
        },
        position: 'right'
      }
    },
    itemStyle: { normal: { color: colors } }
  })
  if (opt.label.length) {
    label = opt.label
  } else {
    for (let i = 0; i < data.length; i++) {
      const item = data[i]
      label.push(item.name)
    }
  }
  const option = {
    grid: { left: echartFontSize(12), top: 0, bottom: 0, right: echartFontSize(12), containLabel: true },
    xAxis: {
      type: 'value',
      axisLabel: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      splitArea: { show: false }
    },
    yAxis: {
      type: 'category',
      min: 0,
      axisLabel: { margin: echartFontSize(5), textStyle: { color: '#FFF', fontSize: echartFontSize(16) }, interval: 0 },
      axisLine: { show: false },
      splitLine: { show: false },
      axisTick: { show: false },
      data: label
    },
    series: series
  }
  return option
}
