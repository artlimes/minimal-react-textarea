/* eslint react/prop-types: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import MinimalReactTextarea from './components/MinimalReactText';

ReactDOM.render(
  <form noValidate>
	<div>
    <h3>Normal Textarea</h3>
      <MinimalReactTextarea label="Label" placeholder="This is a placeholder" maxRows={10} rows={1} autosizeDelay={1000}/>

    <h3>Large Textarea</h3>
      <MinimalReactTextarea label="Label" isRequired={true} isDisabled={true} value={"Lalakia"} rows={4} />

    <h3>Dark Theme</h3>
    <div className="dark-background">
      <MinimalReactTextarea label="Label" isRequired={true} theme="dark" rows={8} placeholder="This is a big enough placeholder to occupy two lines" />
    </div>
	</div>
    <button type="submit">Submit</button>
  </form>,
	document.getElementById('example')
);
