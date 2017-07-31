import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class MinimalReactText extends Component {
  constructor(props) {
    super(props);

    let hasValue = false;
    let hasError = false;
    const isFocused = false;
    const inputValue = props.inputValue;

    if (inputValue !== '' && typeof inputValue !== 'undefined') {
      hasValue = true;
      hasError = props.hasError || (props.pattern && !props.pattern.test(inputValue));
   }

    this.state = {
      hasValue,
      hasError,
      inputValue,
      isFocused
   };
 }

  componentWillReceiveProps(nextProps) {
    let hasError = nextProps.hasError;
    let hasValue = !!nextProps.inputValue || this.state.hasValue;
    const inputValue = (nextProps.inputValue !== undefined ? nextProps.inputValue : this.state.inputValue);

    if (!hasError && inputValue !== '' && typeof inputValue !== 'undefined' && !!nextProps.pattern) {
      hasValue = true;
      hasError = (nextProps.pattern && !nextProps.pattern.test(inputValue));
   }
    this.setState({ hasValue, hasError, inputValue });
 }

  onBlur(event) {
    this.setState({
      isFocused: false
    });

    const { pattern, isRequired } = this.props;
    let hasError;

    this.setState({
        hasValue: Boolean(event.currentTarget.value),
        hasError: (event.currentTarget.value.length ? (pattern && !pattern.test(event.currentTarget.value)) : isRequired)
     });

    // update on this.setState happens after this functions is completed
    // in order to avoid that 'skipped' change of value, I use the
    // hasError variable
    hasError = (event.currentTarget.value.length ? (pattern && !pattern.test(event.currentTarget.value)) : isRequired);

    if (this.props.onBlur) {
      this.props.onBlur(event, this, hasError);
    } else if (this.props.onChange) {
      this.props.onChange(event, this, hasError);
    }
 }

  onChange(event) {
    this.setState({
      hasValue: Boolean(event.currentTarget.value),
      inputValue: event.currentTarget.value,
      hasError: false
   });

    if (this.props.onChange) {
      this.props.onChange(event, this);
   }
 }

  onFocus(event) {
    this.setState({
      isFocused: true
   });

    if (this.props.onFocus) {
      this.props.onFocus(event, this);
   }
 }

  render() {
    const {
      errorTextMessage,
      id,
      isDisabled,
      isRequired,
      label,
      placeholder,
      size,
      theme,
      type } = this.props;

    const { hasValue, hasError, inputValue, isFocused } = this.state;

    const wrapperClasses = classNames(
      'tx-wrapper',
      this.props.wrapperClasses,
      { 'tx-focused': isFocused },
      { 'tx-disabled': isDisabled },
      { 'tx-wrapper-textarea': type === 'textarea' },
      { 'tx-wrapper-white': theme === 'dark' });

    const inputClasses = classNames(
      'tx-input',
      this.props.inputClasses,
      { 'tx-textarea-large': size === 'large' });

    const labelClasses = classNames(
      'tx-label',
      this.props.labelClasses,
      { 'tx-above': placeholder || hasValue || isFocused });

    const errortextClasses = classNames(
      'tx-errortext',
      this.props.errortextClasses,
      { 'tx-errortext-visible': hasError });

    const fieldRequiredMessage = 'Field is required';

    return (
      <div className={wrapperClasses}>
        <div>
          {type !== 'textarea' ?
            <input
              autoComplete={this.props.autoComplete}
              className={inputClasses}
              disabled={isDisabled}
              id={id}
              type={type}
              required={isRequired}
              value={inputValue || ''}
              data-event-action={this.props['data-event-action']}
              name={this.props.inputName}
              placeholder={placeholder}
              onFocus={this.onFocus.bind(this)}
              onBlur={this.onBlur.bind(this)}
              onChange={this.onChange.bind(this)}
            /> :
            <textarea
              autoComplete={this.props.autoComplete}
              className={inputClasses}
              disabled={isDisabled}
              id={id}
              type={type}
              required={isRequired}
              value={inputValue || ''}
              data-event-action={this.props['data-event-action']}
              name={this.props.inputName}
              placeholder={placeholder}
              onFocus={this.onFocus.bind(this)}
              onBlur={this.onBlur.bind(this)}
              onChange={this.onChange.bind(this)}
            />
         }
          {label ? <label className={labelClasses}
            htmlFor={id}
                   >
            {label}
          </label> : null}
        </div>
        {(errorTextMessage || isRequired) ?
          <p className={errortextClasses}>
          {inputValue ? errorTextMessage : fieldRequiredMessage}
          </p> : null}
      </div>
    );
 }
}

MinimalReactText.defaultProps = {
  autoComplete: false,
  type: 'text',
  isDisabled: false,
  theme: 'normal',
  size: 'normal'
};

if (process.env.NODE_ENV !== 'production') {
  MinimalReactText.propTypes = {
    'autoComplete': PropTypes.bool,
    'wrapperClasses': PropTypes.string,
    'inputClasses': PropTypes.string,
    'labelClasses': PropTypes.string,
    'errortextClasses': PropTypes.string,
    'data-event-action': PropTypes.string,
    'id': PropTypes.string,
    'inputName': PropTypes.string,
        'inputValue': PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number]),
    'isDisabled': PropTypes.bool,
    'isRequired': PropTypes.bool,
    'onChange': PropTypes.func,
    'pattern': PropTypes.any,
    'placeholder': PropTypes.string,
    'size': PropTypes.string,
    'theme': PropTypes.string,
    'type': PropTypes.string.isRequired,
    'hasError': PropTypes.bool
 };
}

export default MinimalReactText;
