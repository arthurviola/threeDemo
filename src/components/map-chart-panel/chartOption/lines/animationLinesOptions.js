export function getAnimationLinesOptions (data, config) {
    return {
        type: 'lines',
        geoIndex: 0,
        cursor: 'pointer',
        zlevel: 10,
        effect: {

            show: false,
            // period: 4, //箭头指向速度，值越小速度越快
            trailLength: 1, //特效尾迹长度[0,1]值越大，尾迹越长重
            symbolSize: 4 // 图标大小
        },

        lineStyle: {
            width: 12, // 尾迹线条宽度
            // color: "rgb(22,255,255, .6)",
            color: {
                // height: 100,
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                // 设置渐变
                colorStops: [
                    {
                        offset: 0,
                        color: 'rgba(0,255,255,0)'
                    },
                    {
                        offset: 0.75,
                        color: 'rgba(0,255,255,1)'
                    },
                    {
                        offset: 0.9,
                        color: 'rgba(0,255,255,1)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(255,255,255,1)'
                    }
                ],
                global: false
            },
            opacity: 1, // 尾迹线条透明度
            curveness: 0 // 尾迹线条曲直度
        },
        label: {
            show: 0,
            position: 'end',
            formatter: '245'
        },
        silent: false,
        data
    }
}
