require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* eslint react/prop-types: 0 */

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _componentsMinimalReactText = require('./components/MinimalReactText');

var _componentsMinimalReactText2 = _interopRequireDefault(_componentsMinimalReactText);

_reactDom2['default'].render(_react2['default'].createElement(
  'form',
  { noValidate: true },
  _react2['default'].createElement(
    'div',
    null,
    _react2['default'].createElement(
      'h3',
      null,
      'Normal Textarea'
    ),
    _react2['default'].createElement(_componentsMinimalReactText2['default'], { label: 'Label', type: 'textarea' }),
    _react2['default'].createElement(
      'h3',
      null,
      'Large Textarea'
    ),
    _react2['default'].createElement(_componentsMinimalReactText2['default'], { label: 'Label', type: 'textarea', size: 'large' }),
    _react2['default'].createElement(
      'h3',
      null,
      'Dark Theme'
    ),
    _react2['default'].createElement(
      'div',
      { className: 'dark-background' },
      _react2['default'].createElement(_componentsMinimalReactText2['default'], { label: 'Label', type: 'textarea', theme: 'dark' })
    )
  ),
  _react2['default'].createElement(
    'button',
    { type: 'submit' },
    'Submit'
  )
), document.getElementById('example'));

},{"./components/MinimalReactText":2,"react":undefined,"react-dom":undefined}],2:[function(require,module,exports){
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

      this.currentValue = event.currentTarget.value;

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

},{"_process":6,"autosize":3,"classnames":undefined,"line-height":5,"minimal-react-text":undefined,"prop-types":undefined,"react":undefined}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{"computed-style":4}],6:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS95ZHJhcmd5cm9zL0Rlc2t0b3AvQXJ0bGltZXMvYXJ0bGltZXMtdGV4dGFyZWEvbWluaW1hbC1yZWFjdC10ZXh0YXJlYS9leGFtcGxlcy9zcmMvYXBwLmpzIiwiL2hvbWUveWRyYXJneXJvcy9EZXNrdG9wL0FydGxpbWVzL2FydGxpbWVzLXRleHRhcmVhL21pbmltYWwtcmVhY3QtdGV4dGFyZWEvZXhhbXBsZXMvc3JjL2NvbXBvbmVudHMvTWluaW1hbFJlYWN0VGV4dC5qcyIsIm5vZGVfbW9kdWxlcy9hdXRvc2l6ZS9kaXN0L2F1dG9zaXplLmpzIiwibm9kZV9tb2R1bGVzL2NvbXB1dGVkLXN0eWxlL2Rpc3QvY29tcHV0ZWRTdHlsZS5jb21tb25qcy5qcyIsIm5vZGVfbW9kdWxlcy9saW5lLWhlaWdodC9saWIvbGluZS1oZWlnaHQuanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O3FCQ0VrQixPQUFPOzs7O3dCQUNKLFdBQVc7Ozs7MENBQ0MsK0JBQStCOzs7O0FBRWhFLHNCQUFTLE1BQU0sQ0FDYjs7SUFBTSxVQUFVLE1BQUE7RUFDakI7OztJQUNHOzs7O0tBQXdCO0lBQ3RCLDRFQUFzQixLQUFLLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxVQUFVLEdBQUU7SUFFdkQ7Ozs7S0FBdUI7SUFDckIsNEVBQXNCLEtBQUssRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFVBQVUsRUFBQyxJQUFJLEVBQUMsT0FBTyxHQUFFO0lBRXBFOzs7O0tBQW1CO0lBQ25COztRQUFLLFNBQVMsRUFBQyxpQkFBaUI7TUFDOUIsNEVBQXNCLEtBQUssRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsTUFBTSxHQUFFO0tBQzlEO0dBQ0g7RUFDSDs7TUFBUSxJQUFJLEVBQUMsUUFBUTs7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25TQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBlc2xpbnQgcmVhY3QvcHJvcC10eXBlczogMCAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgTWluaW1hbFJlYWN0VGV4dEFyZWEgZnJvbSAnLi9jb21wb25lbnRzL01pbmltYWxSZWFjdFRleHQnO1xuXG5SZWFjdERPTS5yZW5kZXIoXG4gIDxmb3JtIG5vVmFsaWRhdGU+XG5cdDxkaXY+XG4gICAgPGgzPk5vcm1hbCBUZXh0YXJlYTwvaDM+XG4gICAgICA8TWluaW1hbFJlYWN0VGV4dEFyZWEgbGFiZWw9XCJMYWJlbFwiIHR5cGU9XCJ0ZXh0YXJlYVwiLz5cblxuICAgIDxoMz5MYXJnZSBUZXh0YXJlYTwvaDM+XG4gICAgICA8TWluaW1hbFJlYWN0VGV4dEFyZWEgbGFiZWw9XCJMYWJlbFwiIHR5cGU9XCJ0ZXh0YXJlYVwiIHNpemU9XCJsYXJnZVwiLz5cblxuICAgIDxoMz5EYXJrIFRoZW1lPC9oMz5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cImRhcmstYmFja2dyb3VuZFwiPlxuICAgICAgPE1pbmltYWxSZWFjdFRleHRBcmVhIGxhYmVsPVwiTGFiZWxcIiB0eXBlPVwidGV4dGFyZWFcIiB0aGVtZT1cImRhcmtcIi8+XG4gICAgPC9kaXY+XG5cdDwvZGl2PlxuICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPlN1Ym1pdDwvYnV0dG9uPlxuICA8L2Zvcm0+LFxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhhbXBsZScpXG4pO1xuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBNaW5pbWFsUmVhY3RUZXh0IGZyb20gXCJtaW5pbWFsLXJlYWN0LXRleHRcIjtcbmltcG9ydCBhdXRvc2l6ZSBmcm9tICdhdXRvc2l6ZSc7XG5pbXBvcnQgZ2V0TGluZUhlaWdodCBmcm9tICdsaW5lLWhlaWdodCc7XG5cbmNvbnN0IFVQREFURSA9ICdhdXRvc2l6ZTp1cGRhdGUnLFxuICBERVNUUk9ZID0gJ2F1dG9zaXplOmRlc3Ryb3knLFxuICBSRVNJWkVEID0gJ2F1dG9zaXplOnJlc2l6ZWQnO1xuXG4vKiogQSBsaWdodCByZXBsYWNlbWVudCBmb3IgYnVpbHQtaW4gdGV4dGFyZWEgY29tcG9uZW50XG4gKiB3aGljaCBhdXRvbWF0aWNhbHkgYWRqdXN0cyBpdHMgaGVpZ2h0IHRvIG1hdGNoIHRoZSBjb250ZW50XG4gKiBAcGFyYW0gb25SZXNpemUgLSBjYWxsZWQgd2hlbmV2ZXIgdGhlIHRleHRhcmVhIHJlc2l6ZXNcbiAqIEBwYXJhbSByb3dzIC0gbWluaW11bSBudW1iZXIgb2YgdmlzaWJsZSByb3dzXG4gKiBAcGFyYW0gbWF4Um93cyAtIG1heGltdW0gbnVtYmVyIG9mIHZpc2libGUgcm93c1xuICogQHBhcmFtIGlubmVyUmVmIC0gY2FsbGVkIHdpdGggdGhlIHJlZiB0byB0aGUgRE9NIG5vZGVcbiAqL1xuXG5jbGFzcyBNaW5pbWFsUmVhY3RUZXh0QXJlYSBleHRlbmRzIE1pbmltYWxSZWFjdFRleHQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIGxldCBoYXNWYWx1ZSA9IGZhbHNlO1xuICAgIGxldCBoYXNFcnJvciA9IGZhbHNlO1xuICAgIGNvbnN0IGlzRm9jdXNlZCA9IGZhbHNlO1xuICAgIGNvbnN0IGlucHV0VmFsdWUgPSBwcm9wcy5pbnB1dFZhbHVlO1xuXG4gICAgaWYgKGlucHV0VmFsdWUgIT09ICcnICYmIHR5cGVvZiBpbnB1dFZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgaGFzVmFsdWUgPSB0cnVlO1xuICAgICAgaGFzRXJyb3IgPSBwcm9wcy5oYXNFcnJvciB8fCAocHJvcHMucGF0dGVybiAmJiAhcHJvcHMucGF0dGVybi50ZXN0KGlucHV0VmFsdWUpKTtcbiAgICB9XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaGFzVmFsdWUsXG4gICAgICBoYXNFcnJvcixcbiAgICAgIGlucHV0VmFsdWUsXG4gICAgICBpc0ZvY3VzZWQsXG4gICAgICBsaW5lSGVpZ2h0OiBudWxsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgbGV0IGhhc0Vycm9yID0gbmV4dFByb3BzLmhhc0Vycm9yO1xuICAgIGxldCBoYXNWYWx1ZSA9ICEhbmV4dFByb3BzLmlucHV0VmFsdWUgfHwgdGhpcy5zdGF0ZS5oYXNWYWx1ZTtcbiAgICBjb25zdCBpbnB1dFZhbHVlID0gKG5leHRQcm9wcy5pbnB1dFZhbHVlICE9PSB1bmRlZmluZWQgPyBuZXh0UHJvcHMuaW5wdXRWYWx1ZSA6IHRoaXMuc3RhdGUuaW5wdXRWYWx1ZSk7XG5cbiAgICBpZiAoIWhhc0Vycm9yICYmIGlucHV0VmFsdWUgIT09ICcnICYmIHR5cGVvZiBpbnB1dFZhbHVlICE9PSAndW5kZWZpbmVkJyAmJiAhIW5leHRQcm9wcy5wYXR0ZXJuKSB7XG4gICAgICBoYXNWYWx1ZSA9IHRydWU7XG4gICAgICBoYXNFcnJvciA9IChuZXh0UHJvcHMucGF0dGVybiAmJiAhbmV4dFByb3BzLnBhdHRlcm4udGVzdChpbnB1dFZhbHVlKSk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyBoYXNWYWx1ZSwgaGFzRXJyb3IsIGlucHV0VmFsdWUgfSk7XG4gIH1cblxuICBvbkJsdXIoZXZlbnQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlzRm9jdXNlZDogZmFsc2VcbiAgICB9KTtcblxuICAgIGNvbnN0IHsgcGF0dGVybiwgaXNSZXF1aXJlZCB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgaGFzRXJyb3I7XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGhhc1ZhbHVlOiBCb29sZWFuKGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUpLFxuICAgICAgaGFzRXJyb3I6IChldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlLmxlbmd0aCA/IChwYXR0ZXJuICYmICFwYXR0ZXJuLnRlc3QoZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSkpIDogaXNSZXF1aXJlZClcbiAgICB9KTtcblxuICAgIC8vIHVwZGF0ZSBvbiB0aGlzLnNldFN0YXRlIGhhcHBlbnMgYWZ0ZXIgdGhpcyBmdW5jdGlvbnMgaXMgY29tcGxldGVkXG4gICAgLy8gaW4gb3JkZXIgdG8gYXZvaWQgdGhhdCAnc2tpcHBlZCcgY2hhbmdlIG9mIHZhbHVlLCBJIHVzZSB0aGVcbiAgICAvLyBoYXNFcnJvciB2YXJpYWJsZVxuICAgIGhhc0Vycm9yID0gKGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUubGVuZ3RoID8gKHBhdHRlcm4gJiYgIXBhdHRlcm4udGVzdChldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlKSkgOiBpc1JlcXVpcmVkKTtcblxuICAgIGlmICh0aGlzLnByb3BzLm9uQmx1cikge1xuICAgICAgdGhpcy5wcm9wcy5vbkJsdXIoZXZlbnQsIHRoaXMsIGhhc0Vycm9yKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMub25DaGFuZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoZXZlbnQsIHRoaXMsIGhhc0Vycm9yKTtcbiAgICB9XG4gIH1cblxuICBvbkNoYW5nZShldmVudCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgaGFzVmFsdWU6IEJvb2xlYW4oZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSksXG4gICAgICBpbnB1dFZhbHVlOiBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlLFxuICAgICAgaGFzRXJyb3I6IGZhbHNlXG4gICAgfSk7XG5cbiAgICB0aGlzLmN1cnJlbnRWYWx1ZSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWU7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShldmVudCwgdGhpcyk7XG4gICAgfVxuICB9XG5cbiAgb25Gb2N1cyhldmVudCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgaXNGb2N1c2VkOiB0cnVlXG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5vbkZvY3VzKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRm9jdXMoZXZlbnQsIHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGF1dG9zaXplIG1ldGhvZHNcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCB7IG9uUmVzaXplLCBtYXhSb3dzIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKHR5cGVvZiBtYXhSb3dzID09PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy51cGRhdGVMaW5lSGVpZ2h0KCk7XG5cbiAgICAgIC8vIHRoaXMgdHJpY2sgaXMgbmVlZGVkIHRvIGZvcmNlIFwiYXV0b3NpemVcIiB0byBhY3RpdmF0ZSB0aGUgc2Nyb2xsYmFyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IGF1dG9zaXplKHRoaXMudGV4dGFyZWEpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXV0b3NpemUodGhpcy50ZXh0YXJlYSk7XG4gICAgfVxuXG4gICAgaWYgKG9uUmVzaXplKSB7XG4gICAgICB0aGlzLnRleHRhcmVhLmFkZEV2ZW50TGlzdGVuZXIoUkVTSVpFRCwgdGhpcy5wcm9wcy5vblJlc2l6ZSk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMub25SZXNpemUpIHtcbiAgICAgIHRoaXMudGV4dGFyZWEucmVtb3ZlRXZlbnRMaXN0ZW5lcihSRVNJWkVELCB0aGlzLnByb3BzLm9uUmVzaXplKTtcbiAgICB9XG4gICAgKCkgPT4gdGhpcy5kaXNwYXRjaEV2ZW50KERFU1RST1kpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIGlmICh0aGlzLmdldFZhbHVlKHRoaXMucHJvcHMpICE9PSB0aGlzLmN1cnJlbnRWYWx1ZSkge1xuICAgICgpID0+ICAgdGhpcy5kaXNwYXRjaEV2ZW50KFVQREFURSk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlTGluZUhlaWdodCgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGxpbmVIZWlnaHQ6IGdldExpbmVIZWlnaHQodGhpcy50ZXh0YXJlYSlcbiAgICB9KTtcbiAgfVxuXG4gIGdldFZhbHVlKHsgdmFsdWVMaW5rLCB2YWx1ZSB9KSB7XG4gICAgdmFsdWVMaW5rID8gdmFsdWVMaW5rLnZhbHVlIDogdmFsdWU7XG4gIH1cblxuICAvLyBvbkNoYW5nZShlKSB7XG4gIC8vICAgdGhpcy5jdXJyZW50VmFsdWUgPSBlLnRhcmdldC52YWx1ZTtcbiAgLy8gICB0aGlzLnByb3BzLm9uQ2hhbmdlICYmIHRoaXMucHJvcHMub25DaGFuZ2UoZSk7XG4gIC8vIH1cblxuICBzYXZlRE9NTm9kZVJlZihyZWYpIHtcbiAgICBjb25zdCB7IGlubmVyUmVmIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKGlubmVyUmVmKSB7XG4gICAgICBpbm5lclJlZihyZWYpO1xuICAgIH1cblxuICAgIHRoaXMudGV4dGFyZWEgPSByZWY7XG4gIH1cblxuICBnZXRMb2NhbHMoKSB7XG4gICAgY29uc3Qge1xuICAgICAgcHJvcHM6IHsgb25SZXNpemUsIG1heFJvd3MsIG9uQ2hhbmdlLCBzdHlsZSwgaW5uZXJSZWYsIC4uLnByb3BzIH0sIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIHN0YXRlOiB7IGxpbmVIZWlnaHQgfSxcbiAgICAgIHNhdmVET01Ob2RlUmVmXG4gICAgfSA9IHRoaXM7XG5cbiAgICBjb25zdCBtYXhIZWlnaHQgPSBtYXhSb3dzICYmIGxpbmVIZWlnaHQgPyBsaW5lSGVpZ2h0ICogbWF4Um93cyA6IG51bGw7XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4ucHJvcHMsXG4gICAgICBzYXZlRE9NTm9kZVJlZixcbiAgICAgIHN0eWxlOiBtYXhIZWlnaHQgPyB7IC4uLnN0eWxlLCBtYXhIZWlnaHQgfSA6IHN0eWxlLFxuICAgICAgb25DaGFuZ2U6ICgpID0+IHRoaXMub25DaGFuZ2VcbiAgICB9O1xuICB9XG5cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgZXJyb3JUZXh0TWVzc2FnZSxcbiAgICAgIGlkLFxuICAgICAgaXNEaXNhYmxlZCxcbiAgICAgIGlzUmVxdWlyZWQsXG4gICAgICBsYWJlbCxcbiAgICAgIHBsYWNlaG9sZGVyLFxuICAgICAgc2l6ZSxcbiAgICAgIHRoZW1lLFxuICAgICAgdHlwZSB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHsgaGFzVmFsdWUsIGhhc0Vycm9yLCBpbnB1dFZhbHVlLCBpc0ZvY3VzZWQgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBjb25zdCB3cmFwcGVyQ2xhc3NlcyA9IGNsYXNzTmFtZXMoXG4gICAgICAndHgtd3JhcHBlcicsXG4gICAgICB0aGlzLnByb3BzLndyYXBwZXJDbGFzc2VzLFxuICAgICAgeyAndHgtZm9jdXNlZCc6IGlzRm9jdXNlZCB9LFxuICAgICAgeyAndHgtZGlzYWJsZWQnOiBpc0Rpc2FibGVkIH0sXG4gICAgICB7ICd0eC13cmFwcGVyLXRleHRhcmVhJzogdHlwZSA9PT0gJ3RleHRhcmVhJyB9LFxuICAgICAgeyAndHgtd3JhcHBlci13aGl0ZSc6IHRoZW1lID09PSAnZGFyaycgfSk7XG5cbiAgICBjb25zdCBpbnB1dENsYXNzZXMgPSBjbGFzc05hbWVzKFxuICAgICAgJ3R4LWlucHV0JyxcbiAgICAgIHRoaXMucHJvcHMuaW5wdXRDbGFzc2VzLFxuICAgICAgeyAndHgtdGV4dGFyZWEtbGFyZ2UnOiBzaXplID09PSAnbGFyZ2UnIH0pO1xuXG4gICAgY29uc3QgbGFiZWxDbGFzc2VzID0gY2xhc3NOYW1lcyhcbiAgICAgICd0eC1sYWJlbCcsXG4gICAgICB0aGlzLnByb3BzLmxhYmVsQ2xhc3NlcyxcbiAgICAgIHsgJ3R4LWFib3ZlJzogcGxhY2Vob2xkZXIgfHwgaGFzVmFsdWUgfHwgaXNGb2N1c2VkIH0pO1xuXG4gICAgY29uc3QgZXJyb3J0ZXh0Q2xhc3NlcyA9IGNsYXNzTmFtZXMoXG4gICAgICAndHgtZXJyb3J0ZXh0JyxcbiAgICAgIHRoaXMucHJvcHMuZXJyb3J0ZXh0Q2xhc3NlcyxcbiAgICAgIHsgJ3R4LWVycm9ydGV4dC12aXNpYmxlJzogaGFzRXJyb3IgfSk7XG5cbiAgICBjb25zdCBmaWVsZFJlcXVpcmVkTWVzc2FnZSA9ICdGaWVsZCBpcyByZXF1aXJlZCc7XG5cbiAgICAvLyBhdXRvc2l6ZVxuICAgIGNvbnN0IHsgY2hpbGRyZW4sIHNhdmVET01Ob2RlUmVmLCAuLi5sb2NhbHMgfSA9IHRoaXMuZ2V0TG9jYWxzKCk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3dyYXBwZXJDbGFzc2VzfT5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICB7dHlwZSAhPT0gJ3RleHRhcmVhJyA/XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgYXV0b0NvbXBsZXRlPXt0aGlzLnByb3BzLmF1dG9Db21wbGV0ZX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtpbnB1dENsYXNzZXN9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtpc0Rpc2FibGVkfVxuICAgICAgICAgICAgICBpZD17aWR9XG4gICAgICAgICAgICAgIHR5cGU9e3R5cGV9XG4gICAgICAgICAgICAgIHJlcXVpcmVkPXtpc1JlcXVpcmVkfVxuICAgICAgICAgICAgICB2YWx1ZT17aW5wdXRWYWx1ZSB8fCAnJ31cbiAgICAgICAgICAgICAgZGF0YS1ldmVudC1hY3Rpb249e3RoaXMucHJvcHNbJ2RhdGEtZXZlbnQtYWN0aW9uJ119XG4gICAgICAgICAgICAgIG5hbWU9e3RoaXMucHJvcHMuaW5wdXROYW1lfVxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMub25Gb2N1cy5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25CbHVyLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAvPiA6XG4gICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgYXV0b0NvbXBsZXRlPXt0aGlzLnByb3BzLmF1dG9Db21wbGV0ZX1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzRGlzYWJsZWR9XG4gICAgICAgICAgICAgIGlkPXtpZH1cbiAgICAgICAgICAgICAgdHlwZT17dHlwZX1cbiAgICAgICAgICAgICAgcmVxdWlyZWQ9e2lzUmVxdWlyZWR9XG4gICAgICAgICAgICAgIHZhbHVlPXtpbnB1dFZhbHVlIHx8ICcnfVxuICAgICAgICAgICAgICBkYXRhLWV2ZW50LWFjdGlvbj17dGhpcy5wcm9wc1snZGF0YS1ldmVudC1hY3Rpb24nXX1cbiAgICAgICAgICAgICAgbmFtZT17dGhpcy5wcm9wcy5pbnB1dE5hbWV9XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5vbkZvY3VzLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5vbkJsdXIuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2UuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgey4uLmxvY2Fsc31cbiAgICAgICAgICAgICAgcmVmPXtzYXZlRE9NTm9kZVJlZi5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgICA8L3RleHRhcmVhPlxuICAgICAgICAgIH1cbiAgICAgICAgICB7bGFiZWwgPyA8bGFiZWwgY2xhc3NOYW1lPXtsYWJlbENsYXNzZXN9XG4gICAgICAgICAgICBodG1sRm9yPXtpZH1cbiAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICB7bGFiZWx9XG4gICAgICAgICAgPC9sYWJlbD4gOiBudWxsfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgeyhlcnJvclRleHRNZXNzYWdlIHx8IGlzUmVxdWlyZWQpID9cbiAgICAgICAgICA8cCBjbGFzc05hbWU9e2Vycm9ydGV4dENsYXNzZXN9PlxuICAgICAgICAgIHtpbnB1dFZhbHVlID8gZXJyb3JUZXh0TWVzc2FnZSA6IGZpZWxkUmVxdWlyZWRNZXNzYWdlfVxuICAgICAgICAgIDwvcD4gOiBudWxsfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5NaW5pbWFsUmVhY3RUZXh0QXJlYS5kZWZhdWx0UHJvcHMgPSB7XG4gIGF1dG9Db21wbGV0ZTogZmFsc2UsXG4gIHR5cGU6ICd0ZXh0JyxcbiAgaXNEaXNhYmxlZDogZmFsc2UsXG4gIHRoZW1lOiAnbm9ybWFsJyxcbiAgc2l6ZTogJ25vcm1hbCcsXG4gIHJvd3M6IDFcbn07XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIE1pbmltYWxSZWFjdFRleHRBcmVhLnByb3BUeXBlcyA9IHtcbiAgICBhdXRvQ29tcGxldGU6IFByb3BUeXBlcy5ib29sLFxuICAgIHdyYXBwZXJDbGFzc2VzOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGlucHV0Q2xhc3NlczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBsYWJlbENsYXNzZXM6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZXJyb3J0ZXh0Q2xhc3NlczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAnZGF0YS1ldmVudC1hY3Rpb24nOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGlucHV0TmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpbnB1dFZhbHVlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMubnVtYmVyXSksXG4gICAgaXNEaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgaXNSZXF1aXJlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIHBhdHRlcm46IFByb3BUeXBlcy5hbnksXG4gICAgcGxhY2Vob2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2l6ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0aGVtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0eXBlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgaGFzRXJyb3I6IFByb3BUeXBlcy5ib29sLFxuICAgIHJvd3M6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbWF4Um93czogUHJvcFR5cGVzLm51bWJlcixcbiAgICBvblJlc2l6ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaW5uZXJSZWY6IFByb3BUeXBlcy5mdW5jXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1pbmltYWxSZWFjdFRleHRBcmVhO1xuIiwiLyohXG5cdEF1dG9zaXplIDQuMC4wXG5cdGxpY2Vuc2U6IE1JVFxuXHRodHRwOi8vd3d3LmphY2tsbW9vcmUuY29tL2F1dG9zaXplXG4qL1xuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXHRcdGRlZmluZShbJ2V4cG9ydHMnLCAnbW9kdWxlJ10sIGZhY3RvcnkpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuXHRcdGZhY3RvcnkoZXhwb3J0cywgbW9kdWxlKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgbW9kID0ge1xuXHRcdFx0ZXhwb3J0czoge31cblx0XHR9O1xuXHRcdGZhY3RvcnkobW9kLmV4cG9ydHMsIG1vZCk7XG5cdFx0Z2xvYmFsLmF1dG9zaXplID0gbW9kLmV4cG9ydHM7XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzLCBtb2R1bGUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBtYXAgPSB0eXBlb2YgTWFwID09PSBcImZ1bmN0aW9uXCIgPyBuZXcgTWFwKCkgOiAoZnVuY3Rpb24gKCkge1xuXHRcdHZhciBrZXlzID0gW107XG5cdFx0dmFyIHZhbHVlcyA9IFtdO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdGhhczogZnVuY3Rpb24gaGFzKGtleSkge1xuXHRcdFx0XHRyZXR1cm4ga2V5cy5pbmRleE9mKGtleSkgPiAtMTtcblx0XHRcdH0sXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uIGdldChrZXkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlc1trZXlzLmluZGV4T2Yoa2V5KV07XG5cdFx0XHR9LFxuXHRcdFx0c2V0OiBmdW5jdGlvbiBzZXQoa2V5LCB2YWx1ZSkge1xuXHRcdFx0XHRpZiAoa2V5cy5pbmRleE9mKGtleSkgPT09IC0xKSB7XG5cdFx0XHRcdFx0a2V5cy5wdXNoKGtleSk7XG5cdFx0XHRcdFx0dmFsdWVzLnB1c2godmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0J2RlbGV0ZSc6IGZ1bmN0aW9uIF9kZWxldGUoa2V5KSB7XG5cdFx0XHRcdHZhciBpbmRleCA9IGtleXMuaW5kZXhPZihrZXkpO1xuXHRcdFx0XHRpZiAoaW5kZXggPiAtMSkge1xuXHRcdFx0XHRcdGtleXMuc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdFx0XHR2YWx1ZXMuc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cdH0pKCk7XG5cblx0dmFyIGNyZWF0ZUV2ZW50ID0gZnVuY3Rpb24gY3JlYXRlRXZlbnQobmFtZSkge1xuXHRcdHJldHVybiBuZXcgRXZlbnQobmFtZSwgeyBidWJibGVzOiB0cnVlIH0pO1xuXHR9O1xuXHR0cnkge1xuXHRcdG5ldyBFdmVudCgndGVzdCcpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0Ly8gSUUgZG9lcyBub3Qgc3VwcG9ydCBgbmV3IEV2ZW50KClgXG5cdFx0Y3JlYXRlRXZlbnQgPSBmdW5jdGlvbiAobmFtZSkge1xuXHRcdFx0dmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuXHRcdFx0ZXZ0LmluaXRFdmVudChuYW1lLCB0cnVlLCBmYWxzZSk7XG5cdFx0XHRyZXR1cm4gZXZ0O1xuXHRcdH07XG5cdH1cblxuXHRmdW5jdGlvbiBhc3NpZ24odGEpIHtcblx0XHRpZiAoIXRhIHx8ICF0YS5ub2RlTmFtZSB8fCB0YS5ub2RlTmFtZSAhPT0gJ1RFWFRBUkVBJyB8fCBtYXAuaGFzKHRhKSkgcmV0dXJuO1xuXG5cdFx0dmFyIGhlaWdodE9mZnNldCA9IG51bGw7XG5cdFx0dmFyIGNsaWVudFdpZHRoID0gdGEuY2xpZW50V2lkdGg7XG5cdFx0dmFyIGNhY2hlZEhlaWdodCA9IG51bGw7XG5cblx0XHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdFx0dmFyIHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGEsIG51bGwpO1xuXG5cdFx0XHRpZiAoc3R5bGUucmVzaXplID09PSAndmVydGljYWwnKSB7XG5cdFx0XHRcdHRhLnN0eWxlLnJlc2l6ZSA9ICdub25lJztcblx0XHRcdH0gZWxzZSBpZiAoc3R5bGUucmVzaXplID09PSAnYm90aCcpIHtcblx0XHRcdFx0dGEuc3R5bGUucmVzaXplID0gJ2hvcml6b250YWwnO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoc3R5bGUuYm94U2l6aW5nID09PSAnY29udGVudC1ib3gnKSB7XG5cdFx0XHRcdGhlaWdodE9mZnNldCA9IC0ocGFyc2VGbG9hdChzdHlsZS5wYWRkaW5nVG9wKSArIHBhcnNlRmxvYXQoc3R5bGUucGFkZGluZ0JvdHRvbSkpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aGVpZ2h0T2Zmc2V0ID0gcGFyc2VGbG9hdChzdHlsZS5ib3JkZXJUb3BXaWR0aCkgKyBwYXJzZUZsb2F0KHN0eWxlLmJvcmRlckJvdHRvbVdpZHRoKTtcblx0XHRcdH1cblx0XHRcdC8vIEZpeCB3aGVuIGEgdGV4dGFyZWEgaXMgbm90IG9uIGRvY3VtZW50IGJvZHkgYW5kIGhlaWdodE9mZnNldCBpcyBOb3QgYSBOdW1iZXJcblx0XHRcdGlmIChpc05hTihoZWlnaHRPZmZzZXQpKSB7XG5cdFx0XHRcdGhlaWdodE9mZnNldCA9IDA7XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZSgpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGNoYW5nZU92ZXJmbG93KHZhbHVlKSB7XG5cdFx0XHR7XG5cdFx0XHRcdC8vIENocm9tZS9TYWZhcmktc3BlY2lmaWMgZml4OlxuXHRcdFx0XHQvLyBXaGVuIHRoZSB0ZXh0YXJlYSB5LW92ZXJmbG93IGlzIGhpZGRlbiwgQ2hyb21lL1NhZmFyaSBkbyBub3QgcmVmbG93IHRoZSB0ZXh0IHRvIGFjY291bnQgZm9yIHRoZSBzcGFjZVxuXHRcdFx0XHQvLyBtYWRlIGF2YWlsYWJsZSBieSByZW1vdmluZyB0aGUgc2Nyb2xsYmFyLiBUaGUgZm9sbG93aW5nIGZvcmNlcyB0aGUgbmVjZXNzYXJ5IHRleHQgcmVmbG93LlxuXHRcdFx0XHR2YXIgd2lkdGggPSB0YS5zdHlsZS53aWR0aDtcblx0XHRcdFx0dGEuc3R5bGUud2lkdGggPSAnMHB4Jztcblx0XHRcdFx0Ly8gRm9yY2UgcmVmbG93OlxuXHRcdFx0XHQvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5cdFx0XHRcdHRhLm9mZnNldFdpZHRoO1xuXHRcdFx0XHQvKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xuXHRcdFx0XHR0YS5zdHlsZS53aWR0aCA9IHdpZHRoO1xuXHRcdFx0fVxuXG5cdFx0XHR0YS5zdHlsZS5vdmVyZmxvd1kgPSB2YWx1ZTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBnZXRQYXJlbnRPdmVyZmxvd3MoZWwpIHtcblx0XHRcdHZhciBhcnIgPSBbXTtcblxuXHRcdFx0d2hpbGUgKGVsICYmIGVsLnBhcmVudE5vZGUgJiYgZWwucGFyZW50Tm9kZSBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcblx0XHRcdFx0aWYgKGVsLnBhcmVudE5vZGUuc2Nyb2xsVG9wKSB7XG5cdFx0XHRcdFx0YXJyLnB1c2goe1xuXHRcdFx0XHRcdFx0bm9kZTogZWwucGFyZW50Tm9kZSxcblx0XHRcdFx0XHRcdHNjcm9sbFRvcDogZWwucGFyZW50Tm9kZS5zY3JvbGxUb3Bcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbCA9IGVsLnBhcmVudE5vZGU7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBhcnI7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcmVzaXplKCkge1xuXHRcdFx0dmFyIG9yaWdpbmFsSGVpZ2h0ID0gdGEuc3R5bGUuaGVpZ2h0O1xuXHRcdFx0dmFyIG92ZXJmbG93cyA9IGdldFBhcmVudE92ZXJmbG93cyh0YSk7XG5cdFx0XHR2YXIgZG9jVG9wID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7IC8vIE5lZWRlZCBmb3IgTW9iaWxlIElFICh0aWNrZXQgIzI0MClcblxuXHRcdFx0dGEuc3R5bGUuaGVpZ2h0ID0gJyc7XG5cblx0XHRcdHZhciBlbmRIZWlnaHQgPSB0YS5zY3JvbGxIZWlnaHQgKyBoZWlnaHRPZmZzZXQ7XG5cblx0XHRcdGlmICh0YS5zY3JvbGxIZWlnaHQgPT09IDApIHtcblx0XHRcdFx0Ly8gSWYgdGhlIHNjcm9sbEhlaWdodCBpcyAwLCB0aGVuIHRoZSBlbGVtZW50IHByb2JhYmx5IGhhcyBkaXNwbGF5Om5vbmUgb3IgaXMgZGV0YWNoZWQgZnJvbSB0aGUgRE9NLlxuXHRcdFx0XHR0YS5zdHlsZS5oZWlnaHQgPSBvcmlnaW5hbEhlaWdodDtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR0YS5zdHlsZS5oZWlnaHQgPSBlbmRIZWlnaHQgKyAncHgnO1xuXG5cdFx0XHQvLyB1c2VkIHRvIGNoZWNrIGlmIGFuIHVwZGF0ZSBpcyBhY3R1YWxseSBuZWNlc3Nhcnkgb24gd2luZG93LnJlc2l6ZVxuXHRcdFx0Y2xpZW50V2lkdGggPSB0YS5jbGllbnRXaWR0aDtcblxuXHRcdFx0Ly8gcHJldmVudHMgc2Nyb2xsLXBvc2l0aW9uIGp1bXBpbmdcblx0XHRcdG92ZXJmbG93cy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuXHRcdFx0XHRlbC5ub2RlLnNjcm9sbFRvcCA9IGVsLnNjcm9sbFRvcDtcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAoZG9jVG9wKSB7XG5cdFx0XHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPSBkb2NUb3A7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdXBkYXRlKCkge1xuXHRcdFx0cmVzaXplKCk7XG5cblx0XHRcdHZhciBzdHlsZUhlaWdodCA9IE1hdGgucm91bmQocGFyc2VGbG9hdCh0YS5zdHlsZS5oZWlnaHQpKTtcblx0XHRcdHZhciBjb21wdXRlZCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRhLCBudWxsKTtcblxuXHRcdFx0Ly8gVXNpbmcgb2Zmc2V0SGVpZ2h0IGFzIGEgcmVwbGFjZW1lbnQgZm9yIGNvbXB1dGVkLmhlaWdodCBpbiBJRSwgYmVjYXVzZSBJRSBkb2VzIG5vdCBhY2NvdW50IHVzZSBvZiBib3JkZXItYm94XG5cdFx0XHR2YXIgYWN0dWFsSGVpZ2h0ID0gY29tcHV0ZWQuYm94U2l6aW5nID09PSAnY29udGVudC1ib3gnID8gTWF0aC5yb3VuZChwYXJzZUZsb2F0KGNvbXB1dGVkLmhlaWdodCkpIDogdGEub2Zmc2V0SGVpZ2h0O1xuXG5cdFx0XHQvLyBUaGUgYWN0dWFsIGhlaWdodCBub3QgbWF0Y2hpbmcgdGhlIHN0eWxlIGhlaWdodCAoc2V0IHZpYSB0aGUgcmVzaXplIG1ldGhvZCkgaW5kaWNhdGVzIHRoYXRcblx0XHRcdC8vIHRoZSBtYXgtaGVpZ2h0IGhhcyBiZWVuIGV4Y2VlZGVkLCBpbiB3aGljaCBjYXNlIHRoZSBvdmVyZmxvdyBzaG91bGQgYmUgYWxsb3dlZC5cblx0XHRcdGlmIChhY3R1YWxIZWlnaHQgIT09IHN0eWxlSGVpZ2h0KSB7XG5cdFx0XHRcdGlmIChjb21wdXRlZC5vdmVyZmxvd1kgPT09ICdoaWRkZW4nKSB7XG5cdFx0XHRcdFx0Y2hhbmdlT3ZlcmZsb3coJ3Njcm9sbCcpO1xuXHRcdFx0XHRcdHJlc2l6ZSgpO1xuXHRcdFx0XHRcdGFjdHVhbEhlaWdodCA9IGNvbXB1dGVkLmJveFNpemluZyA9PT0gJ2NvbnRlbnQtYm94JyA/IE1hdGgucm91bmQocGFyc2VGbG9hdCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0YSwgbnVsbCkuaGVpZ2h0KSkgOiB0YS5vZmZzZXRIZWlnaHQ7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIE5vcm1hbGx5IGtlZXAgb3ZlcmZsb3cgc2V0IHRvIGhpZGRlbiwgdG8gYXZvaWQgZmxhc2ggb2Ygc2Nyb2xsYmFyIGFzIHRoZSB0ZXh0YXJlYSBleHBhbmRzLlxuXHRcdFx0XHRpZiAoY29tcHV0ZWQub3ZlcmZsb3dZICE9PSAnaGlkZGVuJykge1xuXHRcdFx0XHRcdGNoYW5nZU92ZXJmbG93KCdoaWRkZW4nKTtcblx0XHRcdFx0XHRyZXNpemUoKTtcblx0XHRcdFx0XHRhY3R1YWxIZWlnaHQgPSBjb21wdXRlZC5ib3hTaXppbmcgPT09ICdjb250ZW50LWJveCcgPyBNYXRoLnJvdW5kKHBhcnNlRmxvYXQod2luZG93LmdldENvbXB1dGVkU3R5bGUodGEsIG51bGwpLmhlaWdodCkpIDogdGEub2Zmc2V0SGVpZ2h0O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChjYWNoZWRIZWlnaHQgIT09IGFjdHVhbEhlaWdodCkge1xuXHRcdFx0XHRjYWNoZWRIZWlnaHQgPSBhY3R1YWxIZWlnaHQ7XG5cdFx0XHRcdHZhciBldnQgPSBjcmVhdGVFdmVudCgnYXV0b3NpemU6cmVzaXplZCcpO1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHRhLmRpc3BhdGNoRXZlbnQoZXZ0KTtcblx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdFx0Ly8gRmlyZWZveCB3aWxsIHRocm93IGFuIGVycm9yIG9uIGRpc3BhdGNoRXZlbnQgZm9yIGEgZGV0YWNoZWQgZWxlbWVudFxuXHRcdFx0XHRcdC8vIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTg4OTM3NlxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFyIHBhZ2VSZXNpemUgPSBmdW5jdGlvbiBwYWdlUmVzaXplKCkge1xuXHRcdFx0aWYgKHRhLmNsaWVudFdpZHRoICE9PSBjbGllbnRXaWR0aCkge1xuXHRcdFx0XHR1cGRhdGUoKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dmFyIGRlc3Ryb3kgPSAoZnVuY3Rpb24gKHN0eWxlKSB7XG5cdFx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcGFnZVJlc2l6ZSwgZmFsc2UpO1xuXHRcdFx0dGEucmVtb3ZlRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB1cGRhdGUsIGZhbHNlKTtcblx0XHRcdHRhLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdXBkYXRlLCBmYWxzZSk7XG5cdFx0XHR0YS5yZW1vdmVFdmVudExpc3RlbmVyKCdhdXRvc2l6ZTpkZXN0cm95JywgZGVzdHJveSwgZmFsc2UpO1xuXHRcdFx0dGEucmVtb3ZlRXZlbnRMaXN0ZW5lcignYXV0b3NpemU6dXBkYXRlJywgdXBkYXRlLCBmYWxzZSk7XG5cblx0XHRcdE9iamVjdC5rZXlzKHN0eWxlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdFx0dGEuc3R5bGVba2V5XSA9IHN0eWxlW2tleV07XG5cdFx0XHR9KTtcblxuXHRcdFx0bWFwWydkZWxldGUnXSh0YSk7XG5cdFx0fSkuYmluZCh0YSwge1xuXHRcdFx0aGVpZ2h0OiB0YS5zdHlsZS5oZWlnaHQsXG5cdFx0XHRyZXNpemU6IHRhLnN0eWxlLnJlc2l6ZSxcblx0XHRcdG92ZXJmbG93WTogdGEuc3R5bGUub3ZlcmZsb3dZLFxuXHRcdFx0b3ZlcmZsb3dYOiB0YS5zdHlsZS5vdmVyZmxvd1gsXG5cdFx0XHR3b3JkV3JhcDogdGEuc3R5bGUud29yZFdyYXBcblx0XHR9KTtcblxuXHRcdHRhLmFkZEV2ZW50TGlzdGVuZXIoJ2F1dG9zaXplOmRlc3Ryb3knLCBkZXN0cm95LCBmYWxzZSk7XG5cblx0XHQvLyBJRTkgZG9lcyBub3QgZmlyZSBvbnByb3BlcnR5Y2hhbmdlIG9yIG9uaW5wdXQgZm9yIGRlbGV0aW9ucyxcblx0XHQvLyBzbyBiaW5kaW5nIHRvIG9ua2V5dXAgdG8gY2F0Y2ggbW9zdCBvZiB0aG9zZSBldmVudHMuXG5cdFx0Ly8gVGhlcmUgaXMgbm8gd2F5IHRoYXQgSSBrbm93IG9mIHRvIGRldGVjdCBzb21ldGhpbmcgbGlrZSAnY3V0JyBpbiBJRTkuXG5cdFx0aWYgKCdvbnByb3BlcnR5Y2hhbmdlJyBpbiB0YSAmJiAnb25pbnB1dCcgaW4gdGEpIHtcblx0XHRcdHRhLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdXBkYXRlLCBmYWxzZSk7XG5cdFx0fVxuXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHBhZ2VSZXNpemUsIGZhbHNlKTtcblx0XHR0YS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHVwZGF0ZSwgZmFsc2UpO1xuXHRcdHRhLmFkZEV2ZW50TGlzdGVuZXIoJ2F1dG9zaXplOnVwZGF0ZScsIHVwZGF0ZSwgZmFsc2UpO1xuXHRcdHRhLnN0eWxlLm92ZXJmbG93WCA9ICdoaWRkZW4nO1xuXHRcdHRhLnN0eWxlLndvcmRXcmFwID0gJ2JyZWFrLXdvcmQnO1xuXG5cdFx0bWFwLnNldCh0YSwge1xuXHRcdFx0ZGVzdHJveTogZGVzdHJveSxcblx0XHRcdHVwZGF0ZTogdXBkYXRlXG5cdFx0fSk7XG5cblx0XHRpbml0KCk7XG5cdH1cblxuXHRmdW5jdGlvbiBkZXN0cm95KHRhKSB7XG5cdFx0dmFyIG1ldGhvZHMgPSBtYXAuZ2V0KHRhKTtcblx0XHRpZiAobWV0aG9kcykge1xuXHRcdFx0bWV0aG9kcy5kZXN0cm95KCk7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gdXBkYXRlKHRhKSB7XG5cdFx0dmFyIG1ldGhvZHMgPSBtYXAuZ2V0KHRhKTtcblx0XHRpZiAobWV0aG9kcykge1xuXHRcdFx0bWV0aG9kcy51cGRhdGUoKTtcblx0XHR9XG5cdH1cblxuXHR2YXIgYXV0b3NpemUgPSBudWxsO1xuXG5cdC8vIERvIG5vdGhpbmcgaW4gTm9kZS5qcyBlbnZpcm9ubWVudCBhbmQgSUU4IChvciBsb3dlcilcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdGF1dG9zaXplID0gZnVuY3Rpb24gKGVsKSB7XG5cdFx0XHRyZXR1cm4gZWw7XG5cdFx0fTtcblx0XHRhdXRvc2l6ZS5kZXN0cm95ID0gZnVuY3Rpb24gKGVsKSB7XG5cdFx0XHRyZXR1cm4gZWw7XG5cdFx0fTtcblx0XHRhdXRvc2l6ZS51cGRhdGUgPSBmdW5jdGlvbiAoZWwpIHtcblx0XHRcdHJldHVybiBlbDtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdGF1dG9zaXplID0gZnVuY3Rpb24gKGVsLCBvcHRpb25zKSB7XG5cdFx0XHRpZiAoZWwpIHtcblx0XHRcdFx0QXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChlbC5sZW5ndGggPyBlbCA6IFtlbF0sIGZ1bmN0aW9uICh4KSB7XG5cdFx0XHRcdFx0cmV0dXJuIGFzc2lnbih4LCBvcHRpb25zKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZWw7XG5cdFx0fTtcblx0XHRhdXRvc2l6ZS5kZXN0cm95ID0gZnVuY3Rpb24gKGVsKSB7XG5cdFx0XHRpZiAoZWwpIHtcblx0XHRcdFx0QXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChlbC5sZW5ndGggPyBlbCA6IFtlbF0sIGRlc3Ryb3kpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGVsO1xuXHRcdH07XG5cdFx0YXV0b3NpemUudXBkYXRlID0gZnVuY3Rpb24gKGVsKSB7XG5cdFx0XHRpZiAoZWwpIHtcblx0XHRcdFx0QXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChlbC5sZW5ndGggPyBlbCA6IFtlbF0sIHVwZGF0ZSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZWw7XG5cdFx0fTtcblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0gYXV0b3NpemU7XG59KTsiLCIvLyBUaGlzIGNvZGUgaGFzIGJlZW4gcmVmYWN0b3JlZCBmb3IgMTQwIGJ5dGVzXG4vLyBZb3UgY2FuIHNlZSB0aGUgb3JpZ2luYWwgaGVyZTogaHR0cHM6Ly9naXRodWIuY29tL3R3b2xmc29uL2NvbXB1dGVkU3R5bGUvYmxvYi8wNGNkMWRhMmUzMGZhNDU4NDRmOTVmNWNiMWFjODk4ZTliOWVmMDUwL2xpYi9jb21wdXRlZFN0eWxlLmpzXG52YXIgY29tcHV0ZWRTdHlsZSA9IGZ1bmN0aW9uIChlbCwgcHJvcCwgZ2V0Q29tcHV0ZWRTdHlsZSkge1xuICBnZXRDb21wdXRlZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGU7XG5cbiAgLy8gSW4gb25lIGZlbGwgc3dvb3BcbiAgcmV0dXJuIChcbiAgICAvLyBJZiB3ZSBoYXZlIGdldENvbXB1dGVkU3R5bGVcbiAgICBnZXRDb21wdXRlZFN0eWxlID9cbiAgICAgIC8vIFF1ZXJ5IGl0XG4gICAgICAvLyBUT0RPOiBGcm9tIENTUy1RdWVyeSBub3Rlcywgd2UgbWlnaHQgbmVlZCAobm9kZSwgbnVsbCkgZm9yIEZGXG4gICAgICBnZXRDb21wdXRlZFN0eWxlKGVsKSA6XG5cbiAgICAvLyBPdGhlcndpc2UsIHdlIGFyZSBpbiBJRSBhbmQgdXNlIGN1cnJlbnRTdHlsZVxuICAgICAgZWwuY3VycmVudFN0eWxlXG4gIClbXG4gICAgLy8gU3dpdGNoIHRvIGNhbWVsQ2FzZSBmb3IgQ1NTT01cbiAgICAvLyBERVY6IEdyYWJiZWQgZnJvbSBqUXVlcnlcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vanF1ZXJ5L2pxdWVyeS9ibG9iLzEuOS1zdGFibGUvc3JjL2Nzcy5qcyNMMTkxLUwxOTRcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vanF1ZXJ5L2pxdWVyeS9ibG9iLzEuOS1zdGFibGUvc3JjL2NvcmUuanMjTDU5My1MNTk3XG4gICAgcHJvcC5yZXBsYWNlKC8tKFxcdykvZ2ksIGZ1bmN0aW9uICh3b3JkLCBsZXR0ZXIpIHtcbiAgICAgIHJldHVybiBsZXR0ZXIudG9VcHBlckNhc2UoKTtcbiAgICB9KVxuICBdO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb21wdXRlZFN0eWxlO1xuIiwiLy8gTG9hZCBpbiBkZXBlbmRlbmNpZXNcbnZhciBjb21wdXRlZFN0eWxlID0gcmVxdWlyZSgnY29tcHV0ZWQtc3R5bGUnKTtcblxuLyoqXG4gKiBDYWxjdWxhdGUgdGhlIGBsaW5lLWhlaWdodGAgb2YgYSBnaXZlbiBub2RlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlIEVsZW1lbnQgdG8gY2FsY3VsYXRlIGxpbmUgaGVpZ2h0IG9mLiBNdXN0IGJlIGluIHRoZSBET00uXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBgbGluZS1oZWlnaHRgIG9mIHRoZSBlbGVtZW50IGluIHBpeGVsc1xuICovXG5mdW5jdGlvbiBsaW5lSGVpZ2h0KG5vZGUpIHtcbiAgLy8gR3JhYiB0aGUgbGluZS1oZWlnaHQgdmlhIHN0eWxlXG4gIHZhciBsbkhlaWdodFN0ciA9IGNvbXB1dGVkU3R5bGUobm9kZSwgJ2xpbmUtaGVpZ2h0Jyk7XG4gIHZhciBsbkhlaWdodCA9IHBhcnNlRmxvYXQobG5IZWlnaHRTdHIsIDEwKTtcblxuICAvLyBJZiB0aGUgbGluZUhlaWdodCBkaWQgbm90IGNvbnRhaW4gYSB1bml0IChpLmUuIGl0IHdhcyBudW1lcmljKSwgY29udmVydCBpdCB0byBlbXMgKGUuZy4gJzIuMycgPT09ICcyLjNlbScpXG4gIGlmIChsbkhlaWdodFN0ciA9PT0gbG5IZWlnaHQgKyAnJykge1xuICAgIC8vIFNhdmUgdGhlIG9sZCBsaW5lSGVpZ2h0IHN0eWxlIGFuZCB1cGRhdGUgdGhlIGVtIHVuaXQgdG8gdGhlIGVsZW1lbnRcbiAgICB2YXIgX2xuSGVpZ2h0U3R5bGUgPSBub2RlLnN0eWxlLmxpbmVIZWlnaHQ7XG4gICAgbm9kZS5zdHlsZS5saW5lSGVpZ2h0ID0gbG5IZWlnaHRTdHIgKyAnZW0nO1xuXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBlbSBiYXNlZCBoZWlnaHRcbiAgICBsbkhlaWdodFN0ciA9IGNvbXB1dGVkU3R5bGUobm9kZSwgJ2xpbmUtaGVpZ2h0Jyk7XG4gICAgbG5IZWlnaHQgPSBwYXJzZUZsb2F0KGxuSGVpZ2h0U3RyLCAxMCk7XG5cbiAgICAvLyBSZXZlcnQgdGhlIGxpbmVIZWlnaHQgc3R5bGVcbiAgICBpZiAoX2xuSGVpZ2h0U3R5bGUpIHtcbiAgICAgIG5vZGUuc3R5bGUubGluZUhlaWdodCA9IF9sbkhlaWdodFN0eWxlO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgbm9kZS5zdHlsZS5saW5lSGVpZ2h0O1xuICAgIH1cbiAgfVxuXG4gIC8vIElmIHRoZSBsaW5lSGVpZ2h0IGlzIGluIGBwdGAsIGNvbnZlcnQgaXQgdG8gcGl4ZWxzICg0cHggZm9yIDNwdClcbiAgLy8gREVWOiBgZW1gIHVuaXRzIGFyZSBjb252ZXJ0ZWQgdG8gYHB0YCBpbiBJRTZcbiAgLy8gQ29udmVyc2lvbiByYXRpbyBmcm9tIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0NTUy9sZW5ndGhcbiAgaWYgKGxuSGVpZ2h0U3RyLmluZGV4T2YoJ3B0JykgIT09IC0xKSB7XG4gICAgbG5IZWlnaHQgKj0gNDtcbiAgICBsbkhlaWdodCAvPSAzO1xuICAvLyBPdGhlcndpc2UsIGlmIHRoZSBsaW5lSGVpZ2h0IGlzIGluIGBtbWAsIGNvbnZlcnQgaXQgdG8gcGl4ZWxzICg5NnB4IGZvciAyNS40bW0pXG4gIH0gZWxzZSBpZiAobG5IZWlnaHRTdHIuaW5kZXhPZignbW0nKSAhPT0gLTEpIHtcbiAgICBsbkhlaWdodCAqPSA5NjtcbiAgICBsbkhlaWdodCAvPSAyNS40O1xuICAvLyBPdGhlcndpc2UsIGlmIHRoZSBsaW5lSGVpZ2h0IGlzIGluIGBjbWAsIGNvbnZlcnQgaXQgdG8gcGl4ZWxzICg5NnB4IGZvciAyLjU0Y20pXG4gIH0gZWxzZSBpZiAobG5IZWlnaHRTdHIuaW5kZXhPZignY20nKSAhPT0gLTEpIHtcbiAgICBsbkhlaWdodCAqPSA5NjtcbiAgICBsbkhlaWdodCAvPSAyLjU0O1xuICAvLyBPdGhlcndpc2UsIGlmIHRoZSBsaW5lSGVpZ2h0IGlzIGluIGBpbmAsIGNvbnZlcnQgaXQgdG8gcGl4ZWxzICg5NnB4IGZvciAxaW4pXG4gIH0gZWxzZSBpZiAobG5IZWlnaHRTdHIuaW5kZXhPZignaW4nKSAhPT0gLTEpIHtcbiAgICBsbkhlaWdodCAqPSA5NjtcbiAgLy8gT3RoZXJ3aXNlLCBpZiB0aGUgbGluZUhlaWdodCBpcyBpbiBgcGNgLCBjb252ZXJ0IGl0IHRvIHBpeGVscyAoMTJwdCBmb3IgMXBjKVxuICB9IGVsc2UgaWYgKGxuSGVpZ2h0U3RyLmluZGV4T2YoJ3BjJykgIT09IC0xKSB7XG4gICAgbG5IZWlnaHQgKj0gMTY7XG4gIH1cblxuICAvLyBDb250aW51ZSBvdXIgY29tcHV0YXRpb25cbiAgbG5IZWlnaHQgPSBNYXRoLnJvdW5kKGxuSGVpZ2h0KTtcblxuICAvLyBJZiB0aGUgbGluZS1oZWlnaHQgaXMgXCJub3JtYWxcIiwgY2FsY3VsYXRlIGJ5IGZvbnQtc2l6ZVxuICBpZiAobG5IZWlnaHRTdHIgPT09ICdub3JtYWwnKSB7XG4gICAgLy8gQ3JlYXRlIGEgdGVtcG9yYXJ5IG5vZGVcbiAgICB2YXIgbm9kZU5hbWUgPSBub2RlLm5vZGVOYW1lO1xuICAgIHZhciBfbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobm9kZU5hbWUpO1xuICAgIF9ub2RlLmlubmVySFRNTCA9ICcmbmJzcDsnO1xuXG4gICAgLy8gSWYgd2UgaGF2ZSBhIHRleHQgYXJlYSwgcmVzZXQgaXQgdG8gb25seSAxIHJvd1xuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS90d29sZnNvbi9saW5lLWhlaWdodC9pc3N1ZXMvNFxuICAgIGlmIChub2RlTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnVEVYVEFSRUEnKSB7XG4gICAgICBfbm9kZS5zZXRBdHRyaWJ1dGUoJ3Jvd3MnLCAnMScpO1xuICAgIH1cblxuICAgIC8vIFNldCB0aGUgZm9udC1zaXplIG9mIHRoZSBlbGVtZW50XG4gICAgdmFyIGZvbnRTaXplU3RyID0gY29tcHV0ZWRTdHlsZShub2RlLCAnZm9udC1zaXplJyk7XG4gICAgX25vZGUuc3R5bGUuZm9udFNpemUgPSBmb250U2l6ZVN0cjtcblxuICAgIC8vIFJlbW92ZSBkZWZhdWx0IHBhZGRpbmcvYm9yZGVyIHdoaWNoIGNhbiBhZmZlY3Qgb2Zmc2V0IGhlaWdodFxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS90d29sZnNvbi9saW5lLWhlaWdodC9pc3N1ZXMvNFxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9IVE1MRWxlbWVudC9vZmZzZXRIZWlnaHRcbiAgICBfbm9kZS5zdHlsZS5wYWRkaW5nID0gJzBweCc7XG4gICAgX25vZGUuc3R5bGUuYm9yZGVyID0gJzBweCc7XG5cbiAgICAvLyBBcHBlbmQgaXQgdG8gdGhlIGJvZHlcbiAgICB2YXIgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgYm9keS5hcHBlbmRDaGlsZChfbm9kZSk7XG5cbiAgICAvLyBBc3N1bWUgdGhlIGxpbmUgaGVpZ2h0IG9mIHRoZSBlbGVtZW50IGlzIHRoZSBoZWlnaHRcbiAgICB2YXIgaGVpZ2h0ID0gX25vZGUub2Zmc2V0SGVpZ2h0O1xuICAgIGxuSGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgLy8gUmVtb3ZlIG91ciBjaGlsZCBmcm9tIHRoZSBET01cbiAgICBib2R5LnJlbW92ZUNoaWxkKF9ub2RlKTtcbiAgfVxuXG4gIC8vIFJldHVybiB0aGUgY2FsY3VsYXRlZCBoZWlnaHRcbiAgcmV0dXJuIGxuSGVpZ2h0O1xufVxuXG4vLyBFeHBvcnQgbGluZUhlaWdodFxubW9kdWxlLmV4cG9ydHMgPSBsaW5lSGVpZ2h0O1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiJdfQ==
