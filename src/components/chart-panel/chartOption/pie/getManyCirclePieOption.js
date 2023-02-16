import { echartFontSize } from '@/utils/echartFlexible'
export function getManyCirclePieOption (data, color, defaultData, config) {
  let legend = []
  const opt = Object.assign({
    radius: ['55%', '70%'],
    center: ['50%', '50%'],
    fontSize: echartFontSize(14),
    labelShow: true,
    name: '',
    icon: '',
    iconSize: echartFontSize(32),
    legendShow: false,
    total: 0,
    legendPos: {
      orient: 'vertical',
      right: echartFontSize(40),
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
    tooltip: { show: true, trigger: 'item', axisPointer: { type: 'shadow' } },
    title: [{
      text: opt.total,
      x: 'center',
      top: '32%',
      textStyle: {
        color: '#0EBEBF',
        fontFamily: 'Agency-FB-Bold',
        fontSize: echartFontSize(36),
        fontWeight: '400'
      }
    }, {
      text: '居民总数',
      x: 'center',
      top: '50%',
      textStyle: {
        fontSize: echartFontSize(18),
        color: '#fff',
        fontWeight: '400'
      }
    }],
    legend: { show: opt.legendShow, data: legend, itemWidth: echartFontSize(10), itemHeight: echartFontSize(10), textStyle: { color: '#989898' }, ...opt.legendPos },
    series: [
      {
        name: '',
        type: 'pie',
        hoverAnimation: false,
        legendHoverLink: false,
        startAngle: 0,
        endAngle: 360,
        clockwise: false,
        roseType: opt.roseType,
        cursor: 'default',
        radius: ['35%', '70%'],
        center: opt.center,
        color: [
          'rgba(50,162,255, .1)',
          'rgba(255,231,119, .1)',
          'rgba(53,255,201, .1)',
          'rgba(24,214,255, .1)'
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
        data: defaultData
      },
      {
        name: '',
        type: 'pie',
        zlevel: 2,
        cursor: 'default',
        startAngle: 0,
        endAngle: 360,
        clockwise: false,
        roseType: opt.roseType,
        hoverAnimation: false,
        legendHoverLink: false,
        radius: ['45%', '70%'],
        center: opt.center,
        color: [
          'rgba(50,162,255, .5)',
          'rgba(255,231,119, .5)',
          'rgba(53,255,201, .5)',
          'rgba(24,214,255, .5)'
        ],
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        tooltip: {
          show: false
        },
        data: defaultData
      },
      {
        type: 'pie',
        name: data.name,
        radius: opt.radius,
        center: opt.center,
        zlevel: 3,
        startAngle: 0,
        endAngle: 360,
        clockwise: false,
        roseType: opt.roseType,
        hoverAnimation: false,
        label: {
          show: opt.labelShow,
          rich: {
            name: { fontSize: echartFontSize(16), fontWeight: 400, color: '#fff', lineHeight: echartFontSize(30) },
            value: { fontSize: echartFontSize(24), fontFamily: 'Agency-FB-Bold', fontWeight: 400, color: '#0EBEBF', lineHeight: echartFontSize(20) }
          },
          formatter: (params) => {
            return '\n' + '{name|' + params.name + '}' + '\n' + '{value|' + params.value + '}' + '{name| 人 }' + '\n'
          },
          padding: [echartFontSize(0), echartFontSize(-50)]
        },
        labelLine: { show: true, length: echartFontSize(20), length2: echartFontSize(50), lineStyle: { color: '#6EBACF' } },
        data: datalist
      }
    ]
  }
  if (opt.formatTooltip) {
    option.tooltip = opt.formatTooltip
  }
  return option
}
