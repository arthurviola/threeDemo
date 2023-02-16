var convertData = function(data,fromCoord) {

    return[ {
            // 起点 为坐标
            coord: fromCoord,
        }, {
            // 终点 为坐标
            coord: data.name,
            value: data.value,
    }]
}


export { convertData }
