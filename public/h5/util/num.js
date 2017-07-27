/**
 * Created by lvliqi on 2017/3/28.
 */
window.util = window.util || {};

window.util.pad = function (num, n) {
    let len = num.toString().length;
    while (len < n) {
        num = "0" + num;
        len++;
    }
    return num;
};
window.pad = window.util.pad;

window.util.px2rem = function (px) {
    let base = 75;
    return px / base * window.rem;
};

window.util.phoneMixin = function (phone) {
    return `${phone.substr(0, 3)}****${phone.substr(7, 4)}`
};
