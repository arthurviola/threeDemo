import { echartFontSize } from '@/utils/echartFlexible'
export function getSimplePieOption (data, color, total, config) {
  const bgColor = '#3E577F'
  color = color || '#00FF00'
  let list = [{
    value: data.value,
    itemStyle: {
      color: color
    }
  }, {
    value: data.value ? total - data.value : 1,
    itemStyle: {
      color: bgColor
    },
    label: {
      show: false
    }
  }]
  const opt = Object.assign({
    radius: ['50', '52']
  }, config)
  const labelPadding = data.img ? [0, 0, 30, 0] : [0, 0, 0, 0]
  return {
    title: { text: data.name || '', left: 'center', bottom: 0, textStyle: { fontSize: echartFontSize(14), color: '#FFFFFF' } },
    series: [{
      type: 'pie',
      name: data.name,
      radius: opt.radius,
      hoverAnimation: false,
      center: ['50%', '50%'],
      clockwise: false,
      startAngle: 90,
      markPoint: {
        show: false,
        symbolOffset: [5, 0],
        data: [{
          symbol: data.img ? 'image://' + data.img : 'none',
          symbolSize: [27, 27],
          name: '男性',
          symbolOffset: [0, 0],
          x: '50%',
          y: echartFontSize(60),
          label: {
            normal: {
              show: false
            }
          }
        }]
      },
      label: {
        position: 'center',
        formatter: '{c|{c}}',
        fontSize: echartFontSize(12),
        padding: 0,
        rich: { c: { fontSize: echartFontSize(30), padding: labelPadding } }
      },
      data: list
    }]
  }
}
