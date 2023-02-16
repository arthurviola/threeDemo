export function getEffectScatterMapOption (data, config) {
    return {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: { //涟漪特效
            period: 4, //动画时间，值越小速度越快
            brushType: 'stroke', //波纹绘制方式 stroke, fill
            scale: 4 //波纹圆环最大限制，值越大波纹越大
        },
        label: {
            normal: {
                show: false,
                position: 'right', //显示位置
                offset: [5, 0], //偏移设置
                formatter: function(params){//圆环显示文字
                    return params.data.name;
                },
                fontSize: 13
            },
            emphasis: {
                show: true
            }
        },
        symbol: 'circle',
        symbolSize: function(val) {
            return 5+ val[2] * 5; //圆环大小
        },
        itemStyle: {
            normal: {
                show: true,
                color: '#00eaff'
            }
        },
        data,
    }
}
