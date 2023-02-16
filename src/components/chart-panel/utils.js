import echarts from 'echarts'
export const colorToOpacity = (color, opacity = 1) => {
  if (color) {
    const parseColor = echarts.color.parse(color).slice(0, 3).join(',')
    return `rgba(${parseColor}, ${opacity})`
  }
}
