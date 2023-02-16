import { echartFontSize } from '@/utils/echartFlexible'
export function getHighLightDataPieOption (data, color, config) {
  let legend = []
  const opt = Object.assign({
    radius: ['55%', '70%'],
    center: ['35%', '50%'],
    fontSize: echartFontSize(10),
    labelShow: false,
    name: '',
    title: '',
    icon: '',
    total: 0,
    iconSize: echartFontSize(30),
    legendShow: true,
    orient: 'vertical',
    right: 30,
    itemGap: 20,
    top: 'center',
    animation: true,
    align: 'left'
  }, config)
  console.log(opt.icon, '看下这个')
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
    title: [{
      text: '特殊人群',
      x: '25%',
      top: '53%',
      textStyle: {
        fontSize: echartFontSize(18),
        color: '#fff',
        fontWeight: '400'
      }
    }],
    legend: { show: opt.legendShow, data: legend, height: '100%', width: '100%', itemWidth: echartFontSize(10), itemHeight: echartFontSize(10), textStyle: { color: '#ffffff', fontSize: echartFontSize(14) }, orient: opt.orient, right: echartFontSize(opt.right), itemGap: echartFontSize(opt.itemGap), top: opt.top, align: opt.align },
    series: [{
      type: 'pie',
      name: data.name,
      radius: opt.radius,
      center: opt.center,
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
      // emphasis: {
      //   itemStyle: {
      //     // 改变阴影大小
      //     // shadowBlur: 10,
      //     shadowOffsetX: 0
      //     // shadowColor: 'rgba(0, 0, 0, 0.5)'
      //   }
      // },
      labelLine: { show: false, length: 5, length2: echartFontSize(30), lineStyle: { color: '#6EBACF' } },
      data: datalist,
      markPoint: {
        silent: true,
        data: [{
          symbol: opt.icon ? 'image://' + opt.icon : 'circle',
          symbolSize: opt.iconSize ? opt.iconSize : 0,
          // name: 'icon',
          x: opt.center[0],
          y: '45%',
          itemStyle: {
            color: 'transparent'
          },
          value: opt.value,
          label: {
            normal: {
              show: !opt.icon,
              fontSize: echartFontSize(36),
              fontFamily: 'Agency-FB-Bold',
              fontWeight: 400,
              color: '#0EBEBF',
              formatter (params) {
                return params.value
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
