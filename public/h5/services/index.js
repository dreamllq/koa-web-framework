const Q = require("q");

let doAjax = (url, data) => {
    let defer = Q.defer();
    data = data || {};
    url += (url.indexOf('?') > -1) ? '&' : '?';
    url += '_=' + new Date().getTime();
    data.from = 'wechat';
    $.ajax({
        url: url,
        data: data,
        type: "POST",
        dataType: 'json',
        success: function (data) {
            if (data.errno == 0) {
                defer.resolve(data);
            } else {
                defer.reject(new Error(data.errdesc));
            }
        },
        error: function () {
            alert('网络错误');
            defer.reject(new Error("网络错误"));
        }
    });

    return defer.promise;
};

export default doAjax;