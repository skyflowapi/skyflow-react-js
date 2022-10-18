# Skyflow-React-Js Sdk Sample Templates
Use this folder to test the functionalities of REACT-JS-SDK just by adding `VAULT-ID` `VAULT-URL` and `SERVICE-ACCOUNT` details at the required place.


### Prerequisites
- [Node.js](https://nodejs.org/en/) version 10 or above
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) version 6.x.x
- [express.js](http://expressjs.com/en/starter/hello-world.html)
- Minimum supported version of React is v16.8.0

## Configure
- Before you can run the sample app, create a vault.
- `TOKEN_URL` for generating bearer token.
-  Install modules : 

        npm install
### Create The Vault
1. In a browser, navigate to Skyflow Studio and log in.
2. Create a vault by clicking **Create Vault** > **Upload Vault Schema**.
3. Choose [data/vaultSchema.json](data/vaultSchema.json).
3. Once the vault is created, click the gear icon and select **Edit Vault** Details.
4. Note your Vault URL and Vault ID values, update the vaules of `VAULT_URL` and `VAULT_ID` in the [index.tsx](src/index.tsx).

### Create A Service Account
1. In the side navigation click, **IAM** > **Service Accounts** > **New Service Account**.
2. For Name, enter **Test-Js-Android-Sample**. For Roles, choose the required roles for specific action.
3. Click **Create**. Your browser downloads a **credentials.json** file. Keep this file secure, as you'll need it in the next steps.

### Create TOKEN_END_POINT_URL
- Create a new directory named `bearer-token-generator`.

        mkdir bearer-token-generator
- Navigate to `bearer-token-generator` directory.

        cd bearer-token-generator
- Initialize npm

        npm init
- Install `skyflow-node`

        npm i skyflow-node
- Create `index.js` file
- Open `index.js` file
- populate `index.js` file with below code snippet
```javascript
const express = require('express')
const app = express()
var cors = require('cors')
const port = 3000
const {
    generateBearerToken,
    isExpired
} = require('skyflow-node');

app.use(cors())

let filepath = 'cred.json';
let bearerToken = "";

function getSkyflowBearerToken() {
    return new Promise(async (resolve, reject) => {
        try {
            if (!isExpired(bearerToken)) resolve(bearerToken)
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

app.get('/', async (req, res) => {
  let bearerToken = await getSkyflowBearerToken();
  res.json({"accessToken" : bearerToken});
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})

```
- Start the server

        node index.js
    server will start at `localhost:3000`
- Update `<TOKEN_END_POINT_URL>` in [index.tsx](src/index.tsx)

## Sample Templates
- [`Collect data`](src/components/CollectElements/index.tsx)
   - This sample illustrates how to use secure Skyflow elements to collect sensitive user information and reveal it to the user via tokens.
- [`Custom Validation`](src/components/CollectValidations/index.tsx)
    - This sample illustrates how to use custom validation with skylow collect elements.
- [`Reveal`](src/components/RevealElements/index.tsx)
    - This sample illustrates how functionality of reveal feature works.
- [`Event Listeners`](src/components/ElementListeners/index.tsx)
    - This sample illustrates how evenet listeners with Skyflow elements.

## Run application

        npm start
