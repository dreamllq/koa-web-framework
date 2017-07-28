webpackJsonp([16],{

/***/ 684:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	var Editor = function (_React$Component) {
	    _inherits(Editor, _React$Component);
	
	    function Editor(props) {
	        _classCallCheck(this, Editor);
	
	        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));
	
	        _this.id = 'editor_' + Date.now() + '_' + Math.floor(Math.random() * 100);
	        _this.editor = null;
	        _this.onChange = _this.onChange.bind(_this);
	        _this.getContent = _this.getContent.bind(_this);
	        return _this;
	    }
	
	    Editor.prototype.onChange = function onChange(content) {
	        var onChange = this.props.onChange;
	
	        if (onChange) {
	            onChange(content);
	        }
	    };
	
	    Editor.prototype.getContent = function getContent() {
	        return this.editor.getContent();
	    };
	
	    Editor.prototype.render = function render() {
	        var id = this.id;
	        var _props = this.props,
	            _props$width = _props.width,
	            width = _props$width === undefined ? '100%' : _props$width,
	            _props$height = _props.height,
	            height = _props$height === undefined ? 240 : _props$height;
	
	
	        return _react2.default.createElement(
	            'div',
	            { className: 'editor_ui' },
	            _react2.default.createElement('script', { type: 'text/plain', id: id, style: {
	                    width: width,
	                    height: height
	                } })
	        );
	    };
	
	    Editor.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {};
	
	    Editor.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
	        return false;
	    };
	
	    Editor.prototype.componentDidMount = function componentDidMount() {
	        var self = this;
	        var id = this.id;
	        var _props$value = this.props.value,
	            value = _props$value === undefined ? '' : _props$value;
	
	        this.editor = UM.getEditor(id);
	        this.editor.setContent(value, false);
	        this.editor.addListener("contentChange", function () {
	            self.onChange(self.editor.getContent());
	        });
	    };
	
	    return Editor;
	}(_react2.default.Component);
	
	exports.default = Editor;
	module.exports = exports['default'];

/***/ },

/***/ 742:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _dva = __webpack_require__(88);
	
	var _Editor = __webpack_require__(684);
	
	var _Editor2 = _interopRequireDefault(_Editor);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	var Editor = function (_React$Component) {
	    _inherits(Editor, _React$Component);
	
	    function Editor(props) {
	        _classCallCheck(this, Editor);
	
	        return _possibleConstructorReturn(this, _React$Component.call(this, props));
	    }
	
	    Editor.prototype.render = function render() {
	        var self = this;
	        return _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(_Editor2.default, { ref: 'editor' }),
	            _react2.default.createElement(
	                'div',
	                { onClick: function onClick() {
	                        console.log(self.refs.editor.getContent());
	                    } },
	                '1111'
	            )
	        );
	    };
	
	    Editor.prototype.componentDidMount = function componentDidMount() {};
	
	    return Editor;
	}(_react2.default.Component);
	
	exports.default = (0, _dva.connect)(function () {
	    return {};
	})(Editor);
	module.exports = exports['default'];

/***/ }

});
//# sourceMappingURL=Editor.admin.chunk.js.map