/*
  Copyright (c) 2022 Skyflow, Inc.
*/
import React, { useEffect, useState } from 'react'
import {
  useMakeSkyflowStyles,
  useRevealContainer,
  useRenderFile,
  FileRenderElement,
} from 'skyflow-react-js'

const FileRender = () => {
  const revealContainer = useRevealContainer()
  const [visible, setVisible] = useState(false)
  const [skyflowID, updateSkyflowID] = useState('')

  // REPLACE with your custom implementation to fetch skyflow_id from backend service.
  // Sample implementation
  useEffect(() => {
    fetch('<BACKEND_URL>')
      .then((data: any) => {
        const skyflowID = data.skyflow_id
        updateSkyflowID(skyflowID)
        setVisible(true)
      })
      .catch((error) => {
        // Handle errors here
        console.error('Fetch error:', error)
      })
  }, [])

  // pass file render element div id in useRenderFile hook
  const render = useRenderFile('fileElement-1')

  const handleRender = () => {
    // call render file method
    render
      ?.renderFile()
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
  }
  const useStyles = useMakeSkyflowStyles({
    inputStyles: {
      base: {
        height: '300px',
        width: '400px',
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

  return (
    <div className='RevealElement' style={{ width: '300px' }}>
      <h4>Render PDF</h4>
      {visible && (
        <FileRenderElement // create element, pass fetched skyflow id and other details here
          id={'fileElement-1'}
          container={revealContainer}
          classes={classes}
          skyflowID={skyflowID} // pass skyflow id here
          column={'file'}
          table={'table4'}
          altText={'Image File'}
        />
      )}
      <button onClick={handleRender}>Render Files</button>
    </div>
  )
}

export default FileRender
