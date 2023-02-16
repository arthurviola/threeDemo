import { echartFontSize } from '@/utils/echartFlexible'
export function getLinePieOption (data, color, config) {
  let legend = []
  const opt = Object.assign({
    radius: ['55%', '66%'],
    center: ['50%', '50%'],
    fontSize: echartFontSize(10),
    labelShow: true,
    name: '',
    legendShow: false,
    legendPos: {
      orient: 'vertical',
      right: 0,
      itemGap: echartFontSize(10),
      top: 'center'
    }
  }, config)
  const colorLen = color.length
  const datalist = data.map((item, index) => {
    legend.push(item.name)
    return Object.assign({}, item, { itemStyle: { color: color[index % colorLen] } })
  })
  let option = {
    tooltip: { show: false, trigger: 'axis', axisPointer: { type: 'shadow' } },
    title: { show: false, text: opt.title, icon: 'circle', left: 'center', textStyle: { color: '#fff', fontSize: 12 } },
    legend: { show: opt.legendShow, data: legend, itemWidth: echartFontSize(10), itemHeight: echartFontSize(10), textStyle: { color: '#989898' }, ...opt.legendPos },
    series: [{
      type: 'pie',
      name: data.name,
      radius: opt.radius,
      center: opt.center,
      clockwise: false,
      roseType: opt.roseType,
      hoverAnimation: false,
      label: {
        show: opt.labelShow,
        fontSize: echartFontSize(opt.fontSize),
        rich: {
          value: { fontSize: echartFontSize(10), fontWeight: 400 }
        },
        position: 'outside',
        formatter: function (params) {
          return ('{value|' + params.value + '}')
        }
      },
      labelLine: { show: false, length: 5, length2: 0 },
      data: datalist,
      markPoint: {
        data: [{
          name: opt.name,
          symbol: 'circle',
          x: opt.center[0],
          y: opt.center[1],
          label: {
            show: true,
            fontSize: echartFontSize(12),
            color: '#FFF',
            formatter: '{b}'
          },
          itemStyle: {
            color: 'transparent'
          }
        }]
      }
    }]
  }
  if (opt.formatTooltip) {
    option.tooltip = opt.formatTooltip
  }
  return option
}
