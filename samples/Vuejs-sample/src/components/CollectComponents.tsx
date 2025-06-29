import React from 'react';
import { 
  CardHolderNameElement, 
  CardNumberElement, 
  CVVElement, 
  ExpirationDateElement, 
  ExpirationMonthElement, 
  ExpirationYearElement, 
  FileInputElement, 
  InputFieldElement, 
  PinElement, 
  useCollectContainer, 
  useMakeSkyflowStyles 
} from 'skyflow-react-js';

export const CollectComponents: React.FC = () => {
  // Initialize Skyflow container for collecting sensitive data
  const container = useCollectContainer();

  if (!container) {
    return <div>Loading...</div>;
  }

  // Handler for collecting form data
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

  // Handler for file uploads
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

  // Define styles for Skyflow elements
  const useStyles = useMakeSkyflowStyles({
    // Input field styles
    inputStyles: {
      base: {
        border: '1px solid blue',
        borderRadius: '4px',
        color: 'red',
        padding: '10px 16px',
        fontFamily: '"Roboto", sans-serif',
      },
      complete: { color: '#4caf50' },
      empty: {},
      focus: {},
      invalid: { color: '#f44336' },
      global: {
        '@import': 'url("https://fonts.googleapis.com/css2?family=Roboto&display=swap")',
      }
    },
    // Label styles
    labelStyles: {
      base: {
        fontSize: '16px',
        fontWeight: 'bold',
        fontFamily: '"Roboto", sans-serif'
      },
      global: {
        '@import': 'url("https://fonts.googleapis.com/css2?family=Roboto&display=swap")',
      },
      requiredAsterisk: { color: 'red' }
    },
    // Error message styles
    errorTextStyles: {
      base: {
        color: 'red',
        fontFamily: '"Roboto", sans-serif',
      },
      global: {
        '@import': 'url("https://fonts.googleapis.com/css2?family=Roboto&display=swap")',
      },
    },
  });

  // File upload options (empty for now)
  const options = {}
  
  // Apply styles to elements
  const classes = useStyles();

  return (
    <div>
      <h1>Collect Components</h1>
      <CardNumberElement
        container={container}
        table="<TABLE_NAME>" // replace with actual table name
        column="<COLUMN_NAME>" // replace with actual column name
        placeholder="Card Number"
        classes={classes}
        label="Card Number"
      />
      <CardHolderNameElement
        container={container}
        table="<TABLE_NAME>" // replace with actual table name
        column="<COLUMN_NAME>" // replace with actual column name
        placeholder="Card holder name"
        classes={classes}
        label="Card Holder Name"
      />
      <CVVElement
        id='cvv'
        container={container}
        table='<TABLE_NAME>' // replace with actual table name
        classes={classes}
        column={'<CVV>'} // replace with actual column name
        label='Collect CVV'
        placeholder='CVV'
      />
      <ExpirationMonthElement
        id='month'
        container={container}
        classes={classes}
        table='<TABLE_NAME>' // replace with actual table name
        column={'<EXPIRATION_MONTH>'} // replace with actual column name
        label='Collect Exp Month'
        placeholder='MM'
      />
      <ExpirationYearElement
        id='year'
        container={container}
        classes={classes}
        table='<TABLE_NAME>' // replace with actual table name
        column={'<EXPIRATION_YEAR>'} // replace with actual column name
        label='Collect Exp Year'
        placeholder='YY'
      />
      <ExpirationDateElement
        id='date'
        container={container}
        classes={classes}
        table={'<TABLE_NAME>'} // replace with actual table name
        column={'<EXPIRATION_DATE>'} // replace with actual column name
        label={'Expiration Date'}
        placeholder='MM/YY'
      />

      <PinElement
        id='pin'
        container={container}
        classes={classes}
        table={'<TABLE_NAME>'}
        column={'<PIN>'} // replace with actual column name
        label={'Pin'}
        placeholder='122334'
      />
      
      <InputFieldElement
        id='input'
        container={container}
        classes={classes}
        table={'<TABLE_NAME>'}
        column={'<SSN>'} // replace with actual column name
        label={'SSN'}
        placeholder='123-45-6789'
      />
      <FileInputElement
        id='file-input'
        container={container}
        classes={classes}
        table={'<TABLE_NAME>'}
        column={'<COLUMN_NAME>'} // replace with actual column name
        skyflowID='<SKYFLOW_ID>'
        label={'file-input'}
        options={options}
      />
      <button onClick={handleCollect}>Collect</button>
      <button onClick={handleFile}>Submit file</button>
    </div>
  );
};


