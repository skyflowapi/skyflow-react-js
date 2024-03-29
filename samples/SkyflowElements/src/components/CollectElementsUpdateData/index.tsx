/*
	Copyright (c) 2022 Skyflow, Inc.
*/
import React from 'react';
import {
  CardNumberElement,
  CVVElement,
  ExpirationMonthElement,
  ExpirationYearElement,
  PinElement,
  ExpirationDateElement,
  useCollectContainer,
  useMakeSkyflowStyles,
  InputFieldElement,
  FileInputElement,
} from 'skyflow-react-js';

const CollectElementsUpdateData = () => {
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
    allowedFileType: ['<allowedFileType1>','<allowedFileType2>']
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
        fontFamily: '"Roboto", sans-serif'
      },
      complete: {
        color: '#4caf50',
      },
      empty: {},
      focus: {},
      invalid: {
        color: '#f44336',
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
      },
      requiredAsterisk:{
        color: 'red'
      }
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

  const classes = useStyles();

  return (
    <div className='CollectElements' style={{width: '300px'}}>
      <CardNumberElement
        id={'collectCardNumber'}
        container={container}
        table={'table1'}
        classes={classes}
        column={'card_number'}
        label={'Collect Card Number'}
        skyflowID={'<SKYFLOW_ID>'}
      />

      <CVVElement
        id='cvv'
        container={container}
        table='table1'
        classes={classes}
        column={'cvv'}
        label='Collect CVV'
        skyflowID={'<SKYFLOW_ID>'}
      />

      <ExpirationMonthElement
        id='month'
        container={container}
        classes={classes}
        table='table1'
        column={'exp_month'}
        label='Collect Exp Month'
        placeholder='MM'
        skyflowID={'<SKYFLOW_ID>'}
      />

      <ExpirationYearElement
        id='year'
        container={container}
        classes={classes}
        table='table1'
        column={'exp_year'}
        label='Collect Exp Year'
        placeholder='YY'
        skyflowID={'<SKYFLOW_ID>'}
      />

      <ExpirationDateElement
        id='date'
        container={container}
        classes={classes}
        table={'table1'}
        column={'card_expiration'}
        label={'Expiration Date'}
        skyflowID={'<SKYFLOW_ID>'}
      />

      <PinElement
        id='pin'
        container={container}
        classes={classes}
        table={'table1'}
        column={'card_pin'}
        label={'Pin'}
        skyflowID={'<SKYFLOW_ID>'}
      />
      
      <InputFieldElement
        id='input'
        container={container}
        classes={classes}
        table={'table1'}
        column={'ssn'}
        label={'SSN'}
        skyflowID={'<SKYFLOW_ID>'}
      />

      <FileInputElement
        id='file-input'
        container={container}
        classes={classes}
        table={'table1'}
        column={'file'}
        skyflowID='<SKYFLOW_ID>'
        label={'file-input'}
        options={options}
      />

      <button onClick={handleFile}>Submit file</button>
      <button onClick={handleCollect}>Collect</button>
    </div>
  );
};

export default CollectElementsUpdateData;