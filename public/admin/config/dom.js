/**
 * Created by lvliqi on 2017/6/23.
 */
const ElePosition = (e) => {
    console.log('ElePosition');
    let event = e.target;
    let top = event.offsetTop;
    let left = event.offsetLeft;
    while (event.offsetParent) {
        event = event.offsetParent;
        top += event.offsetTop;
        left += event.offsetLeft;
    }

    return {
        x: left,
        y: top
    };
};

const EleScroll = (e) => {
    console.log('EleScroll');
    let event = e.target;
    let scrollTop = event.scrollTop;
    let scrollLeft = event.scrollLeft;
    while (event.parentNode) {
        event = event.parentNode;
        scrollTop += event.scrollTop || 0;
        scrollLeft += event.scrollLeft || 0;
    }

    return {
        top: scrollTop,
        left: scrollLeft,
    };
};