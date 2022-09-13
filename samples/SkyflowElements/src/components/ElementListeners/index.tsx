/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import React from 'react'
import {
  CardNumberElement,
  InputFieldElement,
  useCollectContainer,
  useMakeSkyflowStyles,
} from 'skyflow-react-js'

function ElementListners() {
  const container = useCollectContainer()

  const handleOnChange = (changeState: any) => {
    console.log('Value', changeState)
  }
  const handleOnBlur = (changeState: any) => {
    console.log('Blur', changeState)
  }

  const handleOnFocus = (changeState: any) => {
    console.log('Focus', changeState)
  }

  const handleOnReady = (changeState: any) => {
    console.log('Ready', changeState)
  }

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

  return (
    <div className='ElementListners' style={{ width: '300px' }}>
      <CardNumberElement
        id={'eventListnerCollectElement'}
        container={container}
        table={'table1'}
        classes={classes}
        column={'card_number'}
        label={'Collect Card Number'}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
        onReady={handleOnReady}
      />

      <InputFieldElement
        id='eventListnerInputField'
        container={container}
        classes={classes}
        table={'table1'}
        column={'ssn'}
        label={'SSN'}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
        onReady={handleOnReady}
      />
    </div>
  )
}

export default ElementListners
