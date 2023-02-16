import { echartFontSize } from '@/utils/echartFlexible'
export function getBuffPieOption (data, colors, total) {
  colors = colors || ['#FF00FF', 'rgba(255, 0, 255,0.3)']
  const center = ['50%', '50%']
  let list = [{
    value: data.value,
    itemStyle: {
      color: colors[0]
    }
  }, {
    value: total - data.value,
    itemStyle: {
      color: colors[1]
    },
    label: {
      show: false
    }
  }]
  return {
    title: { text: data.name || '', left: 'center', bottom: 0, textStyle: { fontSize: echartFontSize(13), color: '#FFFFFF' } },
    series: [{
      name: 'center',
      type: 'pie',
      radius: [0, 30],
      center: center,
      data: [{ value: 1 }],
      itemStyle: { color: colors[0] },
      label: { normal: { show: false } },
      hoverAnimation: false
    }, {
      name: 'bg',
      type: 'pie',
      radius: [0, 52],
      center: center,
      data: [{ value: 1 }],
      itemStyle: { color: colors[1] },
      label: { normal: { show: false } },
      hoverAnimation: false
    }, {
      type: 'pie',
      name: data.name,
      radius: ['50', '52'],
      center: center,
      startAngle: 180,
      label: {
        position: 'center',
        formatter: '{d}%',
        fontSize: echartFontSize(19),
        color: '#FFF'
      },
      data: list,
      hoverAnimation: false
    }]
  }
}
