import React from 'react'

class ScrollEnd extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {children} = this.props;
        return children;
    }

    componentDidMount() {
        let {onEnd} = this.props;
        $(document).on("scroll", function (e) {
            let scrollTop = $("body").scrollTop();
            let windowHeight = $(window).height();
            let blockHeight = $('body').height();

            let bottom_offset = blockHeight - scrollTop - windowHeight;
            if (bottom_offset < 50) {
                onEnd && onEnd();
            }
        });
    }
}

export default ScrollEnd;