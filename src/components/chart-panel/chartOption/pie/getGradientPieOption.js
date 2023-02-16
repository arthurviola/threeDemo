import { echartFontSize } from '@/utils/echartFlexible'
export function getGradientPieOption (data, color, config) {
  let legend = []
  const opt = Object.assign({
    radius: ['58%', '80%'],
    center: ['50%', '50%'],
    fontSize: echartFontSize(14),
    labelShow: true,
    name: '',
    icon: '',
    iconSize: echartFontSize(32),
    legendShow: false,
    legendPos: {
      orient: 'vertical',
      right: echartFontSize(40),
      itemGap: echartFontSize(10),
      top: 'center'
    }
  }, config)
  console.log(opt.icon, '看下这个')
  const colorLen = color.length
  const datalist = data.map((item, index) => {
    legend.push(item.name)
    return Object.assign({}, item, { itemStyle: { color: color[index % colorLen] } })
  })
  let option = {
    tooltip: { show: false, trigger: 'axis', axisPointer: { type: 'shadow' } },
    title: { show: false, text: opt.title, icon: 'circle', left: 'center', textStyle: { color: '#fff', fontSize: 16 } },
    legend: { show: opt.legendShow, data: legend, itemWidth: echartFontSize(10), itemHeight: echartFontSize(10), textStyle: { color: '#989898' }, ...opt.legendPos },
    series: [{
      type: 'pie',
      name: data.name,
      radius: opt.radius,
      center: opt.center,
      startAngle: 0,
      endAngle: 360,
      clockwise: false,
      roseType: opt.roseType,
      hoverAnimation: false,
      label: {
        show: opt.labelShow,
        fontSize: echartFontSize(opt.fontSize),
        rich: {
          name: { fontSize: echartFontSize(14), fontWeight: 400, color: '#fff', lineHeight: echartFontSize(24) },
          value: { fontSize: echartFontSize(14), fontWeight: 400, color: '#fff' }
        },
        position: 'outside',
        formatter: function (params) {
          console.log(params, '看下这里面有啥值')
          return ('\n' + '{name|' + params.name + '}' + '\n' + '{value|' + params.value + '}' + '\n')
        }
      },
      labelLine: { show: true, length: echartFontSize(5), length2: echartFontSize(20), lineStyle: { color: '#6EBACF' } },
      data: datalist,
      markPoint: {
        data: [{
          symbol: opt.icon ? 'image://' + opt.icon : 'circle',
          symbolSize: opt.iconSize ? opt.iconSize : 0,
          name: 'icon',
          x: '50%',
          y: '50%',
          itemStyle: {
            color: 'transparent'
          },
          value: data.value,
          label: {
            normal: {
              show: !opt.icon,
              fontSize: echartFontSize(24),
              color: '#0CF6B9',
              formatter (params) {
                return Math.round(params.value * 100) + '%'
              }
            }
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
