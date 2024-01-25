# skyflow-react-js

A React wrapper for [Skyflow JS SDK](https://github.com/skyflowapi/skyflow-js)

---

## Table of Contents

- [**Including Skyflow-React**](#including-skyflow-react)
  - [Requirements](#requirements)
- [**Initializing Skyflow-React**](#initializing-skyflow-react)
- [**Securely collecting data client-side**](#securely-collecting-data-client-side)
- [**Securely collecting data using File Input Element to upload a file**](#securely-collecting-data-client-side)
- [**Securely collecting data client-side using Composable Elements**](#securely-collecting-data-client-side-using-composable-elements)
- [**Securely revealing data client-side**](#securely-revealing-data-client-side)
- [**Reporting a Vulnerability**](#reporting-a-vulnerability)
- [**License**](#license)

---

## Including Skyflow-React

### Requirements

- The minimum supported version of React is v16.8.0. If you use an older version, upgrade React to use this library

## Installation

Using [npm](https://npmjs.org/)

```
npm install --save skyflow-react-js
```

---

## Initializing Skyflow-React

React components are wrapped in Skyflow provider which takes in config object and SDK internally initializes a Skyflow client.

```jsx
import {SkyflowElements, LogLevel, Env} from 'skyflow-react-js';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const config = {
  vaultID: 'string', // Id of the vault that the client should connect to.
  vaultURL: 'string', // URL of the vault that the client should connect to.
  getBearerToken: helperFunc, // Helper function that retrieves a Skyflow bearer token from your backend.
  options: {
    logLevel: LogLevel.DEBUG, // Optional, if not specified default is ERROR.
    env: Env.DEV, // Optional, if not specified default is PROD.
  },
};
root.render(
  <SkyflowElements config={config}>
    <App />
  </SkyflowElements>
);
```

For the `getBearerToken` parameter, pass in a helper function that retrieves a Skyflow bearer token from your backend. This function will be invoked when the SDK needs to insert or retrieve data from the vault. A sample implementation is shown below:

For example, if the response of the consumer tokenAPI is in the below format

```
{
  'accessToken': string,
  'tokenType': string
}

```

then, your getBearerToken Implementation should be as below

```jsx
const getBearerToken = () => {
  return new Promise((resolve, reject) => {
    const Http = new XMLHttpRequest()

    Http.onreadystatechange = () => {
      if (Http.readyState === 4) {
        if (Http.status === 200) {
          const response = JSON.parse(Http.responseText)
          resolve(response.accessToken)
        } else {
          reject('Error occured')
        }
      }
    }

    Http.onerror = (error) => {
      reject('Error occured')
    }

    const url = 'https://api.acmecorp.com/skyflowToken'
    Http.open('GET', url)
    Http.send()
  })
}
```

For `logLevel` parameter, there are 4 accepted values in `LogLevel`

- `DEBUG`

  When `LogLevel.DEBUG` is passed, all level of logs will be printed(DEBUG, INFO, WARN, ERROR).

- `INFO`

  When `LogLevel.INFO` is passed, INFO logs for every event that has occurred during the SDK flow execution will be printed along with WARN and ERROR logs.

- `WARN`

  When `LogLevel.WARN` is passed, WARN and ERROR logs will be printed.

- `ERROR`

  When `LogLevel.ERROR` is passed, only ERROR logs will be printed.

`Note`:

- The ranking of logging levels is as follows : DEBUG < INFO < WARN < ERROR
- Since `logLevel` is optional, by default the logLevel will be `ERROR`.

For `env` parameter, there are 2 accepted values in `Env`

- `PROD`
- `DEV`

  In [Event Listeners](#event-listener-on-collect-elements), actual value of element can only be accessed inside the handler when the `env` is set to `DEV`.

`Note`:

- Since `env` is optional, by default the env will be `PROD`.
- Use `env` option with caution, make sure the env is set to `PROD` when using `skyflow-react-js` in production.

---

## Securely collecting data client-side

- [**Insert data into the vault**](#insert-data-into-the-vault)
- [**Using Skyflow Elements to collect data**](#using-skyflow-elements-to-collect-data)
- [**Using Skyflow Elements to update data**](#using-skyflow-elements-to-update-data)
- [**Event Listener on Collect Elements**](#event-listener-on-collect-elements)
- [**Using Skyflow File Input Element to upload a file**](#using-skyflow-file-input-element-to-upload-a-file)

### Insert Data into the Vault

To insert data into the vault, use the `insert(records, options?)` method of the Skyflow client. The `records` parameter takes a JSON object of the records to insert into the below format. The `options` parameter takes an object of optional parameters for the insertion. The `insert` method also supports upsert operations.

#### Schema for Records
```js
data = {
  records: [
    {
      table: '<TABLE_NAME>',      // Table into which record should be inserted.
      fields: {
        '<FIELDNAME>': '<VALUE>'  // Column names should match vault column names.
        // ...additional fields here
      },
    },
    // ...additional records here
  ]
};
```

#### Schema for Options
```js
options = {
  tokens: true,               // Optional, indicates if tokens should be returned for the inserted data. Defaults to true.
  upsert:[                    // Optional, upsert operations support in the vault.
    {
      table: '<TABLE_NAME>',  // Table name.
      column: 'value',        // Unique column in the table.
    }
  ],
  continueOnError: true       // Optional, decides whether to continue if error encountered or not 
};
```

Example Usage:

```jsx
import React from 'react';
import { useSkyflow } from 'skyflow-react-js';

const InsertRecords = () => {

  const skyflow = useSkyflow()

  const callInsert = () => {
    const response = skyflow.insert({
      records: [
        {
          table: "cards",
          fields: {
            expiry_date: '12/2026',
            card_number: '411111111111111',
          },
        },
      ],
    },
    { tokens: true });

    response.then((res: any) => {
      console.log(res)
    })
    .catch((e: any) => {
      console.log(e)
    });
  }

	return ( 
    <div id='insert-div' >
		<button id='insert-button' onClick={callInsert}> Insert Record </button>  
    </div>
	)
}
```

Sample response:

```json
{
  "records": [
    {
      "table": "cards",
      "fields": {
        "skyflow_id": "431eaa6c-5c15-4513-aa15-29f50babe882",
        "card_number": "f37186-e7e2-466f-91e5-48e2bcbc1",
        "expiry_date": "1989cb56-63a-4482-adf-1f74cd1a5",
      },
    },
  ],
}

```
Example Usage with upsert support:

```jsx
import React from 'react';
import { useSkyflow } from 'skyflow-react-js';

const InsertRecords = () => {

  const skyflow = useSkyflow()

  const callInsert = () => {
    const response = skyflow.insert({
      records: [
        {
          table: "cards",
          fields: {
            expiry_date: '12/2026',
            card_number: '411111111111111',
          },
        },
      ],
    }, { 
      tokens: true,
      upsert: [{
        table: 'cards',
        column: 'card_number',
      }]
    });

    response.then((res: any) => {
      console.log(res)
    })
    .catch((e: any) => {
      console.log(e)
    });
  }

	return ( 
    <div id='insert-div' >
		<button id='insert-button' onClick={callInsert}> Insert Record </button>  
    </div>
	)
}
```

Samples Response:
```json
{
  "records": [
    {
      "table": "cards",
      "fields": {
        "skyflow_id": "16419435-aa63-4823-aae7-19c6a2d6a19f",
        "card_number": "f3907186-e7e2-466f-91e5-48e12c2bcbc1",
        "cvv": "1989cb56-63da-4482-a2df-1f74cd0dd1a5",
      },
    }
  ]
}
```

Example Usage with contiueOnError support:

```jsx
import React from 'react';
import { useSkyflow } from 'skyflow-react-js';

const InsertRecords = () => {

  const skyflow = useSkyflow()

  const callInsert = () => {
    const response = skyflow.insert({
      records: [
        {
          fields: {
            expiry_date: '12/2026',
            card_number: '411111111111111',
            namee: 'john doe',
          },
          table: 'cards',
        },
        {
          fields: {
            expiry_date: '12/2027',
            card_number: '411111111111111',
            name: 'jane doe',
          },
          table: 'cards',
        }
      ],
    },
    { 
      tokens: true,
      continueOnError: true,
    });

    response.then((res: any) => {
      console.log(res)
    })
    .catch((e: any) => {
      console.log(e)
    });
  }

	return ( 
    <div id='insert-div' >
		<button id='insert-button' onClick={callInsert}> Insert Record </button>  
    </div>
	)
}
```

Sample Response:
```json
{
  "records": [
    {
      "table": "cards",
      "fields": {
        "skyflow_id": "16419435-aa63-4823-aae7-19c6a2d6a19f",
        "card_number": "f3907186-e7e2-466f-91e5-48e12c2bcbc1",
        "expiry_date": "1989cb56-63da-4482-a2df-1f74cd0dd1a5",
        "name": "245d3a0f-a2d3-443b-8a20-8c17de86e186",
      },
      "request_index": 1,
    }
  ],
  "errors": [
    {
      "error": {
        "code":400,
        "description":"Invalid field present in JSON namee - requestId: 87fb2e32-6287-4e61-8304-9268df12bfe8",
        "request_index": 0,
      }
    }
  ]
}
```

### Using Skyflow Elements to collect data

**Skyflow Elements** provide developers with pre-built form elements to securely collect sensitive data client-side. These elements are hosted by Skyflow and injected into your web page as iFrames. This reduces your PCI compliance scope by not exposing your front-end application to sensitive data. Follow the steps below to securely collect data with Skyflow Elements.

### Step 1: Create a container

First create a container for the form elements using the `useCollectContainer` hook as shown below:

```jsx
const container = useCollectContainer()
```

### Step 2: Create a collect Element

```jsx
import { CardNumberElement} from 'skyflow-react-js';

<CardNumberElement
  table='<TABLE_NAME>'
  container='<CONTAINER>'
  column='<COLUMN_NAME>'
    … props
/>
```

The following `props` can be passed to Skyflow collect Element:

```javascript
{
  container: 'CollectContainer' // Required, the collect container.
  table: 'string',              // Required, the table this data belongs to.
  column: 'string',             // Required, the column into which this data should be inserted.
  id: string,                   // Optional, id that can passed to the element.
  classes: {},                  // Optional, styles that should be applied to the element.
  label: 'string',              // Optional, label for the form element.
  placeholder: 'string',        // Optional, placeholder for the form element.
  validations: [],              // Optional, array of validation rules.
  options: {},                  // Optional, options that can be passed to an element.
  onChange: Function,           // Optional, function that is passed to trigger the onChange event.
  onFocus: Function,            // Optional, function that is passed to trigger the onFocus event.
  onBlur: Function,             // Optional, function that is passed to trigger the onBlur event.
  onReady: Function,            // Optional, function that is passed to trigger the onReady event.
}
```

The `table` and `column` fields indicate which table and column in the vault the Element corresponds to.

**Note**:

- Use dot delimited strings to specify columns nested inside JSON fields (e.g. `address.street.line1`)

All elements can be styled using [JSS](https://cssinjs.org/?v=v10.7.1) syntax.

An example of styling an element with `makeSkyflowStyles` hook :

```jsx
import { useMakeSkyflowStyles } from 'skyflow-react-js'

const useSkyflowStyles = useMakeSkyflowStyles({
  inputStyles: {
    base: {
      color: '#013370',
      fontFamily: '"Roboto", sans-serif'
      // ...otherStyles
    },
    complete: {
      color: '#4caf50',
    },
    empty: {},
    focus: {},
    invalid: {},
    cardIcon: {
      position: 'absolute',
      left: '8px',
      bottom: 'calc(50% - 12px)',
    },
    copyIcon: {
      position: 'absolute',
      right: '8px',
    },
    global: {   
      '@import': 'url("https://fonts.googleapis.com/css2?family=Roboto&display=swap")',
    }
  },
  labelStyles: {
    base: {
      color: '#0D4370',
      // ...otherStyles
    },
  },
  errorTextStyles: {
    base: {
      color: '#f44336',
      // ...otherStyles
    },
  },
})
```

The `inputStyles` field accepts a style object which consists of CSS properties that should be applied to the form element in the following states:

- `base`: all other variants inherit from these styles.
- `complete`: applied when the Element has valid input.
- `empty`: applied when the Element has no input.
- `focus`: applied when the Element has focus.
- `invalid`: applied when the Element has invalid input.
- `cardIcon`: applied to the card type icon in `CARD_NUMBER` Element.
- `copyIcon`: applied to copy icon in Elements when `enableCopy` option is true.
- `global`: used for global styles like font-family.

The states that are available for `labelStyles` are `base`, `focus`, `global` and `requiredAsterisk`.
* `requiredAsterisk`: styles applied for the Asterisk symbol in the label.

An example of a labelStyles object:

```jsx
labelStyles: {
  base: {
    fontSize: '12px',
    fontWeight: 'bold'
  },
  focus: {
    color: '#1d1d1d'
  },
  global: {
    '@import' :'url("https://fonts.googleapis.com/css2?family=Roboto&display=swap")',
  },
  requiredAsterisk:{
    color: 'red'
  }
}
```

The state that is available for `errorTextStyles` are `base` and `global`, it shows up when there is some error in the collect element.

An example of a errorTextStyles object:

```jsx
errorTextStyles: {
  base: {
    color: '#f44336',
    fontFamily: '"Roboto", sans-serif'
  },
  global: {
    '@import': 'url("https://fonts.googleapis.com/css2?family=Roboto&display=swap")',
  }
}
```

We support the following collect elements in the react SDK:

- `CardHolderNameElement`
- `CardNumberElement`
- `ExpirationDateElement`
- `CVVElement`
- `PinElement`
- `ExpirationDateElement`
- `ExpirationMonthElement`
- `ExpirationYearElement`
- `InputFieldElement`
- `FileInputElement`

The InputFieldElement type is a custom UI element without any built-in validations. See the section on [validations](#validations) for more information on validations.

Along with Collect Element we can define other options which takes a object of optional parameters as described below:

```jsx
const options = {
  required: false, // Optional, indicates whether the field is marked as required. Defaults to 'false'.
  enableCardIcon: true, // Optional, indicates whether card icon should be enabled (only applicable for CARD_NUMBER ElementType).
  format: String, // Optional, format for the element (only applicable currently for EXPIRATION_DATE ElementType).
  enableCopy: false, // Optional, enables the copy icon in collect and reveal elements to copy text to clipboard. Defaults to 'false').
  allowedFileType: string[], // Optional, allowed extensions for the file to be uploaded.
}
```

- `required` parameter indicates whether the field is marked as required or not. If not provided, it defaults to false

- `enableCardIcon` parameter indicates whether the icon is visible for the CARD_NUMBER element, defaults to true

- `format` parameter takes string value and indicates the format pattern applicable to the element type, It's currently only applicable to `EXPIRATION_DATE` and `EXPIRATION_YEAR` element types.

- `enableCopy` parameter indicates whether the copy icon is visible in collect and reveal elements.

- `allowedFileType` parameter indicates the allowedFileType extensions to be uploaded.

The values that are accepted for `EXPIRATION_DATE` are

- `MM/YY` (default)
- `MM/YYYY`
- `YY/MM`
- `YYYY/MM`

The values that are accepted for `EXPIRATION_YEAR` are

- `YY` (default)
- `YYYY`

`NOTE`: If not specified or invalid value is passed to the `format` then it takes default value.

### Step 3: Collect data from Elements

When the form is ready to be submitted, call the `collect(options?)` method on the container object. The `options` parameter takes a object of optional parameters as shown below:

- `tokens`: indicates whether tokens for the collected data should be returned or not. Defaults to 'true'
- `additionalFields`: Non-PCI elements data to be inserted into the vault which should be in the `records` object format.
- `upsert`: To support upsert operations while collecting data from Skyflow elements, pass the table and column marked as unique in the table.
- `continueOnError`: To decides whether to continue if error encountered or not. Defaults to `false`.

```javascript
const options = {
  tokens: true,                          // Optional, indicates whether tokens for the collected data should be returned. Defaults to 'true'
  additionalFields: {
    records: [
      {
        table: 'string',                 // Table into which record should be inserted
        fields: {
          column1: 'value',              // Column names should match vault column names
          // ...additional fields here
        },
      },
      // ...additional records here
    ],
  },                                     // Optional
  upsert: [                              // Upsert operations support in the vault
    {
      table: 'string', // Table name
      column: 'value', // Unique column in the table
    },
  ], //Optional
  continueOnError: true                  // Optional, decides whether to continue if error encountered or not
}

container.collect(options)
```

### End to end example of collecting data with Skyflow Elements

```jsx
import React from 'react'
import { CardNumberElement, useCollectContainer, useMakeSkyflowStyles } from 'skyflow-react-js'

const App = () => {
  const container = useCollectContainer()

  const useStyles = useMakeSkyflowStyles({
    inputStyles: {
      base: {
        border: '1px solid black',
        borderRadius: '4px',
        color: '#1d1d1d',
        padding: '10px 16px',
      },
      complete: {
        color: '#4caf50',
      },
      empty: {},
      focus: {},
      invalid: {
        color: '#f44336',
      },
      cardIcon: {
        position: 'absolute',
        left: '8px',
        bottom: 'calc(50% - 12px)',
      },
    },
    labelStyles: {
      base: {
        fontSize: '16px',
        fontWeight: 'bold',
      },
    },
    errorTextStyles: {
      base: {
        color: 'blue',
      },
    },
  })

  const options = {
    enableCopy: true,
  }

  const classes = useStyles()

  const handleCollect = () => {
    const response = container.collect()
    response
      .then((res: unknown) => {
        console.log(JSON.stringify(res))
      })
      .catch((e: unknown) => {
        console.log(e)
      })
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <CardNumberElement
          container={container}
          table={'cards'}
          classes={classes}
          column={'cardNumber'}
          label={'Collect Card Number'}
          options={options}
        />

        <button onClick={handleCollect}>Collect</button>
      </header>
    </div>
  )
}

export default App
```

**Sample Response :**

```javascript
{
  "records": [
    {
      "table": "cards",
      "fields": {
        "skyflow_id": "431eaa6c-5c15-4513-aa15-29f50babe882",
        "cardNumber": "f3907186-e7e2-466f-91e5-48e12c2bcbc1",
      }
    }
  ]
}
```

### Insert call example with upsert support

```jsx
import React from 'react'
import {
  CardNumberElement,
  CVVElement,
  useCollectContainer,
  useMakeSkyflowStyles,
} from 'skyflow-react-js'

function App() {
  const container = useCollectContainer()

  const useStyles = useMakeSkyflowStyles({
    inputStyles: {
      base: {
        border: '1px solid black',
        borderRadius: '4px',
        color: '#1d1d1d',
        padding: '10px 16px',
      },
      complete: {
        color: '#4caf50',
      },
      empty: {},
      focus: {},
      invalid: {
        color: '#f44336',
      },
    },
    labelStyles: {
      base: {
        fontSize: '16px',
        fontWeight: 'bold',
      },
    },
    errorTextStyles: {
      base: {
        color: 'blue',
      },
    },
  })

  const classes = useStyles()

  const handleCollect = () => {
    const options = {
      tokens: true,
      upsert: [
        {
          table: 'cards',
          column: 'cardNumber',
        },
      ],
    }

    const response = container.collect(options)
    response
      .then((res: any) => {
        console.log(JSON.stringify(res))
      })
      .catch((e: any) => {
        console.log(e)
      })
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <CardNumberElement
          container={container}
          table={'cards'}
          classes={classes}
          column={'cardNumber'}
          label={'Collect Card Number'}
          options={options}
        />

        <CVVElement
          container={container}
          table={'cards'}
          classes={classes}
          column={'cvv'}
          label={'Collect CVV'}
          options={options}
        />

        <button onClick={handleCollect}>Collect</button>
      </header>
    </div>
  )
}

export default App
```

**Skyflow returns tokens for the record you just inserted.**

```json
{
  "records": [
    {
      "table": "cards",
      "fields": {
        "skyflow_id": "431eaa6c-5c15-4513-aa15-29f50babe882",
        "cardNumber": "f3907186-e7e2-466f-91e5-48e12c2bcbc1",
        "cvv": "l4907186-e7e2-466f-91e5-985e12c2bcbc1"
      }
    }
  ]
}
```

### Insert call example with continueOnError support

```jsx
import React from 'react'
import {
  CardNumberElement,
  CVVElement,
  useCollectContainer,
  useMakeSkyflowStyles,
} from 'skyflow-react-js'

function App() {
  const container = useCollectContainer()

  const useStyles = useMakeSkyflowStyles({
    inputStyles: {
      base: {
        border: '1px solid black',
        borderRadius: '4px',
        color: '#1d1d1d',
        padding: '10px 16px',
      },
      complete: {
        color: '#4caf50',
      },
      empty: {},
      focus: {},
      invalid: {
        color: '#f44336',
      },
    },
    labelStyles: {
      base: {
        fontSize: '16px',
        fontWeight: 'bold',
      },
    },
    errorTextStyles: {
      base: {
        color: 'blue',
      },
    },
  })

  const classes = useStyles()

  const handleCollect = () => {
    const options = {
      tokens: true,
      continueOnError: true,
      additionalFields: {
        records: [
          {
            table: 'table',                  
            fields: {
              "cardholder_nam": 'value',   
            },
          },
        ],
      },
    }

    const response = container.collect(options)
    response
      .then((res: any) => {
        console.log(JSON.stringify(res))
      })
      .catch((e: any) => {
        console.log(e)
      })
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <CardNumberElement
          container={container}
          table={'cards'}
          classes={classes}
          column={'cardNumber'}
          label={'Collect Card Number'}
          options={options}
        />

        <CVVElement
          container={container}
          table={'cards'}
          classes={classes}
          column={'cvv'}
          label={'Collect CVV'}
          options={options}
        />

        <button onClick={handleCollect}>Collect</button>
      </header>
    </div>
  )
}

export default App
```

**Skyflow returns tokens for the record you just inserted.**

```json
{
  "records": [
    {
      "table": "cards",
      "fields": {
        "skyflow_id": "431eaa6c-5c15-4513-aa15-29f50babe882",
        "cardNumber": "f3907186-e7e2-466f-91e5-48e12c2bcbc1",
        "cvv": "12f670af-6c7d-4837-83fb-30365fbc0b1e"
      }
    }
  ], 
  "errors": [
    {
      "error": {
        "code": 404,
        "description": "Invalid field present in JSON cardholder_nam - requestId : d6b0eb7e-d002-4232-9000-fd44fe8bec86",
      }
    }
  ]
}
```

## Validations:

Skyflow-React which internally uses Skyflow-JS SDK provides two types of validations on Collect Elements

### 1. Default Validations:

Every Collect Element except of type `InputFieldElement` has a set of default validations listed below:

- `CARD_NUMBER`: Card number validation with checkSum algorithm(Luhn algorithm).
  Available card lengths for defined card types are [12, 13, 14, 15, 16, 17, 18, 19].
  A valid 16 digit card number will be in the format - `XXXX XXXX XXXX XXXX`
- `CARD_HOLDER_NAME`: Name should be 2 or more symbols, valid characters should match pattern - `^([a-zA-Z\\ \\,\\.\\-\\']{2,})$`
- `CVV`: Card CVV can have 3-4 digits
- `EXPIRATION_DATE`: Any date starting from current month. By default valid expiration date should be in short year format - `MM/YY`
- `PIN`: Can have 4-12 digits

### 2. Custom Validations:

Custom validations can be added to any element which will be checked after the default validations have passed. The following Custom validation rules are currently supported:

- `REGEX_MATCH_RULE`: You can use this rule to specify any Regular Expression to be matched with the input field value

```jsx
const regexMatchRule = {
  type: REGEX_MATCH_RULE,
  params: {
    regex: RegExp,
    error: string, // Optional, default error is 'VALIDATION FAILED'.
  },
}
```

- `LENGTH_MATCH_RULE`: You can use this rule to set the minimum and maximum permissible length of the input field value

```jsx
const lengthMatchRule = {
  type: LENGTH_MATCH_RULE,
  params: {
    min: number, // Optional
    max: number, // Optional
    error: string, // Optional, default error is 'VALIDATION FAILED'.
  },
}
```

The Sample for using custom validations:

```jsx
/*
  A simple example that illustrates custom validations.
  Adding REGEX_MATCH_RULE , LENGTH_MATCH_RULE to collect element.
*/
import {CardNumberElement, REGEX_MATCH_RULE, LENGTH_MATCH_RULE} from 'skyflow-react-js';

// This rule allows 1 or more alphabets.
const alphabetsOnlyRegexRule = {
  type: REGEX_MATCH_RULE,
  params: {
    regex: /^[A-Za-z]+$/,
    error: 'Only alphabets are allowed'
  }
};

// This rule allows input length between 4 and 6 characters.
const lengthRule = {
  type: LENGTH_MATCH_RULE,
  params: {
    min: 4,
    max: 6,
    error: 'Must be between 4 and 6 alphabets'
  }
};

const Form = (props) => {
  return (
    <CardNumberElement
      container='COLLECT CONTAINER'
      table='<TABLE_NAME>'
      column='<COLUMN_NAME>'
      validations={[alphabetsOnlyRegexRule, lengthRule]}
      ...props
    />
  );
};
```

## Using Skyflow Elements to update data

You can update the data in a vault with Skyflow Elements. Use the following steps to securely update data. 

### Step 1: Create a container

First create a container for the form elements using the `useCollectContainer` hook as shown below:

```jsx
const container = useCollectContainer()
```

### Step 2: Create a collect Element


```jsx
import { CardNumberElement} from 'skyflow-react-js';

<CardNumberElement
  table='<TABLE_NAME>'
  container='<CONTAINER>'
  column='<COLUMN_NAME>'
  skyflowID='<SKYFLOW_ID>'        // The skyflow_id of the record to be updated.
  ...props
/>
```

The following `props` can be passed to Skyflow collect Element:

```javascript
{
  container: 'CollectContainer' // Required, the collect container.
  table: 'string',              // Required, the table this data belongs to.
  column: 'string',             // Required, the column into which this data should be inserted.
  id: string,                   // Optional, id that can passed to the element.
  classes: {},                  // Optional, styles that should be applied to the element.
  label: 'string',              // Optional, label for the form element.
  placeholder: 'string',        // Optional, placeholder for the form element.
  validations: [],              // Optional, array of validation rules.
  options: {},                  // Optional, options that can be passed to an element.
  onChange: Function,           // Optional, function that is passed to trigger the onChange event.
  onFocus: Function,            // Optional, function that is passed to trigger the onFocus event.
  onBlur: Function,             // Optional, function that is passed to trigger the onBlur event.
  onReady: Function,            // Optional, function that is passed to trigger the onReady event.
  skyflowID: 'string',          // The skyflow_id of the record to be updated.
}
```

The `table` and `column` fields indicate which table and column in the vault the Element corresponds to.

`skyflowID` indicates the record that you want to update.


**Note**:

- Use dot delimited strings to specify columns nested inside JSON fields (e.g. `address.street.line1`)

### Step 3: Update data from Elements 


When the form is ready to be submitted, call the `collect(options?)` method on the container object. The `options` parameter takes a object of optional parameters as shown below:

- `tokens`: indicates whether tokens for the collected data should be returned or not. Defaults to 'true'
- `additionalFields`: Non-PCI elements data to be inserted into the vault which should be in the `records` object format.
- `upsert`: To support upsert operations while collecting data from Skyflow elements, pass the table and column marked as unique in the table.

```javascript
const options = {
  tokens: true, // Optional, indicates whether tokens for the collected data should be returned. Defaults to 'true'
  additionalFields: {
    records: [
      {
        table: 'string',          // Table into which record should be inserted
        fields: {
          column1: 'value',       // Column names should match vault column names
          skyflowID: "value",     // The skyflow_id of the record to be updated.
          // ...additional fields here
        },
      },
      // ...additional records here
    ],
  }, // Optional
  upsert: [
    // Upsert operations support in the vault
    {
      table: 'string',             // Table name
      column: 'value',             // Unique column in the table
    },
  ], //Optional
}

container.collect(options)
```

**Note:** `skyflowID` is required if you want to update the data. If `skyflowID` isn't specified, the `collect(options?)` method creates a new record in the vault.

### End to end example of updating data with Skyflow Elements

```jsx
import React from 'react'
import { CardNumberElement, useCollectContainer, useMakeSkyflowStyles, CardHolderNameElement } from 'skyflow-react-js'

const App = () => {
  const container = useCollectContainer()

  const useStyles = useMakeSkyflowStyles({
    inputStyles: {
      base: {
        border: '1px solid black',
        borderRadius: '4px',
        color: '#1d1d1d',
        padding: '10px 16px',
      },
      complete: {
        color: '#4caf50',
      },
      empty: {},
      focus: {},
      invalid: {
        color: '#f44336',
      },
      cardIcon: {
        position: 'absolute',
        left: '8px',
        bottom: 'calc(50% - 12px)',
      },
    },
    labelStyles: {
      base: {
        fontSize: '16px',
        fontWeight: 'bold',
      },
    },
    errorTextStyles: {
      base: {
        color: 'blue',
      },
    },
  })

  const options = {
    enableCopy: true,
  }

  const classes = useStyles()

  const handleCollect = () => {
    const nonPCIRecords = {
          records: [
            {
              table: 'cards',
              fields: {
              gender: 'MALE',
              skyflowID:  '431eaa6c-5c15-4513-aa15-29f50babe882',
              },
            },
          ],
      };
    const response = container.collect({
          tokens: true,
          additionalFields: nonPCIRecords,
    });
    response
      .then((res: unknown) => {
        console.log(JSON.stringify(res))
      })
      .catch((e: unknown) => {
        console.log(e)
      })
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <CardNumberElement
          container={container}
          table={'cards'}
          classes={classes}
          column={'cardNumber'}
          label={'Collect Card Number'}
          options={options}
          skyflowID={'431eaa6c-5c15-4513-aa15-29f50babe882'}
        />
        <CardHolderNameElement
        container={container}
        table={'cards'}
        column={'name'}
        label={'card holder name'}
        skyflowID={'431eaa6c-5c15-4513-aa15-29f50babe882'}
      />
        <button onClick={handleCollect}>Collect</button>
      </header>
    </div>
  )
}

export default App
```

**Sample Response :**
```javascript
{
 "records": [
   {
     "table": "cards",
     "fields": {
       "skyflow_id": "431eaa6c-5c15-4513-aa15-29f50babe882",
       "cardNumber": "f3907186-e7e2-466f-91e5-48e12c2bcbc1",
       "first_name": "131e70dc-6f76-4319-bdd3-96281e051051",
       "gender": "12f670af-6c7d-4837-83fb-30365fbc0b1e"
     }
   }
 ]
}
```

## Event Listener on Collect Elements

Helps to communicate with Skyflow elements / iframes by listening to an event. Event listeners can be triggered by passing the handler methods as props to the Element components.

There are 4 events which SDK supports:

- `CHANGE`  
  Change event is triggered when the Element's value changes.

- `READY`  
   Ready event is triggered when the Element is fully rendered

- `FOCUS`  
  Focus event is triggered when the Element gains focus

- `BLUR`  
  Blur event is triggered when the Element loses focus.

The handler `function(state) => void` is a callback function you provide, that will be called when the event is fired with the state object as shown below.

```javascript
state: {
  elementType: Skyflow.ElementType
  isEmpty: boolean
  isFocused: boolean
  isValid: boolean
  value: string
}
```

`Note:`
Values of SkyflowElements will be returned in element state object only when `env` is  `DEV`,  else it is empty string i.e, '', but in case of CARD_NUMBER type element when the `env` is `PROD` for all the card types except AMEX, it will return first eight digits, for AMEX it will return first six digits and rest all digits in masked format.

### Example Usage of Event Listener on Collect Elements

```jsx
import React from 'react'
import { CardNumberElement, CardHolderNameElement, useCollectContainer } from 'skyflow-react-js'

const App = () => {
  const container = useCollectContainer()

  const handleCollect = () => {
    const response = container.collect()
    response
      .then((res: unknown) => {
        console.log(JSON.stringify(res))
      })
      .catch((e: unknown) => {
        console.log(e)
      })
  }

  const handleOnChange = (changeState: unknown) => {
    console.log('Change', changeState)
  }
  const handleOnBlur = (changeState: unknown) => {
    console.log('Blur', changeState)
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <CardNumberElement
          container={container}
          table={'table1'}
          column={'card_number'}
          label={'Collect Card Number'}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        />
        <CardHolderNameElement
          container={container}
          table={'table1'}
          column={'first_name'}
          label={'Collect Card Holder Name'}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        />

        <button onClick={handleCollect}>Collect</button>
      </header>
    </div>
  )
}

export default App
```

#### Sample Element state object when `env` is `DEV`

```javascript
{
  elementType: 'CARDHOLDER_NAME',
  isEmpty: false,
  isFocused: true,
  isValid: true,
  value: 'John',
};
{
  elementType: 'CARD_NUMBER',
  isEmpty: false,
  isFocused: true,
  isValid: true,
  value: '4111111111111111',
};
```

#### Sample Element state object when `env` is `PROD`

```javascript
{
  elementType: 'CARDHOLDER_NAME',
  isEmpty: false,
  isFocused: true,
  isValid: true,
  value: '',
};
{
  elementType: 'CARD_NUMBER',
  isEmpty: false,
  isFocused: true,
  isValid: true,
  value: '41111111XXXXXXXX',
};
```
## Using Skyflow File Input Element to upload a file

You can upload binary files to a vault using the Skyflow File Input Element. Use the following steps to securely upload a file.
### Step 1: Create a container

First create a container for the form elements using the `useCollectContainer` hook as shown below:

```javascript
const container = useCollectContainer()
```

### Step 2: Create a File Input Element

```javascript
import { FileInputElement} from 'skyflow-react-js';

<FileInputElement
 table='<TABLE_NAME>'
 column='<COLUMN_NAME>'
 skyflowID='<SKYFLOW_ID>' 
  ... props
/>
```
The following `props` can be passed to file input element:

```javascript
{
  container: 'CollectContainer' // Required, the collect container.
  table: 'string',              // Required, the table this data belongs to.
  column: 'string',             // Required, the column into which this data should be inserted.
  skyflowID: 'string',             //Required, skyflowID of the record that stores the file.
  id: 'string',                   // Optional, id that can passed to the element.
  classes: {},                  // Optional, styles that should be applied to the element.
  label: 'string',              // Optional, label for the form element.
  validations: [],              // Optional, array of validation rules.
  options: {},                  // Optional, options that can be passed to an element.
}
```

The `table` and `column` fields indicate which table and column the Element corresponds to. 

`skyflowID` indicates the record that stores the file.

**Notes**: 
- `skyflowID` is required while creating File element
- Use period-delimited strings to specify columns nested inside JSON fields (e.g. `address.street.line1`).

## Step 3: Collect data from elements

When the file is ready to be uploaded, call the `uploadFiles()` method on the container object.

```javascript
container.uploadFiles(options);
```
### File upload limitations:

- Only non-executable file are allowed to be uploaded.
- Files must have a maximum size of 32 MB
- File columns can't enable tokenization, redaction, or arrays.
- Re-uploading a file overwrites previously uploaded data.
- Partial uploads or resuming a previous upload isn't supported.

### End-to-end file upload

```javascript
import React from 'react'
import { FileInputElement , useCollectContainer, useMakeSkyflowStyles } from 'skyflow-react-js'

const App = () => {
  const container = useCollectContainer()

  const useStyles = useMakeSkyflowStyles({
    inputStyles: {
      base: {
        border: '1px solid black',
        borderRadius: '4px',
        color: '#1d1d1d',
        padding: '10px 16px',
      },
      complete: {
        color: '#4caf50',
      },
      empty: {},
      focus: {},
      invalid: {
        color: '#f44336',
      },
      cardIcon: {
        position: 'absolute',
        left: '8px',
        bottom: 'calc(50% - 12px)',
      },
    },
    labelStyles: {
      base: {
        fontSize: '16px',
        fontWeight: 'bold',
      },
    },
    errorTextStyles: {
      base: {
        color: 'blue',
      },
    },
  })

  const classes = useStyles()

  const handleUpload = () => {
    const response = container.uploadFiles({})
    response
      .then((res: unknown) => {
        console.log(JSON.stringify(res))
      })
      .catch((e: unknown) => {
        console.log(e)
      })
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <FileInputElement
          container={container}
          table={'newTable'}
          skyflowID={'431eaa6c-5c15-4513-aa15-29f50babe882'}
          column={'file_input'}	
          label={'File Input'}
          classes={classes}
        />
        <button onClick={handleUpload}>upload File</button>
      </header>
    </div>
  )
}

export default App
```

**Sample Response :**
```javascript
{
    fileUploadResponse: [
        {
            "skyflow_id": "431eaa6c-5c15-4513-aa15-29f50babe882"
        }
    ]
}
```
#### File upload with allowedFileType option

```javascript
import React from 'react';
import {
  CardNumberElement,
  useCollectContainer,
  useMakeSkyflowStyles,
  FileInputElement,
} from 'skyflow-react-js';

const CollectElements = () => {
  const container = useCollectContainer();

  const handleCollect = () => {
    const response = container.collect();
    response
      .then((res: unknown) => {
        console.log(JSON.stringify(res));
      })
      .catch((e: unknown) => {
        console.log(e);
      });
  };
  
  const options = {
    allowedFileType: [".pdf",".png"]
  };
  
  const handleFile = () => {
    const response = container.uploadFiles({});
    response
      .then((res: unknown) => {
        console.log(JSON.stringify(res));
      })
      .catch((e: unknown) => {
        console.log(e);
      });
  };

  const useStyles = useMakeSkyflowStyles({
    inputStyles: {
      base: {
        border: '1px solid black',
        borderRadius: '4px',
        color: '#1d1d1d',
        padding: '10px 16px',
      },
      complete: {
        color: '#4caf50',
      },
      empty: {},
      focus: {},
      invalid: {
        color: '#f44336',
      },
    },
    labelStyles: {
      base: {
        fontSize: '16px',
        fontWeight: 'bold',
      },
    },
    errorTextStyles: {
      base: {
        color: 'red',
      },
    },
  });

  const classes = useStyles();

  return (
    <div className='CollectElements' style={{width: '300px'}}>
      <CardNumberElement
        id={'collectCardNumber'}
        container={container}
        table={'newTable'}
        classes={classes}
        column={'card_number'}
        label={'Collect Card Number'}
      />
      <FileInputElement
        id='file-input'
        container={container}
        classes={classes}
        table={'newTable'}
        column={'file_input'}
        label={'File Input'}
        skyflowID={'431eaa6c-5c15-4513-aa15-29f50babe882'}
        options={options}
      />

      <button onClick={handleFile}>Submit file</button>
      <button onClick={handleCollect}>Collect</button>
    </div>
  );
};

export default CollectElements;
```
**Sample Response for collect():**
```javascript
{
  "records": [
    {
      "table": "newTable",
      "fields": {
        "card_number": "f3907186-e7e2-466f-91e5-48e12c2bcbc1",
      }
    }
  ]
}
```
**Sample Response for file uploadFiles() :**
```javascript
{
    "fileUploadResponse": [
        {
            "skyflow_id": "431eaa6c-5c15-4513-aa15-29f50babe882"
        }
    ]
}
```

#### File upload with additional elements

```javascript
import React from 'react';
import {
  CardNumberElement,
  useCollectContainer,
  useMakeSkyflowStyles,
  FileInputElement,
} from 'skyflow-react-js';

const CollectElements = () => {
  const container = useCollectContainer();

  const handleCollect = () => {
    const response = container.collect();
    response
      .then((res: unknown) => {
        console.log(JSON.stringify(res));
      })
      .catch((e: unknown) => {
        console.log(e);
      });
  };

  const handleFile = () => {
    const response = container.uploadFiles({});
    response
      .then((res: unknown) => {
        console.log(JSON.stringify(res));
      })
      .catch((e: unknown) => {
        console.log(e);
      });
  };

  const useStyles = useMakeSkyflowStyles({
    inputStyles: {
      base: {
        border: '1px solid black',
        borderRadius: '4px',
        color: '#1d1d1d',
        padding: '10px 16px',
      },
      complete: {
        color: '#4caf50',
      },
      empty: {},
      focus: {},
      invalid: {
        color: '#f44336',
      },
    },
    labelStyles: {
      base: {
        fontSize: '16px',
        fontWeight: 'bold',
      },
    },
    errorTextStyles: {
      base: {
        color: 'red',
      },
    },
  });

  const classes = useStyles();

  return (
    <div className='CollectElements' style={{width: '300px'}}>
      <CardNumberElement
        id={'collectCardNumber'}
        container={container}
        table={'newTable'}
        classes={classes}
        column={'card_number'}
        label={'Collect Card Number'}
      />
      <FileInputElement
        id='file-input'
        container={container}
        classes={classes}
        table={'newTable'}
        column={'file_input'}
        label={'File Input'}
        skyflowID={'431eaa6c-5c15-4513-aa15-29f50babe882'}
      />

      <button onClick={handleFile}>Submit file</button>
      <button onClick={handleCollect}>Collect</button>
    </div>
  );
};

export default CollectElements;
```
**Sample Response for collect():**
```javascript
{
  "records": [
    {
      "table": "newTable",
      "fields": {
        "card_number": "f3907186-e7e2-466f-91e5-48e12c2bcbc1",
      }
    }
  ]
}
```
**Sample Response for file uploadFiles() :**
```javascript
{
    "fileUploadResponse": [
        {
            "skyflow_id": "431eaa6c-5c15-4513-aa15-29f50babe882"
        }
    ]
}
```
---
## Securely collecting data client-side using Composable Elements

Composable Elements combine multiple Skyflow Elements in a single iframe, letting you create multiple Skyflow Elements in a single row. The following steps create a composable element and securely collect data through it.

### Step 1: Create a composable container

Create a container for the composable element using the useComposableContainer hook of the Skyflow client:

```javascript
const container = useComposableContainer(containerOptions)
```

The container requires an options object that contains the following keys:

* `layout`: An array that indicates the number of rows in the container and the number of elements in each row. The index value of the array defines the number of rows, and each value in the array represents the number of elements in that row, in order.

	For example: `[2,1]` means the container has two rows, with two elements in the first row and one element in the second row.

	`Note`: The sum of values in the layout array should be equal to the number of elements created

* `styles`: CSS styles to apply to the composable container.
* `errorTextStyles`: CSS styles to apply if an error is encountered.

```javascript
const options = {
    layout: [2, 1],                           // Required
    styles: {                                 // Optional
        base: {
            border: '1px solid #DFE3EB',
            padding: '8px',
            borderRadius: '4px',
            margin: '12px 2px',
        },
    },
    errorTextStyles: {                       // Optional
        base: {
            color: 'red',
            fontFamily: '"Roboto", sans-serif'
        },
        global: {
            '@import': 'url("https://fonts.googleapis.com/css2?family=Roboto&display=swap")',
        }        
    },
};
```

### Step 2: Create Composable Elements

Composable Elements use the following format. Create other elements within the Composable Element.

```jsx
import {
    ComposableContainer,
    CardHolderNameElement,
    CardNumberElement,
} from "skyflow-react-js";

<ComposableContainer id="<ID>" container="<CONTAINER>">
  <CardHolderNameElement 
      id="<ID>" 
      table="<TABLE_NAME>" 
      container="<CONTAINER>" 
      column="<COLUMN_NAME>" 
      ... props 
  />
  <CardNumberElement 
      id="<ID>" 
      table="<TABLE_NAME>" 
      container="<CONTAINER>" 
      column="<COLUMN_NAME>" 
      ... props 
  />
</ComposableContainer>
```

The following `props` can be passed to Skyflow Composable Element:

```javascript
{
  container: 'ComposableContainer' // Required, the Composable Container.
  table: 'string',              // Required, the table this data belongs to.
  column: 'string',             // Required, the column into which this data should be inserted.
  id: string,                   // Optional, id that can passed to the element.
  classes: {},                  // Optional, styles that should be applied to the element.
  label: 'string',              // Optional, label for the form element.
  placeholder: 'string',        // Optional, placeholder for the form element.
  validations: [],              // Optional, array of validation rules.
  options: {},                  // Optional, options that can be passed to an element.
  onChange: Function,           // Optional, function that is passed to trigger the onChange event.
  onFocus: Function,            // Optional, function that is passed to trigger the onFocus event.
  onBlur: Function,             // Optional, function that is passed to trigger the onBlur event.
  onReady: Function,            // Optional, function that is passed to trigger the onReady event.
}
```

The `table` and `column` fields indicate which table and column in the vault the Element correspond to.

Note: Use dot-delimited strings to specify columns nested inside JSON fields (for example, `address.street.line1`).

All elements can be styled with JSS syntax.

An example of styling an element with `makeSkyflowStyles` hook:

```jsx
const useSkyflowStyles = makeSkyflowStyles({
  inputStyles: {
    base: {
      color: "#013370",
      // ...otherStyles
    },
    complete: {
      color: "#4caf50",
    },
    empty: {},
    focus: {},
    invalid: {},
    cardIcon: {
      position: "absolute",
      left: "8px",
      bottom: "calc(50% - 12px)"
    },
    copyIcon: {
      position: "absolute",
      right: "8px",
    }
  },
  labelStyles: {
    base: {
      color: "#0D4370",
      // ...otherStyles
    }
  },
  errorTextStyles: {
    base: {
      color: "#f44336",
      // ...otherStyles
    }
  }

})
```
The `inputStyles` field accepts an object of CSS properties to apply to the form element in the following states:

* `base`: all variants inherit from these styles
* `complete`: applied when the Element has valid input
* `empty`: applied when the Element has no input
* `focus`: applied when the Element has focus
* `invalid`: applied when the Element has invalid input
* `cardIcon`: applied to the card type icon in CARD_NUMBER Element
* `copyIcon`: applied to copy icon in Elements when enableCopy option is true
* `global`: used for global styles like font-family

An example of an `inputStyles` object:

```javascript
inputStyles: {
  base: {
    border: '1px solid #eae8ee',
    padding: '10px 16px',
    borderRadius: '4px',
    color: '#1d1d1d',
  },
  complete: {
    color: '#4caf50',
  },
  empty: {},
  focus: {},
  invalid: {
    color: '#f44336',
  },
  cardIcon: {
    position: 'absolute',
    left: '8px',
    bottom: 'calc(50% - 12px)',
  },
  copyIcon: {
    position: 'absolute',
    right: '8px',
  },
  global: {   
    '@import': 'url("https://fonts.googleapis.com/css2?family=Roboto&display=swap")',
  }
}
```
The `labelStyles` field supports the `base`, `focus`, `global`.
* requiredAsterisk: styles applied for the Asterisk symbol in the label.

An example `labelStyles` object:

```javascript
labelStyles: {
  base: {
    fontSize: '12px',
      fontWeight: 'bold'
  },
  focus: {
    color: '#1d1d1d'
  },
  global: {
    '@import' :'url("https://fonts.googleapis.com/css2?family=Roboto&display=swap")',
  }
}
```

The React SDK supports the following composable elements:

- `CardHolderNameElement`
- `CardNumberElement`
- `ExpirationDateElement`
- `CVVElement`
- `PinElement`
- `ExpirationDateElement`
- `ExpirationMonthElement`
- `ExpirationYearElement`
- `InputFieldElement`

`Note`: Only when the entered value in the below composable elements is valid, the focus shifts automatically. The element types are:
- `CardNumberElement`
- `ExpirationDateElement`
- `ExpirationMonthElement`
- `ExpirationYearElement`

The `InputFieldElement` type is a custom UI element without any built-in validations. For information on validations, see [validations](#validations).

Along with the Composable Element definition, you can define additional options for the element:

```javascript
const options = {
    required: false,  		// Optional, indicates whether the field is marked as required. Defaults to 'false'
    enableCardIcon: true, 	// Optional, indicates whether card icon should be enabled (only applicable for CARD_NUMBER ElementType)
    format: String, 		// Optional, format for the element (only applicable currently for EXPIRATION_DATE ElementType),
    enableCopy: false 		// Optional, enables the copy icon in collect and reveal elements to copy text to clipboard. Defaults to 'false')
}
```

- `required`: Whether or not the field is marked as required. Defaults to `false`.
- `enableCardIcon`: Whether or not the icon is visible for the CARD_NUMBER element. Defaults to `true`.
- `format`: Format pattern for the element. Only applicable to EXPIRATION_DATE and EXPIRATION_YEAR element types.
- `enableCopy`: Whether or not the copy icon is visible in collect and reveal elements. Defaults to `false`.

The accepted `EXPIRATION_DATE` values are

- `MM/YY` (default)
- `MM/YYYY`
- `YY/MM`
- `YYYY/MM`


The accepted `EXPIRATION_YEAR` values are

- `YY` (default)
- `YYYY`

### Step 3: Collect data from Elements

When the form is ready to be submitted, call the `collect(options?)` method on the container object. The options parameter takes an object of optional parameters as follows:
- `tokens`: Whether or not tokens for the collected data are returned. Defaults to 'true'
- `additionalFields`: Non-PCI elements data to insert into the vault, specified in the records object format.
- `upsert`: To support upsert operations,  the table containing the data and a column marked as unique in that table.

```javascript
const options = {
  tokens: true,                             // Optional, indicates whether tokens for the collected data should be returned. Defaults to 'true'.
  additionalFields: {
    records: [
      {
        table: 'string',                   // Table into which record should be inserted.
        fields: {
          column1: 'value',                // Column names should match vault column names.
          // ...additional fields here.
        },
      },
      // ...additional records here.
    ],
  },                                      // Optional
  upsert: [                               // Upsert operations support in the vault                                    
    {
      table: 'string',                    // Table name
      column: 'value',                    // Unique column in the table
    },
  ],                                      // Optional
};
```
### End to end example of collecting data with Composable Elements:

```jsx
import React from 'react';
import {
  CardNumberElement,
  CVVElement,
  useMakeSkyflowStyles,
  useComposableContainer,
  ComposableContainer,
  CardHolderNameElement,
} from 'skyflow-react-js';

const CollectElements = () => {

  const useStyles = useMakeSkyflowStyles({
    inputStyles: {
      base: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '21px',
        color: '#1d1d1d',
        padding: '0px 16px'
      },
      complete: {
        color: '#4caf50',
      }
    },
    empty: {
    },
    focus: {
    },
    invalid: {
      color: '#f44336',
    },
  });
  const useCVVStyles = useMakeSkyflowStyles({
    inputStyles: {
      base: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '21px',
      },
      complete: {
        color: '#4caf50',
      },
      empty: {},
      focus: {},
      invalid: {
        color: '#f44336',
      },
    },
    labelStyles: {
    },
    errorTextStyles: {
      base: {
        display: 'none'
      },
    },
  })

  const classes = useStyles();
  const cvvClasses = useCVVStyles();

  const containerOptions = {
    layout: [1, 2],
    styles: {
      base: {
        border: '1px solid #DFE3EB',
        padding: '8px',
        borderRadius: '4px',
        margin: '12px 2px',
      }
    },
    errorTextSyles: {
      base: {
        color: '#f44336'
      }
    }
  }
  const container = useComposableContainer(containerOptions);

  const handleCollect = () => {
    const options = {
      tokens: true
    }
    const response = container?.collect(options);
    response
      ?.then((res: any) => {
        console.log(JSON.stringify(res));
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  return (
    <div className='CollectElements' >
      <ComposableContainer
        id='composecontainer'
        container={container}
      >
        <CardHolderNameElement
          id='collectCardHolderName'
          container={container}
          table='pii_fields'
          classes={classes}
          placeholder='Cardholder Name'
          column='first_name'
        />
        <CardNumberElement
          id='collectCardNumber'
          container={container}
          table='pii_fields'
          classes={classes}
          placeholder='XXXX XXXX XXXX XXXX'
          column='card_number'
        />
        <CVVElement
          id='cvv'
          container={container}
          table='pii_fields'
          classes={cvvClasses}
          placeholder='CVC'
          column='cvv'
        />
      </ComposableContainer >

      <button onClick={handleCollect}>Collect</button>
    </div>
  );
};

export default CollectElements;
```

### Sample Response:

```javascript
{
    "records": [
        {
            "table": "pii_fields",
            "fields": {
                "first_name": "63b5eeee-3624-493f-825e-137a9336f882",
                "card_number": "f3907186-e7e2-466f-91e5-48e12c2bcbc1",
                "cvv": "7baf5bda-aa22-4587-a5c5-412f6f783a19",
            }
        }
    ]
}
```
For information on validations, see [validations](#validations).

## Set an event listener on Composable Elements:

You can communicate with Skyflow Elements by listening to element events:

The SDK supports four events:

- `CHANGE`: Triggered when the Element's value changes.
- `READY`: Triggered when the Element is fully rendered.
- `FOCUS`: Triggered when the Element gains focus.
- `BLUR`: Triggered when the Element loses focus.

The handler `function(state) => void` is a callback function you provide that's called when the event is fired with a state object that uses the following schema:

```javascript
state : {
  elementType: Skyflow.ElementType
  isEmpty: boolean 
  isFocused: boolean
  isValid: boolean
  value: string
}
```
`Note`: Events only include element values when in the state object when env is `DEV`. By default, value is an empty string.

### Example Usage of Event Listener on Composable Elements

```jsx
import React from 'react';
import {
  CardNumberElement,
  CVVElement,
  useMakeSkyflowStyles,
  useComposableContainer,
  ComposableContainer,
  CardHolderNameElement,
} from 'skyflow-react-js';

const CollectElements = () => {

  const useStyles = useMakeSkyflowStyles({
    inputStyles: {
      base: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '21px',
        color: '#1d1d1d',
        padding: '0px 16px'
      },
      complete: {},
      empty: {},
      focus: {},
      invalid: {},
    },
    labelStyles: {},
    errorTextStyles: {
      base: {
        display: 'none'
      },
    },
  });

  const classes = useStyles();

  const handleOnChange = (changeState: any) => {
    console.log('Value', changeState);
  };
  const handleOnBlur = (changeState: any) => {
    console.log('Blur', changeState);
  };

  const handleOnFocus = (changeState: any) => {
    console.log('Focus', changeState);
  };

  const handleOnReady = (changeState: any) => {
    console.log('Ready', changeState);
  }

  const containerOptions = {
    layout: [1, 2],
    styles: {
      base: {
        border: '1px solid #DFE3EB',
        padding: '8px',
        borderRadius: '4px',
        margin: '12px 2px',
      }
    }
  }
  const container = useComposableContainer(containerOptions);


  const handleCollect = () => {
    const response = container?.collect();
    response
      ?.then((res: any) => {
        console.log(JSON.stringify(res));
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  return (
    <div className='CollectElements' >
      <ComposableContainer
        id='composecontainer'
        container={container}
      >
        <CardHolderNameElement
          id='collectCardHolderName'
          container={container}
          table='pii_fields'
          classes={classes}
          placeholder='Cardholder Name'
          column='first_name'
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          onReady={handleOnReady}
        />
        <CardNumberElement
          id='collectCardNumber'
          container={container}
          table='pii_fields'
          classes={classes}
          placeholder='XXXX XXXX XXXX XXXX'
          column='card_number'
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          onReady={handleOnReady}
        />
        <CVVElement
          id='cvv'
          container={container}
          table='pii_fields'
          classes={classes}
          placeholder='CVC'
          column='cvv'
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          onReady={handleOnReady}
        />
      </ComposableContainer >

      <button onClick={handleCollect}>Collect</button>
    </div>
  );
};

export default CollectElements;
```
### Set an event listener on a composable container


Currently, the SDK supports one event:
- `SUBMIT`: Triggered when the `Enter` key is pressed in any container element.

The handler `function(void) => void` is a callback function you provide that's called when the `SUBMIT' event fires.

### Example usage of event listener on composable container
```javascript
import React from 'react';
import {
  CardNumberElement,
  CVVElement,
  useMakeSkyflowStyles,
  useComposableContainer,
  ComposableContainer,
  CardHolderNameElement,
} from 'skyflow-react-js';

const ComposableElements = () => {

  const useStyles = useMakeSkyflowStyles({
    inputStyles: {
      base: {
        color: '#1d1d1d',
      },
    },
    labelStyles: {},
    errorTextStyles: {
      base: {
        display: 'none'
      },
    },
  });

  const classes = useStyles();

  
  const handleOnSubmit = () => {
    // Your implementation when the SUBMIT(enter) event occurs.
    console.log('Submit Event Listener is being Triggered.');
  };

  const containerOptions = {
    layout: [1, 2],
    styles: {
      base: {
        border: '1px solid #DFE3EB',
        padding: '8px',
        borderRadius: '4px',
        margin: '12px 2px',
      }
    }
  }

  const container = useComposableContainer(containerOptions);


  const handleCollect = () => {
    const response = container?.collect();
    response
      ?.then((res: any) => {
        console.log(JSON.stringify(res));
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  return (
    <div className='CollectElements' >
      <ComposableContainer
        id='composecontainer'
        container={container}
        onSubmit={handleOnSubmit} // Pass onSubmit handler.
      >
        <CardHolderNameElement
          id='collectCardHolderName'
          container={container}
          table='pii_fields'
          classes={classes}
          placeholder='Cardholder Name'
          column='first_name'
        />
        <CardNumberElement
          id='collectCardNumber'
          container={container}
          table='pii_fields'
          classes={classes}
          placeholder='XXXX XXXX XXXX XXXX'
          column='card_number'
        />
        <CVVElement
          id='cvv'
          container={container}
          table='pii_fields'
          classes={classes}
          placeholder='CVC'
          column='cvv'
        />
      </ComposableContainer >

      <button onClick={handleCollect}>Collect</button>
    </div>
  );
};

export default ComposableElements;

```

## Securely revealing data client-side
-  [**Retrieving data from the vault**](#retrieving-data-from-the-vault)
-  [**Using Skyflow Elements to reveal data**](#using-skyflow-elements-to-reveal-data)
-  [**Render a file with a File Element**](#render-a-file-with-a-file-element)

## Retrieving data from the vault

For non-PCI use-cases, retrieving data from the vault and revealing it in the browser can be done either using the SkyflowID's, unique column values as described below

- ### Using Skyflow ID's or Unique Column Values
    You can retrieve data from the vault with the get(records) method using either Skyflow IDs or unique column values.

    The records parameter accepts a JSON object that contains an array of either Skyflow IDs or unique column names and values.

    Note: You can use either Skyflow IDs  or unique values to retrieve records. You can't use both at the same time.

    Skyflow.RedactionTypes accepts four values:
    - `PLAIN_TEXT`
    - `MASKED`
    - `REDACTED`
    - `DEFAULT`

    You must apply a redaction type to retrieve data.

#### Schema (Skyflow IDs)

```javascript
data = {
 records: [
   {
     ids: ["SKYFLOW_ID_1", "SKYFLOW_ID_2"],      // List of skyflow_ids for the records to fetch.
     table: "NAME_OF_SKYFLOW_TABLE",             // Name of table holding the records in the vault.
     redaction: Skyflow.RedactionType,           // Redaction type to apply to retrieved data.
   },
 ],
};
```
#### Schema (Unique column values)

```javascript
data = {
 records: [
   {
     table: "NAME_OF_SKYFLOW_TABLE",        // Name of table holding the records in the vault.
     columnName: "UNIQUE_COLUMN_NAME",      // Unique column name in the vault.
     columnValues: [                        // List of given unique column values. 
       "<COLUMN_VALUE_2>",
       "<COLUMN_VALUE_3>",
     ],                                     // Required when specifying a unique column
     redaction: Skyflow.RedactionType,      // Redaction type applies to retrieved data.
   },
 ],
};
```
Example usage (Skyflow IDs)

```jsx
import React from 'react';
import {
    useSkyflow
} from 'skyflow-react-js';

const GetRecords = () => {

    const skyflow = useSkyflow()

    const handleGetMethod = () => {
        const response = skyflow.get({
            records: [{
                    ids: ['f8d8a622-b557-4c6b-a12c-c5ebe0b0bfd9'],
                    table: 'cards',
                    redaction: Skyflow.RedactionType.PLAIN_TEXT,
                },
                {
                    ids: ["da26de53-95d5-4bdb-99db-8d8c66a35ff9"],
                    table: "contacts",
                    redaction: Skyflow.RedactionType.PLAIN_TEXT,
                },
            ],
        });
        response.then((res: any) => {
                console.log(res)
            })
            .catch((e: any) => {
                console.log(e)
            });
    }
	return ( 
    <div id = 'get-div' >
		<button id = 'get-button' onClick = {callGet} > Get Records </button>  
    </div >
	)
}
```
Example response

```javascript
{
   "records": [
       {
           "fields": {
              "card_number": "4111111111111111",
              "cvv": "127",
              "expiry_date": "11/2035",
              "fullname": "myname",
              "id": "f8d8a622-b557-4c6b-a12c-c5ebe0b0bfd9"
           },
           "table": "cards"
       }
   ],
   "errors": [
       {
           "error": {
              "code": "404",
              "description": "No Records Found"
           },
           "ids": ["da26de53-95d5-4bdb-99db-8d8c66a35ff9"]
       }
   ]
}
```

Example usage (Unique column values)

```jsx
import React from 'react';
import {
	useSkyflow
} from 'skyflow-react-js';

const GetRecords = () => {

	const skyflow = useSkyflow()

	const handleGetMethod = () => {
		const response = skyflow.get({
			records: [{
				table: "cards",
				redaction: RedactionType.PLAIN_TEXT,
				columnName: "card_id",
				columnValues: ["123", "456"],
			}],
		});
		response.then((res: any) => {
				console.log(res)
			})
			.catch((e: any) => {
				console.log(e)
			});
	}
	return ( 
    <div id = 'get-div' >
		<button id = 'get-button' onClick = {callGet} > Get Records </button>  
    </div >
	)
}
```

Sample response: 
```javascript
{
   "records": [
       {
           "fields": {
               "card_id": "123",
               "expiry_date": "11/35",
               "fullname": "myname",
               "id": "f8d2-b557-4c6b-a12c-c5ebfd9"
           },
           "table": "cards"
       },
       {
           "fields": {
               "card_id": "456",
               "expiry_date": "10/23",
               "fullname": "sam",
               "id": "da53-95d5-4bdb-99db-8d8c5ff9"
           },
           "table": "cards"
       }
   ]
}
```

## Using Skyflow Elements to reveal data

Skyflow Elements can be used to securely reveal data in a browser without exposing your front end to the sensitive data. This is great for use cases like card issuance where you may want to reveal the card number to a user without increasing your PCI compliance scope.

### Step 1: Create a container

To start, create a container using the `useRevealContainer()` method of the Skyflow client as shown below.

```jsx
const revealContainer = useRevealContainer()
```

### Step 2: Create a reveal element

```jsx
import {RevealElement} from 'skyflow-react-js';
import Skyflow from 'skyflow-js';

<RevealElement
  token='<DATA_TOKEN>'
  container='<CONTAINER>'
  ...props
/>
```

The following `props` can be passed to Skyflow reveal element:

```javascript
{
  container: 'RevealContainer', // Required, the reveal container.
  token:'string',               // Required, the actual data token.
  id: string,                   // Optional, id that can passed to the element.
  classes: {},                  // Optional, styles that should be applied to the element.
  label: 'string',              // Optional, label for the form element.
  redaction: Skyflow.RedactionType // Optional. Redaction to apply for retrieved data. E.g. RedactionType.MASKED
}
```

`Note`:

- The `inputStyles`, `labelStyles` and `errorTextStyles` parameters accepts a styles object as described in the [previous section](#step-2-create-a-collect-element) for collecting data. But for reveal element, `inputStyles` accepts only `base` variant and `copyIcon` and `global` style objects.
- `redaction` defaults to `RedactionType.PLAIN_TEXT`.

#### Redaction Types

There are four accepted values for RedactionType:

- PLAIN_TEXT
- MASKED
- REDACTED
- DEFAULT


### End to end example using Reveal Element

```jsx
import React from 'react'
import { RevealElement, useRevealContainer, useMakeSkyflowStyles } from 'skyflow-react-js'
import Skyflow from 'skyflow-js';

const App = () => {
  const revealContainer = useRevealContainer()

  const useStyles = useMakeSkyflowStyles({
    inputStyles: {
      base: {
        border: '1px solid black',
        borderRadius: '4px',
        color: '#1d1d1d',
        padding: '10px 16px',
        fontFamily: '"Roboto", sans-serif'
      },
      copyIcon: {
        position: 'absolute',
        right: '8px',
        top: 'calc(50% - 10px)',
      },
      global: {
        '@import' :'url("https://fonts.googleapis.com/css2?family=Roboto&display=swap")',
      }
    },
    labelStyles: {
      base: {
        fontSize: '16px',
        fontWeight: 'bold',
        fontFamily: '"Roboto", sans-serif'
      },
      global: {
        '@import' :'url("https://fonts.googleapis.com/css2?family=Roboto&display=swap")',
      }      
    },
    errorTextStyles: {
      base: {
        color: 'red',
        fontFamily: '"Roboto", sans-serif'
      },
      global: {
        '@import' :'url("https://fonts.googleapis.com/css2?family=Roboto&display=swap")',
      }
    },
  })

  const handleReveal = () => {
    revealContainer
      .reveal()
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const classes = useStyles()

  return (
    <div className='App'>
      <header className='App-header'>
        <RevealElement
          container={revealContainer}
          token={'1404-8379-9069-7378'}
          label={'Reveal Card Number'}
          classes={classes}
          redaction={Skyflow.RedactionType.MASKED}
        />

        <RevealElement
          container={revealContainer}
          token={'89024714-6a26-4256-b9d4-55ad69aa4047'}
          label={'Reveal Card Holder Name'}
          classes={classes}
          redaction={Skyflow.RedactionType.DEFAULT}
        />

        <button onClick={handleReveal}>Reveal</button>
      </header>
    </div>
  )
}

export default App
```

### Sample Response

```javascript
{
  "success": [
    {
      "token": "1404-8379-9069-7378"
    }
  ],
  "errors": [
    {
      "token": "89024714-6a26-4256-b9d4-55ad69aa4047",
      "error": {
        "code": 404,
        "description": "Tokens not found for 89024714-6a26-4256-b9d4-55ad69aa4047"
      }
    }
  ]
}
```

## Render a file with a File Element

You can render files using the Skyflow File Element. Use the following steps to securely render a file.

## Step 1: Create a container

To start, create a container using the `useRevealContainer()` method of the Skyflow client as shown below.

```jsx
const revealContainer = useRevealContainer()
```

## Step 2: Create a File Element
Define a Skyflow Element to render the file as shown below.

```jsx
import {FileRenderElement} from 'skyflow-react-js';
import Skyflow from 'skyflow-js';

<FileRenderElement
  id= 'string'        // Required, id that can passed to the element, it should be unique.
  skyflowID= 'string' // Required, skyflow id of the file to be render
  column= 'string'    // Required, column name of the file to be render
  table= 'string'     // Required, table name of the file to be render
  ...props
/>
```
The following `props` can be passed to Skyflow file render element:

```javascript
{
  container: 'RevealContainer', // Required, the reveal container.
  id: 'string',                 // Required, id that can passed to the element, it should be unique.
  classes: {},                  // Optional, styles that should be applied to the element.
  altText: 'string',            // Optional, string that is shown before file render call
  skyflowID: 'string',          // Required, skyflow id of the file to be render
  column: 'string',             // Required, column name of the file to be render
  table: 'string',              // Required, table name of the file to be render
}
```

The inputStyles and errorTextStyles parameters accept a styles object as described in the[previous section](#step-2-create-a-collect-element) for collecting data. But for render file elements, inputStyles accepts only base variant, global style objects.

An example of a inputStyles object:

```javascript
inputStyles: {
  base: {
      height: '400px',
      width: '300px',
  },
  global: {
    '@import' :'url("https://fonts.googleapis.com/css2?family=Roboto&display=swap")',
  }
}
```
An example of a errorTextStyles object:
```javascript
errorTextStyles: {
  base: {
    color: '#f44336',
  },
  global: {
    '@import' :'url("https://fonts.googleapis.com/css2?family=Roboto&display=swap")',
  }
}
```

## Step 3: Render File

When the element is created and mounted, use useRenderFile(id) hook to pass the div id of file render element and  call the renderFile() method on the file render element instance return by useRenderFile(id) as shown below:

```javascript
const fileElement = useRenderFile('fileElement-1');

fileElement
  .renderFile()
  .then(data => {
    // Handle success.
  })
  .catch(err => {
    // Handle error.
  });
```

`Note`: The div id passed in the element should be unique, and the same div id should be passed in the useRenderFile('id') hook.

## End to end example of file render

```javascript
import React, { useEffect, useState } from 'react';
import {
  useMakeSkyflowStyles,
  useRevealContainer,
  useRenderFile,
  FileRenderElement,
} from 'skyflow-react-js';

const App = () => {
  const revealContainer = useRevealContainer();

  const [visible , setVisible] = useState(false);
  const [skyflowID, updateSkyflowID] = useState('');

  // REPLACE with your custom implementation to fetch skyflow_id from backend service.
  // Sample implementation
  useEffect(() => {
    fetch('<BACKEND_URL>')
      .then((response: any) => {

      // on successful fetch skyflow_id
      const skyflowID = response.skyflow_id;

      // set skyflow id
      updateSkyflowID(skyflowID);
      setVisible(true);

      }).catch((error) => {
      // failed to fetch skyflow_id
      console.log(error);
    });
  }, []);

  // pass file render element div id in useRenderFile hook
  const render = useRenderFile('fileElement-1');

  const handleRender = () => {
    // call render file method
    render?.renderFile().then((data) => console.log(data)).catch( err => console.log(err));
  }

  const useStyles = useMakeSkyflowStyles({
    inputStyles: {
      base: {
        height: '300px',
        width: '400px',
      },
    },
    errorTextStyles: {
      base: {
        color: 'red',
        fontFamily: '"Roboto", sans-serif'
      },
      global: {
        '@import' :'url("https://fonts.googleapis.com/css2?family=Roboto&display=swap")',
      },
    },
  });


  const classes = useStyles()

  return (
    <div className='App'>
      <header className='App-header'>
      <h4>Render PDF</h4>
      { visible &&  <FileRenderElement // create element, pass fetched skyflow id and other details here.
        id={'fileElement-1'}
        container={revealContainer}
        classes={classes}
        skyflowID={skyflowID}
        column={'file'}
        table={'credit_cards'}
        altText={'Image File'}
      /> }
      <button onClick={handleRender}>Reveal</button>
      </header>
    </div>
  )
}

export default App
```

## Sample Success Response
```json
{
  "success": [
     {
     "skyflow_id": "b63ec4e0-bbad-4e43-96e6-6bd50f483f75",
     "column": "file"
   },
  ]
}
```

## Reporting a Vulnerability

If you discover a potential security issue in this project, please reach out to us at security@skyflow.com. Please do not create public GitHub issues or Pull Requests, as malicious actors could potentially view them.

## License

This project is licensed under the MIT license. See the [LICENSE](https://github.com/skyflowapi/skyflow-react-js/blob/master/LICENSE) file for more info.
