/*
  Copyright (c) 2022 Skyflow, Inc.
*/
import React from 'react';
import CollectElements from './components/CollectElements';
import ComposableElements from './components/ComposableElements';
import CustomValidations from './components/CustomValidations';
import DynamicComposableElements from './components/DynamicComposableElements';
import ElementListners from './components/ElementListeners';
import RevealElements from './components/RevealElements';
import FileUploadAndRender from './components/FileUploadAndRender';

const App = () => {
  return (
    <div id='App'>
      <div id='Sample for Composable Elements'>
        <p>
          <b>Sample Composable Elements</b>
        </p>
        <ComposableElements />
      </div>
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
      <div id='Sample for File Render Element'>
        <p>
          <b>Sample for upload and File Render Element</b>
        </p>
        <FileUploadAndRender />
      </div>
      <br />
      <div id='Sample for Custom Validations'>
        <p>
          <b>Sample for Custom Validations</b>
        </p>
        <CustomValidations />
      </div>
      <div id='Sample for Composable Elements In Modal'>
        <p>
          <b>Sample Composable Elements Dynamic properties update</b>
        </p>
        <DynamicComposableElements />
      </div>
    </div>
  );
};
export default App;
