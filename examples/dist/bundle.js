require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
	Autosize 4.0.0
	license: MIT
	http://www.jacklmoore.com/autosize
*/
(function (global, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['exports', 'module'], factory);
	} else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
		factory(exports, module);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, mod);
		global.autosize = mod.exports;
	}
})(this, function (exports, module) {
	'use strict';

	var map = typeof Map === "function" ? new Map() : (function () {
		var keys = [];
		var values = [];

		return {
			has: function has(key) {
				return keys.indexOf(key) > -1;
			},
			get: function get(key) {
				return values[keys.indexOf(key)];
			},
			set: function set(key, value) {
				if (keys.indexOf(key) === -1) {
					keys.push(key);
					values.push(value);
				}
			},
			'delete': function _delete(key) {
				var index = keys.indexOf(key);
				if (index > -1) {
					keys.splice(index, 1);
					values.splice(index, 1);
				}
			}
		};
	})();

	var createEvent = function createEvent(name) {
		return new Event(name, { bubbles: true });
	};
	try {
		new Event('test');
	} catch (e) {
		// IE does not support `new Event()`
		createEvent = function (name) {
			var evt = document.createEvent('Event');
			evt.initEvent(name, true, false);
			return evt;
		};
	}

	function assign(ta) {
		if (!ta || !ta.nodeName || ta.nodeName !== 'TEXTAREA' || map.has(ta)) return;

		var heightOffset = null;
		var clientWidth = ta.clientWidth;
		var cachedHeight = null;

		function init() {
			var style = window.getComputedStyle(ta, null);

			if (style.resize === 'vertical') {
				ta.style.resize = 'none';
			} else if (style.resize === 'both') {
				ta.style.resize = 'horizontal';
			}

			if (style.boxSizing === 'content-box') {
				heightOffset = -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom));
			} else {
				heightOffset = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
			}
			// Fix when a textarea is not on document body and heightOffset is Not a Number
			if (isNaN(heightOffset)) {
				heightOffset = 0;
			}

			update();
		}

		function changeOverflow(value) {
			{
				// Chrome/Safari-specific fix:
				// When the textarea y-overflow is hidden, Chrome/Safari do not reflow the text to account for the space
				// made available by removing the scrollbar. The following forces the necessary text reflow.
				var width = ta.style.width;
				ta.style.width = '0px';
				// Force reflow:
				/* jshint ignore:start */
				ta.offsetWidth;
				/* jshint ignore:end */
				ta.style.width = width;
			}

			ta.style.overflowY = value;
		}

		function getParentOverflows(el) {
			var arr = [];

			while (el && el.parentNode && el.parentNode instanceof Element) {
				if (el.parentNode.scrollTop) {
					arr.push({
						node: el.parentNode,
						scrollTop: el.parentNode.scrollTop
					});
				}
				el = el.parentNode;
			}

			return arr;
		}

		function resize() {
			var originalHeight = ta.style.height;
			var overflows = getParentOverflows(ta);
			var docTop = document.documentElement && document.documentElement.scrollTop; // Needed for Mobile IE (ticket #240)

			ta.style.height = '';

			var endHeight = ta.scrollHeight + heightOffset;

			if (ta.scrollHeight === 0) {
				// If the scrollHeight is 0, then the element probably has display:none or is detached from the DOM.
				ta.style.height = originalHeight;
				return;
			}

			ta.style.height = endHeight + 'px';

			// used to check if an update is actually necessary on window.resize
			clientWidth = ta.clientWidth;

			// prevents scroll-position jumping
			overflows.forEach(function (el) {
				el.node.scrollTop = el.scrollTop;
			});

			if (docTop) {
				document.documentElement.scrollTop = docTop;
			}
		}

		function update() {
			resize();

			var styleHeight = Math.round(parseFloat(ta.style.height));
			var computed = window.getComputedStyle(ta, null);

			// Using offsetHeight as a replacement for computed.height in IE, because IE does not account use of border-box
			var actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(computed.height)) : ta.offsetHeight;

			// The actual height not matching the style height (set via the resize method) indicates that
			// the max-height has been exceeded, in which case the overflow should be allowed.
			if (actualHeight !== styleHeight) {
				if (computed.overflowY === 'hidden') {
					changeOverflow('scroll');
					resize();
					actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(window.getComputedStyle(ta, null).height)) : ta.offsetHeight;
				}
			} else {
				// Normally keep overflow set to hidden, to avoid flash of scrollbar as the textarea expands.
				if (computed.overflowY !== 'hidden') {
					changeOverflow('hidden');
					resize();
					actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(window.getComputedStyle(ta, null).height)) : ta.offsetHeight;
				}
			}

			if (cachedHeight !== actualHeight) {
				cachedHeight = actualHeight;
				var evt = createEvent('autosize:resized');
				try {
					ta.dispatchEvent(evt);
				} catch (err) {
					// Firefox will throw an error on dispatchEvent for a detached element
					// https://bugzilla.mozilla.org/show_bug.cgi?id=889376
				}
			}
		}

		var pageResize = function pageResize() {
			if (ta.clientWidth !== clientWidth) {
				update();
			}
		};

		var destroy = (function (style) {
			window.removeEventListener('resize', pageResize, false);
			ta.removeEventListener('input', update, false);
			ta.removeEventListener('keyup', update, false);
			ta.removeEventListener('autosize:destroy', destroy, false);
			ta.removeEventListener('autosize:update', update, false);

			Object.keys(style).forEach(function (key) {
				ta.style[key] = style[key];
			});

			map['delete'](ta);
		}).bind(ta, {
			height: ta.style.height,
			resize: ta.style.resize,
			overflowY: ta.style.overflowY,
			overflowX: ta.style.overflowX,
			wordWrap: ta.style.wordWrap
		});

		ta.addEventListener('autosize:destroy', destroy, false);

		// IE9 does not fire onpropertychange or oninput for deletions,
		// so binding to onkeyup to catch most of those events.
		// There is no way that I know of to detect something like 'cut' in IE9.
		if ('onpropertychange' in ta && 'oninput' in ta) {
			ta.addEventListener('keyup', update, false);
		}

		window.addEventListener('resize', pageResize, false);
		ta.addEventListener('input', update, false);
		ta.addEventListener('autosize:update', update, false);
		ta.style.overflowX = 'hidden';
		ta.style.wordWrap = 'break-word';

		map.set(ta, {
			destroy: destroy,
			update: update
		});

		init();
	}

	function destroy(ta) {
		var methods = map.get(ta);
		if (methods) {
			methods.destroy();
		}
	}

	function update(ta) {
		var methods = map.get(ta);
		if (methods) {
			methods.update();
		}
	}

	var autosize = null;

	// Do nothing in Node.js environment and IE8 (or lower)
	if (typeof window === 'undefined' || typeof window.getComputedStyle !== 'function') {
		autosize = function (el) {
			return el;
		};
		autosize.destroy = function (el) {
			return el;
		};
		autosize.update = function (el) {
			return el;
		};
	} else {
		autosize = function (el, options) {
			if (el) {
				Array.prototype.forEach.call(el.length ? el : [el], function (x) {
					return assign(x, options);
				});
			}
			return el;
		};
		autosize.destroy = function (el) {
			if (el) {
				Array.prototype.forEach.call(el.length ? el : [el], destroy);
			}
			return el;
		};
		autosize.update = function (el) {
			if (el) {
				Array.prototype.forEach.call(el.length ? el : [el], update);
			}
			return el;
		};
	}

	module.exports = autosize;
});
},{}],2:[function(require,module,exports){
// This code has been refactored for 140 bytes
// You can see the original here: https://github.com/twolfson/computedStyle/blob/04cd1da2e30fa45844f95f5cb1ac898e9b9ef050/lib/computedStyle.js
var computedStyle = function (el, prop, getComputedStyle) {
  getComputedStyle = window.getComputedStyle;

  // In one fell swoop
  return (
    // If we have getComputedStyle
    getComputedStyle ?
      // Query it
      // TODO: From CSS-Query notes, we might need (node, null) for FF
      getComputedStyle(el) :

    // Otherwise, we are in IE and use currentStyle
      el.currentStyle
  )[
    // Switch to camelCase for CSSOM
    // DEV: Grabbed from jQuery
    // https://github.com/jquery/jquery/blob/1.9-stable/src/css.js#L191-L194
    // https://github.com/jquery/jquery/blob/1.9-stable/src/core.js#L593-L597
    prop.replace(/-(\w)/gi, function (word, letter) {
      return letter.toUpperCase();
    })
  ];
};

module.exports = computedStyle;

},{}],3:[function(require,module,exports){
// Load in dependencies
var computedStyle = require('computed-style');

/**
 * Calculate the `line-height` of a given node
 * @param {HTMLElement} node Element to calculate line height of. Must be in the DOM.
 * @returns {Number} `line-height` of the element in pixels
 */
function lineHeight(node) {
  // Grab the line-height via style
  var lnHeightStr = computedStyle(node, 'line-height');
  var lnHeight = parseFloat(lnHeightStr, 10);

  // If the lineHeight did not contain a unit (i.e. it was numeric), convert it to ems (e.g. '2.3' === '2.3em')
  if (lnHeightStr === lnHeight + '') {
    // Save the old lineHeight style and update the em unit to the element
    var _lnHeightStyle = node.style.lineHeight;
    node.style.lineHeight = lnHeightStr + 'em';

    // Calculate the em based height
    lnHeightStr = computedStyle(node, 'line-height');
    lnHeight = parseFloat(lnHeightStr, 10);

    // Revert the lineHeight style
    if (_lnHeightStyle) {
      node.style.lineHeight = _lnHeightStyle;
    } else {
      delete node.style.lineHeight;
    }
  }

  // If the lineHeight is in `pt`, convert it to pixels (4px for 3pt)
  // DEV: `em` units are converted to `pt` in IE6
  // Conversion ratio from https://developer.mozilla.org/en-US/docs/Web/CSS/length
  if (lnHeightStr.indexOf('pt') !== -1) {
    lnHeight *= 4;
    lnHeight /= 3;
  // Otherwise, if the lineHeight is in `mm`, convert it to pixels (96px for 25.4mm)
  } else if (lnHeightStr.indexOf('mm') !== -1) {
    lnHeight *= 96;
    lnHeight /= 25.4;
  // Otherwise, if the lineHeight is in `cm`, convert it to pixels (96px for 2.54cm)
  } else if (lnHeightStr.indexOf('cm') !== -1) {
    lnHeight *= 96;
    lnHeight /= 2.54;
  // Otherwise, if the lineHeight is in `in`, convert it to pixels (96px for 1in)
  } else if (lnHeightStr.indexOf('in') !== -1) {
    lnHeight *= 96;
  // Otherwise, if the lineHeight is in `pc`, convert it to pixels (12pt for 1pc)
  } else if (lnHeightStr.indexOf('pc') !== -1) {
    lnHeight *= 16;
  }

  // Continue our computation
  lnHeight = Math.round(lnHeight);

  // If the line-height is "normal", calculate by font-size
  if (lnHeightStr === 'normal') {
    // Create a temporary node
    var nodeName = node.nodeName;
    var _node = document.createElement(nodeName);
    _node.innerHTML = '&nbsp;';

    // If we have a text area, reset it to only 1 row
    // https://github.com/twolfson/line-height/issues/4
    if (nodeName.toUpperCase() === 'TEXTAREA') {
      _node.setAttribute('rows', '1');
    }

    // Set the font-size of the element
    var fontSizeStr = computedStyle(node, 'font-size');
    _node.style.fontSize = fontSizeStr;

    // Remove default padding/border which can affect offset height
    // https://github.com/twolfson/line-height/issues/4
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight
    _node.style.padding = '0px';
    _node.style.border = '0px';

    // Append it to the body
    var body = document.body;
    body.appendChild(_node);

    // Assume the line height of the element is the height
    var height = _node.offsetHeight;
    lnHeight = height;

    // Remove our child from the DOM
    body.removeChild(_node);
  }

  // Return the calculated height
  return lnHeight;
}

// Export lineHeight
module.exports = lineHeight;

},{"computed-style":2}],4:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],"minimal-react-textarea":[function(require,module,exports){
(function (process){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _minimalReactText = require("minimal-react-text");

var _minimalReactText2 = _interopRequireDefault(_minimalReactText);

var _autosize = require('autosize');

var _autosize2 = _interopRequireDefault(_autosize);

var _lineHeight = require('line-height');

var _lineHeight2 = _interopRequireDefault(_lineHeight);

var UPDATE = 'autosize:update',
    DESTROY = 'autosize:destroy',
    RESIZED = 'autosize:resized';

/** A light replacement for built-in textarea component
 * which automaticaly adjusts its height to match the content
 * @param onResize - called whenever the textarea resizes
 * @param rows - minimum number of visible rows
 * @param maxRows - maximum number of visible rows
 * @param innerRef - called with the ref to the DOM node
 */

var MinimalReactTextArea = (function (_MinimalReactText) {
  _inherits(MinimalReactTextArea, _MinimalReactText);

  function MinimalReactTextArea(props) {
    _classCallCheck(this, MinimalReactTextArea);

    _get(Object.getPrototypeOf(MinimalReactTextArea.prototype), 'constructor', this).call(this, props);

    var hasValue = false;
    var hasError = false;
    var isFocused = false;
    var inputValue = props.inputValue;

    if (inputValue !== '' && typeof inputValue !== 'undefined') {
      hasValue = true;
      hasError = props.hasError || props.pattern && !props.pattern.test(inputValue);
    }

    this.state = {
      hasValue: hasValue,
      hasError: hasError,
      inputValue: inputValue,
      isFocused: isFocused,
      lineHeight: null
    };
  }

  _createClass(MinimalReactTextArea, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var hasError = nextProps.hasError;
      var hasValue = !!nextProps.inputValue || this.state.hasValue;
      var inputValue = nextProps.inputValue !== undefined ? nextProps.inputValue : this.state.inputValue;

      if (!hasError && inputValue !== '' && typeof inputValue !== 'undefined' && !!nextProps.pattern) {
        hasValue = true;
        hasError = nextProps.pattern && !nextProps.pattern.test(inputValue);
      }
      this.setState({ hasValue: hasValue, hasError: hasError, inputValue: inputValue });
    }
  }, {
    key: 'onBlur',
    value: function onBlur(event) {
      this.setState({
        isFocused: false
      });

      var _props = this.props;
      var pattern = _props.pattern;
      var isRequired = _props.isRequired;

      var hasError = undefined;

      this.setState({
        hasValue: Boolean(event.currentTarget.value),
        hasError: event.currentTarget.value.length ? pattern && !pattern.test(event.currentTarget.value) : isRequired
      });

      // update on this.setState happens after this functions is completed
      // in order to avoid that 'skipped' change of value, I use the
      // hasError variable
      hasError = event.currentTarget.value.length ? pattern && !pattern.test(event.currentTarget.value) : isRequired;

      if (this.props.onBlur) {
        this.props.onBlur(event, this, hasError);
      } else if (this.props.onChange) {
        this.props.onChange(event, this, hasError);
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(event) {
      this.setState({
        hasValue: Boolean(event.currentTarget.value),
        inputValue: event.currentTarget.value,
        hasError: false
      });

      this.currentValue = e.target.value;

      if (this.props.onChange) {
        this.props.onChange(event, this);
      }
    }
  }, {
    key: 'onFocus',
    value: function onFocus(event) {
      this.setState({
        isFocused: true
      });

      if (this.props.onFocus) {
        this.props.onFocus(event, this);
      }
    }

    // autosize methods

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this = this;

      var _props2 = this.props;
      var onResize = _props2.onResize;
      var maxRows = _props2.maxRows;

      if (typeof maxRows === 'number') {
        this.updateLineHeight();

        // this trick is needed to force "autosize" to activate the scrollbar
        setTimeout(function () {
          return (0, _autosize2['default'])(_this.textarea);
        });
      } else {
        (0, _autosize2['default'])(this.textarea);
      }

      if (onResize) {
        this.textarea.addEventListener(RESIZED, this.props.onResize);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this2 = this;

      if (this.props.onResize) {
        this.textarea.removeEventListener(RESIZED, this.props.onResize);
      }
      (function () {
        return _this2.dispatchEvent(DESTROY);
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var _this3 = this;

      if (this.getValue(this.props) !== this.currentValue) {
        (function () {
          return _this3.dispatchEvent(UPDATE);
        });
      }
    }
  }, {
    key: 'updateLineHeight',
    value: function updateLineHeight() {
      this.setState({
        lineHeight: (0, _lineHeight2['default'])(this.textarea)
      });
    }
  }, {
    key: 'getValue',
    value: function getValue(_ref) {
      var valueLink = _ref.valueLink;
      var value = _ref.value;

      valueLink ? valueLink.value : value;
    }

    // onChange(e) {
    //   this.currentValue = e.target.value;
    //   this.props.onChange && this.props.onChange(e);
    // }

  }, {
    key: 'saveDOMNodeRef',
    value: function saveDOMNodeRef(ref) {
      var innerRef = this.props.innerRef;

      if (innerRef) {
        innerRef(ref);
      }

      this.textarea = ref;
    }
  }, {
    key: 'getLocals',
    value: function getLocals() {
      var _this4 = this;

      var _props3 = this.props;
      var onResize = _props3.onResize;
      var maxRows = _props3.maxRows;
      var onChange = _props3.onChange;
      var style = _props3.style;
      var innerRef = _props3.innerRef;

      var props = _objectWithoutProperties(_props3, ['onResize', 'maxRows', 'onChange', 'style', 'innerRef']);

      var lineHeight = this.state.lineHeight;
      var saveDOMNodeRef = this.saveDOMNodeRef;

      var maxHeight = maxRows && lineHeight ? lineHeight * maxRows : null;

      return _extends({}, props, {
        saveDOMNodeRef: saveDOMNodeRef,
        style: maxHeight ? _extends({}, style, { maxHeight: maxHeight }) : style,
        onChange: function onChange() {
          return _this4.onChange;
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props;
      var errorTextMessage = _props4.errorTextMessage;
      var id = _props4.id;
      var isDisabled = _props4.isDisabled;
      var isRequired = _props4.isRequired;
      var label = _props4.label;
      var placeholder = _props4.placeholder;
      var size = _props4.size;
      var theme = _props4.theme;
      var type = _props4.type;
      var _state = this.state;
      var hasValue = _state.hasValue;
      var hasError = _state.hasError;
      var inputValue = _state.inputValue;
      var isFocused = _state.isFocused;

      var wrapperClasses = (0, _classnames2['default'])('tx-wrapper', this.props.wrapperClasses, { 'tx-focused': isFocused }, { 'tx-disabled': isDisabled }, { 'tx-wrapper-textarea': type === 'textarea' }, { 'tx-wrapper-white': theme === 'dark' });

      var inputClasses = (0, _classnames2['default'])('tx-input', this.props.inputClasses, { 'tx-textarea-large': size === 'large' });

      var labelClasses = (0, _classnames2['default'])('tx-label', this.props.labelClasses, { 'tx-above': placeholder || hasValue || isFocused });

      var errortextClasses = (0, _classnames2['default'])('tx-errortext', this.props.errortextClasses, { 'tx-errortext-visible': hasError });

      var fieldRequiredMessage = 'Field is required';

      // autosize

      var _getLocals = this.getLocals();

      var children = _getLocals.children;
      var saveDOMNodeRef = _getLocals.saveDOMNodeRef;

      var locals = _objectWithoutProperties(_getLocals, ['children', 'saveDOMNodeRef']);

      return _react2['default'].createElement(
        'div',
        { className: wrapperClasses },
        _react2['default'].createElement(
          'div',
          null,
          type !== 'textarea' ? _react2['default'].createElement('input', {
            autoComplete: this.props.autoComplete,
            className: inputClasses,
            disabled: isDisabled,
            id: id,
            type: type,
            required: isRequired,
            value: inputValue || '',
            'data-event-action': this.props['data-event-action'],
            name: this.props.inputName,
            placeholder: placeholder,
            onFocus: this.onFocus.bind(this),
            onBlur: this.onBlur.bind(this),
            onChange: this.onChange.bind(this)
          }) : _react2['default'].createElement(
            'textarea',
            _extends({
              autoComplete: this.props.autoComplete,
              disabled: isDisabled,
              id: id,
              type: type,
              required: isRequired,
              value: inputValue || '',
              'data-event-action': this.props['data-event-action'],
              name: this.props.inputName,
              placeholder: placeholder,
              onFocus: this.onFocus.bind(this),
              onBlur: this.onBlur.bind(this),
              onChange: this.onChange.bind(this)
            }, locals, {
              ref: saveDOMNodeRef.bind(this)
            }),
            children
          ),
          label ? _react2['default'].createElement(
            'label',
            { className: labelClasses,
              htmlFor: id
            },
            label
          ) : null
        ),
        errorTextMessage || isRequired ? _react2['default'].createElement(
          'p',
          { className: errortextClasses },
          inputValue ? errorTextMessage : fieldRequiredMessage
        ) : null
      );
    }
  }]);

  return MinimalReactTextArea;
})(_minimalReactText2['default']);

MinimalReactTextArea.defaultProps = {
  autoComplete: false,
  type: 'text',
  isDisabled: false,
  theme: 'normal',
  size: 'normal',
  rows: 1
};

if (process.env.NODE_ENV !== 'production') {
  MinimalReactTextArea.propTypes = {
    autoComplete: _propTypes2['default'].bool,
    wrapperClasses: _propTypes2['default'].string,
    inputClasses: _propTypes2['default'].string,
    labelClasses: _propTypes2['default'].string,
    errortextClasses: _propTypes2['default'].string,
    'data-event-action': _propTypes2['default'].string,
    id: _propTypes2['default'].string,
    inputName: _propTypes2['default'].string,
    inputValue: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
    isDisabled: _propTypes2['default'].bool,
    isRequired: _propTypes2['default'].bool,
    onChange: _propTypes2['default'].func,
    pattern: _propTypes2['default'].any,
    placeholder: _propTypes2['default'].string,
    size: _propTypes2['default'].string,
    theme: _propTypes2['default'].string,
    type: _propTypes2['default'].string.isRequired,
    hasError: _propTypes2['default'].bool,
    rows: _propTypes2['default'].number,
    maxRows: _propTypes2['default'].number,
    onResize: _propTypes2['default'].func,
    innerRef: _propTypes2['default'].func
  };
}

exports['default'] = MinimalReactTextArea;
module.exports = exports['default'];
// eslint-disable-line no-unused-vars

}).call(this,require('_process'))

},{"_process":4,"autosize":1,"classnames":undefined,"line-height":3,"minimal-react-text":undefined,"prop-types":undefined,"react":undefined}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYXV0b3NpemUvZGlzdC9hdXRvc2l6ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb21wdXRlZC1zdHlsZS9kaXN0L2NvbXB1dGVkU3R5bGUuY29tbW9uanMuanMiLCJub2RlX21vZHVsZXMvbGluZS1oZWlnaHQvbGliL2xpbmUtaGVpZ2h0LmpzIiwibm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIi9ob21lL3lkcmFyZ3lyb3MvRGVza3RvcC9BcnRsaW1lcy9hcnRsaW1lcy10ZXh0YXJlYS9taW5pbWFsLXJlYWN0LXRleHRhcmVhL3NyYy9NaW5pbWFsUmVhY3RUZXh0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDblNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QU8sRUFBRSx1QkFBVSxHQUFHO0FBQ3RCLGVBQVcsRUFBRSx1QkFBVSxNQUFNO0FBQzdCLFFBQUksRUFBRSx1QkFBVSxNQUFNO0FBQ3RCLFNBQUssRUFBRSx1QkFBVSxNQUFNO0FBQ3ZCLFFBQUksRUFBRSx1QkFBVSxNQUFNLENBQUMsVUFBVTtBQUNqQyxZQUFRLEVBQUUsdUJBQVUsSUFBSTtBQUN4QixRQUFJLEVBQUUsdUJBQVUsTUFBTTtBQUN0QixXQUFPLEVBQUUsdUJBQVUsTUFBTTtBQUN6QixZQUFRLEVBQUUsdUJBQVUsSUFBSTtBQUN4QixZQUFRLEVBQUUsdUJBQVUsSUFBSTtHQUN6QixDQUFDO0NBQ0g7O3FCQUVjLG9CQUFvQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiFcblx0QXV0b3NpemUgNC4wLjBcblx0bGljZW5zZTogTUlUXG5cdGh0dHA6Ly93d3cuamFja2xtb29yZS5jb20vYXV0b3NpemVcbiovXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0ZGVmaW5lKFsnZXhwb3J0cycsICdtb2R1bGUnXSwgZmFjdG9yeSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0ZmFjdG9yeShleHBvcnRzLCBtb2R1bGUpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBtb2QgPSB7XG5cdFx0XHRleHBvcnRzOiB7fVxuXHRcdH07XG5cdFx0ZmFjdG9yeShtb2QuZXhwb3J0cywgbW9kKTtcblx0XHRnbG9iYWwuYXV0b3NpemUgPSBtb2QuZXhwb3J0cztcblx0fVxufSkodGhpcywgZnVuY3Rpb24gKGV4cG9ydHMsIG1vZHVsZSkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIG1hcCA9IHR5cGVvZiBNYXAgPT09IFwiZnVuY3Rpb25cIiA/IG5ldyBNYXAoKSA6IChmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIGtleXMgPSBbXTtcblx0XHR2YXIgdmFsdWVzID0gW107XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0aGFzOiBmdW5jdGlvbiBoYXMoa2V5KSB7XG5cdFx0XHRcdHJldHVybiBrZXlzLmluZGV4T2Yoa2V5KSA+IC0xO1xuXHRcdFx0fSxcblx0XHRcdGdldDogZnVuY3Rpb24gZ2V0KGtleSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWVzW2tleXMuaW5kZXhPZihrZXkpXTtcblx0XHRcdH0sXG5cdFx0XHRzZXQ6IGZ1bmN0aW9uIHNldChrZXksIHZhbHVlKSB7XG5cdFx0XHRcdGlmIChrZXlzLmluZGV4T2Yoa2V5KSA9PT0gLTEpIHtcblx0XHRcdFx0XHRrZXlzLnB1c2goa2V5KTtcblx0XHRcdFx0XHR2YWx1ZXMucHVzaCh2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHQnZGVsZXRlJzogZnVuY3Rpb24gX2RlbGV0ZShrZXkpIHtcblx0XHRcdFx0dmFyIGluZGV4ID0ga2V5cy5pbmRleE9mKGtleSk7XG5cdFx0XHRcdGlmIChpbmRleCA+IC0xKSB7XG5cdFx0XHRcdFx0a2V5cy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0XHRcdHZhbHVlcy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0fSkoKTtcblxuXHR2YXIgY3JlYXRlRXZlbnQgPSBmdW5jdGlvbiBjcmVhdGVFdmVudChuYW1lKSB7XG5cdFx0cmV0dXJuIG5ldyBFdmVudChuYW1lLCB7IGJ1YmJsZXM6IHRydWUgfSk7XG5cdH07XG5cdHRyeSB7XG5cdFx0bmV3IEV2ZW50KCd0ZXN0Jyk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHQvLyBJRSBkb2VzIG5vdCBzdXBwb3J0IGBuZXcgRXZlbnQoKWBcblx0XHRjcmVhdGVFdmVudCA9IGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0XHR2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG5cdFx0XHRldnQuaW5pdEV2ZW50KG5hbWUsIHRydWUsIGZhbHNlKTtcblx0XHRcdHJldHVybiBldnQ7XG5cdFx0fTtcblx0fVxuXG5cdGZ1bmN0aW9uIGFzc2lnbih0YSkge1xuXHRcdGlmICghdGEgfHwgIXRhLm5vZGVOYW1lIHx8IHRhLm5vZGVOYW1lICE9PSAnVEVYVEFSRUEnIHx8IG1hcC5oYXModGEpKSByZXR1cm47XG5cblx0XHR2YXIgaGVpZ2h0T2Zmc2V0ID0gbnVsbDtcblx0XHR2YXIgY2xpZW50V2lkdGggPSB0YS5jbGllbnRXaWR0aDtcblx0XHR2YXIgY2FjaGVkSGVpZ2h0ID0gbnVsbDtcblxuXHRcdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0XHR2YXIgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0YSwgbnVsbCk7XG5cblx0XHRcdGlmIChzdHlsZS5yZXNpemUgPT09ICd2ZXJ0aWNhbCcpIHtcblx0XHRcdFx0dGEuc3R5bGUucmVzaXplID0gJ25vbmUnO1xuXHRcdFx0fSBlbHNlIGlmIChzdHlsZS5yZXNpemUgPT09ICdib3RoJykge1xuXHRcdFx0XHR0YS5zdHlsZS5yZXNpemUgPSAnaG9yaXpvbnRhbCc7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChzdHlsZS5ib3hTaXppbmcgPT09ICdjb250ZW50LWJveCcpIHtcblx0XHRcdFx0aGVpZ2h0T2Zmc2V0ID0gLShwYXJzZUZsb2F0KHN0eWxlLnBhZGRpbmdUb3ApICsgcGFyc2VGbG9hdChzdHlsZS5wYWRkaW5nQm90dG9tKSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRoZWlnaHRPZmZzZXQgPSBwYXJzZUZsb2F0KHN0eWxlLmJvcmRlclRvcFdpZHRoKSArIHBhcnNlRmxvYXQoc3R5bGUuYm9yZGVyQm90dG9tV2lkdGgpO1xuXHRcdFx0fVxuXHRcdFx0Ly8gRml4IHdoZW4gYSB0ZXh0YXJlYSBpcyBub3Qgb24gZG9jdW1lbnQgYm9keSBhbmQgaGVpZ2h0T2Zmc2V0IGlzIE5vdCBhIE51bWJlclxuXHRcdFx0aWYgKGlzTmFOKGhlaWdodE9mZnNldCkpIHtcblx0XHRcdFx0aGVpZ2h0T2Zmc2V0ID0gMDtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKCk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gY2hhbmdlT3ZlcmZsb3codmFsdWUpIHtcblx0XHRcdHtcblx0XHRcdFx0Ly8gQ2hyb21lL1NhZmFyaS1zcGVjaWZpYyBmaXg6XG5cdFx0XHRcdC8vIFdoZW4gdGhlIHRleHRhcmVhIHktb3ZlcmZsb3cgaXMgaGlkZGVuLCBDaHJvbWUvU2FmYXJpIGRvIG5vdCByZWZsb3cgdGhlIHRleHQgdG8gYWNjb3VudCBmb3IgdGhlIHNwYWNlXG5cdFx0XHRcdC8vIG1hZGUgYXZhaWxhYmxlIGJ5IHJlbW92aW5nIHRoZSBzY3JvbGxiYXIuIFRoZSBmb2xsb3dpbmcgZm9yY2VzIHRoZSBuZWNlc3NhcnkgdGV4dCByZWZsb3cuXG5cdFx0XHRcdHZhciB3aWR0aCA9IHRhLnN0eWxlLndpZHRoO1xuXHRcdFx0XHR0YS5zdHlsZS53aWR0aCA9ICcwcHgnO1xuXHRcdFx0XHQvLyBGb3JjZSByZWZsb3c6XG5cdFx0XHRcdC8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cblx0XHRcdFx0dGEub2Zmc2V0V2lkdGg7XG5cdFx0XHRcdC8qIGpzaGludCBpZ25vcmU6ZW5kICovXG5cdFx0XHRcdHRhLnN0eWxlLndpZHRoID0gd2lkdGg7XG5cdFx0XHR9XG5cblx0XHRcdHRhLnN0eWxlLm92ZXJmbG93WSA9IHZhbHVlO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGdldFBhcmVudE92ZXJmbG93cyhlbCkge1xuXHRcdFx0dmFyIGFyciA9IFtdO1xuXG5cdFx0XHR3aGlsZSAoZWwgJiYgZWwucGFyZW50Tm9kZSAmJiBlbC5wYXJlbnROb2RlIGluc3RhbmNlb2YgRWxlbWVudCkge1xuXHRcdFx0XHRpZiAoZWwucGFyZW50Tm9kZS5zY3JvbGxUb3ApIHtcblx0XHRcdFx0XHRhcnIucHVzaCh7XG5cdFx0XHRcdFx0XHRub2RlOiBlbC5wYXJlbnROb2RlLFxuXHRcdFx0XHRcdFx0c2Nyb2xsVG9wOiBlbC5wYXJlbnROb2RlLnNjcm9sbFRvcFxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsID0gZWwucGFyZW50Tm9kZTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGFycjtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiByZXNpemUoKSB7XG5cdFx0XHR2YXIgb3JpZ2luYWxIZWlnaHQgPSB0YS5zdHlsZS5oZWlnaHQ7XG5cdFx0XHR2YXIgb3ZlcmZsb3dzID0gZ2V0UGFyZW50T3ZlcmZsb3dzKHRhKTtcblx0XHRcdHZhciBkb2NUb3AgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDsgLy8gTmVlZGVkIGZvciBNb2JpbGUgSUUgKHRpY2tldCAjMjQwKVxuXG5cdFx0XHR0YS5zdHlsZS5oZWlnaHQgPSAnJztcblxuXHRcdFx0dmFyIGVuZEhlaWdodCA9IHRhLnNjcm9sbEhlaWdodCArIGhlaWdodE9mZnNldDtcblxuXHRcdFx0aWYgKHRhLnNjcm9sbEhlaWdodCA9PT0gMCkge1xuXHRcdFx0XHQvLyBJZiB0aGUgc2Nyb2xsSGVpZ2h0IGlzIDAsIHRoZW4gdGhlIGVsZW1lbnQgcHJvYmFibHkgaGFzIGRpc3BsYXk6bm9uZSBvciBpcyBkZXRhY2hlZCBmcm9tIHRoZSBET00uXG5cdFx0XHRcdHRhLnN0eWxlLmhlaWdodCA9IG9yaWdpbmFsSGVpZ2h0O1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHRhLnN0eWxlLmhlaWdodCA9IGVuZEhlaWdodCArICdweCc7XG5cblx0XHRcdC8vIHVzZWQgdG8gY2hlY2sgaWYgYW4gdXBkYXRlIGlzIGFjdHVhbGx5IG5lY2Vzc2FyeSBvbiB3aW5kb3cucmVzaXplXG5cdFx0XHRjbGllbnRXaWR0aCA9IHRhLmNsaWVudFdpZHRoO1xuXG5cdFx0XHQvLyBwcmV2ZW50cyBzY3JvbGwtcG9zaXRpb24ganVtcGluZ1xuXHRcdFx0b3ZlcmZsb3dzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG5cdFx0XHRcdGVsLm5vZGUuc2Nyb2xsVG9wID0gZWwuc2Nyb2xsVG9wO1xuXHRcdFx0fSk7XG5cblx0XHRcdGlmIChkb2NUb3ApIHtcblx0XHRcdFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA9IGRvY1RvcDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiB1cGRhdGUoKSB7XG5cdFx0XHRyZXNpemUoKTtcblxuXHRcdFx0dmFyIHN0eWxlSGVpZ2h0ID0gTWF0aC5yb3VuZChwYXJzZUZsb2F0KHRhLnN0eWxlLmhlaWdodCkpO1xuXHRcdFx0dmFyIGNvbXB1dGVkID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGEsIG51bGwpO1xuXG5cdFx0XHQvLyBVc2luZyBvZmZzZXRIZWlnaHQgYXMgYSByZXBsYWNlbWVudCBmb3IgY29tcHV0ZWQuaGVpZ2h0IGluIElFLCBiZWNhdXNlIElFIGRvZXMgbm90IGFjY291bnQgdXNlIG9mIGJvcmRlci1ib3hcblx0XHRcdHZhciBhY3R1YWxIZWlnaHQgPSBjb21wdXRlZC5ib3hTaXppbmcgPT09ICdjb250ZW50LWJveCcgPyBNYXRoLnJvdW5kKHBhcnNlRmxvYXQoY29tcHV0ZWQuaGVpZ2h0KSkgOiB0YS5vZmZzZXRIZWlnaHQ7XG5cblx0XHRcdC8vIFRoZSBhY3R1YWwgaGVpZ2h0IG5vdCBtYXRjaGluZyB0aGUgc3R5bGUgaGVpZ2h0IChzZXQgdmlhIHRoZSByZXNpemUgbWV0aG9kKSBpbmRpY2F0ZXMgdGhhdFxuXHRcdFx0Ly8gdGhlIG1heC1oZWlnaHQgaGFzIGJlZW4gZXhjZWVkZWQsIGluIHdoaWNoIGNhc2UgdGhlIG92ZXJmbG93IHNob3VsZCBiZSBhbGxvd2VkLlxuXHRcdFx0aWYgKGFjdHVhbEhlaWdodCAhPT0gc3R5bGVIZWlnaHQpIHtcblx0XHRcdFx0aWYgKGNvbXB1dGVkLm92ZXJmbG93WSA9PT0gJ2hpZGRlbicpIHtcblx0XHRcdFx0XHRjaGFuZ2VPdmVyZmxvdygnc2Nyb2xsJyk7XG5cdFx0XHRcdFx0cmVzaXplKCk7XG5cdFx0XHRcdFx0YWN0dWFsSGVpZ2h0ID0gY29tcHV0ZWQuYm94U2l6aW5nID09PSAnY29udGVudC1ib3gnID8gTWF0aC5yb3VuZChwYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRhLCBudWxsKS5oZWlnaHQpKSA6IHRhLm9mZnNldEhlaWdodDtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gTm9ybWFsbHkga2VlcCBvdmVyZmxvdyBzZXQgdG8gaGlkZGVuLCB0byBhdm9pZCBmbGFzaCBvZiBzY3JvbGxiYXIgYXMgdGhlIHRleHRhcmVhIGV4cGFuZHMuXG5cdFx0XHRcdGlmIChjb21wdXRlZC5vdmVyZmxvd1kgIT09ICdoaWRkZW4nKSB7XG5cdFx0XHRcdFx0Y2hhbmdlT3ZlcmZsb3coJ2hpZGRlbicpO1xuXHRcdFx0XHRcdHJlc2l6ZSgpO1xuXHRcdFx0XHRcdGFjdHVhbEhlaWdodCA9IGNvbXB1dGVkLmJveFNpemluZyA9PT0gJ2NvbnRlbnQtYm94JyA/IE1hdGgucm91bmQocGFyc2VGbG9hdCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0YSwgbnVsbCkuaGVpZ2h0KSkgOiB0YS5vZmZzZXRIZWlnaHQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKGNhY2hlZEhlaWdodCAhPT0gYWN0dWFsSGVpZ2h0KSB7XG5cdFx0XHRcdGNhY2hlZEhlaWdodCA9IGFjdHVhbEhlaWdodDtcblx0XHRcdFx0dmFyIGV2dCA9IGNyZWF0ZUV2ZW50KCdhdXRvc2l6ZTpyZXNpemVkJyk7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0dGEuZGlzcGF0Y2hFdmVudChldnQpO1xuXHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0XHQvLyBGaXJlZm94IHdpbGwgdGhyb3cgYW4gZXJyb3Igb24gZGlzcGF0Y2hFdmVudCBmb3IgYSBkZXRhY2hlZCBlbGVtZW50XG5cdFx0XHRcdFx0Ly8gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9ODg5Mzc2XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHR2YXIgcGFnZVJlc2l6ZSA9IGZ1bmN0aW9uIHBhZ2VSZXNpemUoKSB7XG5cdFx0XHRpZiAodGEuY2xpZW50V2lkdGggIT09IGNsaWVudFdpZHRoKSB7XG5cdFx0XHRcdHVwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR2YXIgZGVzdHJveSA9IChmdW5jdGlvbiAoc3R5bGUpIHtcblx0XHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBwYWdlUmVzaXplLCBmYWxzZSk7XG5cdFx0XHR0YS5yZW1vdmVFdmVudExpc3RlbmVyKCdpbnB1dCcsIHVwZGF0ZSwgZmFsc2UpO1xuXHRcdFx0dGEucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB1cGRhdGUsIGZhbHNlKTtcblx0XHRcdHRhLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2F1dG9zaXplOmRlc3Ryb3knLCBkZXN0cm95LCBmYWxzZSk7XG5cdFx0XHR0YS5yZW1vdmVFdmVudExpc3RlbmVyKCdhdXRvc2l6ZTp1cGRhdGUnLCB1cGRhdGUsIGZhbHNlKTtcblxuXHRcdFx0T2JqZWN0LmtleXMoc3R5bGUpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0XHR0YS5zdHlsZVtrZXldID0gc3R5bGVba2V5XTtcblx0XHRcdH0pO1xuXG5cdFx0XHRtYXBbJ2RlbGV0ZSddKHRhKTtcblx0XHR9KS5iaW5kKHRhLCB7XG5cdFx0XHRoZWlnaHQ6IHRhLnN0eWxlLmhlaWdodCxcblx0XHRcdHJlc2l6ZTogdGEuc3R5bGUucmVzaXplLFxuXHRcdFx0b3ZlcmZsb3dZOiB0YS5zdHlsZS5vdmVyZmxvd1ksXG5cdFx0XHRvdmVyZmxvd1g6IHRhLnN0eWxlLm92ZXJmbG93WCxcblx0XHRcdHdvcmRXcmFwOiB0YS5zdHlsZS53b3JkV3JhcFxuXHRcdH0pO1xuXG5cdFx0dGEuYWRkRXZlbnRMaXN0ZW5lcignYXV0b3NpemU6ZGVzdHJveScsIGRlc3Ryb3ksIGZhbHNlKTtcblxuXHRcdC8vIElFOSBkb2VzIG5vdCBmaXJlIG9ucHJvcGVydHljaGFuZ2Ugb3Igb25pbnB1dCBmb3IgZGVsZXRpb25zLFxuXHRcdC8vIHNvIGJpbmRpbmcgdG8gb25rZXl1cCB0byBjYXRjaCBtb3N0IG9mIHRob3NlIGV2ZW50cy5cblx0XHQvLyBUaGVyZSBpcyBubyB3YXkgdGhhdCBJIGtub3cgb2YgdG8gZGV0ZWN0IHNvbWV0aGluZyBsaWtlICdjdXQnIGluIElFOS5cblx0XHRpZiAoJ29ucHJvcGVydHljaGFuZ2UnIGluIHRhICYmICdvbmlucHV0JyBpbiB0YSkge1xuXHRcdFx0dGEuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB1cGRhdGUsIGZhbHNlKTtcblx0XHR9XG5cblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcGFnZVJlc2l6ZSwgZmFsc2UpO1xuXHRcdHRhLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdXBkYXRlLCBmYWxzZSk7XG5cdFx0dGEuYWRkRXZlbnRMaXN0ZW5lcignYXV0b3NpemU6dXBkYXRlJywgdXBkYXRlLCBmYWxzZSk7XG5cdFx0dGEuc3R5bGUub3ZlcmZsb3dYID0gJ2hpZGRlbic7XG5cdFx0dGEuc3R5bGUud29yZFdyYXAgPSAnYnJlYWstd29yZCc7XG5cblx0XHRtYXAuc2V0KHRhLCB7XG5cdFx0XHRkZXN0cm95OiBkZXN0cm95LFxuXHRcdFx0dXBkYXRlOiB1cGRhdGVcblx0XHR9KTtcblxuXHRcdGluaXQoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGRlc3Ryb3kodGEpIHtcblx0XHR2YXIgbWV0aG9kcyA9IG1hcC5nZXQodGEpO1xuXHRcdGlmIChtZXRob2RzKSB7XG5cdFx0XHRtZXRob2RzLmRlc3Ryb3koKTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiB1cGRhdGUodGEpIHtcblx0XHR2YXIgbWV0aG9kcyA9IG1hcC5nZXQodGEpO1xuXHRcdGlmIChtZXRob2RzKSB7XG5cdFx0XHRtZXRob2RzLnVwZGF0ZSgpO1xuXHRcdH1cblx0fVxuXG5cdHZhciBhdXRvc2l6ZSA9IG51bGw7XG5cblx0Ly8gRG8gbm90aGluZyBpbiBOb2RlLmpzIGVudmlyb25tZW50IGFuZCBJRTggKG9yIGxvd2VyKVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0YXV0b3NpemUgPSBmdW5jdGlvbiAoZWwpIHtcblx0XHRcdHJldHVybiBlbDtcblx0XHR9O1xuXHRcdGF1dG9zaXplLmRlc3Ryb3kgPSBmdW5jdGlvbiAoZWwpIHtcblx0XHRcdHJldHVybiBlbDtcblx0XHR9O1xuXHRcdGF1dG9zaXplLnVwZGF0ZSA9IGZ1bmN0aW9uIChlbCkge1xuXHRcdFx0cmV0dXJuIGVsO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0YXV0b3NpemUgPSBmdW5jdGlvbiAoZWwsIG9wdGlvbnMpIHtcblx0XHRcdGlmIChlbCkge1xuXHRcdFx0XHRBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGVsLmxlbmd0aCA/IGVsIDogW2VsXSwgZnVuY3Rpb24gKHgpIHtcblx0XHRcdFx0XHRyZXR1cm4gYXNzaWduKHgsIG9wdGlvbnMpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBlbDtcblx0XHR9O1xuXHRcdGF1dG9zaXplLmRlc3Ryb3kgPSBmdW5jdGlvbiAoZWwpIHtcblx0XHRcdGlmIChlbCkge1xuXHRcdFx0XHRBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGVsLmxlbmd0aCA/IGVsIDogW2VsXSwgZGVzdHJveSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZWw7XG5cdFx0fTtcblx0XHRhdXRvc2l6ZS51cGRhdGUgPSBmdW5jdGlvbiAoZWwpIHtcblx0XHRcdGlmIChlbCkge1xuXHRcdFx0XHRBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGVsLmxlbmd0aCA/IGVsIDogW2VsXSwgdXBkYXRlKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBlbDtcblx0XHR9O1xuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBhdXRvc2l6ZTtcbn0pOyIsIi8vIFRoaXMgY29kZSBoYXMgYmVlbiByZWZhY3RvcmVkIGZvciAxNDAgYnl0ZXNcbi8vIFlvdSBjYW4gc2VlIHRoZSBvcmlnaW5hbCBoZXJlOiBodHRwczovL2dpdGh1Yi5jb20vdHdvbGZzb24vY29tcHV0ZWRTdHlsZS9ibG9iLzA0Y2QxZGEyZTMwZmE0NTg0NGY5NWY1Y2IxYWM4OThlOWI5ZWYwNTAvbGliL2NvbXB1dGVkU3R5bGUuanNcbnZhciBjb21wdXRlZFN0eWxlID0gZnVuY3Rpb24gKGVsLCBwcm9wLCBnZXRDb21wdXRlZFN0eWxlKSB7XG4gIGdldENvbXB1dGVkU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZTtcblxuICAvLyBJbiBvbmUgZmVsbCBzd29vcFxuICByZXR1cm4gKFxuICAgIC8vIElmIHdlIGhhdmUgZ2V0Q29tcHV0ZWRTdHlsZVxuICAgIGdldENvbXB1dGVkU3R5bGUgP1xuICAgICAgLy8gUXVlcnkgaXRcbiAgICAgIC8vIFRPRE86IEZyb20gQ1NTLVF1ZXJ5IG5vdGVzLCB3ZSBtaWdodCBuZWVkIChub2RlLCBudWxsKSBmb3IgRkZcbiAgICAgIGdldENvbXB1dGVkU3R5bGUoZWwpIDpcblxuICAgIC8vIE90aGVyd2lzZSwgd2UgYXJlIGluIElFIGFuZCB1c2UgY3VycmVudFN0eWxlXG4gICAgICBlbC5jdXJyZW50U3R5bGVcbiAgKVtcbiAgICAvLyBTd2l0Y2ggdG8gY2FtZWxDYXNlIGZvciBDU1NPTVxuICAgIC8vIERFVjogR3JhYmJlZCBmcm9tIGpRdWVyeVxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvanF1ZXJ5L2Jsb2IvMS45LXN0YWJsZS9zcmMvY3NzLmpzI0wxOTEtTDE5NFxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvanF1ZXJ5L2Jsb2IvMS45LXN0YWJsZS9zcmMvY29yZS5qcyNMNTkzLUw1OTdcbiAgICBwcm9wLnJlcGxhY2UoLy0oXFx3KS9naSwgZnVuY3Rpb24gKHdvcmQsIGxldHRlcikge1xuICAgICAgcmV0dXJuIGxldHRlci50b1VwcGVyQ2FzZSgpO1xuICAgIH0pXG4gIF07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbXB1dGVkU3R5bGU7XG4iLCIvLyBMb2FkIGluIGRlcGVuZGVuY2llc1xudmFyIGNvbXB1dGVkU3R5bGUgPSByZXF1aXJlKCdjb21wdXRlZC1zdHlsZScpO1xuXG4vKipcbiAqIENhbGN1bGF0ZSB0aGUgYGxpbmUtaGVpZ2h0YCBvZiBhIGdpdmVuIG5vZGVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGUgRWxlbWVudCB0byBjYWxjdWxhdGUgbGluZSBoZWlnaHQgb2YuIE11c3QgYmUgaW4gdGhlIERPTS5cbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGBsaW5lLWhlaWdodGAgb2YgdGhlIGVsZW1lbnQgaW4gcGl4ZWxzXG4gKi9cbmZ1bmN0aW9uIGxpbmVIZWlnaHQobm9kZSkge1xuICAvLyBHcmFiIHRoZSBsaW5lLWhlaWdodCB2aWEgc3R5bGVcbiAgdmFyIGxuSGVpZ2h0U3RyID0gY29tcHV0ZWRTdHlsZShub2RlLCAnbGluZS1oZWlnaHQnKTtcbiAgdmFyIGxuSGVpZ2h0ID0gcGFyc2VGbG9hdChsbkhlaWdodFN0ciwgMTApO1xuXG4gIC8vIElmIHRoZSBsaW5lSGVpZ2h0IGRpZCBub3QgY29udGFpbiBhIHVuaXQgKGkuZS4gaXQgd2FzIG51bWVyaWMpLCBjb252ZXJ0IGl0IHRvIGVtcyAoZS5nLiAnMi4zJyA9PT0gJzIuM2VtJylcbiAgaWYgKGxuSGVpZ2h0U3RyID09PSBsbkhlaWdodCArICcnKSB7XG4gICAgLy8gU2F2ZSB0aGUgb2xkIGxpbmVIZWlnaHQgc3R5bGUgYW5kIHVwZGF0ZSB0aGUgZW0gdW5pdCB0byB0aGUgZWxlbWVudFxuICAgIHZhciBfbG5IZWlnaHRTdHlsZSA9IG5vZGUuc3R5bGUubGluZUhlaWdodDtcbiAgICBub2RlLnN0eWxlLmxpbmVIZWlnaHQgPSBsbkhlaWdodFN0ciArICdlbSc7XG5cbiAgICAvLyBDYWxjdWxhdGUgdGhlIGVtIGJhc2VkIGhlaWdodFxuICAgIGxuSGVpZ2h0U3RyID0gY29tcHV0ZWRTdHlsZShub2RlLCAnbGluZS1oZWlnaHQnKTtcbiAgICBsbkhlaWdodCA9IHBhcnNlRmxvYXQobG5IZWlnaHRTdHIsIDEwKTtcblxuICAgIC8vIFJldmVydCB0aGUgbGluZUhlaWdodCBzdHlsZVxuICAgIGlmIChfbG5IZWlnaHRTdHlsZSkge1xuICAgICAgbm9kZS5zdHlsZS5saW5lSGVpZ2h0ID0gX2xuSGVpZ2h0U3R5bGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSBub2RlLnN0eWxlLmxpbmVIZWlnaHQ7XG4gICAgfVxuICB9XG5cbiAgLy8gSWYgdGhlIGxpbmVIZWlnaHQgaXMgaW4gYHB0YCwgY29udmVydCBpdCB0byBwaXhlbHMgKDRweCBmb3IgM3B0KVxuICAvLyBERVY6IGBlbWAgdW5pdHMgYXJlIGNvbnZlcnRlZCB0byBgcHRgIGluIElFNlxuICAvLyBDb252ZXJzaW9uIHJhdGlvIGZyb20gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQ1NTL2xlbmd0aFxuICBpZiAobG5IZWlnaHRTdHIuaW5kZXhPZigncHQnKSAhPT0gLTEpIHtcbiAgICBsbkhlaWdodCAqPSA0O1xuICAgIGxuSGVpZ2h0IC89IDM7XG4gIC8vIE90aGVyd2lzZSwgaWYgdGhlIGxpbmVIZWlnaHQgaXMgaW4gYG1tYCwgY29udmVydCBpdCB0byBwaXhlbHMgKDk2cHggZm9yIDI1LjRtbSlcbiAgfSBlbHNlIGlmIChsbkhlaWdodFN0ci5pbmRleE9mKCdtbScpICE9PSAtMSkge1xuICAgIGxuSGVpZ2h0ICo9IDk2O1xuICAgIGxuSGVpZ2h0IC89IDI1LjQ7XG4gIC8vIE90aGVyd2lzZSwgaWYgdGhlIGxpbmVIZWlnaHQgaXMgaW4gYGNtYCwgY29udmVydCBpdCB0byBwaXhlbHMgKDk2cHggZm9yIDIuNTRjbSlcbiAgfSBlbHNlIGlmIChsbkhlaWdodFN0ci5pbmRleE9mKCdjbScpICE9PSAtMSkge1xuICAgIGxuSGVpZ2h0ICo9IDk2O1xuICAgIGxuSGVpZ2h0IC89IDIuNTQ7XG4gIC8vIE90aGVyd2lzZSwgaWYgdGhlIGxpbmVIZWlnaHQgaXMgaW4gYGluYCwgY29udmVydCBpdCB0byBwaXhlbHMgKDk2cHggZm9yIDFpbilcbiAgfSBlbHNlIGlmIChsbkhlaWdodFN0ci5pbmRleE9mKCdpbicpICE9PSAtMSkge1xuICAgIGxuSGVpZ2h0ICo9IDk2O1xuICAvLyBPdGhlcndpc2UsIGlmIHRoZSBsaW5lSGVpZ2h0IGlzIGluIGBwY2AsIGNvbnZlcnQgaXQgdG8gcGl4ZWxzICgxMnB0IGZvciAxcGMpXG4gIH0gZWxzZSBpZiAobG5IZWlnaHRTdHIuaW5kZXhPZigncGMnKSAhPT0gLTEpIHtcbiAgICBsbkhlaWdodCAqPSAxNjtcbiAgfVxuXG4gIC8vIENvbnRpbnVlIG91ciBjb21wdXRhdGlvblxuICBsbkhlaWdodCA9IE1hdGgucm91bmQobG5IZWlnaHQpO1xuXG4gIC8vIElmIHRoZSBsaW5lLWhlaWdodCBpcyBcIm5vcm1hbFwiLCBjYWxjdWxhdGUgYnkgZm9udC1zaXplXG4gIGlmIChsbkhlaWdodFN0ciA9PT0gJ25vcm1hbCcpIHtcbiAgICAvLyBDcmVhdGUgYSB0ZW1wb3Jhcnkgbm9kZVxuICAgIHZhciBub2RlTmFtZSA9IG5vZGUubm9kZU5hbWU7XG4gICAgdmFyIF9ub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChub2RlTmFtZSk7XG4gICAgX25vZGUuaW5uZXJIVE1MID0gJyZuYnNwOyc7XG5cbiAgICAvLyBJZiB3ZSBoYXZlIGEgdGV4dCBhcmVhLCByZXNldCBpdCB0byBvbmx5IDEgcm93XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3R3b2xmc29uL2xpbmUtaGVpZ2h0L2lzc3Vlcy80XG4gICAgaWYgKG5vZGVOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdURVhUQVJFQScpIHtcbiAgICAgIF9ub2RlLnNldEF0dHJpYnV0ZSgncm93cycsICcxJyk7XG4gICAgfVxuXG4gICAgLy8gU2V0IHRoZSBmb250LXNpemUgb2YgdGhlIGVsZW1lbnRcbiAgICB2YXIgZm9udFNpemVTdHIgPSBjb21wdXRlZFN0eWxlKG5vZGUsICdmb250LXNpemUnKTtcbiAgICBfbm9kZS5zdHlsZS5mb250U2l6ZSA9IGZvbnRTaXplU3RyO1xuXG4gICAgLy8gUmVtb3ZlIGRlZmF1bHQgcGFkZGluZy9ib3JkZXIgd2hpY2ggY2FuIGFmZmVjdCBvZmZzZXQgaGVpZ2h0XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3R3b2xmc29uL2xpbmUtaGVpZ2h0L2lzc3Vlcy80XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0hUTUxFbGVtZW50L29mZnNldEhlaWdodFxuICAgIF9ub2RlLnN0eWxlLnBhZGRpbmcgPSAnMHB4JztcbiAgICBfbm9kZS5zdHlsZS5ib3JkZXIgPSAnMHB4JztcblxuICAgIC8vIEFwcGVuZCBpdCB0byB0aGUgYm9keVxuICAgIHZhciBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgICBib2R5LmFwcGVuZENoaWxkKF9ub2RlKTtcblxuICAgIC8vIEFzc3VtZSB0aGUgbGluZSBoZWlnaHQgb2YgdGhlIGVsZW1lbnQgaXMgdGhlIGhlaWdodFxuICAgIHZhciBoZWlnaHQgPSBfbm9kZS5vZmZzZXRIZWlnaHQ7XG4gICAgbG5IZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICAvLyBSZW1vdmUgb3VyIGNoaWxkIGZyb20gdGhlIERPTVxuICAgIGJvZHkucmVtb3ZlQ2hpbGQoX25vZGUpO1xuICB9XG5cbiAgLy8gUmV0dXJuIHRoZSBjYWxjdWxhdGVkIGhlaWdodFxuICByZXR1cm4gbG5IZWlnaHQ7XG59XG5cbi8vIEV4cG9ydCBsaW5lSGVpZ2h0XG5tb2R1bGUuZXhwb3J0cyA9IGxpbmVIZWlnaHQ7XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBNaW5pbWFsUmVhY3RUZXh0IGZyb20gXCJtaW5pbWFsLXJlYWN0LXRleHRcIjtcbmltcG9ydCBhdXRvc2l6ZSBmcm9tICdhdXRvc2l6ZSc7XG5pbXBvcnQgZ2V0TGluZUhlaWdodCBmcm9tICdsaW5lLWhlaWdodCc7XG5cbmNvbnN0IFVQREFURSA9ICdhdXRvc2l6ZTp1cGRhdGUnLFxuICBERVNUUk9ZID0gJ2F1dG9zaXplOmRlc3Ryb3knLFxuICBSRVNJWkVEID0gJ2F1dG9zaXplOnJlc2l6ZWQnO1xuXG4vKiogQSBsaWdodCByZXBsYWNlbWVudCBmb3IgYnVpbHQtaW4gdGV4dGFyZWEgY29tcG9uZW50XG4gKiB3aGljaCBhdXRvbWF0aWNhbHkgYWRqdXN0cyBpdHMgaGVpZ2h0IHRvIG1hdGNoIHRoZSBjb250ZW50XG4gKiBAcGFyYW0gb25SZXNpemUgLSBjYWxsZWQgd2hlbmV2ZXIgdGhlIHRleHRhcmVhIHJlc2l6ZXNcbiAqIEBwYXJhbSByb3dzIC0gbWluaW11bSBudW1iZXIgb2YgdmlzaWJsZSByb3dzXG4gKiBAcGFyYW0gbWF4Um93cyAtIG1heGltdW0gbnVtYmVyIG9mIHZpc2libGUgcm93c1xuICogQHBhcmFtIGlubmVyUmVmIC0gY2FsbGVkIHdpdGggdGhlIHJlZiB0byB0aGUgRE9NIG5vZGVcbiAqL1xuXG5jbGFzcyBNaW5pbWFsUmVhY3RUZXh0QXJlYSBleHRlbmRzIE1pbmltYWxSZWFjdFRleHQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIGxldCBoYXNWYWx1ZSA9IGZhbHNlO1xuICAgIGxldCBoYXNFcnJvciA9IGZhbHNlO1xuICAgIGNvbnN0IGlzRm9jdXNlZCA9IGZhbHNlO1xuICAgIGNvbnN0IGlucHV0VmFsdWUgPSBwcm9wcy5pbnB1dFZhbHVlO1xuXG4gICAgaWYgKGlucHV0VmFsdWUgIT09ICcnICYmIHR5cGVvZiBpbnB1dFZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgaGFzVmFsdWUgPSB0cnVlO1xuICAgICAgaGFzRXJyb3IgPSBwcm9wcy5oYXNFcnJvciB8fCAocHJvcHMucGF0dGVybiAmJiAhcHJvcHMucGF0dGVybi50ZXN0KGlucHV0VmFsdWUpKTtcbiAgICB9XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaGFzVmFsdWUsXG4gICAgICBoYXNFcnJvcixcbiAgICAgIGlucHV0VmFsdWUsXG4gICAgICBpc0ZvY3VzZWQsXG4gICAgICBsaW5lSGVpZ2h0OiBudWxsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgbGV0IGhhc0Vycm9yID0gbmV4dFByb3BzLmhhc0Vycm9yO1xuICAgIGxldCBoYXNWYWx1ZSA9ICEhbmV4dFByb3BzLmlucHV0VmFsdWUgfHwgdGhpcy5zdGF0ZS5oYXNWYWx1ZTtcbiAgICBjb25zdCBpbnB1dFZhbHVlID0gKG5leHRQcm9wcy5pbnB1dFZhbHVlICE9PSB1bmRlZmluZWQgPyBuZXh0UHJvcHMuaW5wdXRWYWx1ZSA6IHRoaXMuc3RhdGUuaW5wdXRWYWx1ZSk7XG5cbiAgICBpZiAoIWhhc0Vycm9yICYmIGlucHV0VmFsdWUgIT09ICcnICYmIHR5cGVvZiBpbnB1dFZhbHVlICE9PSAndW5kZWZpbmVkJyAmJiAhIW5leHRQcm9wcy5wYXR0ZXJuKSB7XG4gICAgICBoYXNWYWx1ZSA9IHRydWU7XG4gICAgICBoYXNFcnJvciA9IChuZXh0UHJvcHMucGF0dGVybiAmJiAhbmV4dFByb3BzLnBhdHRlcm4udGVzdChpbnB1dFZhbHVlKSk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyBoYXNWYWx1ZSwgaGFzRXJyb3IsIGlucHV0VmFsdWUgfSk7XG4gIH1cblxuICBvbkJsdXIoZXZlbnQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlzRm9jdXNlZDogZmFsc2VcbiAgICB9KTtcblxuICAgIGNvbnN0IHsgcGF0dGVybiwgaXNSZXF1aXJlZCB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgaGFzRXJyb3I7XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGhhc1ZhbHVlOiBCb29sZWFuKGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUpLFxuICAgICAgaGFzRXJyb3I6IChldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlLmxlbmd0aCA/IChwYXR0ZXJuICYmICFwYXR0ZXJuLnRlc3QoZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSkpIDogaXNSZXF1aXJlZClcbiAgICB9KTtcblxuICAgIC8vIHVwZGF0ZSBvbiB0aGlzLnNldFN0YXRlIGhhcHBlbnMgYWZ0ZXIgdGhpcyBmdW5jdGlvbnMgaXMgY29tcGxldGVkXG4gICAgLy8gaW4gb3JkZXIgdG8gYXZvaWQgdGhhdCAnc2tpcHBlZCcgY2hhbmdlIG9mIHZhbHVlLCBJIHVzZSB0aGVcbiAgICAvLyBoYXNFcnJvciB2YXJpYWJsZVxuICAgIGhhc0Vycm9yID0gKGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUubGVuZ3RoID8gKHBhdHRlcm4gJiYgIXBhdHRlcm4udGVzdChldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlKSkgOiBpc1JlcXVpcmVkKTtcblxuICAgIGlmICh0aGlzLnByb3BzLm9uQmx1cikge1xuICAgICAgdGhpcy5wcm9wcy5vbkJsdXIoZXZlbnQsIHRoaXMsIGhhc0Vycm9yKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMub25DaGFuZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoZXZlbnQsIHRoaXMsIGhhc0Vycm9yKTtcbiAgICB9XG4gIH1cblxuICBvbkNoYW5nZShldmVudCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgaGFzVmFsdWU6IEJvb2xlYW4oZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSksXG4gICAgICBpbnB1dFZhbHVlOiBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlLFxuICAgICAgaGFzRXJyb3I6IGZhbHNlXG4gICAgfSk7XG5cbiAgICB0aGlzLmN1cnJlbnRWYWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xuXG4gICAgaWYgKHRoaXMucHJvcHMub25DaGFuZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoZXZlbnQsIHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIG9uRm9jdXMoZXZlbnQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlzRm9jdXNlZDogdHJ1ZVxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMucHJvcHMub25Gb2N1cykge1xuICAgICAgdGhpcy5wcm9wcy5vbkZvY3VzKGV2ZW50LCB0aGlzKTtcbiAgICB9XG4gIH1cblxuICAvLyBhdXRvc2l6ZSBtZXRob2RzXG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3QgeyBvblJlc2l6ZSwgbWF4Um93cyB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmICh0eXBlb2YgbWF4Um93cyA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMudXBkYXRlTGluZUhlaWdodCgpO1xuXG4gICAgICAvLyB0aGlzIHRyaWNrIGlzIG5lZWRlZCB0byBmb3JjZSBcImF1dG9zaXplXCIgdG8gYWN0aXZhdGUgdGhlIHNjcm9sbGJhclxuICAgICAgc2V0VGltZW91dCgoKSA9PiBhdXRvc2l6ZSh0aGlzLnRleHRhcmVhKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF1dG9zaXplKHRoaXMudGV4dGFyZWEpO1xuICAgIH1cblxuICAgIGlmIChvblJlc2l6ZSkge1xuICAgICAgdGhpcy50ZXh0YXJlYS5hZGRFdmVudExpc3RlbmVyKFJFU0laRUQsIHRoaXMucHJvcHMub25SZXNpemUpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGlmICh0aGlzLnByb3BzLm9uUmVzaXplKSB7XG4gICAgICB0aGlzLnRleHRhcmVhLnJlbW92ZUV2ZW50TGlzdGVuZXIoUkVTSVpFRCwgdGhpcy5wcm9wcy5vblJlc2l6ZSk7XG4gICAgfVxuICAgICgpID0+IHRoaXMuZGlzcGF0Y2hFdmVudChERVNUUk9ZKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICBpZiAodGhpcy5nZXRWYWx1ZSh0aGlzLnByb3BzKSAhPT0gdGhpcy5jdXJyZW50VmFsdWUpIHtcbiAgICAoKSA9PiAgIHRoaXMuZGlzcGF0Y2hFdmVudChVUERBVEUpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZUxpbmVIZWlnaHQoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBsaW5lSGVpZ2h0OiBnZXRMaW5lSGVpZ2h0KHRoaXMudGV4dGFyZWEpXG4gICAgfSk7XG4gIH1cblxuICBnZXRWYWx1ZSh7IHZhbHVlTGluaywgdmFsdWUgfSkge1xuICAgIHZhbHVlTGluayA/IHZhbHVlTGluay52YWx1ZSA6IHZhbHVlO1xuICB9XG5cbiAgLy8gb25DaGFuZ2UoZSkge1xuICAvLyAgIHRoaXMuY3VycmVudFZhbHVlID0gZS50YXJnZXQudmFsdWU7XG4gIC8vICAgdGhpcy5wcm9wcy5vbkNoYW5nZSAmJiB0aGlzLnByb3BzLm9uQ2hhbmdlKGUpO1xuICAvLyB9XG5cbiAgc2F2ZURPTU5vZGVSZWYocmVmKSB7XG4gICAgY29uc3QgeyBpbm5lclJlZiB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChpbm5lclJlZikge1xuICAgICAgaW5uZXJSZWYocmVmKTtcbiAgICB9XG5cbiAgICB0aGlzLnRleHRhcmVhID0gcmVmO1xuICB9XG5cbiAgZ2V0TG9jYWxzKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHByb3BzOiB7IG9uUmVzaXplLCBtYXhSb3dzLCBvbkNoYW5nZSwgc3R5bGUsIGlubmVyUmVmLCAuLi5wcm9wcyB9LCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICBzdGF0ZTogeyBsaW5lSGVpZ2h0IH0sXG4gICAgICBzYXZlRE9NTm9kZVJlZlxuICAgIH0gPSB0aGlzO1xuXG4gICAgY29uc3QgbWF4SGVpZ2h0ID0gbWF4Um93cyAmJiBsaW5lSGVpZ2h0ID8gbGluZUhlaWdodCAqIG1heFJvd3MgOiBudWxsO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnByb3BzLFxuICAgICAgc2F2ZURPTU5vZGVSZWYsXG4gICAgICBzdHlsZTogbWF4SGVpZ2h0ID8geyAuLi5zdHlsZSwgbWF4SGVpZ2h0IH0gOiBzdHlsZSxcbiAgICAgIG9uQ2hhbmdlOiAoKSA9PiB0aGlzLm9uQ2hhbmdlXG4gICAgfTtcbiAgfVxuXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGVycm9yVGV4dE1lc3NhZ2UsXG4gICAgICBpZCxcbiAgICAgIGlzRGlzYWJsZWQsXG4gICAgICBpc1JlcXVpcmVkLFxuICAgICAgbGFiZWwsXG4gICAgICBwbGFjZWhvbGRlcixcbiAgICAgIHNpemUsXG4gICAgICB0aGVtZSxcbiAgICAgIHR5cGUgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCB7IGhhc1ZhbHVlLCBoYXNFcnJvciwgaW5wdXRWYWx1ZSwgaXNGb2N1c2VkIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgY29uc3Qgd3JhcHBlckNsYXNzZXMgPSBjbGFzc05hbWVzKFxuICAgICAgJ3R4LXdyYXBwZXInLFxuICAgICAgdGhpcy5wcm9wcy53cmFwcGVyQ2xhc3NlcyxcbiAgICAgIHsgJ3R4LWZvY3VzZWQnOiBpc0ZvY3VzZWQgfSxcbiAgICAgIHsgJ3R4LWRpc2FibGVkJzogaXNEaXNhYmxlZCB9LFxuICAgICAgeyAndHgtd3JhcHBlci10ZXh0YXJlYSc6IHR5cGUgPT09ICd0ZXh0YXJlYScgfSxcbiAgICAgIHsgJ3R4LXdyYXBwZXItd2hpdGUnOiB0aGVtZSA9PT0gJ2RhcmsnIH0pO1xuXG4gICAgY29uc3QgaW5wdXRDbGFzc2VzID0gY2xhc3NOYW1lcyhcbiAgICAgICd0eC1pbnB1dCcsXG4gICAgICB0aGlzLnByb3BzLmlucHV0Q2xhc3NlcyxcbiAgICAgIHsgJ3R4LXRleHRhcmVhLWxhcmdlJzogc2l6ZSA9PT0gJ2xhcmdlJyB9KTtcblxuICAgIGNvbnN0IGxhYmVsQ2xhc3NlcyA9IGNsYXNzTmFtZXMoXG4gICAgICAndHgtbGFiZWwnLFxuICAgICAgdGhpcy5wcm9wcy5sYWJlbENsYXNzZXMsXG4gICAgICB7ICd0eC1hYm92ZSc6IHBsYWNlaG9sZGVyIHx8IGhhc1ZhbHVlIHx8IGlzRm9jdXNlZCB9KTtcblxuICAgIGNvbnN0IGVycm9ydGV4dENsYXNzZXMgPSBjbGFzc05hbWVzKFxuICAgICAgJ3R4LWVycm9ydGV4dCcsXG4gICAgICB0aGlzLnByb3BzLmVycm9ydGV4dENsYXNzZXMsXG4gICAgICB7ICd0eC1lcnJvcnRleHQtdmlzaWJsZSc6IGhhc0Vycm9yIH0pO1xuXG4gICAgY29uc3QgZmllbGRSZXF1aXJlZE1lc3NhZ2UgPSAnRmllbGQgaXMgcmVxdWlyZWQnO1xuXG4gICAgLy8gYXV0b3NpemVcbiAgICBjb25zdCB7IGNoaWxkcmVuLCBzYXZlRE9NTm9kZVJlZiwgLi4ubG9jYWxzIH0gPSB0aGlzLmdldExvY2FscygpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXt3cmFwcGVyQ2xhc3Nlc30+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAge3R5cGUgIT09ICd0ZXh0YXJlYScgP1xuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIGF1dG9Db21wbGV0ZT17dGhpcy5wcm9wcy5hdXRvQ29tcGxldGV9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17aW5wdXRDbGFzc2VzfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17aXNEaXNhYmxlZH1cbiAgICAgICAgICAgICAgaWQ9e2lkfVxuICAgICAgICAgICAgICB0eXBlPXt0eXBlfVxuICAgICAgICAgICAgICByZXF1aXJlZD17aXNSZXF1aXJlZH1cbiAgICAgICAgICAgICAgdmFsdWU9e2lucHV0VmFsdWUgfHwgJyd9XG4gICAgICAgICAgICAgIGRhdGEtZXZlbnQtYWN0aW9uPXt0aGlzLnByb3BzWydkYXRhLWV2ZW50LWFjdGlvbiddfVxuICAgICAgICAgICAgICBuYW1lPXt0aGlzLnByb3BzLmlucHV0TmFtZX1cbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLm9uRm9jdXMuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLm9uQmx1ci5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgLz4gOlxuICAgICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICAgIGF1dG9Db21wbGV0ZT17dGhpcy5wcm9wcy5hdXRvQ29tcGxldGV9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtpc0Rpc2FibGVkfVxuICAgICAgICAgICAgICBpZD17aWR9XG4gICAgICAgICAgICAgIHR5cGU9e3R5cGV9XG4gICAgICAgICAgICAgIHJlcXVpcmVkPXtpc1JlcXVpcmVkfVxuICAgICAgICAgICAgICB2YWx1ZT17aW5wdXRWYWx1ZSB8fCAnJ31cbiAgICAgICAgICAgICAgZGF0YS1ldmVudC1hY3Rpb249e3RoaXMucHJvcHNbJ2RhdGEtZXZlbnQtYWN0aW9uJ119XG4gICAgICAgICAgICAgIG5hbWU9e3RoaXMucHJvcHMuaW5wdXROYW1lfVxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMub25Gb2N1cy5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25CbHVyLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgIHsuLi5sb2NhbHN9XG4gICAgICAgICAgICAgIHJlZj17c2F2ZURPTU5vZGVSZWYuYmluZCh0aGlzKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICAgICAgPC90ZXh0YXJlYT5cbiAgICAgICAgICB9XG4gICAgICAgICAge2xhYmVsID8gPGxhYmVsIGNsYXNzTmFtZT17bGFiZWxDbGFzc2VzfVxuICAgICAgICAgICAgaHRtbEZvcj17aWR9XG4gICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAge2xhYmVsfVxuICAgICAgICAgIDwvbGFiZWw+IDogbnVsbH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHsoZXJyb3JUZXh0TWVzc2FnZSB8fCBpc1JlcXVpcmVkKSA/XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPXtlcnJvcnRleHRDbGFzc2VzfT5cbiAgICAgICAgICB7aW5wdXRWYWx1ZSA/IGVycm9yVGV4dE1lc3NhZ2UgOiBmaWVsZFJlcXVpcmVkTWVzc2FnZX1cbiAgICAgICAgICA8L3A+IDogbnVsbH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuTWluaW1hbFJlYWN0VGV4dEFyZWEuZGVmYXVsdFByb3BzID0ge1xuICBhdXRvQ29tcGxldGU6IGZhbHNlLFxuICB0eXBlOiAndGV4dCcsXG4gIGlzRGlzYWJsZWQ6IGZhbHNlLFxuICB0aGVtZTogJ25vcm1hbCcsXG4gIHNpemU6ICdub3JtYWwnLFxuICByb3dzOiAxXG59O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBNaW5pbWFsUmVhY3RUZXh0QXJlYS5wcm9wVHlwZXMgPSB7XG4gICAgYXV0b0NvbXBsZXRlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB3cmFwcGVyQ2xhc3NlczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpbnB1dENsYXNzZXM6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbGFiZWxDbGFzc2VzOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGVycm9ydGV4dENsYXNzZXM6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgJ2RhdGEtZXZlbnQtYWN0aW9uJzogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpbnB1dE5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaW5wdXRWYWx1ZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLm51bWJlcl0pLFxuICAgIGlzRGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGlzUmVxdWlyZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBwYXR0ZXJuOiBQcm9wVHlwZXMuYW55LFxuICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNpemU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdGhlbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdHlwZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGhhc0Vycm9yOiBQcm9wVHlwZXMuYm9vbCxcbiAgICByb3dzOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG1heFJvd3M6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgb25SZXNpemU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGlubmVyUmVmOiBQcm9wVHlwZXMuZnVuY1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBNaW5pbWFsUmVhY3RUZXh0QXJlYTtcbiJdfQ==
