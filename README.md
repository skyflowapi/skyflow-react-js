# skyflow-react-js

A React wrapper for [Skyflow JS SDK](https://github.com/skyflowapi/skyflow-js)

---

## Table of Contents

- [**Including Skyflow-React**](#Including-Skyflow-React)
  - [Requirements](#requirements)
- [**Initializing Skyflow-React**](#Initializing-Skyflow-React)
- [**Securely collecting data client-side**](#Securely-collecting-data-client-side)
- [**Securely collecting data client-side using Composable Elements**](#Securely-collecting-data-client-side-using-composable-elements)
- [**Securely revealing data client-side**](#Securely-revealing-data-client-side)
- [**Reporting a Vulnerability**](#Reporting-Vulnerability)
- [**License**](#License)

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

- [**Using Skyflow Elements to collect data**](#using-skyflow-elements-to-collect-data)
- [**Event Listener on Collect Elements**](#event-listener-on-collect-elements)

### Using Skyflow Elements to collect data

**Skyflow Elements** provide developers with pre-built form elements to securely collect sensitive data client-side. These elements are hosted by Skyflow and injected into your web page as iFrames. This reduces your PCI compliance scope by not exposing your front-end application to sensitive data. Follow the steps below to securely collect data with Skyflow Elements.

### Step 1: Create a container

First create a container for the form elements using the `useCollectContainer` hook as show below:

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

The states that are available for `labelStyles` are `base` and `focus`.

An example of a labelStyles object:

```jsx
labelStyles: {
  base: {
    fontSize: '12px',
    fontWeight: 'bold'
  },
  focus: {
    color: '#1d1d1d'
  }
}
```

The state that is available for `errorTextStyles` is only the `base` state, it shows up when there is some error in the collect element.

An example of a errorTextStyles object:

```jsx
errorTextStyles: {
  base: {
    color: '#f44336',
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

The InputFieldElement type is a custom UI element without any built-in validations. See the section on [validations](#validations) for more information on validations.

Along with Collect Element we can define other options which takes a object of optional parameters as described below:

```jsx
const options = {
  required: false, // Optional, indicates whether the field is marked as required. Defaults to 'false'.
  enableCardIcon: true, // Optional, indicates whether card icon should be enabled (only applicable for CARD_NUMBER ElementType).
  format: String, // Optional, format for the element (only applicable currently for EXPIRATION_DATE ElementType).
  enableCopy: false, // Optional, enables the copy icon in collect and reveal elements to copy text to clipboard. Defaults to 'false').
}
```

`required` parameter indicates whether the field is marked as required or not. If not provided, it defaults to false

`enableCardIcon` parameter indicates whether the icon is visible for the CARD_NUMBER element, defaults to true

`format` parameter takes string value and indicates the format pattern applicable to the element type, It's currently only applicable to `EXPIRATION_DATE` and `EXPIRATION_YEAR` element types.

`enableCopy` parameter indicates whether the copy icon is visible in collect and reveal elements.

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

```javascript
const options = {
  tokens: true, // Optional, indicates whether tokens for the collected data should be returned. Defaults to 'true'
  additionalFields: {
    records: [
      {
        table: 'string', // Table into which record should be inserted
        fields: {
          column1: 'value', // Column names should match vault column names
          // ...additional fields here
        },
      },
      // ...additional records here
    ],
  }, // Optional
  upsert: [
    // Upsert operations support in the vault
    {
      table: 'string', // Table name
      column: 'value', // Unique column in the table
    },
  ], //Optional
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

```javascript
{
   "records": [
       {
           "table": "cards",
           "fields": {
               "cardNumber": "f3907186-e7e2-466f-91e5-48e12c2bcbc1",
               "cvv": "l4907186-e7e2-466f-91e5-985e12c2bcbc1"
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
Values of SkyflowElements will be returned in elementstate object only when `env` is `DEV`, else it is empty string i.e, ''

### Example Usage of Event Listener on Collect Elements

```jsx
import React from 'react'
import { CardNumberElement, useCollectContainer } from 'skyflow-react-js'

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
  elementType: 'CARD_NUMBER'
  isEmpty: false
  isFocused: true
  isValid: false
  value: '411'
}
```

#### Sample Element state object when `env` is `PROD`

```javascript
{
  elementType: 'CARD_NUMBER'
  isEmpty: false
  isFocused: true
  isValid: false
  value: ''
}
```
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
        },
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
  }
    errorStyles: {
    base: {
      color: "#0FE470",
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
}
```
The `labelStyles` field supports the `base` and `focus` states.

An example `labelStyles` object:

```javascript
labelStyles: {
  base: {
    fontSize: '12px',
      fontWeight: 'bold'
  },
  focus: {
    color: '#1d1d1d'
  }
}
```
The `errorTextStyles` field only supports the `base` state, which appears when there is an error in the composable element.

An example `errorTextStyles` object:

```javascript
errorTextStyles: {
  base: {
    color: '#f44336'
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
`Note`: Events only include element values when in the state object when env is DEV. By default, value is an empty string.

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

## Securely revealing data client-side

### Using Skyflow Elements to reveal data

Skyflow Elements can be used to securely reveal data in a browser without exposing your front end to the sensitive data. This is great for use cases like card issuance where you may want to reveal the card number to a user without increasing your PCI compliance scope.

### Step 1: Create a container

To start, create a container using the `useRevealContainer()` method of the Skyflow client as shown below.

```jsx
const revealContainer = useRevealContainer()
```

### Step 2: Create a reveal element

```jsx
import {RevealElement} from 'skyflow-react-js';

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
}
```

`Note`:

The `inputStyles`, `labelStyles` and `errorTextStyles` parameters accepts a styles object as described in the [previous section](#step-2-create-a-collect-element) for collecting data. But for reveal element, `inputStyles` accepts only `base` variant and `copyIcon` style object.

### End to end example using Reveal Element

```jsx
import React from 'react'
import { RevealElement, useRevealContainer, useMakeSkyflowStyles } from 'skyflow-react-js'

const App = () => {
  const revealContainer = useRevealContainer()

  const useStyles = useMakeSkyflowStyles({
    inputStyles: {
      base: {
        border: '1px solid black',
        borderRadius: '4px',
        color: '#1d1d1d',
        padding: '10px 16px',
      },
      copyIcon: {
        position: 'absolute',
        right: '8px',
        top: 'calc(50% - 10px)',
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
      "token": "b63ec4e0-bbad-4e43-96e6-6bd50f483f75"
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

## Reporting a Vulnerability

If you discover a potential security issue in this project, please reach out to us at security@skyflow.com. Please do not create public GitHub issues or Pull Requests, as malicious actors could potentially view them.

## License

This project is licensed under the MIT license. See the [LICENSE](https://github.com/skyflowapi/skyflow-react-js/blob/master/LICENSE) file for more info.
