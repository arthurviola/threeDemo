export function getAnimationScatter (data, config) {
    return [
        {
            type: 'scatter',
            coordinateSystem: 'geo',
            geoIndex: 0,
            zlevel: 4,
            label: {
                // 这儿是处理的
                formatter: '{b}',
                position: 'bottom',
                color: '#fff',
                fontSize: 12,
                backgroundColor: '#007CDF',
                borderRadius: [20, 20],
                padding: [6, 10, 4, 10],
                // distance: 10,
                show: true
            },
            symbol: 'circle',
            symbolSize: [12, 6],
            itemStyle: {
                // color: '#F7AF21',
                color: 'rgba(51,244,164,1)',
                opacity: 1
            },
            silent: true,
            data: data
        },
        // 底部外框
        {
            type: 'scatter',
            cursor: 'pointer',
            coordinateSystem: 'geo',
            geoIndex: 0,
            zlevel: 4,
            label: {
                show: false
            },
            symbol: 'circle',
            symbolSize: [24, 12],
            itemStyle: {
                color: {
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [
                        {
                            offset: 0,
                            color: 'rgb(22,255,255, 0)' // 0% 处的颜色
                        },
                        {
                            offset: 0.75,
                            color: 'rgb(22,255,255, 0)' // 100% 处的颜色
                        },
                        {
                            offset: 0.751,
                            color: 'rgb(22,255,255, 1)' // 100% 处的颜色
                        },
                        {
                            offset: 1,
                            color: 'rgb(22,255,255, 1)' // 100% 处的颜色
                        }
                    ],
                    global: false // 缺省为 false
                },

                opacity: 1
            },
            silent: true,
            data
        }
    ]
}
