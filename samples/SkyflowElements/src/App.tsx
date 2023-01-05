/*
	Copyright (c) 2022 Skyflow, Inc.
*/
import React from 'react';
import CollectElements from './components/CollectElements';
import CustomValidations from './components/CustomValidations';
import ElementListners from './components/ElementListeners';
import RevealElements from './components/RevealElements';

const App = () => {
  return (
    <div id='App'>
      <div id='Sample for Collect Elements'>
        <p>
          <b>Sample Collect Elements</b>
        </p>
        <CollectElements />
      </div>
      <br />
      <div id='Sample for Element Listners'>
        <p>
          <b>Sample Element Listners</b>
        </p>
        <ElementListners />
      </div>
      <br />
      <div id='Sample for Reveal Element'>
        <p>
          <b>Sample for Reveal Element</b>
        </p>
        <RevealElements />
      </div>
      <br />
      <div id='Sample for Custom Validations'>
        <p>
          <b>Sample for Custom Validations</b>
        </p>
        <CustomValidations />
      </div>
    </div>
  );
};
export default App;
