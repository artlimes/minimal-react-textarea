/* eslint react/prop-types: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import MinimalReactTextArea from './components/MinimalReactText';

ReactDOM.render(
  <form noValidate>
	<div>
    <h3>Normal Textarea</h3>
      <MinimalReactTextArea label="Label" type="textarea"/>

    <h3>Large Textarea</h3>
      <MinimalReactTextArea label="Label" type="textarea" size="large"/>

    <h3>Dark Theme</h3>
    <div className="dark-background">
      <MinimalReactTextArea label="Label" type="textarea" theme="dark"/>
    </div>
	</div>
    <button type="submit">Submit</button>
  </form>,
	document.getElementById('example')
);
