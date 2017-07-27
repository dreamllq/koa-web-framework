/**
 * Created by lvliqi on 2017/7/7.
 */
const userAgent = navigator.userAgent.toLowerCase();
window.ua = {
    ios: /iP(ad|hone|od)/i.test(userAgent),
    android: /android/i.test(userAgent),
    wechat: /micromessenger/i.test(userAgent),
    uc: /UCBrowser|UC/i.test(userAgent),
    qqbrowser: /mqqbrowser/i.test(userAgent),
    qq: (/qq/i.test(userAgent) && !/mqqbrowser/i.test(userAgent)),
    wp: /Windows Phone/i.test(userAgent),
    huaweimt7: /HuaweiMT7/i.test(userAgent),
    huaweip7: /HuaweiP7/i.test(userAgent),
    huawei: /HW-HUAWEI/i.test(userAgent),
    caomall: /caomall/i.test(userAgent)
};