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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS95ZHJhcmd5cm9zL0Rlc2t0b3AvQXJ0bGltZXMvYXJ0bGltZXMtdGV4dC9taW5pbWFsLXJlYWN0LXRleHQvZXhhbXBsZXMvc3JjL2FwcC5qcyIsIi9ob21lL3lkcmFyZ3lyb3MvRGVza3RvcC9BcnRsaW1lcy9hcnRsaW1lcy10ZXh0L21pbmltYWwtcmVhY3QtdGV4dC9leGFtcGxlcy9zcmMvY29tcG9uZW50cy9NaW5pbWFsUmVhY3RUZXh0LmpzIiwibm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztxQkNFa0IsT0FBTzs7Ozt3QkFDSixXQUFXOzs7OzBDQUNILCtCQUErQjs7OztBQUU1RCxzQkFBUyxNQUFNLENBQ2I7O0lBQU0sVUFBVSxNQUFBO0VBQ2pCOzs7SUFDUzs7OztLQUFlO0lBQ3BCLDRFQUFrQixLQUFLLEVBQUMsT0FBTyxHQUFFO0lBRTVCOzs7O0tBQXlCO0lBQ3ZCLDRFQUFrQixLQUFLLEVBQUMsT0FBTyxFQUFDLFdBQVcsRUFBQyxhQUFhLEdBQUU7SUFFN0Q7Ozs7S0FBc0M7SUFDcEMsNEVBQWtCLEtBQUssRUFBQyxPQUFPLEVBQUMsV0FBVyxFQUFDLGFBQWEsRUFBQyxVQUFVLEVBQUMsWUFBWSxHQUFFO0lBRXJGOzs7O0tBQWlCO0lBQ2YsNEVBQWtCLEtBQUssRUFBQyxPQUFPLEVBQUMsVUFBVSxFQUFFLElBQUksQUFBQyxHQUFFO0lBRXJEOzs7O0tBQWlCO0lBQ2YsNEVBQWtCLEtBQUssRUFBQyxPQUFPLEVBQUMsV0FBVyxFQUFDLGFBQWEsRUFBQyxVQUFVLEVBQUUsSUFBSSxBQUFDLEdBQUU7SUFFL0U7Ozs7S0FBd0I7SUFDdEIsNEVBQWtCLEtBQUssRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFVBQVUsR0FBRTtJQUVuRDs7OztLQUF1QjtJQUNyQiw0RUFBa0IsS0FBSyxFQUFDLE9B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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGVzbGludCByZWFjdC9wcm9wLXR5cGVzOiAwICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBNaW5pbWFsUmVhY3RUZXh0IGZyb20gJy4vY29tcG9uZW50cy9NaW5pbWFsUmVhY3RUZXh0JztcblxuUmVhY3RET00ucmVuZGVyKFxuICA8Zm9ybSBub1ZhbGlkYXRlPlxuXHQ8ZGl2PlxuICAgICAgICAgIDxoMz5Ob3JtYWw8L2gzPlxuXHQgICAgPE1pbmltYWxSZWFjdFRleHQgbGFiZWw9XCJMYWJlbFwiLz5cblxuICAgICAgICAgIDxoMz5XaXRoIFBsYWNlaG9sZGVyPC9oMz5cbiAgICAgICAgICAgIDxNaW5pbWFsUmVhY3RUZXh0IGxhYmVsPVwiTGFiZWxcIiBwbGFjZWhvbGRlcj1cIlBsYWNlaG9sZGVyXCIvPlxuXG4gICAgICAgICAgPGgzPldpdGggUGxhY2Vob2xkZXIgJiBJbnB1dFZhbHVlPC9oMz5cbiAgICAgICAgICAgIDxNaW5pbWFsUmVhY3RUZXh0IGxhYmVsPVwiTGFiZWxcIiBwbGFjZWhvbGRlcj1cIlBsYWNlaG9sZGVyXCIgaW5wdXRWYWx1ZT1cIklucHV0VmFsdWVcIi8+XG5cbiAgICAgICAgICA8aDM+UmVxdWlyZWQ8L2gzPlxuICAgICAgICAgICAgPE1pbmltYWxSZWFjdFRleHQgbGFiZWw9XCJMYWJlbFwiIGlzUmVxdWlyZWQ9e3RydWV9Lz5cblxuICAgICAgICAgIDxoMz5EaXNhYmxlZDwvaDM+XG4gICAgICAgICAgICA8TWluaW1hbFJlYWN0VGV4dCBsYWJlbD1cIkxhYmVsXCIgcGxhY2Vob2xkZXI9XCJQbGFjZWhvbGRlclwiIGlzRGlzYWJsZWQ9e3RydWV9Lz5cblxuICAgICAgICAgIDxoMz5Ob3JtYWwgVGV4dGFyZWE8L2gzPlxuICAgICAgICAgICAgPE1pbmltYWxSZWFjdFRleHQgbGFiZWw9XCJMYWJlbFwiIHR5cGU9XCJ0ZXh0YXJlYVwiLz5cblxuICAgICAgICAgIDxoMz5MYXJnZSBUZXh0YXJlYTwvaDM+XG4gICAgICAgICAgICA8TWluaW1hbFJlYWN0VGV4dCBsYWJlbD1cIkxhYmVsXCIgdHlwZT1cInRleHRhcmVhXCIgc2l6ZT1cImxhcmdlXCIvPlxuXG4gICAgICAgICAgPGgzPkRhcmsgVGhlbWU8L2gzPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGFyay1iYWNrZ3JvdW5kXCI+XG4gICAgICAgICAgICA8TWluaW1hbFJlYWN0VGV4dCBsYWJlbD1cIkxhYmVsXCIgdGhlbWU9XCJkYXJrXCIvPlxuICAgICAgICAgICAgPE1pbmltYWxSZWFjdFRleHQgbGFiZWw9XCJMYWJlbFwiIHR5cGU9XCJ0ZXh0YXJlYVwiIHRoZW1lPVwiZGFya1wiLz5cbiAgICAgICAgICA8L2Rpdj5cblx0PC9kaXY+XG4gICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+U3VibWl0PC9idXR0b24+XG4gIDwvZm9ybT4sXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleGFtcGxlJylcbik7XG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBNaW5pbWFsUmVhY3RUZXh0IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICBsZXQgaGFzVmFsdWUgPSBmYWxzZTtcbiAgICBsZXQgaGFzRXJyb3IgPSBmYWxzZTtcbiAgICBjb25zdCBpc0ZvY3VzZWQgPSBmYWxzZTtcbiAgICBjb25zdCBpbnB1dFZhbHVlID0gcHJvcHMuaW5wdXRWYWx1ZTtcblxuICAgIGlmIChpbnB1dFZhbHVlICE9PSAnJyAmJiB0eXBlb2YgaW5wdXRWYWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGhhc1ZhbHVlID0gdHJ1ZTtcbiAgICAgIGhhc0Vycm9yID0gcHJvcHMuaGFzRXJyb3IgfHwgKHByb3BzLnBhdHRlcm4gJiYgIXByb3BzLnBhdHRlcm4udGVzdChpbnB1dFZhbHVlKSk7XG4gICB9XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaGFzVmFsdWUsXG4gICAgICBoYXNFcnJvcixcbiAgICAgIGlucHV0VmFsdWUsXG4gICAgICBpc0ZvY3VzZWRcbiAgIH07XG4gfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgbGV0IGhhc0Vycm9yID0gbmV4dFByb3BzLmhhc0Vycm9yO1xuICAgIGxldCBoYXNWYWx1ZSA9ICEhbmV4dFByb3BzLmlucHV0VmFsdWUgfHwgdGhpcy5zdGF0ZS5oYXNWYWx1ZTtcbiAgICBjb25zdCBpbnB1dFZhbHVlID0gKG5leHRQcm9wcy5pbnB1dFZhbHVlICE9PSB1bmRlZmluZWQgPyBuZXh0UHJvcHMuaW5wdXRWYWx1ZSA6IHRoaXMuc3RhdGUuaW5wdXRWYWx1ZSk7XG5cbiAgICBpZiAoIWhhc0Vycm9yICYmIGlucHV0VmFsdWUgIT09ICcnICYmIHR5cGVvZiBpbnB1dFZhbHVlICE9PSAndW5kZWZpbmVkJyAmJiAhIW5leHRQcm9wcy5wYXR0ZXJuKSB7XG4gICAgICBoYXNWYWx1ZSA9IHRydWU7XG4gICAgICBoYXNFcnJvciA9IChuZXh0UHJvcHMucGF0dGVybiAmJiAhbmV4dFByb3BzLnBhdHRlcm4udGVzdChpbnB1dFZhbHVlKSk7XG4gICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGhhc1ZhbHVlLCBoYXNFcnJvciwgaW5wdXRWYWx1ZSB9KTtcbiB9XG5cbiAgb25CbHVyKGV2ZW50KSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBpc0ZvY3VzZWQ6IGZhbHNlXG4gICAgfSk7XG5cbiAgICBjb25zdCB7IHBhdHRlcm4sIGlzUmVxdWlyZWQgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IGhhc0Vycm9yO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGhhc1ZhbHVlOiBCb29sZWFuKGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUpLFxuICAgICAgICBoYXNFcnJvcjogKGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUubGVuZ3RoID8gKHBhdHRlcm4gJiYgIXBhdHRlcm4udGVzdChldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlKSkgOiBpc1JlcXVpcmVkKVxuICAgICB9KTtcblxuICAgIC8vIHVwZGF0ZSBvbiB0aGlzLnNldFN0YXRlIGhhcHBlbnMgYWZ0ZXIgdGhpcyBmdW5jdGlvbnMgaXMgY29tcGxldGVkXG4gICAgLy8gaW4gb3JkZXIgdG8gYXZvaWQgdGhhdCAnc2tpcHBlZCcgY2hhbmdlIG9mIHZhbHVlLCBJIHVzZSB0aGVcbiAgICAvLyBoYXNFcnJvciB2YXJpYWJsZVxuICAgIGhhc0Vycm9yID0gKGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUubGVuZ3RoID8gKHBhdHRlcm4gJiYgIXBhdHRlcm4udGVzdChldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlKSkgOiBpc1JlcXVpcmVkKTtcblxuICAgIGlmICh0aGlzLnByb3BzLm9uQmx1cikge1xuICAgICAgdGhpcy5wcm9wcy5vbkJsdXIoZXZlbnQsIHRoaXMsIGhhc0Vycm9yKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMub25DaGFuZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoZXZlbnQsIHRoaXMsIGhhc0Vycm9yKTtcbiAgICB9XG4gfVxuXG4gIG9uQ2hhbmdlKGV2ZW50KSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBoYXNWYWx1ZTogQm9vbGVhbihldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlKSxcbiAgICAgIGlucHV0VmFsdWU6IGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUsXG4gICAgICBoYXNFcnJvcjogZmFsc2VcbiAgIH0pO1xuXG4gICAgaWYgKHRoaXMucHJvcHMub25DaGFuZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoZXZlbnQsIHRoaXMpO1xuICAgfVxuIH1cblxuICBvbkZvY3VzKGV2ZW50KSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBpc0ZvY3VzZWQ6IHRydWVcbiAgIH0pO1xuXG4gICAgaWYgKHRoaXMucHJvcHMub25Gb2N1cykge1xuICAgICAgdGhpcy5wcm9wcy5vbkZvY3VzKGV2ZW50LCB0aGlzKTtcbiAgIH1cbiB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGVycm9yVGV4dE1lc3NhZ2UsXG4gICAgICBpZCxcbiAgICAgIGlzRGlzYWJsZWQsXG4gICAgICBpc1JlcXVpcmVkLFxuICAgICAgbGFiZWwsXG4gICAgICBwbGFjZWhvbGRlcixcbiAgICAgIHNpemUsXG4gICAgICB0aGVtZSxcbiAgICAgIHR5cGUgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCB7IGhhc1ZhbHVlLCBoYXNFcnJvciwgaW5wdXRWYWx1ZSwgaXNGb2N1c2VkIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgY29uc3Qgd3JhcHBlckNsYXNzZXMgPSBjbGFzc05hbWVzKFxuICAgICAgJ3R4LXdyYXBwZXInLFxuICAgICAgdGhpcy5wcm9wcy53cmFwcGVyQ2xhc3NlcyxcbiAgICAgIHsgJ3R4LWZvY3VzZWQnOiBpc0ZvY3VzZWQgfSxcbiAgICAgIHsgJ3R4LWRpc2FibGVkJzogaXNEaXNhYmxlZCB9LFxuICAgICAgeyAndHgtd3JhcHBlci10ZXh0YXJlYSc6IHR5cGUgPT09ICd0ZXh0YXJlYScgfSxcbiAgICAgIHsgJ3R4LXdyYXBwZXItd2hpdGUnOiB0aGVtZSA9PT0gJ2RhcmsnIH0pO1xuXG4gICAgY29uc3QgaW5wdXRDbGFzc2VzID0gY2xhc3NOYW1lcyhcbiAgICAgICd0eC1pbnB1dCcsXG4gICAgICB0aGlzLnByb3BzLmlucHV0Q2xhc3NlcyxcbiAgICAgIHsgJ3R4LXRleHRhcmVhLWxhcmdlJzogc2l6ZSA9PT0gJ2xhcmdlJyB9KTtcblxuICAgIGNvbnN0IGxhYmVsQ2xhc3NlcyA9IGNsYXNzTmFtZXMoXG4gICAgICAndHgtbGFiZWwnLFxuICAgICAgdGhpcy5wcm9wcy5sYWJlbENsYXNzZXMsXG4gICAgICB7ICd0eC1hYm92ZSc6IHBsYWNlaG9sZGVyIHx8IGhhc1ZhbHVlIHx8IGlzRm9jdXNlZCB9KTtcblxuICAgIGNvbnN0IGVycm9ydGV4dENsYXNzZXMgPSBjbGFzc05hbWVzKFxuICAgICAgJ3R4LWVycm9ydGV4dCcsXG4gICAgICB0aGlzLnByb3BzLmVycm9ydGV4dENsYXNzZXMsXG4gICAgICB7ICd0eC1lcnJvcnRleHQtdmlzaWJsZSc6IGhhc0Vycm9yIH0pO1xuXG4gICAgY29uc3QgZmllbGRSZXF1aXJlZE1lc3NhZ2UgPSAnRmllbGQgaXMgcmVxdWlyZWQnO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXt3cmFwcGVyQ2xhc3Nlc30+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAge3R5cGUgIT09ICd0ZXh0YXJlYScgP1xuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIGF1dG9Db21wbGV0ZT17dGhpcy5wcm9wcy5hdXRvQ29tcGxldGV9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17aW5wdXRDbGFzc2VzfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17aXNEaXNhYmxlZH1cbiAgICAgICAgICAgICAgaWQ9e2lkfVxuICAgICAgICAgICAgICB0eXBlPXt0eXBlfVxuICAgICAgICAgICAgICByZXF1aXJlZD17aXNSZXF1aXJlZH1cbiAgICAgICAgICAgICAgdmFsdWU9e2lucHV0VmFsdWUgfHwgJyd9XG4gICAgICAgICAgICAgIGRhdGEtZXZlbnQtYWN0aW9uPXt0aGlzLnByb3BzWydkYXRhLWV2ZW50LWFjdGlvbiddfVxuICAgICAgICAgICAgICBuYW1lPXt0aGlzLnByb3BzLmlucHV0TmFtZX1cbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLm9uRm9jdXMuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLm9uQmx1ci5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgLz4gOlxuICAgICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICAgIGF1dG9Db21wbGV0ZT17dGhpcy5wcm9wcy5hdXRvQ29tcGxldGV9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17aW5wdXRDbGFzc2VzfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17aXNEaXNhYmxlZH1cbiAgICAgICAgICAgICAgaWQ9e2lkfVxuICAgICAgICAgICAgICB0eXBlPXt0eXBlfVxuICAgICAgICAgICAgICByZXF1aXJlZD17aXNSZXF1aXJlZH1cbiAgICAgICAgICAgICAgdmFsdWU9e2lucHV0VmFsdWUgfHwgJyd9XG4gICAgICAgICAgICAgIGRhdGEtZXZlbnQtYWN0aW9uPXt0aGlzLnByb3BzWydkYXRhLWV2ZW50LWFjdGlvbiddfVxuICAgICAgICAgICAgICBuYW1lPXt0aGlzLnByb3BzLmlucHV0TmFtZX1cbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLm9uRm9jdXMuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLm9uQmx1ci5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgIH1cbiAgICAgICAgICB7bGFiZWwgPyA8bGFiZWwgY2xhc3NOYW1lPXtsYWJlbENsYXNzZXN9XG4gICAgICAgICAgICBodG1sRm9yPXtpZH1cbiAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICB7bGFiZWx9XG4gICAgICAgICAgPC9sYWJlbD4gOiBudWxsfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgeyhlcnJvclRleHRNZXNzYWdlIHx8IGlzUmVxdWlyZWQpID9cbiAgICAgICAgICA8cCBjbGFzc05hbWU9e2Vycm9ydGV4dENsYXNzZXN9PlxuICAgICAgICAgIHtpbnB1dFZhbHVlID8gZXJyb3JUZXh0TWVzc2FnZSA6IGZpZWxkUmVxdWlyZWRNZXNzYWdlfVxuICAgICAgICAgIDwvcD4gOiBudWxsfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiB9XG59XG5cbk1pbmltYWxSZWFjdFRleHQuZGVmYXVsdFByb3BzID0ge1xuICBhdXRvQ29tcGxldGU6IGZhbHNlLFxuICB0eXBlOiAndGV4dCcsXG4gIGlzRGlzYWJsZWQ6IGZhbHNlLFxuICB0aGVtZTogJ25vcm1hbCcsXG4gIHNpemU6ICdub3JtYWwnXG59O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBNaW5pbWFsUmVhY3RUZXh0LnByb3BUeXBlcyA9IHtcbiAgICAnYXV0b0NvbXBsZXRlJzogUHJvcFR5cGVzLmJvb2wsXG4gICAgJ3dyYXBwZXJDbGFzc2VzJzogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAnaW5wdXRDbGFzc2VzJzogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAnbGFiZWxDbGFzc2VzJzogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAnZXJyb3J0ZXh0Q2xhc3Nlcyc6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgJ2RhdGEtZXZlbnQtYWN0aW9uJzogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAnaWQnOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICdpbnB1dE5hbWUnOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAnaW5wdXRWYWx1ZSc6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5udW1iZXJdKSxcbiAgICAnaXNEaXNhYmxlZCc6IFByb3BUeXBlcy5ib29sLFxuICAgICdpc1JlcXVpcmVkJzogUHJvcFR5cGVzLmJvb2wsXG4gICAgJ29uQ2hhbmdlJzogUHJvcFR5cGVzLmZ1bmMsXG4gICAgJ3BhdHRlcm4nOiBQcm9wVHlwZXMuYW55LFxuICAgICdwbGFjZWhvbGRlcic6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgJ3NpemUnOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICd0aGVtZSc6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgJ3R5cGUnOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgJ2hhc0Vycm9yJzogUHJvcFR5cGVzLmJvb2xcbiB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBNaW5pbWFsUmVhY3RUZXh0O1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiJdfQ==
