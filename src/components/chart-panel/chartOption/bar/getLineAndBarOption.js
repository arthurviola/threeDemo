import { echartFontSize } from '@/utils/echartFlexible'
export function getLineAndBarOption (data, colors, config) {
  let label = []
  let legend = []
  colors = colors || ['#1890FF', '#2FC25B']
  const colorlen = colors.length
  let series = []
  const opt = Object.assign({
    label: [],
    rotate: 0,
    barWidth: 8,
    unit: '',
    title: '',
    legendPosition: 'bottom',
    legendSize: 12,
    left: 0,
    right: 40,
    showLabel: true,
    xAxisFontSize: 14,
    xMax: null,
    yAxisFontSize: 14,
    yMax: null,
    splitColor: ''
  }, config)
  let top = 10
  let bottom = 10
  function sortprice (a, b) {
    return a.value - b.value
  }
  for (let i = 0; i < data.length; i++) {
    let item = data[i]
    const thisColor = colors[i % colorlen]
    item.name && legend.push(item.name)
    data[i].list.sort(sortprice)
    if (item.type === 'bar') {
      series.push({
        name: data[i].name,
        type: 'bar',
        barWidth: echartFontSize(opt.barWidth),
        data: data[i].list,
        label: { normal: { show: opt.showLabel, position: 'right', fontSize: echartFontSize(10), distance: 10, color: '#efefef' } },
        itemStyle: { normal: { color: thisColor } }
      })
    } else {
      series.push({
        name: item.name,
        symbol: 'emptyCircle',
        symbolSize: echartFontSize(7),
        smooth: true,
        showSymbol: true,
        type: 'line',
        data: item.list,
        itemStyle: { normal: { color: thisColor } }
      })
    }
  }
  let yData = data[0].list
  series.push({
        name: '圆点',
        type: 'pictorialBar',
        silent: true,
        symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAZlBMVEUAAABe3uVe3+Vf3uVf3+Zf3uVg3+Zg3+Zf3+Vi4OZh4OZg3+Z86/Bh3+Zi4Odj4Odi4OZ86/B76/B86/Bj4ed56+9x5+xn4umB7/N87PB36e+A7/N+7fF/7vJ/7vJ+7fGA7/OB7/PReX+lAAAAIXRSTlMABQkVDREmIhk3MR10LEFFPHh7cUprXE35h2XnqMLAp+mHAG9cAAAB5ElEQVRIx83WjU7CMBQFYIoiKMqU/XUboHv/l/Tce7t2XamDNSacETEmX86tlK2rx4py150o+MstMBLwWRfHKo6JCVxLnvmFGBjFQ58oF1//sUZhGy/ClSTWObgnL4O+bkeN4nY2okfNMbkRt9/vtxz8InoTsWplJSCzFxPmO8+GpSIByX3YQAuGDWtRKhKjCnxDXhF6Z4yxnZ20Wgko7BMRDmxtSGVaI4kdTIgb+zTYoJQlIMlDlmUFgrcDWWC201qSayqlTkiCddWWeV62VU0YlnpRi9VOKaSUsiyq/N0krwq2Ugt7lVpZl5BfHNiytjagMi+XYp0kCR45hMlivVQrE/uU5pXSrCB5bM6d1t2lOZItMqmliT3q5uVxqxzyW/ccfYLNKx7ZTeykMvNyac2yt2Fbc61MHLSC0rwoxbiNdlQ3GBm1NLHQsHUrtEXppR/ljNpW6DbSCoqlFiVoN6YdaFlgsSFVPs1BdT8OaB5QyQzVcaqWDows/zepxR8ObLglTrdtCRVuRNj4Rrxh+//0ke2f8KVL+Kon3GCSbmsJN9OUW3j6g0Ns+LgCij2u0h+Sghc8mlMPBMgdx5DFh59VmOVHrvmDnoNxCz3J7MFWsMuaLyR089xz/xhlfijvwutR8gv3zk6BLUUeCgAAAABJRU5ErkJggg==',
        symbolSize: [50, 50],
        symbolOffset: [25, 0],
        symbolPosition: 'end',
        z: 12,
        label: {
          normal: {
            show: false,
            position: 'top',
            padding: [0, 22, 0, 0],
            fontSize: echartFontSize(15),
            fontWeight: 'bold',
            color: opt.barColor
          }
        },
        color: opt.barColor,
        data: yData
      }
  )
  if (opt.label.length) {
    label = opt.label
  } else {
    for (let i = 0; i < data[0].list.length; i++) {
      let item = data[0].list[i]
      label.push(item.name)
    }
  }
  let pos = opt.legendPosition.split(' ')
  let legendPos = { left: 'center' }
  if (pos.length > 1) {
    const hori = pos[1]
    if (hori === 'left') legendPos = { left: 0 }
    else if (hori === 'right') legendPos = { right: 0 }
  }
  const veri = pos[0]
  if (legend.length) {
    if (veri === 'bottom') {
      bottom = bottom + 20
      legendPos = Object.assign({}, legendPos, { bottom: echartFontSize(10) })
    } else if (veri === 'top') {
      top = top + 20
      legendPos = Object.assign({}, legendPos, { top: 0 })
    }
  }
  return {
    title: { show: !!opt.title, text: opt.title, icon: 'circle', left: 'center', textStyle: { color: '#989898', fontSize: echartFontSize(16) } },
    legend: { data: legend, itemWidth: echartFontSize(10), itemHeight: echartFontSize(10), textStyle: { color: '#989898', echartFontSize: echartFontSize(opt.legendSize) }, ...legendPos },
    tooltip: { show: true, trigger: 'axis', axisPointer: { type: 'shadow' }, formatter: '{b}<br />{c}' },
    grid: { left: echartFontSize(opt.left), top: echartFontSize(top), bottom: echartFontSize(bottom), right: echartFontSize(opt.right), containLabel: true },
    yAxis: {
      type: 'category',
      min: 0,
      triggerEvent: true,
      nameTextStyle: { color: '#FFF', fontSize: echartFontSize(12) },
      axisLabel: {
        margin: echartFontSize(15),
        textStyle:
            {
              color: '#bfdaeb',
              fontSize: echartFontSize(opt.xAxisFontSize)
            },
        interval: 0,
        rotate: opt.rotate,
        formatter: function (params) {
          let index = 5
          let newstr = ''
          for (let i = 0; i < params.length; i += index) {
            let tmp = params.substring(i, i + index)
            newstr += tmp + '\n'
          }
          if (newstr.length > 5) {
            return newstr.substring(0, 5) + '...'
          } else {
            return '\n' + newstr
          }
        }
      },
      axisLine: { show: true, lineStyle: { color: '#667884' } },
      splitLine: { show: false },
      axisTick: { show: false },
      data: label
    },
    xAxis: {
      // name: opt.unit,
      nameTextStyle: { color: '#FFF', fontSize: echartFontSize(12) },
      // nameGap: 20,
      position: 'top',
      max: opt.yMax,
      type: 'value',
      axisLabel: { show: true, textStyle: { color: '#bfdaeb', fontSize: echartFontSize(opt.yAxisFontSize) } },
      axisLine: { show: false },
      axisTick: { show: false },
      splitArea: { show: false },
      splitLine: { show: true, lineStyle: { width: echartFontSize(1), opacity: 0.4, color: '#ffffff', type: 'dashed' } }
    },
    series: series
  }
}
