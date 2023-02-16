// import echarts from 'echarts'
import { echartFontSize } from '@/utils/echartFlexible'
export function getWavePieOption (data, config) {
  const opt = Object.assign({
    // radius: [28, 30],
    // center: ['50%', '50%'],
    // icon: '',
    info: '',
    title: '',
    borderColor: '',
    waveColor: []
  }, config)
  let option = {
    title: [
      {
        text: data,
        left: '45%',
        top: '25%',
        textAlign: 'center',
        textStyle: {
          fontSize: echartFontSize(18),
          fontWeight: '800',
          color: '#fff',
          textAlign: 'center',
          textBorderColor: 'rgba(0, 0, 0, 0)',
          textShadowColor: '#000',
          textShadowBlur: '0',
          textShadowOffsetX: 0,
          textShadowOffsetY: 1
        }
      },
      {
        text: opt.info,
        left: '45%',
        top: '50%',
        textAlign: 'center',
        textStyle: {
          fontSize: echartFontSize(14),
          fontWeight: '400',
          color: '#fff',
          textAlign: 'center',
          textBorderColor: 'rgba(0, 0, 0, 0)',
          textShadowColor: '#000',
          textShadowBlur: '0',
          textShadowOffsetX: 0,
          textShadowOffsetY: 1
        },
      }
    ],
    polar: {
      radius: ['84%', '90%'],
      center: ['50%', '50%']
    },
    angleAxis: {
      max: 100,
      clockwise: false,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitLine: {
        show: false
      },
    },
    radiusAxis: {
      type: 'category',
      show: true,
      axisLabel: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
    },
    series: [
      {
        type: 'liquidFill',
        radius: '76%',
        z: 1,
        center: ['50%', '50%'],
        // amplitude: 20,
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 1,
              color: opt.waveColor[2]
            },
            {
              offset: 0.5,
              color: opt.waveColor[1]
            },
            {
              offset: 0,
              color: opt.waveColor[0]
            }
          ],
          globalCoord: false
        },
        data: [
          0.65
        ],
        backgroundStyle: {
          borderWidth: echartFontSize(1),
          color: 'transparent'
        },
        label: {
          normal: {
            formatter: ''
          },
        },
        outline: {
          show: true,
          itemStyle: {
            borderWidth: 0
          },
          borderDistance: 0
        },
      },
      {
        name: '',
        type: 'bar',
        roundCap: true,
        z: 2,
        showBackground: true,
        backgroundStyle: {
          color: '#15181e'
        },
        data: [100],
        coordinateSystem: 'polar',
        itemStyle: {
          normal: {
            color: opt.borderColor
          }
        }
      }
    ]
  }
  return option
}
