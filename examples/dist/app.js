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
      'Normal'
    ),
    _react2['default'].createElement(_componentsMinimalReactText2['default'], { label: 'Label' }),
    _react2['default'].createElement(
      'h3',
      null,
      'With Placeholder'
    ),
    _react2['default'].createElement(_componentsMinimalReactText2['default'], { label: 'Label', placeholder: 'Placeholder' }),
    _react2['default'].createElement(
      'h3',
      null,
      'With Placeholder & InputValue'
    ),
    _react2['default'].createElement(_componentsMinimalReactText2['default'], { label: 'Label', placeholder: 'Placeholder', inputValue: 'InputValue' }),
    _react2['default'].createElement(
      'h3',
      null,
      'Required'
    ),
    _react2['default'].createElement(_componentsMinimalReactText2['default'], { label: 'Label', isRequired: true }),
    _react2['default'].createElement(
      'h3',
      null,
      'Disabled'
    ),
    _react2['default'].createElement(_componentsMinimalReactText2['default'], { label: 'Label', placeholder: 'Placeholder', isDisabled: true }),
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
      _react2['default'].createElement(_componentsMinimalReactText2['default'], { label: 'Label', theme: 'dark' }),
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

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var MinimalReactText = (function (_Component) {
  _inherits(MinimalReactText, _Component);

  function MinimalReactText(props) {
    _classCallCheck(this, MinimalReactText);

    _get(Object.getPrototypeOf(MinimalReactText.prototype), 'constructor', this).call(this, props);

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
      isFocused: isFocused
    };
  }

  _createClass(MinimalReactText, [{
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
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var errorTextMessage = _props2.errorTextMessage;
      var id = _props2.id;
      var isDisabled = _props2.isDisabled;
      var isRequired = _props2.isRequired;
      var label = _props2.label;
      var placeholder = _props2.placeholder;
      var size = _props2.size;
      var theme = _props2.theme;
      var type = _props2.type;
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
          }) : _react2['default'].createElement('textarea', {
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
          }),
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

  return MinimalReactText;
})(_react.Component);

MinimalReactText.defaultProps = {
  autoComplete: false,
  type: 'text',
  isDisabled: false,
  theme: 'normal',
  size: 'normal'
};

if (process.env.NODE_ENV !== 'production') {
  MinimalReactText.propTypes = {
    'autoComplete': _propTypes2['default'].bool,
    'wrapperClasses': _propTypes2['default'].string,
    'inputClasses': _propTypes2['default'].string,
    'labelClasses': _propTypes2['default'].string,
    'errortextClasses': _propTypes2['default'].string,
    'data-event-action': _propTypes2['default'].string,
    'id': _propTypes2['default'].string,
    'inputName': _propTypes2['default'].string,
    'inputValue': _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
    'isDisabled': _propTypes2['default'].bool,
    'isRequired': _propTypes2['default'].bool,
    'onChange': _propTypes2['default'].func,
    'pattern': _propTypes2['default'].any,
    'placeholder': _propTypes2['default'].string,
    'size': _propTypes2['default'].string,
    'theme': _propTypes2['default'].string,
    'type': _propTypes2['default'].string.isRequired,
    'hasError': _propTypes2['default'].bool
  };
}

