require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

var _minimalReactText = require("minimal-react-text");

var _minimalReactText2 = _interopRequireDefault(_minimalReactText);

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
      isFocused: isFocused
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

  return MinimalReactTextArea;
})(_minimalReactText2['default']);

_minimalReactText2['default'].defaultProps = {
  autoComplete: false,
  type: 'text',
  isDisabled: false,
  theme: 'normal',
  size: 'normal'
};

if (process.env.NODE_ENV !== 'production') {
  _minimalReactText2['default'].propTypes = {
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

exports['default'] = MinimalReactTextArea;
module.exports = exports['default'];

}).call(this,require('_process'))

},{"_process":1,"classnames":undefined,"minimal-react-text":undefined,"prop-types":undefined,"react":undefined}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwiL2hvbWUveWRyYXJneXJvcy9EZXNrdG9wL0FydGxpbWVzL2FydGxpbWVzLXRleHRhcmVhL21pbmltYWwtcmVhY3QtdGV4dGFyZWEvc3JjL01pbmltYWxSZWFjdFRleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUNoQyxrQkFBYyxFQUFFLHVCQUFVLE1BQU07QUFDaEMsc0JBQWtCLEVBQUUsdUJBQVUsTUFBTTtBQUNwQyx1QkFBbUIsRUFBRSx1QkFBVSxNQUFNO0FBQ3JDLFFBQUksRUFBRSx1QkFBVSxNQUFNO0FBQ3RCLGVBQVcsRUFBRSx1QkFBVSxNQUFNO0FBQzdCLGdCQUFZLEVBQUUsdUJBQVUsU0FBUyxDQUFDLENBQ2hDLHVCQUFVLE1BQU0sRUFDaEIsdUJBQVUsTUFBTSxDQUFDLENBQUM7QUFDcEIsZ0JBQVksRUFBRSx1QkFBVSxJQUFJO0FBQzVCLGdCQUFZLEVBQUUsdUJBQVUsSUFBSTtBQUM1QixjQUFVLEVBQUUsdUJBQVUsSUFBSTtBQUMxQixhQUFTLEVBQUUsdUJBQVUsR0FBRztBQUN4QixpQkFBYSxFQUFFLHVCQUFVLE1BQU07QUFDL0IsVUFBTSxFQUFFLHVCQUFVLE1BQU07QUFDeEIsV0FBTyxFQUFFLHVCQUFVLE1BQU07QUFDekIsVUFBTSxFQUFFLHVCQUFVLE1BQU0sQ0FBQyxVQUFVO0FBQ25DLGNBQVUsRUFBRSx1QkFBVSxJQUFJO0dBQzVCLENBQUM7Q0FDRjs7cUJBRWMsb0JBQW9CIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IE1pbmltYWxSZWFjdFRleHQgZnJvbSBcIm1pbmltYWwtcmVhY3QtdGV4dFwiO1xuXG5jbGFzcyBNaW5pbWFsUmVhY3RUZXh0QXJlYSBleHRlbmRzIE1pbmltYWxSZWFjdFRleHQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIGxldCBoYXNWYWx1ZSA9IGZhbHNlO1xuICAgIGxldCBoYXNFcnJvciA9IGZhbHNlO1xuICAgIGNvbnN0IGlzRm9jdXNlZCA9IGZhbHNlO1xuICAgIGNvbnN0IGlucHV0VmFsdWUgPSBwcm9wcy5pbnB1dFZhbHVlO1xuXG4gICAgaWYgKGlucHV0VmFsdWUgIT09ICcnICYmIHR5cGVvZiBpbnB1dFZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgaGFzVmFsdWUgPSB0cnVlO1xuICAgICAgaGFzRXJyb3IgPSBwcm9wcy5oYXNFcnJvciB8fCAocHJvcHMucGF0dGVybiAmJiAhcHJvcHMucGF0dGVybi50ZXN0KGlucHV0VmFsdWUpKTtcbiAgIH1cblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBoYXNWYWx1ZSxcbiAgICAgIGhhc0Vycm9yLFxuICAgICAgaW5wdXRWYWx1ZSxcbiAgICAgIGlzRm9jdXNlZFxuICAgfTtcbiB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBsZXQgaGFzRXJyb3IgPSBuZXh0UHJvcHMuaGFzRXJyb3I7XG4gICAgbGV0IGhhc1ZhbHVlID0gISFuZXh0UHJvcHMuaW5wdXRWYWx1ZSB8fCB0aGlzLnN0YXRlLmhhc1ZhbHVlO1xuICAgIGNvbnN0IGlucHV0VmFsdWUgPSAobmV4dFByb3BzLmlucHV0VmFsdWUgIT09IHVuZGVmaW5lZCA/IG5leHRQcm9wcy5pbnB1dFZhbHVlIDogdGhpcy5zdGF0ZS5pbnB1dFZhbHVlKTtcblxuICAgIGlmICghaGFzRXJyb3IgJiYgaW5wdXRWYWx1ZSAhPT0gJycgJiYgdHlwZW9mIGlucHV0VmFsdWUgIT09ICd1bmRlZmluZWQnICYmICEhbmV4dFByb3BzLnBhdHRlcm4pIHtcbiAgICAgIGhhc1ZhbHVlID0gdHJ1ZTtcbiAgICAgIGhhc0Vycm9yID0gKG5leHRQcm9wcy5wYXR0ZXJuICYmICFuZXh0UHJvcHMucGF0dGVybi50ZXN0KGlucHV0VmFsdWUpKTtcbiAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgaGFzVmFsdWUsIGhhc0Vycm9yLCBpbnB1dFZhbHVlIH0pO1xuIH1cblxuICBvbkJsdXIoZXZlbnQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlzRm9jdXNlZDogZmFsc2VcbiAgICB9KTtcblxuICAgIGNvbnN0IHsgcGF0dGVybiwgaXNSZXF1aXJlZCB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgaGFzRXJyb3I7XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgaGFzVmFsdWU6IEJvb2xlYW4oZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSksXG4gICAgICAgIGhhc0Vycm9yOiAoZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZS5sZW5ndGggPyAocGF0dGVybiAmJiAhcGF0dGVybi50ZXN0KGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUpKSA6IGlzUmVxdWlyZWQpXG4gICAgIH0pO1xuXG4gICAgLy8gdXBkYXRlIG9uIHRoaXMuc2V0U3RhdGUgaGFwcGVucyBhZnRlciB0aGlzIGZ1bmN0aW9ucyBpcyBjb21wbGV0ZWRcbiAgICAvLyBpbiBvcmRlciB0byBhdm9pZCB0aGF0ICdza2lwcGVkJyBjaGFuZ2Ugb2YgdmFsdWUsIEkgdXNlIHRoZVxuICAgIC8vIGhhc0Vycm9yIHZhcmlhYmxlXG4gICAgaGFzRXJyb3IgPSAoZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZS5sZW5ndGggPyAocGF0dGVybiAmJiAhcGF0dGVybi50ZXN0KGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUpKSA6IGlzUmVxdWlyZWQpO1xuXG4gICAgaWYgKHRoaXMucHJvcHMub25CbHVyKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQmx1cihldmVudCwgdGhpcywgaGFzRXJyb3IpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShldmVudCwgdGhpcywgaGFzRXJyb3IpO1xuICAgIH1cbiB9XG5cbiAgb25DaGFuZ2UoZXZlbnQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGhhc1ZhbHVlOiBCb29sZWFuKGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUpLFxuICAgICAgaW5wdXRWYWx1ZTogZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSxcbiAgICAgIGhhc0Vycm9yOiBmYWxzZVxuICAgfSk7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShldmVudCwgdGhpcyk7XG4gICB9XG4gfVxuXG4gIG9uRm9jdXMoZXZlbnQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlzRm9jdXNlZDogdHJ1ZVxuICAgfSk7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5vbkZvY3VzKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRm9jdXMoZXZlbnQsIHRoaXMpO1xuICAgfVxuIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgZXJyb3JUZXh0TWVzc2FnZSxcbiAgICAgIGlkLFxuICAgICAgaXNEaXNhYmxlZCxcbiAgICAgIGlzUmVxdWlyZWQsXG4gICAgICBsYWJlbCxcbiAgICAgIHBsYWNlaG9sZGVyLFxuICAgICAgc2l6ZSxcbiAgICAgIHRoZW1lLFxuICAgICAgdHlwZSB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHsgaGFzVmFsdWUsIGhhc0Vycm9yLCBpbnB1dFZhbHVlLCBpc0ZvY3VzZWQgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBjb25zdCB3cmFwcGVyQ2xhc3NlcyA9IGNsYXNzTmFtZXMoXG4gICAgICAndHgtd3JhcHBlcicsXG4gICAgICB0aGlzLnByb3BzLndyYXBwZXJDbGFzc2VzLFxuICAgICAgeyAndHgtZm9jdXNlZCc6IGlzRm9jdXNlZCB9LFxuICAgICAgeyAndHgtZGlzYWJsZWQnOiBpc0Rpc2FibGVkIH0sXG4gICAgICB7ICd0eC13cmFwcGVyLXRleHRhcmVhJzogdHlwZSA9PT0gJ3RleHRhcmVhJyB9LFxuICAgICAgeyAndHgtd3JhcHBlci13aGl0ZSc6IHRoZW1lID09PSAnZGFyaycgfSk7XG5cbiAgICBjb25zdCBpbnB1dENsYXNzZXMgPSBjbGFzc05hbWVzKFxuICAgICAgJ3R4LWlucHV0JyxcbiAgICAgIHRoaXMucHJvcHMuaW5wdXRDbGFzc2VzLFxuICAgICAgeyAndHgtdGV4dGFyZWEtbGFyZ2UnOiBzaXplID09PSAnbGFyZ2UnIH0pO1xuXG4gICAgY29uc3QgbGFiZWxDbGFzc2VzID0gY2xhc3NOYW1lcyhcbiAgICAgICd0eC1sYWJlbCcsXG4gICAgICB0aGlzLnByb3BzLmxhYmVsQ2xhc3NlcyxcbiAgICAgIHsgJ3R4LWFib3ZlJzogcGxhY2Vob2xkZXIgfHwgaGFzVmFsdWUgfHwgaXNGb2N1c2VkIH0pO1xuXG4gICAgY29uc3QgZXJyb3J0ZXh0Q2xhc3NlcyA9IGNsYXNzTmFtZXMoXG4gICAgICAndHgtZXJyb3J0ZXh0JyxcbiAgICAgIHRoaXMucHJvcHMuZXJyb3J0ZXh0Q2xhc3NlcyxcbiAgICAgIHsgJ3R4LWVycm9ydGV4dC12aXNpYmxlJzogaGFzRXJyb3IgfSk7XG5cbiAgICBjb25zdCBmaWVsZFJlcXVpcmVkTWVzc2FnZSA9ICdGaWVsZCBpcyByZXF1aXJlZCc7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3dyYXBwZXJDbGFzc2VzfT5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICB7dHlwZSAhPT0gJ3RleHRhcmVhJyA/XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgYXV0b0NvbXBsZXRlPXt0aGlzLnByb3BzLmF1dG9Db21wbGV0ZX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtpbnB1dENsYXNzZXN9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtpc0Rpc2FibGVkfVxuICAgICAgICAgICAgICBpZD17aWR9XG4gICAgICAgICAgICAgIHR5cGU9e3R5cGV9XG4gICAgICAgICAgICAgIHJlcXVpcmVkPXtpc1JlcXVpcmVkfVxuICAgICAgICAgICAgICB2YWx1ZT17aW5wdXRWYWx1ZSB8fCAnJ31cbiAgICAgICAgICAgICAgZGF0YS1ldmVudC1hY3Rpb249e3RoaXMucHJvcHNbJ2RhdGEtZXZlbnQtYWN0aW9uJ119XG4gICAgICAgICAgICAgIG5hbWU9e3RoaXMucHJvcHMuaW5wdXROYW1lfVxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMub25Gb2N1cy5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25CbHVyLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAvPiA6XG4gICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgYXV0b0NvbXBsZXRlPXt0aGlzLnByb3BzLmF1dG9Db21wbGV0ZX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtpbnB1dENsYXNzZXN9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtpc0Rpc2FibGVkfVxuICAgICAgICAgICAgICBpZD17aWR9XG4gICAgICAgICAgICAgIHR5cGU9e3R5cGV9XG4gICAgICAgICAgICAgIHJlcXVpcmVkPXtpc1JlcXVpcmVkfVxuICAgICAgICAgICAgICB2YWx1ZT17aW5wdXRWYWx1ZSB8fCAnJ31cbiAgICAgICAgICAgICAgZGF0YS1ldmVudC1hY3Rpb249e3RoaXMucHJvcHNbJ2RhdGEtZXZlbnQtYWN0aW9uJ119XG4gICAgICAgICAgICAgIG5hbWU9e3RoaXMucHJvcHMuaW5wdXROYW1lfVxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMub25Gb2N1cy5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25CbHVyLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgfVxuICAgICAgICAgIHtsYWJlbCA/IDxsYWJlbCBjbGFzc05hbWU9e2xhYmVsQ2xhc3Nlc31cbiAgICAgICAgICAgIGh0bWxGb3I9e2lkfVxuICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgIHtsYWJlbH1cbiAgICAgICAgICA8L2xhYmVsPiA6IG51bGx9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7KGVycm9yVGV4dE1lc3NhZ2UgfHwgaXNSZXF1aXJlZCkgP1xuICAgICAgICAgIDxwIGNsYXNzTmFtZT17ZXJyb3J0ZXh0Q2xhc3Nlc30+XG4gICAgICAgICAge2lucHV0VmFsdWUgPyBlcnJvclRleHRNZXNzYWdlIDogZmllbGRSZXF1aXJlZE1lc3NhZ2V9XG4gICAgICAgICAgPC9wPiA6IG51bGx9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuIH1cbn1cblxuTWluaW1hbFJlYWN0VGV4dC5kZWZhdWx0UHJvcHMgPSB7XG4gIGF1dG9Db21wbGV0ZTogZmFsc2UsXG4gIHR5cGU6ICd0ZXh0JyxcbiAgaXNEaXNhYmxlZDogZmFsc2UsXG4gIHRoZW1lOiAnbm9ybWFsJyxcbiAgc2l6ZTogJ25vcm1hbCdcbn07XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIE1pbmltYWxSZWFjdFRleHQucHJvcFR5cGVzID0ge1xuICAgICdhdXRvQ29tcGxldGUnOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAnd3JhcHBlckNsYXNzZXMnOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICdpbnB1dENsYXNzZXMnOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICdsYWJlbENsYXNzZXMnOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICdlcnJvcnRleHRDbGFzc2VzJzogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAnZGF0YS1ldmVudC1hY3Rpb24nOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICdpZCc6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgJ2lucHV0TmFtZSc6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgJ2lucHV0VmFsdWUnOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMubnVtYmVyXSksXG4gICAgJ2lzRGlzYWJsZWQnOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAnaXNSZXF1aXJlZCc6IFByb3BUeXBlcy5ib29sLFxuICAgICdvbkNoYW5nZSc6IFByb3BUeXBlcy5mdW5jLFxuICAgICdwYXR0ZXJuJzogUHJvcFR5cGVzLmFueSxcbiAgICAncGxhY2Vob2xkZXInOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICdzaXplJzogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAndGhlbWUnOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICd0eXBlJzogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICdoYXNFcnJvcic6IFByb3BUeXBlcy5ib29sXG4gfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTWluaW1hbFJlYWN0VGV4dEFyZWE7XG4iXX0=
