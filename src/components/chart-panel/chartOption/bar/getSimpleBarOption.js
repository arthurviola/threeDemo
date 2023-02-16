import { echartFontSize } from '@/utils/echartFlexible'
export function getSimpleBarOption (data, colors, config) {
  let label = []
  let legend = []
  colors = colors || ['#33E5FE']
  const colorlen = colors.length
  let series = []
  const opt = Object.assign({
    label: [],
    unit: ''
  }, config)
  let top = 60
  if (opt.unit) top = 80
  for (let i = 0; i < data.length; i++) {
    data[i].name && legend.push(data[i].name)
    series.push({
      name: data[i].name,
      type: 'bar',
      barWidth: echartFontSize(12),
      data: data[i].list,
      label: { normal: { show: false } },
      itemStyle: { normal: { color: colors[i % colorlen] } }
    })
  }
  if (opt.label.length) {
    label = opt.label
  } else {
    for (let i = 0; i < data[0].list.length; i++) {
      const item = data[0].list[i]
      label.push(item.name)
    }
  }
  const option = {
    legend: { data: legend, top: echartFontSize(20), itemWidth: echartFontSize(10), itemHeight: echartFontSize(10), textStyle: { color: '#FFF', fontSize: echartFontSize(12) } },
    tooltip: { show: true, trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: echartFontSize(12), top: echartFontSize(top), bottom: echartFontSize(20), right: echartFontSize(20), containLabel: true },
    yAxis: {
      name: opt.unit,
      nameTextStyle: { color: '#FFF', fontSize: echartFontSize(12) },
      type: 'value',
      axisLabel: { show: true, textStyle: { color: '#fff', fontSize: echartFontSize(15) } },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: true, lineStyle: { color: '#6D6D6D', type: 'dashed' } },
      splitArea: { show: false }
    },
    xAxis: {
      type: 'category',
      min: 0,
      axisLabel: { margin: echartFontSize(15), textStyle: { color: '#FFF', fontSize: echartFontSize(12) }, interval: 0 },
      axisLine: { show: true, lineStyle: { color: '#6D6D6D' } },
      splitLine: { show: false },
      axisTick: { show: false },
      data: label
    },
    series: series
  }
  return option
}
