webpackJsonp([1],{

/***/ 330:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(331)();
	// imports
	
	
	// module
	exports.push([module.id, ".page_loading {\n  display: -webkit-box;\n  -webkit-box-align: center;\n  -webkit-box-pack: center;\n  position: fixed;\n  height: 100%;\n  width: 100%;\n  top: 0;\n  left: 0;\n  z-index: 80;\n  stroke: #7ecef4;\n  fill: #7ecef4;\n  background-color: #fff; }\n  .page_loading svg {\n    width: 1.12rem;\n    height: 1.12rem;\n    display: block;\n    margin: 0 auto; }\n", ""]);
	
	// exports


/***/ },

/***/ 331:
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },

/***/ 332:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	    return _react2.default.createElement(
	        "div",
	        { className: "page_loading" },
	        _react2.default.createElement(
	            "svg",
	            { viewBox: "0 0 64 64" },
	            _react2.default.createElement(
	                "g",
	                null,
	                _react2.default.createElement(
	                    "circle",
	                    { cx: "16", cy: "32", strokeWidth: "0", r: "5.08204" },
	                    _react2.default.createElement("animate", { attributeName: "fill-opacity", dur: "750ms", values: ".5;.6;.8;1;.8;.6;.5;.5", repeatCount: "indefinite" }),
	                    _react2.default.createElement("animate", { attributeName: "r", dur: "750ms", values: "3;3;4;5;6;5;4;3", repeatCount: "indefinite" })
	                ),
	                _react2.default.createElement(
	                    "circle",
	                    { cx: "32", cy: "32", strokeWidth: "0", r: "4.08204" },
	                    _react2.default.createElement("animate", { attributeName: "fill-opacity", dur: "750ms", values: ".5;.5;.6;.8;1;.8;.6;.5", repeatCount: "indefinite" }),
	                    _react2.default.createElement("animate", { attributeName: "r", dur: "750ms", values: "4;3;3;4;5;6;5;4", repeatCount: "indefinite" })
	                ),
	                _react2.default.createElement(
	                    "circle",
	                    { cx: "48", cy: "32", strokeWidth: "0", r: "3.08204" },
	                    _react2.default.createElement("animate", { attributeName: "fill-opacity", dur: "750ms", values: ".6;.5;.5;.6;.8;1;.8;.6", repeatCount: "indefinite" }),
	                    _react2.default.createElement("animate", { attributeName: "r", dur: "750ms", values: "5;4;3;3;4;5;6;5", repeatCount: "indefinite" })
	                )
	            )
	        )
	    );
	};
	
	module.exports = exports['default'];

/***/ },

/***/ 333:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
	                                                                                                                                                                                                                                                                   * Created by lvliqi on 2017/6/14.
	                                                                                                                                                                                                                                                                   */
	
	
	var _func = __webpack_require__(336);
	
	var _func2 = _interopRequireDefault(_func);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    namespace: 'app',
	    state: {
	        loadEnd: false
	    },
	    reducers: {
	        payload: function payload(state, _ref) {
	            var _payload = _ref.payload;
	
	            return _extends({}, state, _payload);
	        }
	    },
	    effects: {
	        init: regeneratorRuntime.mark(function init(_, _ref2) {
	            var put = _ref2.put;
	            var jsapi_config;
	            return regeneratorRuntime.wrap(function init$(_context) {
	                while (1) {
	                    switch (_context.prev = _context.next) {
	                        case 0:
	                            _context.next = 2;
	                            return _func2.default.jsapi({
	                                url: window.location.href.split('#')[0]
	                            });
	
	                        case 2:
	                            jsapi_config = _context.sent;
	                            _context.next = 5;
	                            return put({ type: 'payload', payload: { loadEnd: true } });
	
	                        case 5:
	                            wx.config(jsapi_config.data);
	
	                        case 6:
	                        case 'end':
	                            return _context.stop();
	                    }
	                }
	            }, init, this);
	        })
	    }
	};
	module.exports = exports['default'];

/***/ },

/***/ 335:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _dva = __webpack_require__(177);
	
	__webpack_require__(769);
	
	var _PageLoading = __webpack_require__(332);
	
	var _PageLoading2 = _interopRequireDefault(_PageLoading);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	var App = function (_React$Component) {
	    _inherits(App, _React$Component);
	
	    function App(props) {
	        _classCallCheck(this, App);
	
	        return _possibleConstructorReturn(this, _React$Component.call(this, props));
	    }
	
	    App.prototype.render = function render() {
	        var _props = this.props,
	            children = _props.children,
	            app = _props.app;
	        var loadEnd = app.loadEnd;
	
	        return loadEnd ? _react2.default.createElement(
	            'div',
	            { className: 'app' },
	            children
	        ) : _react2.default.createElement(_PageLoading2.default, null);
	    };
	
	    App.prototype.componentDidMount = function componentDidMount() {
	        var dispatch = this.props.dispatch;
	
	        dispatch({ type: 'app/init' });
	    };
	
	    return App;
	}(_react2.default.Component);
	
	exports.default = (0, _dva.connect)(function (_ref) {
	    var app = _ref.app;
	    return { app: app };
	})(App);
	module.exports = exports['default'];

/***/ },

/***/ 336:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _index = __webpack_require__(337);
	
	var _index2 = _interopRequireDefault(_index);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  jsapi: function jsapi(data) {
	    return (0, _index2.default)('/func/jsapi/config', data);
	  }
	}; /**
	    * Created by lvliqi on 2017/7/13.
	    */

	module.exports = exports['default'];

/***/ },

/***/ 337:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Q = __webpack_require__(267);
	
	var doAjax = function doAjax(url, data) {
	    var defer = Q.defer();
	    data = data || {};
	    url += url.indexOf('?') > -1 ? '&' : '?';
	    url += '_=' + new Date().getTime();
	    data.from = 'wechat';
	    $.ajax({
	        url: url,
	        data: data,
	        type: "POST",
	        dataType: 'json',
	        success: function success(data) {
	            if (data.errno == 0) {
	                defer.resolve(data);
	            } else {
	                defer.reject(new Error(data.errdesc));
	            }
	        },
	        error: function error() {
	            alert('网络错误');
	            defer.reject(new Error("网络错误"));
	        }
	    });
	
	    return defer.promise;
	};
	
	exports.default = doAjax;
	module.exports = exports['default'];

/***/ },

/***/ 768:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },

/***/ 769:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(330);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(768)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/atool-build/node_modules/css-loader/index.js!../../../node_modules/atool-build/node_modules/postcss-loader/index.js?a=1!../../../node_modules/sass-loader/index.js!./index.scss", function() {
				var newContent = require("!!../../../node_modules/atool-build/node_modules/css-loader/index.js!../../../node_modules/atool-build/node_modules/postcss-loader/index.js?a=1!../../../node_modules/sass-loader/index.js!./index.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }

});
//# sourceMappingURL=App.h5.chunk.js.map