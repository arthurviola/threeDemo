export function getBasicMapOption (config, seriesItem = []) {
    return {
        geo: {
            map: 'china',
            aspectScale: 0.85,
            layoutCenter: ["50%", "50%"], //地图位置
            layoutSize: '100%',
            itemStyle: {
                normal: {
                    shadowColor: config?.normal?.shadowColor || '#276fce',
                    shadowOffsetX: 0,
                    shadowOffsetY: 15,
                    opacity: 0.5,
                },
                emphasis: {
                    areaColor: config?.normal?.areaColor || '#276fce',
                }
            },
            // 这里去除南海诸岛
            regions: [{
                name: '南海诸岛',
                itemStyle: {
                    areaColor: 'rgba(0, 10, 52, 0)',
                    borderColor: 'rgba(0, 10, 52, 0)',
                    normal: {
                        opacity: 0,
                        label: {
                            show: false,
                            color: "#009cc9",
                        }
                    },
                },
                label: {
                    show: false,
                    color: '#FFFFFF',
                    fontSize: 12,
                },
            }],
        },
        series: [
            {
                type: 'map',
                mapType: 'china',
                aspectScale: 0.85,
                layoutCenter: ["50%", "50%"], //地图位置
                layoutSize: '100%',
                zoom: 1, //当前视角的缩放比例
                // roam: true, //是否开启平游或缩放
                scaleLimit: { //滚轮缩放的极限控制
                    min: 1,
                    max: 2
                },
                itemStyle: {
                    normal: {
                        areaColor: config?.areaColor || '#12235c',
                        borderColor: config?.borderColor ||'#2ab8ff',
                        // borderWidth: config?.borderWidth || .5,
                        shadowColor: config?.shadowColor || 'rgba(0,54,255, 0.4)',
                        shadowBlur: config?.shadowBlur || 100
                    },
                    emphasis: {
                        areaColor: config?.areaColor || '#02102b',
                        label: {
                            color: config?.color || "#fff",
                            position: ['50%', '50%']
                        },
                    }
                },
            },
            ...seriesItem
        ]
    }
}
