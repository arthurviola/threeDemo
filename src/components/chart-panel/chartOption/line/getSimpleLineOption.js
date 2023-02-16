import echarts from 'echarts'
import { echartFontSize } from '@/utils/echartFlexible'
export const colorToOpacity = (color, opacity = 1) => {
  if (color) {
    const parseColor = echarts.color.parse(color).slice(0, 3).join(',')
    return `rgba(${parseColor}, ${opacity})`
  }
}
export function getSimpleLineOption (data, colors, config) {
  let label = []
  let legend = []
  colors = colors || ['#13c0c4', '#1592ff']
  const colorlen = colors.length
  let series = []
  const opt = Object.assign({
    formatTooltip: false,
    yLabelFormatter: null,
    label: [],
    top: 80,
    bottom: 20,
    right: 20,
    rotate: 0,
    scope: 140,
    showData: false,
    smooth: false,
    showArea: false,
    legendShow: true,
    unit: '',
    interval: 0,
    legendTop: 20,
    legendLeft: 0
  }, config)
  for (let i = 0; i < data.length; i++) {
    const thisColor = colors[i % colorlen]
    legend.push(data[i].name)
    series.push({
      name: data[i].name,
      symbol: 'circle',
      smooth: opt.smooth,
      showSymbol: true,
      symbolSize: echartFontSize(6),
      type: 'line',
      data: data[i].list,
      itemStyle: { normal: { color: thisColor } },
      lineStyle: { width: echartFontSize(2), color: colorToOpacity(thisColor, 0.8) },
      label: {
        normal: {
          show: opt.showData,
          position: 'top',
          padding: [10, 0, 0, 0],
          fontSize: echartFontSize(14),
          fontWeight: 'bold',
          color: '#ffffff'
        }
      },
      areaStyle: {
        normal: {
          show: opt.showArea,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: thisColor },
            { offset: 0.8, color: colorToOpacity(thisColor, 0.1) },
            { offset: 1, color: colorToOpacity(thisColor, 0) }
          ]),
          opacity: 0.6
        }
      }
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
  let option = {
    legend: {
      show: opt.legendShow,
      data: legend,
      align: 'left',
      left: echartFontSize(opt.legendLeft),
      itemWidth: echartFontSize(10),
      itemHeight: echartFontSize(10),
      tooltip: { show: true },
      top: echartFontSize(opt.legendTop),
      width: echartFontSize(420),
      textStyle: { color: '#FFF', fontSize: echartFontSize(16) },
      formatter: function (name) {
        if (!name) return ''
        if (name.length > 4) {
          name = name.slice(0, 4) + '..'
        }
        return name
      }
    },
    tooltip: { show: true, trigger: 'axis', axisPointer: { type: 'line' } },
    grid: { left: echartFontSize(12), top: echartFontSize(opt.top), bottom: echartFontSize(opt.bottom), right: echartFontSize(opt.right), containLabel: true },
    dataZoom: [{
      type: 'slider',
      show: false,
      xAxisIndex: [0],
      start: 1,
      end: opt.scope,
      zoomLock: false
    }, {
      type: 'inside',
      xAxisIndex: [0],
      start: 1,
      end: 20,
      zoomLock: false
    }],
    yAxis: {
      name: opt.unit,
      nameTextStyle: { color: '#FFF', fontSize: echartFontSize(12) },
      type: 'value',
      axisLabel: { show: true,
        formatter: opt.yLabelFormatter,
        textStyle: { color: '#99BBCE', fontSize: echartFontSize(14) } },
      axisLine: { show: true, lineStyle: { color: '#667884', width: echartFontSize(2) } },
      axisTick: { show: false },
      splitArea: { show: false },
      splitLine: { show: true, lineStyle: { width: echartFontSize(1), opacity: 0.4, color: '#ffffff', type: 'dashed' } }
    },
    xAxis: {
      type: 'category',
      min: 0,
      nameTextStyle: { color: '#99BBCE', fontSize: echartFontSize(12) },
      axisLabel: { margin: echartFontSize(15), textStyle: { color: '#99BBCE', fontSize: echartFontSize(14) }, interval: opt.interval, rotate: opt.rotate },
      axisLine: { show: true, lineStyle: { color: '#667884', width: echartFontSize(2) } },
      splitLine: { show: false },
      axisTick: { show: false },
      boundaryGap: false,
      data: label
    },
    series: series
  }
  if (opt.formatTooltip) {
    option.tooltip = opt.formatTooltip
  }
  return option
}
