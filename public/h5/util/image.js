/**
 * Created by lvliqi on 2017/7/18.
 */
export let wxImageFormat = (url) => {
    url = url.replace(/(\'|\")/g, '');
    if (/wx\.qlogo\.cn/.test(url)) {
        let urls = url.split('/');
        let l = urls.length;
        let num = parseInt(urls[l - 1]);
        if (num == 0) {
            urls[l - 1] = 46;
        }
        return urls.join('/');
    } else {
        return url;
    }
};