exports['default'] = MinimalReactText;
module.exports = exports['default'];

}).call(this,require('_process'))

},{"_process":3,"classnames":undefined,"prop-types":undefined,"react":undefined}],3:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS95ZHJhcmd5cm9zL0Rlc2t0b3AvQXJ0bGltZXMvYXJ0bGltZXMtdGV4dGFyZWEvbWluaW1hbC1yZWFjdC10ZXh0YXJlYS9leGFtcGxlcy9zcmMvYXBwLmpzIiwiL2hvbWUveWRyYXJneXJvcy9EZXNrdG9wL0FydGxpbWVzL2FydGxpbWVzLXRleHRhcmVhL21pbmltYWwtcmVhY3QtdGV4dGFyZWEvZXhhbXBsZXMvc3JjL2NvbXBvbmVudHMvTWluaW1hbFJlYWN0VGV4dC5qcyIsIm5vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7cUJDRWtCLE9BQU87Ozs7d0JBQ0osV0FBVzs7OzswQ0FDSCwrQkFBK0I7Ozs7QUFFNUQsc0JBQVMsTUFBTSxDQUNiOztJQUFNLFVBQVUsTUFBQTtFQUNqQjs7O0lBQ1M7Ozs7S0FBZTtJQUNwQiw0RUFBa0IsS0FBSyxFQUFDLE9BQU8sR0FBRTtJQUU1Qjs7OztLQUF5QjtJQUN2Qiw0RUFBa0IsS0FBSyxFQUFDLE9BQU8sRUFBQyxXQUFXLEVBQUMsYUFBYSxHQUFFO0lBRTdEOzs7O0tBQXNDO0lBQ3BDLDRFQUFrQixLQUFLLEVBQUMsT0FBTyxFQUFDLFdBQVcsRUFBQyxhQUFhLEVBQUMsVUFBVSxFQUFDLFlBQVksR0FBRTtJQUVyRjs7OztLQUFpQjtJQUNmLDRFQUFrQixLQUFLLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBRSxJQUFJLEFBQUMsR0FBRTtJQUVyRDs7OztLQUFpQjtJQUNmLDRFQUFrQixLQUFLLEVBQUMsT0FBTyxFQUFDLFdBQVcsRUFBQyxhQUFhLEVBQUMsVUFBVSxFQUFFLElBQUksQUFBQyxHQUFFO0lBRS9FOzs7O0tBQXdCO0lBQ3RCLDRFQUFrQixLQUFLLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxVQUFVLEdBQUU7SUFFbkQ7Ozs7S0FBdUI7SUFDckIsNEVB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBlc2xpbnQgcmVhY3QvcHJvcC10eXBlczogMCAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgTWluaW1hbFJlYWN0VGV4dCBmcm9tICcuL2NvbXBvbmVudHMvTWluaW1hbFJlYWN0VGV4dCc7XG5cblJlYWN0RE9NLnJlbmRlcihcbiAgPGZvcm0gbm9WYWxpZGF0ZT5cblx0PGRpdj5cbiAgICAgICAgICA8aDM+Tm9ybWFsPC9oMz5cblx0ICAgIDxNaW5pbWFsUmVhY3RUZXh0IGxhYmVsPVwiTGFiZWxcIi8+XG5cbiAgICAgICAgICA8aDM+V2l0aCBQbGFjZWhvbGRlcjwvaDM+XG4gICAgICAgICAgICA8TWluaW1hbFJlYWN0VGV4dCBsYWJlbD1cIkxhYmVsXCIgcGxhY2Vob2xkZXI9XCJQbGFjZWhvbGRlclwiLz5cblxuICAgICAgICAgIDxoMz5XaXRoIFBsYWNlaG9sZGVyICYgSW5wdXRWYWx1ZTwvaDM+XG4gICAgICAgICAgICA8TWluaW1hbFJlYWN0VGV4dCBsYWJlbD1cIkxhYmVsXCIgcGxhY2Vob2xkZXI9XCJQbGFjZWhvbGRlclwiIGlucHV0VmFsdWU9XCJJbnB1dFZhbHVlXCIvPlxuXG4gICAgICAgICAgPGgzPlJlcXVpcmVkPC9oMz5cbiAgICAgICAgICAgIDxNaW5pbWFsUmVhY3RUZXh0IGxhYmVsPVwiTGFiZWxcIiBpc1JlcXVpcmVkPXt0cnVlfS8+XG5cbiAgICAgICAgICA8aDM+RGlzYWJsZWQ8L2gzPlxuICAgICAgICAgICAgPE1pbmltYWxSZWFjdFRleHQgbGFiZWw9XCJMYWJlbFwiIHBsYWNlaG9sZGVyPVwiUGxhY2Vob2xkZXJcIiBpc0Rpc2FibGVkPXt0cnVlfS8+XG5cbiAgICAgICAgICA8aDM+Tm9ybWFsIFRleHRhcmVhPC9oMz5cbiAgICAgICAgICAgIDxNaW5pbWFsUmVhY3RUZXh0IGxhYmVsPVwiTGFiZWxcIiB0eXBlPVwidGV4dGFyZWFcIi8+XG5cbiAgICAgICAgICA8aDM+TGFyZ2UgVGV4dGFyZWE8L2gzPlxuICAgICAgICAgICAgPE1pbmltYWxSZWFjdFRleHQgbGFiZWw9XCJMYWJlbFwiIHR5cGU9XCJ0ZXh0YXJlYVwiIHNpemU9XCJsYXJnZVwiLz5cblxuICAgICAgICAgIDxoMz5EYXJrIFRoZW1lPC9oMz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRhcmstYmFja2dyb3VuZFwiPlxuICAgICAgICAgICAgPE1pbmltYWxSZWFjdFRleHQgbGFiZWw9XCJMYWJlbFwiIHRoZW1lPVwiZGFya1wiLz5cbiAgICAgICAgICAgIDxNaW5pbWFsUmVhY3RUZXh0IGxhYmVsPVwiTGFiZWxcIiB0eXBlPVwidGV4dGFyZWFcIiB0aGVtZT1cImRhcmtcIi8+XG4gICAgICAgICAgPC9kaXY+XG5cdDwvZGl2PlxuICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPlN1Ym1pdDwvYnV0dG9uPlxuICA8L2Zvcm0+LFxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhhbXBsZScpXG4pO1xuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgTWluaW1hbFJlYWN0VGV4dCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgbGV0IGhhc1ZhbHVlID0gZmFsc2U7XG4gICAgbGV0IGhhc0Vycm9yID0gZmFsc2U7XG4gICAgY29uc3QgaXNGb2N1c2VkID0gZmFsc2U7XG4gICAgY29uc3QgaW5wdXRWYWx1ZSA9IHByb3BzLmlucHV0VmFsdWU7XG5cbiAgICBpZiAoaW5wdXRWYWx1ZSAhPT0gJycgJiYgdHlwZW9mIGlucHV0VmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBoYXNWYWx1ZSA9IHRydWU7XG4gICAgICBoYXNFcnJvciA9IHByb3BzLmhhc0Vycm9yIHx8IChwcm9wcy5wYXR0ZXJuICYmICFwcm9wcy5wYXR0ZXJuLnRlc3QoaW5wdXRWYWx1ZSkpO1xuICAgfVxuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGhhc1ZhbHVlLFxuICAgICAgaGFzRXJyb3IsXG4gICAgICBpbnB1dFZhbHVlLFxuICAgICAgaXNGb2N1c2VkXG4gICB9O1xuIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIGxldCBoYXNFcnJvciA9IG5leHRQcm9wcy5oYXNFcnJvcjtcbiAgICBsZXQgaGFzVmFsdWUgPSAhIW5leHRQcm9wcy5pbnB1dFZhbHVlIHx8IHRoaXMuc3RhdGUuaGFzVmFsdWU7XG4gICAgY29uc3QgaW5wdXRWYWx1ZSA9IChuZXh0UHJvcHMuaW5wdXRWYWx1ZSAhPT0gdW5kZWZpbmVkID8gbmV4dFByb3BzLmlucHV0VmFsdWUgOiB0aGlzLnN0YXRlLmlucHV0VmFsdWUpO1xuXG4gICAgaWYgKCFoYXNFcnJvciAmJiBpbnB1dFZhbHVlICE9PSAnJyAmJiB0eXBlb2YgaW5wdXRWYWx1ZSAhPT0gJ3VuZGVmaW5lZCcgJiYgISFuZXh0UHJvcHMucGF0dGVybikge1xuICAgICAgaGFzVmFsdWUgPSB0cnVlO1xuICAgICAgaGFzRXJyb3IgPSAobmV4dFByb3BzLnBhdHRlcm4gJiYgIW5leHRQcm9wcy5wYXR0ZXJuLnRlc3QoaW5wdXRWYWx1ZSkpO1xuICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyBoYXNWYWx1ZSwgaGFzRXJyb3IsIGlucHV0VmFsdWUgfSk7XG4gfVxuXG4gIG9uQmx1cihldmVudCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgaXNGb2N1c2VkOiBmYWxzZVxuICAgIH0pO1xuXG4gICAgY29uc3QgeyBwYXR0ZXJuLCBpc1JlcXVpcmVkIH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBoYXNFcnJvcjtcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBoYXNWYWx1ZTogQm9vbGVhbihldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlKSxcbiAgICAgICAgaGFzRXJyb3I6IChldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlLmxlbmd0aCA/IChwYXR0ZXJuICYmICFwYXR0ZXJuLnRlc3QoZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSkpIDogaXNSZXF1aXJlZClcbiAgICAgfSk7XG5cbiAgICAvLyB1cGRhdGUgb24gdGhpcy5zZXRTdGF0ZSBoYXBwZW5zIGFmdGVyIHRoaXMgZnVuY3Rpb25zIGlzIGNvbXBsZXRlZFxuICAgIC8vIGluIG9yZGVyIHRvIGF2b2lkIHRoYXQgJ3NraXBwZWQnIGNoYW5nZSBvZiB2YWx1ZSwgSSB1c2UgdGhlXG4gICAgLy8gaGFzRXJyb3IgdmFyaWFibGVcbiAgICBoYXNFcnJvciA9IChldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlLmxlbmd0aCA/IChwYXR0ZXJuICYmICFwYXR0ZXJuLnRlc3QoZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSkpIDogaXNSZXF1aXJlZCk7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5vbkJsdXIpIHtcbiAgICAgIHRoaXMucHJvcHMub25CbHVyKGV2ZW50LCB0aGlzLCBoYXNFcnJvcik7XG4gICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGV2ZW50LCB0aGlzLCBoYXNFcnJvcik7XG4gICAgfVxuIH1cblxuICBvbkNoYW5nZShldmVudCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgaGFzVmFsdWU6IEJvb2xlYW4oZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSksXG4gICAgICBpbnB1dFZhbHVlOiBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlLFxuICAgICAgaGFzRXJyb3I6IGZhbHNlXG4gICB9KTtcblxuICAgIGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGV2ZW50LCB0aGlzKTtcbiAgIH1cbiB9XG5cbiAgb25Gb2N1cyhldmVudCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgaXNGb2N1c2VkOiB0cnVlXG4gICB9KTtcblxuICAgIGlmICh0aGlzLnByb3BzLm9uRm9jdXMpIHtcbiAgICAgIHRoaXMucHJvcHMub25Gb2N1cyhldmVudCwgdGhpcyk7XG4gICB9XG4gfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBlcnJvclRleHRNZXNzYWdlLFxuICAgICAgaWQsXG4gICAgICBpc0Rpc2FibGVkLFxuICAgICAgaXNSZXF1aXJlZCxcbiAgICAgIGxhYmVsLFxuICAgICAgcGxhY2Vob2xkZXIsXG4gICAgICBzaXplLFxuICAgICAgdGhlbWUsXG4gICAgICB0eXBlIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgeyBoYXNWYWx1ZSwgaGFzRXJyb3IsIGlucHV0VmFsdWUsIGlzRm9jdXNlZCB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIGNvbnN0IHdyYXBwZXJDbGFzc2VzID0gY2xhc3NOYW1lcyhcbiAgICAgICd0eC13cmFwcGVyJyxcbiAgICAgIHRoaXMucHJvcHMud3JhcHBlckNsYXNzZXMsXG4gICAgICB7ICd0eC1mb2N1c2VkJzogaXNGb2N1c2VkIH0sXG4gICAgICB7ICd0eC1kaXNhYmxlZCc6IGlzRGlzYWJsZWQgfSxcbiAgICAgIHsgJ3R4LXdyYXBwZXItdGV4dGFyZWEnOiB0eXBlID09PSAndGV4dGFyZWEnIH0sXG4gICAgICB7ICd0eC13cmFwcGVyLXdoaXRlJzogdGhlbWUgPT09ICdkYXJrJyB9KTtcblxuICAgIGNvbnN0IGlucHV0Q2xhc3NlcyA9IGNsYXNzTmFtZXMoXG4gICAgICAndHgtaW5wdXQnLFxuICAgICAgdGhpcy5wcm9wcy5pbnB1dENsYXNzZXMsXG4gICAgICB7ICd0eC10ZXh0YXJlYS1sYXJnZSc6IHNpemUgPT09ICdsYXJnZScgfSk7XG5cbiAgICBjb25zdCBsYWJlbENsYXNzZXMgPSBjbGFzc05hbWVzKFxuICAgICAgJ3R4LWxhYmVsJyxcbiAgICAgIHRoaXMucHJvcHMubGFiZWxDbGFzc2VzLFxuICAgICAgeyAndHgtYWJvdmUnOiBwbGFjZWhvbGRlciB8fCBoYXNWYWx1ZSB8fCBpc0ZvY3VzZWQgfSk7XG5cbiAgICBjb25zdCBlcnJvcnRleHRDbGFzc2VzID0gY2xhc3NOYW1lcyhcbiAgICAgICd0eC1lcnJvcnRleHQnLFxuICAgICAgdGhpcy5wcm9wcy5lcnJvcnRleHRDbGFzc2VzLFxuICAgICAgeyAndHgtZXJyb3J0ZXh0LXZpc2libGUnOiBoYXNFcnJvciB9KTtcblxuICAgIGNvbnN0IGZpZWxkUmVxdWlyZWRNZXNzYWdlID0gJ0ZpZWxkIGlzIHJlcXVpcmVkJztcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17d3JhcHBlckNsYXNzZXN9PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIHt0eXBlICE9PSAndGV4dGFyZWEnID9cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICBhdXRvQ29tcGxldGU9e3RoaXMucHJvcHMuYXV0b0NvbXBsZXRlfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2lucHV0Q2xhc3Nlc31cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzRGlzYWJsZWR9XG4gICAgICAgICAgICAgIGlkPXtpZH1cbiAgICAgICAgICAgICAgdHlwZT17dHlwZX1cbiAgICAgICAgICAgICAgcmVxdWlyZWQ9e2lzUmVxdWlyZWR9XG4gICAgICAgICAgICAgIHZhbHVlPXtpbnB1dFZhbHVlIHx8ICcnfVxuICAgICAgICAgICAgICBkYXRhLWV2ZW50LWFjdGlvbj17dGhpcy5wcm9wc1snZGF0YS1ldmVudC1hY3Rpb24nXX1cbiAgICAgICAgICAgICAgbmFtZT17dGhpcy5wcm9wcy5pbnB1dE5hbWV9XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5vbkZvY3VzLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5vbkJsdXIuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2UuYmluZCh0aGlzKX1cbiAgICAgICAgICAgIC8+IDpcbiAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICBhdXRvQ29tcGxldGU9e3RoaXMucHJvcHMuYXV0b0NvbXBsZXRlfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2lucHV0Q2xhc3Nlc31cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzRGlzYWJsZWR9XG4gICAgICAgICAgICAgIGlkPXtpZH1cbiAgICAgICAgICAgICAgdHlwZT17dHlwZX1cbiAgICAgICAgICAgICAgcmVxdWlyZWQ9e2lzUmVxdWlyZWR9XG4gICAgICAgICAgICAgIHZhbHVlPXtpbnB1dFZhbHVlIHx8ICcnfVxuICAgICAgICAgICAgICBkYXRhLWV2ZW50LWFjdGlvbj17dGhpcy5wcm9wc1snZGF0YS1ldmVudC1hY3Rpb24nXX1cbiAgICAgICAgICAgICAgbmFtZT17dGhpcy5wcm9wcy5pbnB1dE5hbWV9XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5vbkZvY3VzLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5vbkJsdXIuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2UuYmluZCh0aGlzKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICB9XG4gICAgICAgICAge2xhYmVsID8gPGxhYmVsIGNsYXNzTmFtZT17bGFiZWxDbGFzc2VzfVxuICAgICAgICAgICAgaHRtbEZvcj17aWR9XG4gICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAge2xhYmVsfVxuICAgICAgICAgIDwvbGFiZWw+IDogbnVsbH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHsoZXJyb3JUZXh0TWVzc2FnZSB8fCBpc1JlcXVpcmVkKSA/XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPXtlcnJvcnRleHRDbGFzc2VzfT5cbiAgICAgICAgICB7aW5wdXRWYWx1ZSA/IGVycm9yVGV4dE1lc3NhZ2UgOiBmaWVsZFJlcXVpcmVkTWVzc2FnZX1cbiAgICAgICAgICA8L3A+IDogbnVsbH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gfVxufVxuXG5NaW5pbWFsUmVhY3RUZXh0LmRlZmF1bHRQcm9wcyA9IHtcbiAgYXV0b0NvbXBsZXRlOiBmYWxzZSxcbiAgdHlwZTogJ3RleHQnLFxuICBpc0Rpc2FibGVkOiBmYWxzZSxcbiAgdGhlbWU6ICdub3JtYWwnLFxuICBzaXplOiAnbm9ybWFsJ1xufTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgTWluaW1hbFJlYWN0VGV4dC5wcm9wVHlwZXMgPSB7XG4gICAgJ2F1dG9Db21wbGV0ZSc6IFByb3BUeXBlcy5ib29sLFxuICAgICd3cmFwcGVyQ2xhc3Nlcyc6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgJ2lucHV0Q2xhc3Nlcyc6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgJ2xhYmVsQ2xhc3Nlcyc6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgJ2Vycm9ydGV4dENsYXNzZXMnOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICdkYXRhLWV2ZW50LWFjdGlvbic6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgJ2lkJzogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAnaW5wdXROYW1lJzogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgJ2lucHV0VmFsdWUnOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMubnVtYmVyXSksXG4gICAgJ2lzRGlzYWJsZWQnOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAnaXNSZXF1aXJlZCc6IFByb3BUeXBlcy5ib29sLFxuICAgICdvbkNoYW5nZSc6IFByb3BUeXBlcy5mdW5jLFxuICAgICdwYXR0ZXJuJzogUHJvcFR5cGVzLmFueSxcbiAgICAncGxhY2Vob2xkZXInOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICdzaXplJzogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAndGhlbWUnOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICd0eXBlJzogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICdoYXNFcnJvcic6IFByb3BUeXBlcy5ib29sXG4gfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTWluaW1hbFJlYWN0VGV4dDtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iXX0=
