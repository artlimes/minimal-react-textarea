import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MinimalReactText from "minimal-react-text";
import autosize from 'autosize';
import getLineHeight from 'line-height';

const UPDATE = 'autosize:update',
  DESTROY = 'autosize:destroy',
  RESIZED = 'autosize:resized';

/** A light replacement for built-in textarea component
 * which automaticaly adjusts its height to match the content
 * @param onResize - called whenever the textarea resizes
 * @param rows - minimum number of visible rows
 * @param maxRows - maximum number of visible rows
 * @param innerRef - called with the ref to the DOM node
 */

class MinimalReactTextarea extends MinimalReactText {
  constructor(props) {
    super(props);
  }

  onChange(event) {
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

  shouldComponentUpdate (nextProps, nextState) {
    const propsTocheck = [ 'inputValue', 'id', 'isDisabled', 'isRequired', 'placeholder', 'hasError', 'data-event-action', 'wrapperClasses', 'inputClasses', 'labelClasses', 'errortextClasses'];

    for ( let key in nextState ) {
      if (this.state[key] !== nextState[key]) {
        return true;
      }
    }

    for (let i = 0 ; i<propsTocheck.length; i++) {
      let propToCheck = propsTocheck[i];
      if (this.props[propToCheck] !== nextProps[propToCheck]) {
        return true;
      }
    }
    return false;
  }

  // autosize methods

  componentDidMount() {
    const { onResize, maxRows, autosizeDelay } = this.props;

    if (typeof maxRows === 'number') {
      this.updateLineHeight();

      // this trick is needed to force "autosize" to activate the scrollbar
      setTimeout(() => {autosize(this.textarea)}, autosizeDelay);
    } else {
      setTimeout(() => {autosize(this.textarea)}, autosizeDelay);
    }

    if (onResize) {
      this.textarea.addEventListener(RESIZED, this.props.onResize);
    }
  }

  componentWillUnmount() {
    if (this.props.onResize) {
      this.textarea.removeEventListener(RESIZED, this.props.onResize);
    }
    () => this.dispatchEvent(DESTROY);
  }

  componentDidUpdate() {
    if (this.getValue(this.props) !== this.currentValue) {
      () =>   this.dispatchEvent(UPDATE);
    }
  }

  updateLineHeight() {
    this.setState({
      lineHeight: getLineHeight(this.textarea)
    });
  }

  getValue({ valueLink, value, inputValue }) {
    valueLink ? valueLink.value || valueLink.inputValue : value || inputValue;
  }

  saveDOMNodeRef(ref) {
    const { innerRef } = this.props;

    if (innerRef) {
      innerRef(ref);
    }

    this.textarea = ref;
  }

  getLocals() {
    const {
      props: { onResize, maxRows, onChange, style, innerRef }, // eslint-disable-line no-unused-vars
      state: { lineHeight },
      saveDOMNodeRef
    } = this;

    const maxHeight = maxRows && lineHeight ? lineHeight * maxRows : null;

    return {
      saveDOMNodeRef,
      style: maxHeight ? { ...style, maxHeight } : style,
      onChange: this.onChange.bind(this)
    };
  }


  render() {
    const {
      errorTextMessage,
      id,
      isDisabled,
      isRequired,
      label,
      placeholder,
      theme } = this.props;

    const { hasValue, hasError, inputValue, isFocused } = this.state;

    const wrapperClasses = classNames(
      'tx-wrapper',
      'tx-wrapper-textarea',
      this.props.wrapperClasses,
      { 'tx-focused': isFocused },
      { 'tx-disabled': isDisabled },
      { 'tx-wrapper-white': theme === 'dark' });

    const inputClasses = classNames(
      'tx-input',
      this.props.inputClasses
    );

    const labelClasses = classNames(
      'tx-label',
      this.props.labelClasses,
      { 'tx-above': placeholder || hasValue || isFocused });

    const errortextClasses = classNames(
      'tx-errortext',
      this.props.errortextClasses,
      { 'tx-errortext-visible': hasError });

    const fieldRequiredMessage = 'Field is required';

    // autosize
    const { children, saveDOMNodeRef, ...locals } = this.getLocals();

    return (
      <div className={wrapperClasses}>
        <div>
          <textarea
            autoComplete={this.props.autoComplete}
            className={inputClasses}
            disabled={isDisabled}
            id={id}
            required={isRequired}
            value={inputValue || ''}
            data-event-action={this.props['data-event-action']}
            name={this.props.inputName}
            placeholder={placeholder}
            onFocus={this.onFocus.bind(this)}
            onBlur={this.onBlur.bind(this)}
            onChange={this.onChange.bind(this)}
            {...locals}
            ref={saveDOMNodeRef.bind(this)}
            rows="1"
          >
            {children}
          </textarea>
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

MinimalReactTextarea.defaultProps = {
  autoComplete: false,
  type: 'text',
  isDisabled: false,
  theme: 'normal',
  rows: 1,
  autosizeDelay: 0
};

if (process.env.NODE_ENV !== 'production') {
  MinimalReactTextarea.propTypes = {
    autoComplete: PropTypes.bool,
    wrapperClasses: PropTypes.string,
    inputClasses: PropTypes.string,
    labelClasses: PropTypes.string,
    errortextClasses: PropTypes.string,
    'data-event-action': PropTypes.string,
    id: PropTypes.string,
    inputName: PropTypes.string,
    inputValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number]),
    isDisabled: PropTypes.bool,
    isRequired: PropTypes.bool,
    onChange: PropTypes.func,
    pattern: PropTypes.any,
    placeholder: PropTypes.string,
    theme: PropTypes.string,
    hasError: PropTypes.bool,
    rows: PropTypes.number,
    maxRows: PropTypes.number,
    onResize: PropTypes.func,
    innerRef: PropTypes.func,
    autosizeDelay: PropTypes.number
  };
}

export default MinimalReactTextarea;
