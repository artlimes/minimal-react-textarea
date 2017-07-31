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
    var lineHeight = null;
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
      lineHeight: lineHeight
    };
  }

  _createClass(MinimalReactTextArea, [{
    key: 'onChange',
    value: function onChange(event) {
      this.setState({
        hasValue: Boolean(event.currentTarget.value),
        inputValue: event.currentTarget.value,
        hasError: false
      });

      this.currentValue = event.currentTarget.value;

      if (this.props.onChange) {
        this.props.onChange(event, this);
      }
    }

    // autosize methods

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this = this;

      var _props = this.props;
      var onResize = _props.onResize;
      var maxRows = _props.maxRows;

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
      var _props2 = this.props;
      var onResize = _props2.onResize;
      var maxRows = _props2.maxRows;
      var onChange = _props2.onChange;
      var style = _props2.style;
      var innerRef = _props2.innerRef;
      var lineHeight = this.state.lineHeight;
      var saveDOMNodeRef = this.saveDOMNodeRef;

      var maxHeight = maxRows && lineHeight ? lineHeight * maxRows : null;

      return {
        saveDOMNodeRef: saveDOMNodeRef,
        style: maxHeight ? _extends({}, style, { maxHeight: maxHeight }) : style,
        onChange: this.onChange.bind(this)
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var errorTextMessage = _props3.errorTextMessage;
      var id = _props3.id;
      var isDisabled = _props3.isDisabled;
      var isRequired = _props3.isRequired;
      var label = _props3.label;
      var placeholder = _props3.placeholder;
      var theme = _props3.theme;
      var _state = this.state;
      var hasValue = _state.hasValue;
      var hasError = _state.hasError;
      var inputValue = _state.inputValue;
      var isFocused = _state.isFocused;

      var wrapperClasses = (0, _classnames2['default'])('tx-wrapper', 'tx-wrapper-textarea', this.props.wrapperClasses, { 'tx-focused': isFocused }, { 'tx-disabled': isDisabled }, { 'tx-wrapper-white': theme === 'dark' });

      var inputClasses = (0, _classnames2['default'])('tx-input', this.props.inputClasses);

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
          _react2['default'].createElement(
            'textarea',
            _extends({
              autoComplete: this.props.autoComplete,
              className: inputClasses,
              disabled: isDisabled,
              id: id,
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
  rows: 3
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
    theme: _propTypes2['default'].string,
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYXV0b3NpemUvZGlzdC9hdXRvc2l6ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb21wdXRlZC1zdHlsZS9kaXN0L2NvbXB1dGVkU3R5bGUuY29tbW9uanMuanMiLCJub2RlX21vZHVsZXMvbGluZS1oZWlnaHQvbGliL2xpbmUtaGVpZ2h0LmpzIiwibm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIi9ob21lL3lkcmFyZ3lyb3MvRGVza3RvcC9BcnRsaW1lcy9hcnRsaW1lcy10ZXh0YXJlYS9taW5pbWFsLXJlYWN0LXRleHRhcmVhL3NyYy9NaW5pbWFsUmVhY3RUZXh0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDblNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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SUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxZQUFZLEVBQUU7QUFDekMsc0JBQW9CLENBQUMsU0FBUyxHQUFHO0FBQy9CLGdCQUFZLEVBQUUsdUJBQVUsSUFBSTtBQUM1QixrQkFBYyxFQUFFLHVCQUFVLE1BQU07QUFDaEMsZ0JBQVksRUFBRSx1QkFBVSxNQUFNO0FBQzlCLGdCQUFZLEVBQUUsdUJBQVUsTUFBTTtBQUM5QixvQkFBZ0IsRUFBRSx1QkFBVSxNQUFNO0FBQ2xDLHVCQUFtQixFQUFFLHVCQUFVLE1BQU07QUFDckMsTUFBRSxFQUFFLHVCQUFVLE1BQU07QUFDcEIsYUFBUyxFQUFFLHVCQUFVLE1BQU07QUFDM0IsY0FBVSxFQUFFLHVCQUFVLFNBQVMsQ0FBQyxDQUM5Qix1QkFBVSxNQUFNLEVBQ2hCLHVCQUFVLE1BQU0sQ0FBQyxDQUFDO0FBQ3BCLGNBQVUsRUFBRSx1QkFBVSxJQUFJO0FBQzFCLGNBQVUsRUFBRSx1QkFBVSxJQUFJO0FBQzFCLFlBQVEsRUFBRSx1QkFBVSxJQUFJO0FBQ3hCLFdBQU8sRUFBRSx1QkFBVSxHQUFHO0FBQ3RCLGVBQVcsRUFBRSx1QkFBVSxNQUFNO0FBQzdCLFNBQUssRUFBRSx1QkFBVSxNQUFNO0FBQ3ZCLFlBQVEsRUFBRSx1QkFBVSxJQUFJO0FBQ3hCLFFBQUksRUFBRSx1QkFBVSxNQUFNO0FBQ3RCLFdBQU8sRUFBRSx1QkFBVSxNQUFNO0FBQ3pCLFlBQVEsRUFBRSx1QkFBVSxJQUFJO0FBQ3hCLFlBQVEsRUFBRSx1QkFBVSxJQUFJO0dBQ3pCLENBQUM7Q0FDSDs7cUJBRWMsb0JBQW9CIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIVxuXHRBdXRvc2l6ZSA0LjAuMFxuXHRsaWNlbnNlOiBNSVRcblx0aHR0cDovL3d3dy5qYWNrbG1vb3JlLmNvbS9hdXRvc2l6ZVxuKi9cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcblx0XHRkZWZpbmUoWydleHBvcnRzJywgJ21vZHVsZSddLCBmYWN0b3J5KTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRmYWN0b3J5KGV4cG9ydHMsIG1vZHVsZSk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIG1vZCA9IHtcblx0XHRcdGV4cG9ydHM6IHt9XG5cdFx0fTtcblx0XHRmYWN0b3J5KG1vZC5leHBvcnRzLCBtb2QpO1xuXHRcdGdsb2JhbC5hdXRvc2l6ZSA9IG1vZC5leHBvcnRzO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbiAoZXhwb3J0cywgbW9kdWxlKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgbWFwID0gdHlwZW9mIE1hcCA9PT0gXCJmdW5jdGlvblwiID8gbmV3IE1hcCgpIDogKGZ1bmN0aW9uICgpIHtcblx0XHR2YXIga2V5cyA9IFtdO1xuXHRcdHZhciB2YWx1ZXMgPSBbXTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRoYXM6IGZ1bmN0aW9uIGhhcyhrZXkpIHtcblx0XHRcdFx0cmV0dXJuIGtleXMuaW5kZXhPZihrZXkpID4gLTE7XG5cdFx0XHR9LFxuXHRcdFx0Z2V0OiBmdW5jdGlvbiBnZXQoa2V5KSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZXNba2V5cy5pbmRleE9mKGtleSldO1xuXHRcdFx0fSxcblx0XHRcdHNldDogZnVuY3Rpb24gc2V0KGtleSwgdmFsdWUpIHtcblx0XHRcdFx0aWYgKGtleXMuaW5kZXhPZihrZXkpID09PSAtMSkge1xuXHRcdFx0XHRcdGtleXMucHVzaChrZXkpO1xuXHRcdFx0XHRcdHZhbHVlcy5wdXNoKHZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdCdkZWxldGUnOiBmdW5jdGlvbiBfZGVsZXRlKGtleSkge1xuXHRcdFx0XHR2YXIgaW5kZXggPSBrZXlzLmluZGV4T2Yoa2V5KTtcblx0XHRcdFx0aWYgKGluZGV4ID4gLTEpIHtcblx0XHRcdFx0XHRrZXlzLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHRcdFx0dmFsdWVzLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXHR9KSgpO1xuXG5cdHZhciBjcmVhdGVFdmVudCA9IGZ1bmN0aW9uIGNyZWF0ZUV2ZW50KG5hbWUpIHtcblx0XHRyZXR1cm4gbmV3IEV2ZW50KG5hbWUsIHsgYnViYmxlczogdHJ1ZSB9KTtcblx0fTtcblx0dHJ5IHtcblx0XHRuZXcgRXZlbnQoJ3Rlc3QnKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdC8vIElFIGRvZXMgbm90IHN1cHBvcnQgYG5ldyBFdmVudCgpYFxuXHRcdGNyZWF0ZUV2ZW50ID0gZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRcdHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcblx0XHRcdGV2dC5pbml0RXZlbnQobmFtZSwgdHJ1ZSwgZmFsc2UpO1xuXHRcdFx0cmV0dXJuIGV2dDtcblx0XHR9O1xuXHR9XG5cblx0ZnVuY3Rpb24gYXNzaWduKHRhKSB7XG5cdFx0aWYgKCF0YSB8fCAhdGEubm9kZU5hbWUgfHwgdGEubm9kZU5hbWUgIT09ICdURVhUQVJFQScgfHwgbWFwLmhhcyh0YSkpIHJldHVybjtcblxuXHRcdHZhciBoZWlnaHRPZmZzZXQgPSBudWxsO1xuXHRcdHZhciBjbGllbnRXaWR0aCA9IHRhLmNsaWVudFdpZHRoO1xuXHRcdHZhciBjYWNoZWRIZWlnaHQgPSBudWxsO1xuXG5cdFx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRcdHZhciBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRhLCBudWxsKTtcblxuXHRcdFx0aWYgKHN0eWxlLnJlc2l6ZSA9PT0gJ3ZlcnRpY2FsJykge1xuXHRcdFx0XHR0YS5zdHlsZS5yZXNpemUgPSAnbm9uZSc7XG5cdFx0XHR9IGVsc2UgaWYgKHN0eWxlLnJlc2l6ZSA9PT0gJ2JvdGgnKSB7XG5cdFx0XHRcdHRhLnN0eWxlLnJlc2l6ZSA9ICdob3Jpem9udGFsJztcblx0XHRcdH1cblxuXHRcdFx0aWYgKHN0eWxlLmJveFNpemluZyA9PT0gJ2NvbnRlbnQtYm94Jykge1xuXHRcdFx0XHRoZWlnaHRPZmZzZXQgPSAtKHBhcnNlRmxvYXQoc3R5bGUucGFkZGluZ1RvcCkgKyBwYXJzZUZsb2F0KHN0eWxlLnBhZGRpbmdCb3R0b20pKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGhlaWdodE9mZnNldCA9IHBhcnNlRmxvYXQoc3R5bGUuYm9yZGVyVG9wV2lkdGgpICsgcGFyc2VGbG9hdChzdHlsZS5ib3JkZXJCb3R0b21XaWR0aCk7XG5cdFx0XHR9XG5cdFx0XHQvLyBGaXggd2hlbiBhIHRleHRhcmVhIGlzIG5vdCBvbiBkb2N1bWVudCBib2R5IGFuZCBoZWlnaHRPZmZzZXQgaXMgTm90IGEgTnVtYmVyXG5cdFx0XHRpZiAoaXNOYU4oaGVpZ2h0T2Zmc2V0KSkge1xuXHRcdFx0XHRoZWlnaHRPZmZzZXQgPSAwO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUoKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBjaGFuZ2VPdmVyZmxvdyh2YWx1ZSkge1xuXHRcdFx0e1xuXHRcdFx0XHQvLyBDaHJvbWUvU2FmYXJpLXNwZWNpZmljIGZpeDpcblx0XHRcdFx0Ly8gV2hlbiB0aGUgdGV4dGFyZWEgeS1vdmVyZmxvdyBpcyBoaWRkZW4sIENocm9tZS9TYWZhcmkgZG8gbm90IHJlZmxvdyB0aGUgdGV4dCB0byBhY2NvdW50IGZvciB0aGUgc3BhY2Vcblx0XHRcdFx0Ly8gbWFkZSBhdmFpbGFibGUgYnkgcmVtb3ZpbmcgdGhlIHNjcm9sbGJhci4gVGhlIGZvbGxvd2luZyBmb3JjZXMgdGhlIG5lY2Vzc2FyeSB0ZXh0IHJlZmxvdy5cblx0XHRcdFx0dmFyIHdpZHRoID0gdGEuc3R5bGUud2lkdGg7XG5cdFx0XHRcdHRhLnN0eWxlLndpZHRoID0gJzBweCc7XG5cdFx0XHRcdC8vIEZvcmNlIHJlZmxvdzpcblx0XHRcdFx0LyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuXHRcdFx0XHR0YS5vZmZzZXRXaWR0aDtcblx0XHRcdFx0LyoganNoaW50IGlnbm9yZTplbmQgKi9cblx0XHRcdFx0dGEuc3R5bGUud2lkdGggPSB3aWR0aDtcblx0XHRcdH1cblxuXHRcdFx0dGEuc3R5bGUub3ZlcmZsb3dZID0gdmFsdWU7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZ2V0UGFyZW50T3ZlcmZsb3dzKGVsKSB7XG5cdFx0XHR2YXIgYXJyID0gW107XG5cblx0XHRcdHdoaWxlIChlbCAmJiBlbC5wYXJlbnROb2RlICYmIGVsLnBhcmVudE5vZGUgaW5zdGFuY2VvZiBFbGVtZW50KSB7XG5cdFx0XHRcdGlmIChlbC5wYXJlbnROb2RlLnNjcm9sbFRvcCkge1xuXHRcdFx0XHRcdGFyci5wdXNoKHtcblx0XHRcdFx0XHRcdG5vZGU6IGVsLnBhcmVudE5vZGUsXG5cdFx0XHRcdFx0XHRzY3JvbGxUb3A6IGVsLnBhcmVudE5vZGUuc2Nyb2xsVG9wXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWwgPSBlbC5wYXJlbnROb2RlO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gYXJyO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHJlc2l6ZSgpIHtcblx0XHRcdHZhciBvcmlnaW5hbEhlaWdodCA9IHRhLnN0eWxlLmhlaWdodDtcblx0XHRcdHZhciBvdmVyZmxvd3MgPSBnZXRQYXJlbnRPdmVyZmxvd3ModGEpO1xuXHRcdFx0dmFyIGRvY1RvcCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wOyAvLyBOZWVkZWQgZm9yIE1vYmlsZSBJRSAodGlja2V0ICMyNDApXG5cblx0XHRcdHRhLnN0eWxlLmhlaWdodCA9ICcnO1xuXG5cdFx0XHR2YXIgZW5kSGVpZ2h0ID0gdGEuc2Nyb2xsSGVpZ2h0ICsgaGVpZ2h0T2Zmc2V0O1xuXG5cdFx0XHRpZiAodGEuc2Nyb2xsSGVpZ2h0ID09PSAwKSB7XG5cdFx0XHRcdC8vIElmIHRoZSBzY3JvbGxIZWlnaHQgaXMgMCwgdGhlbiB0aGUgZWxlbWVudCBwcm9iYWJseSBoYXMgZGlzcGxheTpub25lIG9yIGlzIGRldGFjaGVkIGZyb20gdGhlIERPTS5cblx0XHRcdFx0dGEuc3R5bGUuaGVpZ2h0ID0gb3JpZ2luYWxIZWlnaHQ7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dGEuc3R5bGUuaGVpZ2h0ID0gZW5kSGVpZ2h0ICsgJ3B4JztcblxuXHRcdFx0Ly8gdXNlZCB0byBjaGVjayBpZiBhbiB1cGRhdGUgaXMgYWN0dWFsbHkgbmVjZXNzYXJ5IG9uIHdpbmRvdy5yZXNpemVcblx0XHRcdGNsaWVudFdpZHRoID0gdGEuY2xpZW50V2lkdGg7XG5cblx0XHRcdC8vIHByZXZlbnRzIHNjcm9sbC1wb3NpdGlvbiBqdW1waW5nXG5cdFx0XHRvdmVyZmxvd3MuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcblx0XHRcdFx0ZWwubm9kZS5zY3JvbGxUb3AgPSBlbC5zY3JvbGxUb3A7XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKGRvY1RvcCkge1xuXHRcdFx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wID0gZG9jVG9wO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHVwZGF0ZSgpIHtcblx0XHRcdHJlc2l6ZSgpO1xuXG5cdFx0XHR2YXIgc3R5bGVIZWlnaHQgPSBNYXRoLnJvdW5kKHBhcnNlRmxvYXQodGEuc3R5bGUuaGVpZ2h0KSk7XG5cdFx0XHR2YXIgY29tcHV0ZWQgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0YSwgbnVsbCk7XG5cblx0XHRcdC8vIFVzaW5nIG9mZnNldEhlaWdodCBhcyBhIHJlcGxhY2VtZW50IGZvciBjb21wdXRlZC5oZWlnaHQgaW4gSUUsIGJlY2F1c2UgSUUgZG9lcyBub3QgYWNjb3VudCB1c2Ugb2YgYm9yZGVyLWJveFxuXHRcdFx0dmFyIGFjdHVhbEhlaWdodCA9IGNvbXB1dGVkLmJveFNpemluZyA9PT0gJ2NvbnRlbnQtYm94JyA/IE1hdGgucm91bmQocGFyc2VGbG9hdChjb21wdXRlZC5oZWlnaHQpKSA6IHRhLm9mZnNldEhlaWdodDtcblxuXHRcdFx0Ly8gVGhlIGFjdHVhbCBoZWlnaHQgbm90IG1hdGNoaW5nIHRoZSBzdHlsZSBoZWlnaHQgKHNldCB2aWEgdGhlIHJlc2l6ZSBtZXRob2QpIGluZGljYXRlcyB0aGF0XG5cdFx0XHQvLyB0aGUgbWF4LWhlaWdodCBoYXMgYmVlbiBleGNlZWRlZCwgaW4gd2hpY2ggY2FzZSB0aGUgb3ZlcmZsb3cgc2hvdWxkIGJlIGFsbG93ZWQuXG5cdFx0XHRpZiAoYWN0dWFsSGVpZ2h0ICE9PSBzdHlsZUhlaWdodCkge1xuXHRcdFx0XHRpZiAoY29tcHV0ZWQub3ZlcmZsb3dZID09PSAnaGlkZGVuJykge1xuXHRcdFx0XHRcdGNoYW5nZU92ZXJmbG93KCdzY3JvbGwnKTtcblx0XHRcdFx0XHRyZXNpemUoKTtcblx0XHRcdFx0XHRhY3R1YWxIZWlnaHQgPSBjb21wdXRlZC5ib3hTaXppbmcgPT09ICdjb250ZW50LWJveCcgPyBNYXRoLnJvdW5kKHBhcnNlRmxvYXQod2luZG93LmdldENvbXB1dGVkU3R5bGUodGEsIG51bGwpLmhlaWdodCkpIDogdGEub2Zmc2V0SGVpZ2h0O1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBOb3JtYWxseSBrZWVwIG92ZXJmbG93IHNldCB0byBoaWRkZW4sIHRvIGF2b2lkIGZsYXNoIG9mIHNjcm9sbGJhciBhcyB0aGUgdGV4dGFyZWEgZXhwYW5kcy5cblx0XHRcdFx0aWYgKGNvbXB1dGVkLm92ZXJmbG93WSAhPT0gJ2hpZGRlbicpIHtcblx0XHRcdFx0XHRjaGFuZ2VPdmVyZmxvdygnaGlkZGVuJyk7XG5cdFx0XHRcdFx0cmVzaXplKCk7XG5cdFx0XHRcdFx0YWN0dWFsSGVpZ2h0ID0gY29tcHV0ZWQuYm94U2l6aW5nID09PSAnY29udGVudC1ib3gnID8gTWF0aC5yb3VuZChwYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRhLCBudWxsKS5oZWlnaHQpKSA6IHRhLm9mZnNldEhlaWdodDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoY2FjaGVkSGVpZ2h0ICE9PSBhY3R1YWxIZWlnaHQpIHtcblx0XHRcdFx0Y2FjaGVkSGVpZ2h0ID0gYWN0dWFsSGVpZ2h0O1xuXHRcdFx0XHR2YXIgZXZ0ID0gY3JlYXRlRXZlbnQoJ2F1dG9zaXplOnJlc2l6ZWQnKTtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHR0YS5kaXNwYXRjaEV2ZW50KGV2dCk7XG5cdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRcdC8vIEZpcmVmb3ggd2lsbCB0aHJvdyBhbiBlcnJvciBvbiBkaXNwYXRjaEV2ZW50IGZvciBhIGRldGFjaGVkIGVsZW1lbnRcblx0XHRcdFx0XHQvLyBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD04ODkzNzZcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHZhciBwYWdlUmVzaXplID0gZnVuY3Rpb24gcGFnZVJlc2l6ZSgpIHtcblx0XHRcdGlmICh0YS5jbGllbnRXaWR0aCAhPT0gY2xpZW50V2lkdGgpIHtcblx0XHRcdFx0dXBkYXRlKCk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHZhciBkZXN0cm95ID0gKGZ1bmN0aW9uIChzdHlsZSkge1xuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHBhZ2VSZXNpemUsIGZhbHNlKTtcblx0XHRcdHRhLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdXBkYXRlLCBmYWxzZSk7XG5cdFx0XHR0YS5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIHVwZGF0ZSwgZmFsc2UpO1xuXHRcdFx0dGEucmVtb3ZlRXZlbnRMaXN0ZW5lcignYXV0b3NpemU6ZGVzdHJveScsIGRlc3Ryb3ksIGZhbHNlKTtcblx0XHRcdHRhLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2F1dG9zaXplOnVwZGF0ZScsIHVwZGF0ZSwgZmFsc2UpO1xuXG5cdFx0XHRPYmplY3Qua2V5cyhzdHlsZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRcdHRhLnN0eWxlW2tleV0gPSBzdHlsZVtrZXldO1xuXHRcdFx0fSk7XG5cblx0XHRcdG1hcFsnZGVsZXRlJ10odGEpO1xuXHRcdH0pLmJpbmQodGEsIHtcblx0XHRcdGhlaWdodDogdGEuc3R5bGUuaGVpZ2h0LFxuXHRcdFx0cmVzaXplOiB0YS5zdHlsZS5yZXNpemUsXG5cdFx0XHRvdmVyZmxvd1k6IHRhLnN0eWxlLm92ZXJmbG93WSxcblx0XHRcdG92ZXJmbG93WDogdGEuc3R5bGUub3ZlcmZsb3dYLFxuXHRcdFx0d29yZFdyYXA6IHRhLnN0eWxlLndvcmRXcmFwXG5cdFx0fSk7XG5cblx0XHR0YS5hZGRFdmVudExpc3RlbmVyKCdhdXRvc2l6ZTpkZXN0cm95JywgZGVzdHJveSwgZmFsc2UpO1xuXG5cdFx0Ly8gSUU5IGRvZXMgbm90IGZpcmUgb25wcm9wZXJ0eWNoYW5nZSBvciBvbmlucHV0IGZvciBkZWxldGlvbnMsXG5cdFx0Ly8gc28gYmluZGluZyB0byBvbmtleXVwIHRvIGNhdGNoIG1vc3Qgb2YgdGhvc2UgZXZlbnRzLlxuXHRcdC8vIFRoZXJlIGlzIG5vIHdheSB0aGF0IEkga25vdyBvZiB0byBkZXRlY3Qgc29tZXRoaW5nIGxpa2UgJ2N1dCcgaW4gSUU5LlxuXHRcdGlmICgnb25wcm9wZXJ0eWNoYW5nZScgaW4gdGEgJiYgJ29uaW5wdXQnIGluIHRhKSB7XG5cdFx0XHR0YS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHVwZGF0ZSwgZmFsc2UpO1xuXHRcdH1cblxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBwYWdlUmVzaXplLCBmYWxzZSk7XG5cdFx0dGEuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB1cGRhdGUsIGZhbHNlKTtcblx0XHR0YS5hZGRFdmVudExpc3RlbmVyKCdhdXRvc2l6ZTp1cGRhdGUnLCB1cGRhdGUsIGZhbHNlKTtcblx0XHR0YS5zdHlsZS5vdmVyZmxvd1ggPSAnaGlkZGVuJztcblx0XHR0YS5zdHlsZS53b3JkV3JhcCA9ICdicmVhay13b3JkJztcblxuXHRcdG1hcC5zZXQodGEsIHtcblx0XHRcdGRlc3Ryb3k6IGRlc3Ryb3ksXG5cdFx0XHR1cGRhdGU6IHVwZGF0ZVxuXHRcdH0pO1xuXG5cdFx0aW5pdCgpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZGVzdHJveSh0YSkge1xuXHRcdHZhciBtZXRob2RzID0gbWFwLmdldCh0YSk7XG5cdFx0aWYgKG1ldGhvZHMpIHtcblx0XHRcdG1ldGhvZHMuZGVzdHJveSgpO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIHVwZGF0ZSh0YSkge1xuXHRcdHZhciBtZXRob2RzID0gbWFwLmdldCh0YSk7XG5cdFx0aWYgKG1ldGhvZHMpIHtcblx0XHRcdG1ldGhvZHMudXBkYXRlKCk7XG5cdFx0fVxuXHR9XG5cblx0dmFyIGF1dG9zaXplID0gbnVsbDtcblxuXHQvLyBEbyBub3RoaW5nIGluIE5vZGUuanMgZW52aXJvbm1lbnQgYW5kIElFOCAob3IgbG93ZXIpXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2Ygd2luZG93LmdldENvbXB1dGVkU3R5bGUgIT09ICdmdW5jdGlvbicpIHtcblx0XHRhdXRvc2l6ZSA9IGZ1bmN0aW9uIChlbCkge1xuXHRcdFx0cmV0dXJuIGVsO1xuXHRcdH07XG5cdFx0YXV0b3NpemUuZGVzdHJveSA9IGZ1bmN0aW9uIChlbCkge1xuXHRcdFx0cmV0dXJuIGVsO1xuXHRcdH07XG5cdFx0YXV0b3NpemUudXBkYXRlID0gZnVuY3Rpb24gKGVsKSB7XG5cdFx0XHRyZXR1cm4gZWw7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRhdXRvc2l6ZSA9IGZ1bmN0aW9uIChlbCwgb3B0aW9ucykge1xuXHRcdFx0aWYgKGVsKSB7XG5cdFx0XHRcdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZWwubGVuZ3RoID8gZWwgOiBbZWxdLCBmdW5jdGlvbiAoeCkge1xuXHRcdFx0XHRcdHJldHVybiBhc3NpZ24oeCwgb3B0aW9ucyk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGVsO1xuXHRcdH07XG5cdFx0YXV0b3NpemUuZGVzdHJveSA9IGZ1bmN0aW9uIChlbCkge1xuXHRcdFx0aWYgKGVsKSB7XG5cdFx0XHRcdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZWwubGVuZ3RoID8gZWwgOiBbZWxdLCBkZXN0cm95KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBlbDtcblx0XHR9O1xuXHRcdGF1dG9zaXplLnVwZGF0ZSA9IGZ1bmN0aW9uIChlbCkge1xuXHRcdFx0aWYgKGVsKSB7XG5cdFx0XHRcdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZWwubGVuZ3RoID8gZWwgOiBbZWxdLCB1cGRhdGUpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGVsO1xuXHRcdH07XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IGF1dG9zaXplO1xufSk7IiwiLy8gVGhpcyBjb2RlIGhhcyBiZWVuIHJlZmFjdG9yZWQgZm9yIDE0MCBieXRlc1xuLy8gWW91IGNhbiBzZWUgdGhlIG9yaWdpbmFsIGhlcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS90d29sZnNvbi9jb21wdXRlZFN0eWxlL2Jsb2IvMDRjZDFkYTJlMzBmYTQ1ODQ0Zjk1ZjVjYjFhYzg5OGU5YjllZjA1MC9saWIvY29tcHV0ZWRTdHlsZS5qc1xudmFyIGNvbXB1dGVkU3R5bGUgPSBmdW5jdGlvbiAoZWwsIHByb3AsIGdldENvbXB1dGVkU3R5bGUpIHtcbiAgZ2V0Q29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlO1xuXG4gIC8vIEluIG9uZSBmZWxsIHN3b29wXG4gIHJldHVybiAoXG4gICAgLy8gSWYgd2UgaGF2ZSBnZXRDb21wdXRlZFN0eWxlXG4gICAgZ2V0Q29tcHV0ZWRTdHlsZSA/XG4gICAgICAvLyBRdWVyeSBpdFxuICAgICAgLy8gVE9ETzogRnJvbSBDU1MtUXVlcnkgbm90ZXMsIHdlIG1pZ2h0IG5lZWQgKG5vZGUsIG51bGwpIGZvciBGRlxuICAgICAgZ2V0Q29tcHV0ZWRTdHlsZShlbCkgOlxuXG4gICAgLy8gT3RoZXJ3aXNlLCB3ZSBhcmUgaW4gSUUgYW5kIHVzZSBjdXJyZW50U3R5bGVcbiAgICAgIGVsLmN1cnJlbnRTdHlsZVxuICApW1xuICAgIC8vIFN3aXRjaCB0byBjYW1lbENhc2UgZm9yIENTU09NXG4gICAgLy8gREVWOiBHcmFiYmVkIGZyb20galF1ZXJ5XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9qcXVlcnkvYmxvYi8xLjktc3RhYmxlL3NyYy9jc3MuanMjTDE5MS1MMTk0XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9qcXVlcnkvYmxvYi8xLjktc3RhYmxlL3NyYy9jb3JlLmpzI0w1OTMtTDU5N1xuICAgIHByb3AucmVwbGFjZSgvLShcXHcpL2dpLCBmdW5jdGlvbiAod29yZCwgbGV0dGVyKSB7XG4gICAgICByZXR1cm4gbGV0dGVyLnRvVXBwZXJDYXNlKCk7XG4gICAgfSlcbiAgXTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY29tcHV0ZWRTdHlsZTtcbiIsIi8vIExvYWQgaW4gZGVwZW5kZW5jaWVzXG52YXIgY29tcHV0ZWRTdHlsZSA9IHJlcXVpcmUoJ2NvbXB1dGVkLXN0eWxlJyk7XG5cbi8qKlxuICogQ2FsY3VsYXRlIHRoZSBgbGluZS1oZWlnaHRgIG9mIGEgZ2l2ZW4gbm9kZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZSBFbGVtZW50IHRvIGNhbGN1bGF0ZSBsaW5lIGhlaWdodCBvZi4gTXVzdCBiZSBpbiB0aGUgRE9NLlxuICogQHJldHVybnMge051bWJlcn0gYGxpbmUtaGVpZ2h0YCBvZiB0aGUgZWxlbWVudCBpbiBwaXhlbHNcbiAqL1xuZnVuY3Rpb24gbGluZUhlaWdodChub2RlKSB7XG4gIC8vIEdyYWIgdGhlIGxpbmUtaGVpZ2h0IHZpYSBzdHlsZVxuICB2YXIgbG5IZWlnaHRTdHIgPSBjb21wdXRlZFN0eWxlKG5vZGUsICdsaW5lLWhlaWdodCcpO1xuICB2YXIgbG5IZWlnaHQgPSBwYXJzZUZsb2F0KGxuSGVpZ2h0U3RyLCAxMCk7XG5cbiAgLy8gSWYgdGhlIGxpbmVIZWlnaHQgZGlkIG5vdCBjb250YWluIGEgdW5pdCAoaS5lLiBpdCB3YXMgbnVtZXJpYyksIGNvbnZlcnQgaXQgdG8gZW1zIChlLmcuICcyLjMnID09PSAnMi4zZW0nKVxuICBpZiAobG5IZWlnaHRTdHIgPT09IGxuSGVpZ2h0ICsgJycpIHtcbiAgICAvLyBTYXZlIHRoZSBvbGQgbGluZUhlaWdodCBzdHlsZSBhbmQgdXBkYXRlIHRoZSBlbSB1bml0IHRvIHRoZSBlbGVtZW50XG4gICAgdmFyIF9sbkhlaWdodFN0eWxlID0gbm9kZS5zdHlsZS5saW5lSGVpZ2h0O1xuICAgIG5vZGUuc3R5bGUubGluZUhlaWdodCA9IGxuSGVpZ2h0U3RyICsgJ2VtJztcblxuICAgIC8vIENhbGN1bGF0ZSB0aGUgZW0gYmFzZWQgaGVpZ2h0XG4gICAgbG5IZWlnaHRTdHIgPSBjb21wdXRlZFN0eWxlKG5vZGUsICdsaW5lLWhlaWdodCcpO1xuICAgIGxuSGVpZ2h0ID0gcGFyc2VGbG9hdChsbkhlaWdodFN0ciwgMTApO1xuXG4gICAgLy8gUmV2ZXJ0IHRoZSBsaW5lSGVpZ2h0IHN0eWxlXG4gICAgaWYgKF9sbkhlaWdodFN0eWxlKSB7XG4gICAgICBub2RlLnN0eWxlLmxpbmVIZWlnaHQgPSBfbG5IZWlnaHRTdHlsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIG5vZGUuc3R5bGUubGluZUhlaWdodDtcbiAgICB9XG4gIH1cblxuICAvLyBJZiB0aGUgbGluZUhlaWdodCBpcyBpbiBgcHRgLCBjb252ZXJ0IGl0IHRvIHBpeGVscyAoNHB4IGZvciAzcHQpXG4gIC8vIERFVjogYGVtYCB1bml0cyBhcmUgY29udmVydGVkIHRvIGBwdGAgaW4gSUU2XG4gIC8vIENvbnZlcnNpb24gcmF0aW8gZnJvbSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9DU1MvbGVuZ3RoXG4gIGlmIChsbkhlaWdodFN0ci5pbmRleE9mKCdwdCcpICE9PSAtMSkge1xuICAgIGxuSGVpZ2h0ICo9IDQ7XG4gICAgbG5IZWlnaHQgLz0gMztcbiAgLy8gT3RoZXJ3aXNlLCBpZiB0aGUgbGluZUhlaWdodCBpcyBpbiBgbW1gLCBjb252ZXJ0IGl0IHRvIHBpeGVscyAoOTZweCBmb3IgMjUuNG1tKVxuICB9IGVsc2UgaWYgKGxuSGVpZ2h0U3RyLmluZGV4T2YoJ21tJykgIT09IC0xKSB7XG4gICAgbG5IZWlnaHQgKj0gOTY7XG4gICAgbG5IZWlnaHQgLz0gMjUuNDtcbiAgLy8gT3RoZXJ3aXNlLCBpZiB0aGUgbGluZUhlaWdodCBpcyBpbiBgY21gLCBjb252ZXJ0IGl0IHRvIHBpeGVscyAoOTZweCBmb3IgMi41NGNtKVxuICB9IGVsc2UgaWYgKGxuSGVpZ2h0U3RyLmluZGV4T2YoJ2NtJykgIT09IC0xKSB7XG4gICAgbG5IZWlnaHQgKj0gOTY7XG4gICAgbG5IZWlnaHQgLz0gMi41NDtcbiAgLy8gT3RoZXJ3aXNlLCBpZiB0aGUgbGluZUhlaWdodCBpcyBpbiBgaW5gLCBjb252ZXJ0IGl0IHRvIHBpeGVscyAoOTZweCBmb3IgMWluKVxuICB9IGVsc2UgaWYgKGxuSGVpZ2h0U3RyLmluZGV4T2YoJ2luJykgIT09IC0xKSB7XG4gICAgbG5IZWlnaHQgKj0gOTY7XG4gIC8vIE90aGVyd2lzZSwgaWYgdGhlIGxpbmVIZWlnaHQgaXMgaW4gYHBjYCwgY29udmVydCBpdCB0byBwaXhlbHMgKDEycHQgZm9yIDFwYylcbiAgfSBlbHNlIGlmIChsbkhlaWdodFN0ci5pbmRleE9mKCdwYycpICE9PSAtMSkge1xuICAgIGxuSGVpZ2h0ICo9IDE2O1xuICB9XG5cbiAgLy8gQ29udGludWUgb3VyIGNvbXB1dGF0aW9uXG4gIGxuSGVpZ2h0ID0gTWF0aC5yb3VuZChsbkhlaWdodCk7XG5cbiAgLy8gSWYgdGhlIGxpbmUtaGVpZ2h0IGlzIFwibm9ybWFsXCIsIGNhbGN1bGF0ZSBieSBmb250LXNpemVcbiAgaWYgKGxuSGVpZ2h0U3RyID09PSAnbm9ybWFsJykge1xuICAgIC8vIENyZWF0ZSBhIHRlbXBvcmFyeSBub2RlXG4gICAgdmFyIG5vZGVOYW1lID0gbm9kZS5ub2RlTmFtZTtcbiAgICB2YXIgX25vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5vZGVOYW1lKTtcbiAgICBfbm9kZS5pbm5lckhUTUwgPSAnJm5ic3A7JztcblxuICAgIC8vIElmIHdlIGhhdmUgYSB0ZXh0IGFyZWEsIHJlc2V0IGl0IHRvIG9ubHkgMSByb3dcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdHdvbGZzb24vbGluZS1oZWlnaHQvaXNzdWVzLzRcbiAgICBpZiAobm9kZU5hbWUudG9VcHBlckNhc2UoKSA9PT0gJ1RFWFRBUkVBJykge1xuICAgICAgX25vZGUuc2V0QXR0cmlidXRlKCdyb3dzJywgJzEnKTtcbiAgICB9XG5cbiAgICAvLyBTZXQgdGhlIGZvbnQtc2l6ZSBvZiB0aGUgZWxlbWVudFxuICAgIHZhciBmb250U2l6ZVN0ciA9IGNvbXB1dGVkU3R5bGUobm9kZSwgJ2ZvbnQtc2l6ZScpO1xuICAgIF9ub2RlLnN0eWxlLmZvbnRTaXplID0gZm9udFNpemVTdHI7XG5cbiAgICAvLyBSZW1vdmUgZGVmYXVsdCBwYWRkaW5nL2JvcmRlciB3aGljaCBjYW4gYWZmZWN0IG9mZnNldCBoZWlnaHRcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdHdvbGZzb24vbGluZS1oZWlnaHQvaXNzdWVzLzRcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvSFRNTEVsZW1lbnQvb2Zmc2V0SGVpZ2h0XG4gICAgX25vZGUuc3R5bGUucGFkZGluZyA9ICcwcHgnO1xuICAgIF9ub2RlLnN0eWxlLmJvcmRlciA9ICcwcHgnO1xuXG4gICAgLy8gQXBwZW5kIGl0IHRvIHRoZSBib2R5XG4gICAgdmFyIGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQoX25vZGUpO1xuXG4gICAgLy8gQXNzdW1lIHRoZSBsaW5lIGhlaWdodCBvZiB0aGUgZWxlbWVudCBpcyB0aGUgaGVpZ2h0XG4gICAgdmFyIGhlaWdodCA9IF9ub2RlLm9mZnNldEhlaWdodDtcbiAgICBsbkhlaWdodCA9IGhlaWdodDtcblxuICAgIC8vIFJlbW92ZSBvdXIgY2hpbGQgZnJvbSB0aGUgRE9NXG4gICAgYm9keS5yZW1vdmVDaGlsZChfbm9kZSk7XG4gIH1cblxuICAvLyBSZXR1cm4gdGhlIGNhbGN1bGF0ZWQgaGVpZ2h0XG4gIHJldHVybiBsbkhlaWdodDtcbn1cblxuLy8gRXhwb3J0IGxpbmVIZWlnaHRcbm1vZHVsZS5leHBvcnRzID0gbGluZUhlaWdodDtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IE1pbmltYWxSZWFjdFRleHQgZnJvbSBcIm1pbmltYWwtcmVhY3QtdGV4dFwiO1xuaW1wb3J0IGF1dG9zaXplIGZyb20gJ2F1dG9zaXplJztcbmltcG9ydCBnZXRMaW5lSGVpZ2h0IGZyb20gJ2xpbmUtaGVpZ2h0JztcblxuY29uc3QgVVBEQVRFID0gJ2F1dG9zaXplOnVwZGF0ZScsXG4gIERFU1RST1kgPSAnYXV0b3NpemU6ZGVzdHJveScsXG4gIFJFU0laRUQgPSAnYXV0b3NpemU6cmVzaXplZCc7XG5cbi8qKiBBIGxpZ2h0IHJlcGxhY2VtZW50IGZvciBidWlsdC1pbiB0ZXh0YXJlYSBjb21wb25lbnRcbiAqIHdoaWNoIGF1dG9tYXRpY2FseSBhZGp1c3RzIGl0cyBoZWlnaHQgdG8gbWF0Y2ggdGhlIGNvbnRlbnRcbiAqIEBwYXJhbSBvblJlc2l6ZSAtIGNhbGxlZCB3aGVuZXZlciB0aGUgdGV4dGFyZWEgcmVzaXplc1xuICogQHBhcmFtIHJvd3MgLSBtaW5pbXVtIG51bWJlciBvZiB2aXNpYmxlIHJvd3NcbiAqIEBwYXJhbSBtYXhSb3dzIC0gbWF4aW11bSBudW1iZXIgb2YgdmlzaWJsZSByb3dzXG4gKiBAcGFyYW0gaW5uZXJSZWYgLSBjYWxsZWQgd2l0aCB0aGUgcmVmIHRvIHRoZSBET00gbm9kZVxuICovXG5cbmNsYXNzIE1pbmltYWxSZWFjdFRleHRBcmVhIGV4dGVuZHMgTWluaW1hbFJlYWN0VGV4dCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgbGV0IGhhc1ZhbHVlID0gZmFsc2U7XG4gICAgbGV0IGhhc0Vycm9yID0gZmFsc2U7XG4gICAgbGV0IGxpbmVIZWlnaHQgPSBudWxsO1xuICAgIGNvbnN0IGlzRm9jdXNlZCA9IGZhbHNlO1xuICAgIGNvbnN0IGlucHV0VmFsdWUgPSBwcm9wcy5pbnB1dFZhbHVlO1xuXG4gICAgaWYgKGlucHV0VmFsdWUgIT09ICcnICYmIHR5cGVvZiBpbnB1dFZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgaGFzVmFsdWUgPSB0cnVlO1xuICAgICAgaGFzRXJyb3IgPSBwcm9wcy5oYXNFcnJvciB8fCAocHJvcHMucGF0dGVybiAmJiAhcHJvcHMucGF0dGVybi50ZXN0KGlucHV0VmFsdWUpKTtcbiAgICB9XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaGFzVmFsdWUsXG4gICAgICBoYXNFcnJvcixcbiAgICAgIGlucHV0VmFsdWUsXG4gICAgICBpc0ZvY3VzZWQsXG4gICAgICBsaW5lSGVpZ2h0XG4gICAgfTtcbiAgfVxuXG4gIG9uQ2hhbmdlKGV2ZW50KSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBoYXNWYWx1ZTogQm9vbGVhbihldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlKSxcbiAgICAgIGlucHV0VmFsdWU6IGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUsXG4gICAgICBoYXNFcnJvcjogZmFsc2VcbiAgICB9KTtcblxuICAgIHRoaXMuY3VycmVudFZhbHVlID0gZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZTtcblxuICAgIGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGV2ZW50LCB0aGlzKTtcbiAgICB9XG4gIH1cblxuICAvLyBhdXRvc2l6ZSBtZXRob2RzXG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3QgeyBvblJlc2l6ZSwgbWF4Um93cyB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmICh0eXBlb2YgbWF4Um93cyA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMudXBkYXRlTGluZUhlaWdodCgpO1xuXG4gICAgICAvLyB0aGlzIHRyaWNrIGlzIG5lZWRlZCB0byBmb3JjZSBcImF1dG9zaXplXCIgdG8gYWN0aXZhdGUgdGhlIHNjcm9sbGJhclxuICAgICAgc2V0VGltZW91dCgoKSA9PiBhdXRvc2l6ZSh0aGlzLnRleHRhcmVhKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF1dG9zaXplKHRoaXMudGV4dGFyZWEpO1xuICAgIH1cblxuICAgIGlmIChvblJlc2l6ZSkge1xuICAgICAgdGhpcy50ZXh0YXJlYS5hZGRFdmVudExpc3RlbmVyKFJFU0laRUQsIHRoaXMucHJvcHMub25SZXNpemUpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGlmICh0aGlzLnByb3BzLm9uUmVzaXplKSB7XG4gICAgICB0aGlzLnRleHRhcmVhLnJlbW92ZUV2ZW50TGlzdGVuZXIoUkVTSVpFRCwgdGhpcy5wcm9wcy5vblJlc2l6ZSk7XG4gICAgfVxuICAgICgpID0+IHRoaXMuZGlzcGF0Y2hFdmVudChERVNUUk9ZKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICBpZiAodGhpcy5nZXRWYWx1ZSh0aGlzLnByb3BzKSAhPT0gdGhpcy5jdXJyZW50VmFsdWUpIHtcbiAgICAoKSA9PiAgIHRoaXMuZGlzcGF0Y2hFdmVudChVUERBVEUpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZUxpbmVIZWlnaHQoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBsaW5lSGVpZ2h0OiBnZXRMaW5lSGVpZ2h0KHRoaXMudGV4dGFyZWEpXG4gICAgfSk7XG4gIH1cblxuICBnZXRWYWx1ZSh7IHZhbHVlTGluaywgdmFsdWUgfSkge1xuICAgIHZhbHVlTGluayA/IHZhbHVlTGluay52YWx1ZSA6IHZhbHVlO1xuICB9XG5cbiAgc2F2ZURPTU5vZGVSZWYocmVmKSB7XG4gICAgY29uc3QgeyBpbm5lclJlZiB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChpbm5lclJlZikge1xuICAgICAgaW5uZXJSZWYocmVmKTtcbiAgICB9XG5cbiAgICB0aGlzLnRleHRhcmVhID0gcmVmO1xuICB9XG5cbiAgZ2V0TG9jYWxzKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHByb3BzOiB7IG9uUmVzaXplLCBtYXhSb3dzLCBvbkNoYW5nZSwgc3R5bGUsIGlubmVyUmVmIH0sIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIHN0YXRlOiB7IGxpbmVIZWlnaHQgfSxcbiAgICAgIHNhdmVET01Ob2RlUmVmXG4gICAgfSA9IHRoaXM7XG5cbiAgICBjb25zdCBtYXhIZWlnaHQgPSBtYXhSb3dzICYmIGxpbmVIZWlnaHQgPyBsaW5lSGVpZ2h0ICogbWF4Um93cyA6IG51bGw7XG5cbiAgICByZXR1cm4ge1xuICAgICAgc2F2ZURPTU5vZGVSZWYsXG4gICAgICBzdHlsZTogbWF4SGVpZ2h0ID8geyAuLi5zdHlsZSwgbWF4SGVpZ2h0IH0gOiBzdHlsZSxcbiAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcylcbiAgICB9O1xuICB9XG5cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgZXJyb3JUZXh0TWVzc2FnZSxcbiAgICAgIGlkLFxuICAgICAgaXNEaXNhYmxlZCxcbiAgICAgIGlzUmVxdWlyZWQsXG4gICAgICBsYWJlbCxcbiAgICAgIHBsYWNlaG9sZGVyLFxuICAgICAgdGhlbWUgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCB7IGhhc1ZhbHVlLCBoYXNFcnJvciwgaW5wdXRWYWx1ZSwgaXNGb2N1c2VkIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgY29uc3Qgd3JhcHBlckNsYXNzZXMgPSBjbGFzc05hbWVzKFxuICAgICAgJ3R4LXdyYXBwZXInLFxuICAgICAgJ3R4LXdyYXBwZXItdGV4dGFyZWEnLFxuICAgICAgdGhpcy5wcm9wcy53cmFwcGVyQ2xhc3NlcyxcbiAgICAgIHsgJ3R4LWZvY3VzZWQnOiBpc0ZvY3VzZWQgfSxcbiAgICAgIHsgJ3R4LWRpc2FibGVkJzogaXNEaXNhYmxlZCB9LFxuICAgICAgeyAndHgtd3JhcHBlci13aGl0ZSc6IHRoZW1lID09PSAnZGFyaycgfSk7XG5cbiAgICBjb25zdCBpbnB1dENsYXNzZXMgPSBjbGFzc05hbWVzKFxuICAgICAgJ3R4LWlucHV0JyxcbiAgICAgIHRoaXMucHJvcHMuaW5wdXRDbGFzc2VzXG4gICAgKTtcblxuICAgIGNvbnN0IGxhYmVsQ2xhc3NlcyA9IGNsYXNzTmFtZXMoXG4gICAgICAndHgtbGFiZWwnLFxuICAgICAgdGhpcy5wcm9wcy5sYWJlbENsYXNzZXMsXG4gICAgICB7ICd0eC1hYm92ZSc6IHBsYWNlaG9sZGVyIHx8IGhhc1ZhbHVlIHx8IGlzRm9jdXNlZCB9KTtcblxuICAgIGNvbnN0IGVycm9ydGV4dENsYXNzZXMgPSBjbGFzc05hbWVzKFxuICAgICAgJ3R4LWVycm9ydGV4dCcsXG4gICAgICB0aGlzLnByb3BzLmVycm9ydGV4dENsYXNzZXMsXG4gICAgICB7ICd0eC1lcnJvcnRleHQtdmlzaWJsZSc6IGhhc0Vycm9yIH0pO1xuXG4gICAgY29uc3QgZmllbGRSZXF1aXJlZE1lc3NhZ2UgPSAnRmllbGQgaXMgcmVxdWlyZWQnO1xuXG4gICAgLy8gYXV0b3NpemVcbiAgICBjb25zdCB7IGNoaWxkcmVuLCBzYXZlRE9NTm9kZVJlZiwgLi4ubG9jYWxzIH0gPSB0aGlzLmdldExvY2FscygpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXt3cmFwcGVyQ2xhc3Nlc30+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICBhdXRvQ29tcGxldGU9e3RoaXMucHJvcHMuYXV0b0NvbXBsZXRlfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtpbnB1dENsYXNzZXN9XG4gICAgICAgICAgICBkaXNhYmxlZD17aXNEaXNhYmxlZH1cbiAgICAgICAgICAgIGlkPXtpZH1cbiAgICAgICAgICAgIHJlcXVpcmVkPXtpc1JlcXVpcmVkfVxuICAgICAgICAgICAgdmFsdWU9e2lucHV0VmFsdWUgfHwgJyd9XG4gICAgICAgICAgICBkYXRhLWV2ZW50LWFjdGlvbj17dGhpcy5wcm9wc1snZGF0YS1ldmVudC1hY3Rpb24nXX1cbiAgICAgICAgICAgIG5hbWU9e3RoaXMucHJvcHMuaW5wdXROYW1lfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5vbkZvY3VzLmJpbmQodGhpcyl9XG4gICAgICAgICAgICBvbkJsdXI9e3RoaXMub25CbHVyLmJpbmQodGhpcyl9XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgey4uLmxvY2Fsc31cbiAgICAgICAgICAgIHJlZj17c2F2ZURPTU5vZGVSZWYuYmluZCh0aGlzKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgPC90ZXh0YXJlYT5cbiAgICAgICAgICB7bGFiZWwgPyA8bGFiZWwgY2xhc3NOYW1lPXtsYWJlbENsYXNzZXN9XG4gICAgICAgICAgICBodG1sRm9yPXtpZH1cbiAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICB7bGFiZWx9XG4gICAgICAgICAgPC9sYWJlbD4gOiBudWxsfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgeyhlcnJvclRleHRNZXNzYWdlIHx8IGlzUmVxdWlyZWQpID9cbiAgICAgICAgICA8cCBjbGFzc05hbWU9e2Vycm9ydGV4dENsYXNzZXN9PlxuICAgICAgICAgIHtpbnB1dFZhbHVlID8gZXJyb3JUZXh0TWVzc2FnZSA6IGZpZWxkUmVxdWlyZWRNZXNzYWdlfVxuICAgICAgICAgIDwvcD4gOiBudWxsfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5NaW5pbWFsUmVhY3RUZXh0QXJlYS5kZWZhdWx0UHJvcHMgPSB7XG4gIGF1dG9Db21wbGV0ZTogZmFsc2UsXG4gIHR5cGU6ICd0ZXh0JyxcbiAgaXNEaXNhYmxlZDogZmFsc2UsXG4gIHRoZW1lOiAnbm9ybWFsJyxcbiAgcm93czogM1xufTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgTWluaW1hbFJlYWN0VGV4dEFyZWEucHJvcFR5cGVzID0ge1xuICAgIGF1dG9Db21wbGV0ZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgd3JhcHBlckNsYXNzZXM6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaW5wdXRDbGFzc2VzOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGxhYmVsQ2xhc3NlczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBlcnJvcnRleHRDbGFzc2VzOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICdkYXRhLWV2ZW50LWFjdGlvbic6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaW5wdXROYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGlucHV0VmFsdWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5udW1iZXJdKSxcbiAgICBpc0Rpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBpc1JlcXVpcmVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcGF0dGVybjogUHJvcFR5cGVzLmFueSxcbiAgICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0aGVtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBoYXNFcnJvcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgcm93czogUHJvcFR5cGVzLm51bWJlcixcbiAgICBtYXhSb3dzOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG9uUmVzaXplOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBpbm5lclJlZjogUHJvcFR5cGVzLmZ1bmNcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTWluaW1hbFJlYWN0VGV4dEFyZWE7XG4iXX0=
