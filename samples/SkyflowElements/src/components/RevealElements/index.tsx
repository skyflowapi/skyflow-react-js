/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import React from 'react'
import { RevealElement, useMakeSkyflowStyles, useRevealContainer } from 'skyflow-react-js'

function RevealElements() {
  const revealContainer = useRevealContainer()

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
  })
  const classes = useStyles()

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
  return (
    <div className='RevealElement' style={{ width: '300px' }}>
      <RevealElement
        id={'revealElement-1'}
        container={revealContainer}
        token=''
        label={'Reveal Card Number'}
        classes={classes}
      />

      <RevealElement
        id={'revealElement-2'}
        container={revealContainer}
        token=''
        label={'Reveal CVV Number'}
        classes={classes}
      />

      <button onClick={handleReveal}>Reveal</button>
    </div>
  )
}

export default RevealElements
