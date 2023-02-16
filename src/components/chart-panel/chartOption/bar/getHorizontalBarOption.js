import { echartFontSize } from '@/utils/echartFlexible'
export function getHorizontalBarOption (data, colors, config) {
  let label = []
  let legend = []
  colors = colors || '#FFB717'
  let series = []
  const opt = Object.assign({
    label: []
  }, config)
  const total = data.list.reduce((sum, item) => { return sum + item.value }, 0)
  legend.push(data.name)
  series.push({
    name: data.name,
    type: 'bar',
    barWidth: echartFontSize(10),
    data: data.list,
    label: {
      normal: {
        show: true,
        textStyle: {
          color: '#FFF',
          fontSize: echartFontSize(12)
        },
        position: 'right',
        formatter: (params) => {
          return params.value + '  ' + (params.value / total * 100).toFixed(2) + '%'
        }
      }
     },
    itemStyle: { normal: { color: colors } }
  })
  if (opt.label.length) {
    label = opt.label
  } else {
    for (let i = 0; i < data.list.length; i++) {
      const item = data.list[i]
      label.push(item.name)
    }
  }
  return {
    legend: { data: legend, itemWidth: echartFontSize(10), itemHeight: echartFontSize(10) },
    tooltip: { show: true, trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: echartFontSize(12), top: 0, bottom: 0, right: echartFontSize(80), containLabel: true },
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
      inverse: true,
      axisLabel: { margin: echartFontSize(5), textStyle: { color: '#FFF', fontSize: echartFontSize(12) }, interval: 0 },
      axisLine: { show: false },
      splitLine: { show: false },
      axisTick: { show: false },
      data: label
    },
    series: series
  }
}
