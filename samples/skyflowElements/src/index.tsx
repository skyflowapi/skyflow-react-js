import React from "react";
import ReactDOM from "react-dom/client";
import { SkyflowElements } from "skyflow-react-js";
import App from "./App";
import CollectElements from "./CollectElements";
import ElementListners from "./ElementListners";
import RevealElements from "./RevealElements";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const config = {
  vaultID: "",
  vaultURL: "",
  getBearerToken: () => {
    return new Promise((resolve, reject) => {
      const Http = new XMLHttpRequest();

      Http.onreadystatechange = () => {
        if (Http.readyState === 4 && Http.status === 200) {
          const response = JSON.parse(Http.responseText);
          resolve(response.accessToken);
        }
      };
      const url = "<TOKEN_END_POINT_URL>";
      Http.open("GET", url);
      Http.send();
    });
  },
};

root.render(
  <SkyflowElements config={config}>
    <App />
  </SkyflowElements>
);
