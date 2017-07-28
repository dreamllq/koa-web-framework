/**
 * Created by lvliqi on 2017/7/28.
 */
module.exports.getCookie = (socket) => {
    let cookie = socket.request.headers.cookie;
    let obj = {};
    cookie.split(';').forEach(c => {
        let arr = c.split('=');
        obj[arr[0].trim()] = arr[1].trim();
    });
    return obj;
};
