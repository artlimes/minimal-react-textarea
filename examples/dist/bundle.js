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

},{}],"minimal-react-text":[function(require,module,exports){
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

},{"_process":1,"classnames":undefined,"prop-types":undefined,"react":undefined}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwiL2hvbWUveWRyYXJneXJvcy9EZXNrdG9wL0FydGxpbWVzL2FydGxpbWVzLXRleHRhcmVhL21pbmltYWwtcmVhY3QtdGV4dGFyZWEvc3JjL01pbmltYWxSZWFjdFRleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUFjLEVBQUUsdUJBQVUsTUFBTTtBQUNoQyxzQkFBa0IsRUFBRSx1QkFBVSxNQUFNO0FBQ3BDLHVCQUFtQixFQUFFLHVCQUFVLE1BQU07QUFDckMsUUFBSSxFQUFFLHVCQUFVLE1BQU07QUFDdEIsZUFBVyxFQUFFLHVCQUFVLE1BQU07QUFDN0IsZ0JBQVksRUFBRSx1QkFBVSxTQUFTLENBQUMsQ0FDaEMsdUJBQVUsTUFBTSxFQUNoQix1QkFBVSxNQUFNLENBQUMsQ0FBQztBQUNwQixnQkFBWSxFQUFFLHVCQUFVLElBQUk7QUFDNUIsZ0JBQVksRUFBRSx1QkFBVSxJQUFJO0FBQzVCLGNBQVUsRUFBRSx1QkFBVSxJQUFJO0FBQzFCLGFBQVMsRUFBRSx1QkFBVSxHQUFHO0FBQ3hCLGlCQUFhLEVBQUUsdUJBQVUsTUFBTTtBQUMvQixVQUFNLEVBQUUsdUJBQVUsTUFBTTtBQUN4QixXQUFPLEVBQUUsdUJBQVUsTUFBTTtBQUN6QixVQUFNLEVBQUUsdUJBQVUsTUFBTSxDQUFDLFVBQVU7QUFDbkMsY0FBVSxFQUFFLHVCQUFVLElBQUk7R0FDNUIsQ0FBQztDQUNGOztxQkFFYyxnQkFBZ0IiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIE1pbmltYWxSZWFjdFRleHQgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIGxldCBoYXNWYWx1ZSA9IGZhbHNlO1xuICAgIGxldCBoYXNFcnJvciA9IGZhbHNlO1xuICAgIGNvbnN0IGlzRm9jdXNlZCA9IGZhbHNlO1xuICAgIGNvbnN0IGlucHV0VmFsdWUgPSBwcm9wcy5pbnB1dFZhbHVlO1xuXG4gICAgaWYgKGlucHV0VmFsdWUgIT09ICcnICYmIHR5cGVvZiBpbnB1dFZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgaGFzVmFsdWUgPSB0cnVlO1xuICAgICAgaGFzRXJyb3IgPSBwcm9wcy5oYXNFcnJvciB8fCAocHJvcHMucGF0dGVybiAmJiAhcHJvcHMucGF0dGVybi50ZXN0KGlucHV0VmFsdWUpKTtcbiAgIH1cblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBoYXNWYWx1ZSxcbiAgICAgIGhhc0Vycm9yLFxuICAgICAgaW5wdXRWYWx1ZSxcbiAgICAgIGlzRm9jdXNlZFxuICAgfTtcbiB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBsZXQgaGFzRXJyb3IgPSBuZXh0UHJvcHMuaGFzRXJyb3I7XG4gICAgbGV0IGhhc1ZhbHVlID0gISFuZXh0UHJvcHMuaW5wdXRWYWx1ZSB8fCB0aGlzLnN0YXRlLmhhc1ZhbHVlO1xuICAgIGNvbnN0IGlucHV0VmFsdWUgPSAobmV4dFByb3BzLmlucHV0VmFsdWUgIT09IHVuZGVmaW5lZCA/IG5leHRQcm9wcy5pbnB1dFZhbHVlIDogdGhpcy5zdGF0ZS5pbnB1dFZhbHVlKTtcblxuICAgIGlmICghaGFzRXJyb3IgJiYgaW5wdXRWYWx1ZSAhPT0gJycgJiYgdHlwZW9mIGlucHV0VmFsdWUgIT09ICd1bmRlZmluZWQnICYmICEhbmV4dFByb3BzLnBhdHRlcm4pIHtcbiAgICAgIGhhc1ZhbHVlID0gdHJ1ZTtcbiAgICAgIGhhc0Vycm9yID0gKG5leHRQcm9wcy5wYXR0ZXJuICYmICFuZXh0UHJvcHMucGF0dGVybi50ZXN0KGlucHV0VmFsdWUpKTtcbiAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgaGFzVmFsdWUsIGhhc0Vycm9yLCBpbnB1dFZhbHVlIH0pO1xuIH1cblxuICBvbkJsdXIoZXZlbnQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlzRm9jdXNlZDogZmFsc2VcbiAgICB9KTtcblxuICAgIGNvbnN0IHsgcGF0dGVybiwgaXNSZXF1aXJlZCB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgaGFzRXJyb3I7XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgaGFzVmFsdWU6IEJvb2xlYW4oZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSksXG4gICAgICAgIGhhc0Vycm9yOiAoZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZS5sZW5ndGggPyAocGF0dGVybiAmJiAhcGF0dGVybi50ZXN0KGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUpKSA6IGlzUmVxdWlyZWQpXG4gICAgIH0pO1xuXG4gICAgLy8gdXBkYXRlIG9uIHRoaXMuc2V0U3RhdGUgaGFwcGVucyBhZnRlciB0aGlzIGZ1bmN0aW9ucyBpcyBjb21wbGV0ZWRcbiAgICAvLyBpbiBvcmRlciB0byBhdm9pZCB0aGF0ICdza2lwcGVkJyBjaGFuZ2Ugb2YgdmFsdWUsIEkgdXNlIHRoZVxuICAgIC8vIGhhc0Vycm9yIHZhcmlhYmxlXG4gICAgaGFzRXJyb3IgPSAoZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZS5sZW5ndGggPyAocGF0dGVybiAmJiAhcGF0dGVybi50ZXN0KGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUpKSA6IGlzUmVxdWlyZWQpO1xuXG4gICAgaWYgKHRoaXMucHJvcHMub25CbHVyKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQmx1cihldmVudCwgdGhpcywgaGFzRXJyb3IpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShldmVudCwgdGhpcywgaGFzRXJyb3IpO1xuICAgIH1cbiB9XG5cbiAgb25DaGFuZ2UoZXZlbnQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGhhc1ZhbHVlOiBCb29sZWFuKGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUpLFxuICAgICAgaW5wdXRWYWx1ZTogZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSxcbiAgICAgIGhhc0Vycm9yOiBmYWxzZVxuICAgfSk7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShldmVudCwgdGhpcyk7XG4gICB9XG4gfVxuXG4gIG9uRm9jdXMoZXZlbnQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlzRm9jdXNlZDogdHJ1ZVxuICAgfSk7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5vbkZvY3VzKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRm9jdXMoZXZlbnQsIHRoaXMpO1xuICAgfVxuIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgZXJyb3JUZXh0TWVzc2FnZSxcbiAgICAgIGlkLFxuICAgICAgaXNEaXNhYmxlZCxcbiAgICAgIGlzUmVxdWlyZWQsXG4gICAgICBsYWJlbCxcbiAgICAgIHBsYWNlaG9sZGVyLFxuICAgICAgc2l6ZSxcbiAgICAgIHRoZW1lLFxuICAgICAgdHlwZSB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHsgaGFzVmFsdWUsIGhhc0Vycm9yLCBpbnB1dFZhbHVlLCBpc0ZvY3VzZWQgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBjb25zdCB3cmFwcGVyQ2xhc3NlcyA9IGNsYXNzTmFtZXMoXG4gICAgICAndHgtd3JhcHBlcicsXG4gICAgICB0aGlzLnByb3BzLndyYXBwZXJDbGFzc2VzLFxuICAgICAgeyAndHgtZm9jdXNlZCc6IGlzRm9jdXNlZCB9LFxuICAgICAgeyAndHgtZGlzYWJsZWQnOiBpc0Rpc2FibGVkIH0sXG4gICAgICB7ICd0eC13cmFwcGVyLXRleHRhcmVhJzogdHlwZSA9PT0gJ3RleHRhcmVhJyB9LFxuICAgICAgeyAndHgtd3JhcHBlci13aGl0ZSc6IHRoZW1lID09PSAnZGFyaycgfSk7XG5cbiAgICBjb25zdCBpbnB1dENsYXNzZXMgPSBjbGFzc05hbWVzKFxuICAgICAgJ3R4LWlucHV0JyxcbiAgICAgIHRoaXMucHJvcHMuaW5wdXRDbGFzc2VzLFxuICAgICAgeyAndHgtdGV4dGFyZWEtbGFyZ2UnOiBzaXplID09PSAnbGFyZ2UnIH0pO1xuXG4gICAgY29uc3QgbGFiZWxDbGFzc2VzID0gY2xhc3NOYW1lcyhcbiAgICAgICd0eC1sYWJlbCcsXG4gICAgICB0aGlzLnByb3BzLmxhYmVsQ2xhc3NlcyxcbiAgICAgIHsgJ3R4LWFib3ZlJzogcGxhY2Vob2xkZXIgfHwgaGFzVmFsdWUgfHwgaXNGb2N1c2VkIH0pO1xuXG4gICAgY29uc3QgZXJyb3J0ZXh0Q2xhc3NlcyA9IGNsYXNzTmFtZXMoXG4gICAgICAndHgtZXJyb3J0ZXh0JyxcbiAgICAgIHRoaXMucHJvcHMuZXJyb3J0ZXh0Q2xhc3NlcyxcbiAgICAgIHsgJ3R4LWVycm9ydGV4dC12aXNpYmxlJzogaGFzRXJyb3IgfSk7XG5cbiAgICBjb25zdCBmaWVsZFJlcXVpcmVkTWVzc2FnZSA9ICdGaWVsZCBpcyByZXF1aXJlZCc7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3dyYXBwZXJDbGFzc2VzfT5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICB7dHlwZSAhPT0gJ3RleHRhcmVhJyA/XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgYXV0b0NvbXBsZXRlPXt0aGlzLnByb3BzLmF1dG9Db21wbGV0ZX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtpbnB1dENsYXNzZXN9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtpc0Rpc2FibGVkfVxuICAgICAgICAgICAgICBpZD17aWR9XG4gICAgICAgICAgICAgIHR5cGU9e3R5cGV9XG4gICAgICAgICAgICAgIHJlcXVpcmVkPXtpc1JlcXVpcmVkfVxuICAgICAgICAgICAgICB2YWx1ZT17aW5wdXRWYWx1ZSB8fCAnJ31cbiAgICAgICAgICAgICAgZGF0YS1ldmVudC1hY3Rpb249e3RoaXMucHJvcHNbJ2RhdGEtZXZlbnQtYWN0aW9uJ119XG4gICAgICAgICAgICAgIG5hbWU9e3RoaXMucHJvcHMuaW5wdXROYW1lfVxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMub25Gb2N1cy5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25CbHVyLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAvPiA6XG4gICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgYXV0b0NvbXBsZXRlPXt0aGlzLnByb3BzLmF1dG9Db21wbGV0ZX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtpbnB1dENsYXNzZXN9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtpc0Rpc2FibGVkfVxuICAgICAgICAgICAgICBpZD17aWR9XG4gICAgICAgICAgICAgIHR5cGU9e3R5cGV9XG4gICAgICAgICAgICAgIHJlcXVpcmVkPXtpc1JlcXVpcmVkfVxuICAgICAgICAgICAgICB2YWx1ZT17aW5wdXRWYWx1ZSB8fCAnJ31cbiAgICAgICAgICAgICAgZGF0YS1ldmVudC1hY3Rpb249e3RoaXMucHJvcHNbJ2RhdGEtZXZlbnQtYWN0aW9uJ119XG4gICAgICAgICAgICAgIG5hbWU9e3RoaXMucHJvcHMuaW5wdXROYW1lfVxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMub25Gb2N1cy5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25CbHVyLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgfVxuICAgICAgICAgIHtsYWJlbCA/IDxsYWJlbCBjbGFzc05hbWU9e2xhYmVsQ2xhc3Nlc31cbiAgICAgICAgICAgIGh0bWxGb3I9e2lkfVxuICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgIHtsYWJlbH1cbiAgICAgICAgICA8L2xhYmVsPiA6IG51bGx9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7KGVycm9yVGV4dE1lc3NhZ2UgfHwgaXNSZXF1aXJlZCkgP1xuICAgICAgICAgIDxwIGNsYXNzTmFtZT17ZXJyb3J0ZXh0Q2xhc3Nlc30+XG4gICAgICAgICAge2lucHV0VmFsdWUgPyBlcnJvclRleHRNZXNzYWdlIDogZmllbGRSZXF1aXJlZE1lc3NhZ2V9XG4gICAgICAgICAgPC9wPiA6IG51bGx9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuIH1cbn1cblxuTWluaW1hbFJlYWN0VGV4dC5kZWZhdWx0UHJvcHMgPSB7XG4gIGF1dG9Db21wbGV0ZTogZmFsc2UsXG4gIHR5cGU6ICd0ZXh0JyxcbiAgaXNEaXNhYmxlZDogZmFsc2UsXG4gIHRoZW1lOiAnbm9ybWFsJyxcbiAgc2l6ZTogJ25vcm1hbCdcbn07XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIE1pbmltYWxSZWFjdFRleHQucHJvcFR5cGVzID0ge1xuICAgICdhdXRvQ29tcGxldGUnOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAnd3JhcHBlckNsYXNzZXMnOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICdpbnB1dENsYXNzZXMnOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICdsYWJlbENsYXNzZXMnOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICdlcnJvcnRleHRDbGFzc2VzJzogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAnZGF0YS1ldmVudC1hY3Rpb24nOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICdpZCc6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgJ2lucHV0TmFtZSc6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgJ2lucHV0VmFsdWUnOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMubnVtYmVyXSksXG4gICAgJ2lzRGlzYWJsZWQnOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAnaXNSZXF1aXJlZCc6IFByb3BUeXBlcy5ib29sLFxuICAgICdvbkNoYW5nZSc6IFByb3BUeXBlcy5mdW5jLFxuICAgICdwYXR0ZXJuJzogUHJvcFR5cGVzLmFueSxcbiAgICAncGxhY2Vob2xkZXInOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICdzaXplJzogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAndGhlbWUnOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICd0eXBlJzogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICdoYXNFcnJvcic6IFByb3BUeXBlcy5ib29sXG4gfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTWluaW1hbFJlYWN0VGV4dDtcbiJdfQ==
