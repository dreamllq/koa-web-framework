/**
 * Created by lvliqi on 2017/2/27.
 */

let Q = require('q');

let request = (url, data, type) => {
    let defer = Q.defer();
    data = data || {};
    data.from = 'pc';

    $.ajax({
        url,
        data,
        type: type || 'GET',
        dataType: 'JSON',
        success: (data) => {
            if (data.errno) {
                defer.reject(new Error(data.errdesc));
            } else {
                defer.resolve(data);
            }
        },
        error: () => {
            defer.reject(new Error('网络错误'));
        }
    });

    return defer.promise;
};


export default request;