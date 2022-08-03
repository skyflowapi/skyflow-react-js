import React from "react";
import CollectElements from "./CollectElements";
import ElementListners from "./ElementListners";
import RevealElements from "./RevealElements";
function App() {
  return (
    <div id="App">
      <div id="Sample for Collect Elements">
        <p>
          <b>Sample Collect Elements"</b>
        </p>
        <CollectElements />
      </div>
      <br />
      <div id="Sample for Element Listners">
        <p>
          <b>Sample Element Listners</b>
        </p>
        <ElementListners />
      </div>
      <br />
      <div id="Sample for Reveal Element">
        <p>
          <b>Sample for Reveal Element</b>
        </p>
        <RevealElements />
      </div>
    </div>
  );
}
export default App;
