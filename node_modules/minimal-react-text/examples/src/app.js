/* eslint react/prop-types: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import MinimalReactText from './components/MinimalReactText';

ReactDOM.render(
  <form noValidate>
	<div>
          <h3>Normal</h3>
	    <MinimalReactText label="Label"/>

          <h3>With Placeholder</h3>
            <MinimalReactText label="Label" placeholder="Placeholder"/>

          <h3>With Placeholder & InputValue</h3>
            <MinimalReactText label="Label" placeholder="Placeholder" inputValue="InputValue"/>

          <h3>Required</h3>
            <MinimalReactText label="Label" isRequired={true}/>

          <h3>Disabled</h3>
            <MinimalReactText label="Label" placeholder="Placeholder" isDisabled={true}/>

          <h3>Normal Textarea</h3>
            <MinimalReactText label="Label" type="textarea"/>

          <h3>Large Textarea</h3>
            <MinimalReactText label="Label" type="textarea" size="large"/>

          <h3>Dark Theme</h3>
          <div className="dark-background">
            <MinimalReactText label="Label" theme="dark"/>
            <MinimalReactText label="Label" type="textarea" theme="dark"/>
          </div>
	</div>
    <button type="submit">Submit</button>
  </form>,
	document.getElementById('example')
);
