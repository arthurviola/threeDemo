import { echartFontSize } from '@/utils/echartFlexible'
export function getCarouselHighLightPieOption (data, color, config) {
  let legend = []
  const opt = Object.assign({
    radius: ['45%', '60%'],
    center: ['35%', '50%'],
    fontSize: echartFontSize(10),
    labelShow: false,
    name: '',
    total: 0,
    icon: '',
    iconSize: echartFontSize(30),
    legendShow: true,
    orient: 'vertical',
    right: 30,
    itemGap: 20,
    top: 'center',
    animation: true,
    align: 'left'
  }, config)
  const colorLen = color.length
  const datalist = data.map((item, index) => {
    legend.push(item.name)
    return Object.assign({}, item, { itemStyle: { color: color[index % colorLen] }, emphasis: { itemStyle: { shadowColor: color[index % colorLen], shadowBlur: echartFontSize(20) } } })
  })
  let option = {
    animation: opt.animation,
    tooltip: {
      show: true,
      trigger: 'item',
      axisPointer: { type: 'shadow' },
      formatter: '{b}<br />{c} | {d}%'
    },
    title: {
      show: false,
      text: opt.total,
      x: 'center',
      top: '40%',
      textStyle: {
        color: '#0EBEBF',
        fontFamily: 'Agency-FB-Bold',
        fontSize: echartFontSize(24),
        fontWeight: '400'
      }
    },
    legend: { show: opt.legendShow, data: legend, height: '100%', width: '100%', itemWidth: echartFontSize(10), itemHeight: echartFontSize(10), textStyle: { fontSize: echartFontSize(14), color: '#ffffff' }, orient: opt.orient, right: echartFontSize(opt.right), itemGap: echartFontSize(opt.itemGap), top: opt.top, align: opt.align },
    series: [{
      type: 'pie',
      name: data.name,
      radius: opt.radius,
      center: opt.center,
      hoverOffset: echartFontSize(5),
      // clockwise: false,
      // roseType: opt.roseType,
      startAngle: 180,
      endAngle: 0,
      // hoverAnimation: false,
      label: {
        show: opt.labelShow,
        fontSize: echartFontSize(opt.fontSize),
        rich: {
          name: { fontSize: echartFontSize(14), fontWeight: 400, color: '#fff', lineHeight: echartFontSize(24) },
          value: { fontSize: echartFontSize(14), fontWeight: 400, color: '#fff' }
        },
        position: 'outside',
        formatter: function (params) {
          return ('{name|' + params.name + '}' + '\n' + '{value|' + params.value + '}')
        }
      },
      labelLine: { show: false, length: 5, length2: echartFontSize(30), lineStyle: { color: '#6EBACF' } },
      data: datalist
      // markPoint: {
      //   silent: true,
      //   data: [{
      //     symbol: opt.icon ? 'image://' + opt.icon : 'circle',
      //     symbolSize: opt.iconSize ? opt.iconSize : 0,
      //     // name: 'icon',
      //     x: opt.center[0],
      //     y: opt.center[1],
      //     itemStyle: {
      //       color: 'transparent'
      //     },
      //     value: opt.value,
      //     label: {
      //       normal: {
      //         show: !opt.icon,
      //         fontSize: echartFontSize(20),
      //         fontWeight: 700,
      //         color: '#ffffff',
      //         formatter (params) {
      //           return params.value
      //         }
      //       }
      //     }
      //   }]
      // }
    }]
  }
  if (opt.formatTooltip) {
    option.tooltip = opt.formatTooltip
  }
  return option
}
