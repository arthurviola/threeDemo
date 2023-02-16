export function getLinesMapOption (data, config) {
    return {
        type: 'lines',
        zlevel: 2,
        effect: {
        show: true,
        period: config?.period || 3, //箭头指向速度，值越小速度越快
        trailLength: config?.trailLength || 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
        symbol: 'arrow', //箭头图标
        symbolSize: config?.symbolSize || 5, //图标大小
        },
        lineStyle: {
            normal: {
                color: config?.color ||'#00eaff',
                width: config?.width || 1, //尾迹线条宽度
                opacity: config?.opacity || .7, //尾迹线条透明度
                curveness: config?.curveness ||  .3, //尾迹线条曲直度
            },
        },
        data
    }
}
