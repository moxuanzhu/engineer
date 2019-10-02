export const format = (time, type) => {
    let date = new Date(time)
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate()
    m = m < 10 ? ('0' + m) : m
    d = d < 10 ? ('0' + d) : d
    return type == 'yyyy-mm-dd' ? y + '-' + m + '-' + d : (type == "yyyy-mm" ? y + '-' + m : '')
}

export const timestamps = (time) => {
    return new Date(time).getTime()
}

export const filterList = (day, startTime, data, type) => {
    var dateList = []; //日期list
    var list = []; //单条数据list
    for (var i = 0; i <= day; i++) {
        var num = 0;
        var newDate = format(new Date(startTime).getTime() + 1000 * 60 * 60 * 24 * i, 'yyyy-mm-dd')
        for (var j = 0; j < data.length; j++) {
            if (newDate == data[j][type]) {
                dateList.push(newDate)
                list.push(data[j].number)
                break;
            } else {
                num += 1
            }
        }
        if (num == data.length) {
            dateList.push(newDate)
            list.push("0")
            num = 0;
        }
    }
    return { dateList, list }
}