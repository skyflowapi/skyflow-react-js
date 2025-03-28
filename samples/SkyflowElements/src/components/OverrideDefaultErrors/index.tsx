/*
	Copyright (c) 2022 Skyflow, Inc.
*/
import React from 'react';
import {
  CardNumberElement,
  useCollectContainer,
  useMakeSkyflowStyles,
  CardHolderNameElement,
  SkyflowCollectElementRef,
} from 'skyflow-react-js';

const OverrideDefaultErrors = () => {
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

  const cardNumberRef = React.useRef<SkyflowCollectElementRef | null>(null);

  const cardholderNameRef = React.useRef<SkyflowCollectElementRef | null>(null);

  const onCardNumberBlur = (state: any) => {
    if(state.isEmpty){
      //can override the message when the field is required and empty
      cardNumberRef.current?.setErrorOverride("custom error for required");
    } else if(!state.isValid){
      //can override the message when the input is invalid
      cardNumberRef.current?.setErrorOverride("custom error for invalid number");
    }
  }

  const onCardholderNameBlur = (state: any) => {
    if(state.isEmpty){
      //can override the message when the field is required and empty
      cardholderNameRef.current?.setErrorOverride("custom error for required");
    } else if(!state.isValid){
      //can override the message when the input is invalid
      cardholderNameRef.current?.setErrorOverride("custom error for invalid name");
    }
  }

  return (
    <div className='CollectElements' style={{width: '300px'}}>
      <CardNumberElement
        id={'collectCardNumber'}
        container={container}
        table={'cards'}
        classes={classes}
        column={'card_number'}
        label='Card number'
        ref={cardNumberRef}
        options={{required:true}}
        onBlur={onCardNumberBlur}
      />
      <CardHolderNameElement
        id={'collectCardName'}
        container={container}
        table={'cards'}
        classes={classes}
        column={'cardholder_name'}
        label='Name'
        ref={cardholderNameRef}
        options={{required:true}}
        onBlur={onCardholderNameBlur}
      />
      <button onClick={handleCollect}>Collect</button>
    </div>
  );
};

export default OverrideDefaultErrors;