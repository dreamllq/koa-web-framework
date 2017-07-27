/**
 * Created by lvliqi on 2017/7/19.
 */
import Q from 'q';

window.util = window.util || {};


window.util.loadJS = (url) => {
    let defer = Q.defer();
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.body.appendChild(script);
    script.onload = () => {
        defer.resolve();
    };
    return defer.promise;
};