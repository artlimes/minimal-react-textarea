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