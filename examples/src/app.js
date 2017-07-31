/* eslint react/prop-types: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import MinimalReactTextArea from './components/MinimalReactText';

ReactDOM.render(
  <form noValidate>
	<div>
    <h3>Normal Textarea</h3>
      <MinimalReactTextArea label="Label" maxRows={5} rows={1} />

    <h3>Large Textarea</h3>
      <MinimalReactTextArea label="Label" isRequired={true} disabled={true} value={"Lalakia"}/>

    <h3>Dark Theme</h3>
    <div className="dark-background">
      <MinimalReactTextArea label="Label" isRequired={true} theme="dark"/>
    </div>
	</div>
    <button type="submit">Submit</button>
  </form>,
	document.getElementById('example')
);
