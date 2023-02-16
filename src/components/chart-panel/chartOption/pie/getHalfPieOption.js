import { echartFontSize } from '@/utils/echartFlexible'
export function getHalfPieOption (data, color, config) {
  let legend = []
  const opt = Object.assign({
    radius: ['65%', '90%'],
    center: ['50%', '50%'],
    fontSize: echartFontSize(10),
    labelShow: false,
    name: '',
    title: '',
    icon: '',
    iconSize: 30,
    legendShow: false,
    markPointY: '30%',
    legendPos: {
      orient: 'vertical',
      right: echartFontSize(20),
      itemGap: echartFontSize(20),
      top: 'center',
      align: 'left'
    }
  }, config)
  console.log(opt.icon, '看下这个')
  const colorLen = color.length
  const datalist = data.map((item, index) => {
    legend.push(item.name)
    return Object.assign({}, item, { itemStyle: { color: color[index % colorLen] } })
  })
  let option = {
    tooltip: {
      show: false,
      trigger: 'item',
      axisPointer: { type: 'shadow' },
      formatter: '{b}<br />{c}, {d}%'
    },
    title: { show: false, text: opt.value, left: '35%', top: '50%', textStyle: { color: '#fff', fontSize: echartFontSize(20), fontWeight: 700 } },
    legend: { show: opt.legendShow, data: legend, itemWidth: echartFontSize(10), itemHeight: echartFontSize(10), textStyle: { color: '#ffffff' }, ...opt.legendPos },
    series: [{
      type: 'pie',
      name: data.name,
      radius: opt.radius,
      center: opt.center,
      clockwise: false,
      roseType: opt.roseType,
      startAngle: 0,
      endAngle: 180,
      hoverAnimation: false,
      label: {
        show: opt.labelShow,
        fontSize: opt.fontSize,
        rich: {
          name: { fontSize: echartFontSize(14), fontWeight: 400, color: '#fff', lineHeight: echartFontSize(24) },
          value: { fontSize: echartFontSize(14), fontWeight: 400, color: '#fff' }
        },
        position: 'outside',
        formatter: function (params) {
          console.log(params, '看下这里面有啥值')
          return ('{name|' + params.name + '}' + '\n' + '{value|' + params.value + '}')
        }
      },
      labelLine: { show: false, length: echartFontSize(5), length2: echartFontSize(30), lineStyle: { color: '#6EBACF' } },
      data: datalist,
      markPoint: {
        silent: true,
        data: [{
          symbol: opt.icon ? 'image://' + opt.icon : 'circle',
          symbolSize: opt.iconSize ? echartFontSize(opt.iconSize) : 0,
          // name: 'icon',
          x: '50%',
          y: '40%',
          itemStyle: {
            color: 'transparent'
          },
          value: opt.value,
          label: {
            normal: {
              show: !opt.icon,
              fontSize: echartFontSize(18),
              fontWeight: 700,
              color: '#0AF6E2',
              formatter (params) {
                return opt.value + '%'
              }
            }
          }
        }]
      }
    },
      {
        name: '',
        type: 'pie',
        hoverAnimation: false,
        legendHoverLink: false,
        startAngle: 0,
        endAngle: 180,
        clockwise: false,
        roseType: opt.roseType,
        cursor: 'default',
        radius: ['65%', '100%'],
        center: opt.center,
        color: [
          'rgba(255,207,137, .3)',
          'rgba(77,146,250, .3)',
          'rgba(77,146,250, 0)'
        ],
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        zlevel: 1,
        tooltip: {
          show: false
        },
        data: data
      }]
  }
  if (opt.formatTooltip) {
    option.tooltip = opt.formatTooltip
  }
  return option
}
