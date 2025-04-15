import React from 'react';
import {
  CardNumberElement,
  useCollectContainer,
  useMakeSkyflowStyles,
  CardHolderNameElement,
  CVVElement,
  PinElement,
  InputFieldElement,
} from 'skyflow-react-js';

const Masking = () => {
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
    <div>
      <CardNumberElement
        id={'collectCardNumber'}
        container={container}
        table={'cards'}
        classes={classes}
        column={'card_number'}
        label='Card number'
        options={{masking: true}}
      />
      <CardHolderNameElement
        id={'collectCardholderName'}
        container={container}
        table={'cards'}
        classes={classes}
        column={'cardholder_name'}
        label='Name'
        options={{required: true, masking: false}}
      />
      <CVVElement
        id={'collectCvv'}
        container={container}
        table={'cards'}
        classes={classes}
        column={'card_cvv'}
        label='cvv'
        options={{masking: true, maskingChar: "#"}}
      />
      <PinElement
        id={'collectPin'}
        container={container}
        table={'cards'}
        classes={classes}
        column={'card_pin'}
        label='Pin'
        options={{masking: true, maskingChar: "&"}}
      />
      <InputFieldElement
        id={'collectSSN'}
        container={container}
        table={'cards'}
        classes={classes}
        column={'ssn'}
        label='SSN'
        options={{format: 'XXX-XX-XXXX', masking: true}}
      />
      <button onClick={handleCollect}>Collect</button>
    </div>
  );
};

export default Masking;