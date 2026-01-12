/*
  Copyright (c) 2022 Skyflow, Inc.
*/
import React from 'react'
import Skyflow from 'skyflow-js'
import { FileRenderElement, RevealElement, useMakeSkyflowStyles, useRenderFile, useRevealContainer } from 'skyflow-react-js'

const RevealComponents = () => {
  // Initialize container for revealing sensitive data
  const revealContainer = useRevealContainer()

  if (!revealContainer) {
    return <div>Loading...</div>
  }

  // Styles for reveal elements (text fields)
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
  
  // Styles specifically for file rendering
  const useRenderStyles = useMakeSkyflowStyles({
    inputStyles: {
      base: {
        height: '300px',
        border: '1px solid black',
        borderRadius: '4px',
        color: '#1d1d1d',
        padding: '10px 16px',
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
  const renderClasses = useRenderStyles()

  // Handle reveal action for all elements in container
  const handleReveal = () => {
    revealContainer
      .reveal()
      .then((res: any) => console.log(res))
      .catch((err: any) => console.log(err))
  }

  // Initialize file renderer with element ID
  const render = useRenderFile('fileElement-1')

  // Handle file rendering action
  const handleRender = () => {
    render
      ?.renderFile()
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
  }

  return (
    <div className='RevealElement' style={{ width: '300px' }}>
      <h2>Reveal Elements</h2>
      
      {/* Reveal elements */}
      <RevealElement
        id={'RevealElement-1'}
        container={revealContainer}
        token='<TOKEN_1>'
        label={'Reveal Card Number'}
        classes={classes}
        redaction={Skyflow.RedactionType.PLAIN_TEXT}
        altText={'card number'}
      />

      <RevealElement
        id={'RevealElement-2'}
        container={revealContainer}
        token='<TOKEN_2>'
        label={'Reveal CVV'}
        classes={classes}
        redaction={Skyflow.RedactionType.DEFAULT}
        altText={'reveal cvv'}
      />

      {/* File render element */}
      <FileRenderElement
        id={'fileElement-1'}
        container={revealContainer}
        skyflowID={'<SKYFLOW_ID>'}
        classes={renderClasses}
        column={'<COLUMN_NAME>'}
        table={'<TABLE_NAME>'}
        altText={'Image File'}
      />

      {/* Action buttons */}
      <button onClick={handleReveal}>Reveal</button>
      <button onClick={handleRender}>Render File</button>
    </div>
  )
}

export default RevealComponents
