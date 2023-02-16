export function getScatterMapOption (data, config) {
    return  {
        type: 'scatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
            period: 4,
            brushType: 'stroke',
            scale: 4
        },
        label: {
            normal: {
                show: false,    //定位点名字
                position: 'right',
                // offset:[5, 0],
                color: '#0f0',
                formatter: '{b}',
                textStyle: {
                    color: "#0f0"
                }
            },
            emphasis: {
                show: false,   //定位标记
                color: "#f60"
            }
        },
        symbol: 'pin',  //定位图标样式
        symbolSize: 50,
        data
    }
}
