# React SDK samples
Test the SDK by adding `VAULT-ID`, `VAULT-URL`, and `SERVICE-ACCOUNT` details in the required places for each sample.


## Prerequisites
- A Skyflow account. If you don't have one, register for one on the [Try Skyflow](https://skyflow.com/try-skyflow) page.
- [Node.js](https://nodejs.org/en/) version 20.x or above
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) version 10.x or above
- [express.js](http://expressjs.com/en/starter/hello-world.html)
- Minimum supported version of React is v16.8.0

## Prepare
-  Install modules : 

        npm install
### Create The Vault
1. In a browser, navigate to Skyflow Studio and log in.
2. Create a vault by clicking **Create Vault** > **Upload Vault Schema**.
3. Choose [data/vaultSchema.json](data/vaultSchema.json).
3. Once the vault is created, click the gear icon and select **Edit Vault** Details.
4. Note your **Vault URL** and **Vault ID** values, then click **Cancel**. Update the values of `VAULT_URL` and `VAULT_ID` in the [index.tsx](src/index.tsx).

### Create A Service Account
1. In the side navigation click, **IAM** > **Service Accounts** > **New Service Account**.
2. For Name, enter "SDK Sample". For Roles, choose **Vault Editor**.
3. Click **Create**. Your browser downloads a **credentials.json** file. Keep this file secure, as you'll need it for each of the samples.

### Create a bearer token generation endpoint
1. Create a new directory named `bearer-token-generator`.

        mkdir bearer-token-generator
2. Navigate to `bearer-token-generator` directory.

        cd bearer-token-generator
3. Initialize npm

        npm init
4. Install `skyflow-node`

        npm i skyflow-node
5. Move the downloaded “credentials.json” file from [Create A Service Account](#create-a-service-account) into the bearer-token-generator directory.
6. Create `index.js` file
7. Open `index.js` file
8. Populate `index.js` file with below code snippet
```javascript
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const {
   generateBearerToken,
   isExpired
} = require("skyflow-node");

app.use(cors());

let filepath = "credentials.json";
let bearerToken = "";

const getSkyflowBearerToken = () => {
   return new Promise(async (resolve, reject) => {
       try {
           if (!isExpired(bearerToken)) {
               resolve(bearerToken);
           }
           else {
               let response = await generateBearerToken(filepath);
               bearerToken = response.accessToken;
               resolve(bearerToken);
           }
       } catch (e) {
           reject(e);
       }
   });
}

app.get("/", async (req, res) => {
 let bearerToken = await getSkyflowBearerToken();
 res.json({"accessToken" : bearerToken});
});

app.listen(port, () => {
 console.log(`Server is listening on port ${port}`);
})
```
9. Start the server

        node index.js
    server will start at `localhost:3000`
10. Update `<TOKEN_END_POINT_URL>` in [index.tsx](src/index.tsx)

## The samples
### [Collect data](https://github.com/skyflowapi/skyflow-react-js/tree/main/samples/SkyflowElements/src/components/CollectElements)
This sample illustrates how to use secure Skyflow elements to collect sensitive user information and reveal it to the user via tokens.
### [Collect data with update](https://github.com/skyflowapi/skyflow-react-js/tree/main/samples/SkyflowElements/src/components/CollectElementsUpdateData)
This sample illustrates how to update previously collected data using Skyflow collect elements.
### [Composable Elements](https://github.com/skyflowapi/skyflow-react-js/tree/main/samples/SkyflowElements/src/components/ComposableElements)
This sample illustrates how to collect data using Composable Elements.
### [Dynamic collect elements](https://github.com/skyflowapi/skyflow-react-js/tree/main/samples/SkyflowElements/src/components/DynamicCollectElements)
This sample illustrates how to update collect element properties at runtime.
### [Dynamic Composable Elements](https://github.com/skyflowapi/skyflow-react-js/tree/main/samples/SkyflowElements/src/components/DynamicComposableElements)
This sample illustrates how to update Composable Element properties at runtime.
### [Dynamic reveal elements](https://github.com/skyflowapi/skyflow-react-js/tree/main/samples/SkyflowElements/src/components/DynamicRevealElements)
This sample illustrates how to update reveal element properties at runtime.
### [Custom Validation](https://github.com/skyflowapi/skyflow-react-js/tree/main/samples/SkyflowElements/src/components/CustomValidations)
This sample illustrates how to use custom validation with Skyflow collect elements.
### [Reveal data](https://github.com/skyflowapi/skyflow-react-js/tree/main/samples/SkyflowElements/src/components/RevealElements)
This sample illustrates how functionality of reveal feature works.
### [File render element](https://github.com/skyflowapi/skyflow-react-js/tree/main/samples/SkyflowElements/src/components/FileRenderElements)
This sample illustrates how to render an uploaded file with the File Render Element.
### [Input formatting](https://github.com/skyflowapi/skyflow-react-js/tree/main/samples/SkyflowElements/src/components/InputFormatting)
This sample illustrates how to format element input with the `format` and `translation` options.
### [Masking](https://github.com/skyflowapi/skyflow-react-js/tree/main/samples/SkyflowElements/src/components/Masking)
This sample illustrates how to mask element input with the `masking` and `maskingChar` options.
### [Override default errors](https://github.com/skyflowapi/skyflow-react-js/tree/main/samples/SkyflowElements/src/components/OverrideDefaultErrors)
This sample illustrates how to override default error messages with `setErrorOverride`.
### [Card brand choice](https://github.com/skyflowapi/skyflow-react-js/tree/main/samples/SkyflowElements/src/components/CardBrandChoice)
This sample illustrates how to let users choose a card brand with the `cardMetadata.scheme` option.
### [Event Listeners](https://github.com/skyflowapi/skyflow-react-js/tree/main/samples/SkyflowElements/src/components/ElementListeners)
This sample illustrates how to use event listeners with Skyflow elements.

#### Run the sample

        npm start
