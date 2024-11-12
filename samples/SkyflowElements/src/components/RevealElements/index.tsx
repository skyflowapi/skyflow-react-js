/*
Copyright (c) 2022 Skyflow, Inc.
*/
import React from 'react';
import Skyflow from 'skyflow-js';
import {
  RevealElement,
  useMakeSkyflowStyles,
  useRevealContainer,
} from 'skyflow-react-js';

const RevealElements = () => {
  const revealContainer = useRevealContainer();

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
      },
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

  const handleReveal = () => {
    revealContainer
      .reveal()
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  return (
    <div className='RevealElement' style={{width: '300px'}}>
      <RevealElement
        id={'revealElement-1'}
        container={revealContainer}
        token=''
        label={'Reveal Card Number'}
        classes={classes}
        redaction={Skyflow.RedactionType.PLAIN_TEXT}
      />

      <RevealElement
        id={'revealElement-2'}
        container={revealContainer}
        token=''
        label={'Reveal CVV Number'}
        classes={classes}
        redaction={Skyflow.RedactionType.DEFAULT}
      />

      <button onClick={handleReveal}>Reveal</button>
    </div>
  );
};

export default RevealElements;
