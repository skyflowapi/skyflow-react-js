/*
 Copyright (c) 2022 Skyflow,Inc.
*/
import React from 'react';
import CollectElements from './components/CollectElements';
import ComposableElements from './components/ComposableElements';
import CustomValidations from './components/CustomValidations';
import DynamicComposableElements from './components/DynamicComposableElements';
import ElementListners from './components/ElementListeners';
import RevealElements from './components/RevealElements';
import FileRender from './components/FileRenderElements';
import CollectElementsUpdateData from './components/CollectElementsUpdateData';
import DynamicCollectElements from './components/DynamicCollectElements';
import DynamicRevealElements from './components/DynamicRevealElements';
import CardBrandChoice from './components/CardBrandChoice';
import ThreeDSHelperFunctions from './components/3DSHelperFunctions';
import OverrideDefaultErrors from './components/OverrideDefaultErrors'

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
      <div id='Sample for Collect Elements for updating data'>
        <p>
          <b>Sample Collect Elements for updating data</b>
        </p>
        <CollectElementsUpdateData />
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
          <b>Sample for File Render Element</b>
        </p>
        <FileRender />
      </div>
      <br />
      <div id='Sample for Custom Validations'>
        <p>
          <b>Sample for Custom Validations</b>
        </p>
        <CustomValidations />
      </div>
      <br />
      <div id='Sample for Composable Elements In Modal'>
        <p>
          <b>Sample Composable Elements Dynamic properties update</b>
        </p>
        <DynamicComposableElements />
      </div>
      <br />
      <div id='Sample for Collect Elements Update Properties'>
        <p>
          <b>Sample Collect Elements Dynamic properties update</b>
        </p>
        <DynamicCollectElements />
      </div>
      <br />
      <div id='Sample for Reveal Elements Update Properties'>
        <p>
          <b>Sample Reveal Elements Dynamic properties update</b>
        </p>
        <DynamicRevealElements />
      </div>
      <br />
      <div id='Sample for Card Brand Choice'>
        <p>
          <b>Sample Card Brand Choice</b>
        </p>
        <CardBrandChoice />
      </div>
      <br />
      <div id='Sample for 3DS Helper Functions'>
        <p>
          <b>Sample 3DS Helper Functions</b>
        </p>
        <ThreeDSHelperFunctions />
      </div>
      <br />
      <div id='Sample for override default error messages'>
        <p>
          <b>Override default error messages</b>
        </p>
        <OverrideDefaultErrors />
      </div>
    </div>
  );
};
export default App;
