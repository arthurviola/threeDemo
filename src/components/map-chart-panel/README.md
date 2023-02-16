### getBasicMapOption 是基础中国底图配置
![img.png](..%2F..%2F..%2F..%2Fassets%2Fimg%2Fimg.png)
### getLinesMapOption 单独飞线的配置
只要传入样式及 数据
多个
dataItem : [{
    // 起点 为坐标
    coord: fromCoord,
    },
    {
    // 终点 为坐标
    coord: data.name,
    value: data.value,
}]
data : [ dataItem, dataItem, dataItem ]
![img_1.png](..%2F..%2F..%2F..%2Fassets%2Fimg%2Fimg_1.png)
### getScatterMapOption 涟漪点
dataItem [
    name: '山东'
    coord: [...fromCoord, 0],
]
data : [ dataItem, dataItem, dataItem ]
![img_3.png](..%2F..%2Fassets%2Fimg%2Fimg_3.png)
### getEffectScatterMapOption pin
dataItem [
    name: '山东'
    coord: fromCoord
]
data : [ dataItem, dataItem, dataItem ]
![img_2.png](..%2F..%2Fassets%2Fimg%2Fimg_2.png)
