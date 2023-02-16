/* Echarts图表字体、间距自适应 */
export const echartFontSize = (size, defalteHeight = 1080) => {
  let clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  if (!clientHeight) return size;
  let scale = (clientHeight / defalteHeight);
  return Number((size * scale).toFixed(3));
}
