/**
 * Created by lvliqi on 2017/7/7.
 */
import moment from 'moment'

window.toTop = () => TweenLite.to(document.body, 0.5, {scrollTop: 0});
window.delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
window.dateFormat = (time, format) => moment.unix(time).format(format);