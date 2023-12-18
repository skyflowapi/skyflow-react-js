/*
  Copyright (c) 2022 Skyflow, Inc.
*/
import React, { useState } from 'react'
import Skyflow from 'skyflow-js'
import { RevealElement, useMakeSkyflowStyles, useRevealContainer } from 'skyflow-react-js'

const DynamicRevealElements = () => {
  const [cardNumberLabel, setCardNumberLabel] = useState<string>('card number')
  const [cvvAltText, setCvvAltText] = useState<string>('cvv')

  const revealContainer = useRevealContainer()

  const useStyles = useMakeSkyflowStyles({
    inputStyles: {
      base: {
        border: '1px solid black',
        borderRadius: '4px',
        color: '#1d1d1d',
        padding: '10px 16px',
        fontFamily: '"Roboto", sans-serif',
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
        '@import': 'url("https://fonts.googleapis.com/css2?family=Roboto&display=swap")',
      },
    },
    labelStyles: {
      base: {
        fontSize: '16px',
        fontWeight: 'bold',
        fontFamily: '"Roboto", sans-serif',
      },
      global: {
        '@import': 'url("https://fonts.googleapis.com/css2?family=Roboto&display=swap")',
      },
    },
    errorTextStyles: {
      base: {
        color: 'red',
        fontFamily: '"Roboto", sans-serif',
      },
      global: {
        '@import': 'url("https://fonts.googleapis.com/css2?family=Roboto&display=swap")',
      },
    },
  })
  const classes = useStyles()

  const handleReveal = () => {
    revealContainer
      .reveal()
      .then((res: any) => {
        console.log(res)
      })
      .catch((err: any) => {
        console.log(err)
      })
  }

  const handleUpdate = () => {
    setCardNumberLabel('Reveal Card Number')
    setCvvAltText('***')
  }
  return (
    <div className='DynamicRevealElement' style={{ width: '300px' }}>
      <RevealElement
        id={'dynamicRevealElement-1'}
        container={revealContainer}
        token=''
        label={cardNumberLabel}
        classes={classes}
        redaction={Skyflow.RedactionType.PLAIN_TEXT}
        altText={'card number'}
      />

      <RevealElement
        id={'dynamicRevealElement-2'}
        container={revealContainer}
        token=''
        label={'Reveal CVV Number'}
        classes={classes}
        redaction={Skyflow.RedactionType.DEFAULT}
        altText={cvvAltText}
      />

      <button onClick={handleReveal}>Reveal</button>
      <button onClick={handleUpdate}>Update</button>
    </div>
  )
}

export default DynamicRevealElements
