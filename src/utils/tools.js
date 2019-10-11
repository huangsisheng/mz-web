// 查询字符串
export const parseQuery = function () {
    var url = window.location.href
    var obj = {};
    if (url.indexOf('?') !== -1) {
        var query = url.substring(url.indexOf('?') + 1);
    } else {
        return;
    }
    var arr = query.split('&');
    arr.forEach(function (val) {
        var brr = val.split('=');
        obj[brr[0]] = brr[1];
    });
    return obj;
}