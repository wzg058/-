function date(time) {
    let date = new Date(time);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate() + ' ';
    let H = date.getHours() + ':';
    let m = date.getMinutes() + ':';
    let S = date.getSeconds();
    return Y + M + D + H + m + S;
}
export default date;