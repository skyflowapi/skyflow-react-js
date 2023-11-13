/*
  Copyright (c) 2022 Skyflow, Inc.
*/
import React from 'react';
import {
  useMakeSkyflowStyles,
  useRevealContainer,
  useRenderFile,
  FileRenderElement,
} from 'skyflow-react-js';

const FileRender = () => {
  const revealContainer = useRevealContainer();

  const render = useRenderFile('fileElement-1');
  const render2 = useRenderFile('fileElement-2');

  const handleRender = () => {
    render?.renderFile().then((data) => console.log(data)).catch( err => console.log(err));
    render2?.renderFile().then((data) => console.log(data)).catch( err => console.log(err));
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
        fontFamily: '"Roboto", sans-serif'
      },
      global: {
        '@import' :'url("https://fonts.googleapis.com/css2?family=Roboto&display=swap")',
      },
    },
  });
  const classes = useStyles();

  return (
    <div className='RevealElement' style={{width: '300px'}}>
      <h4>Render PDF</h4>
      <FileRenderElement
        id={'fileElement-1'}
        container={revealContainer}
        classes={classes}
        skyflowID={'<SKYFLOW_ID>'}
        column={'file'}
        table={'credit_cards'}
        altText={'Image File'}

      />
      <h4>Render Image</h4>
      <FileRenderElement
        id={'fileElement-2'}
        container={revealContainer}
        classes={classes}
        skyflowID={'<SKYFLOW_ID>'}
        column={'file'}
        table={'credit_cards'}
        altText={'PDF File'}
      />

      <button onClick={handleRender}>Render Files</button>
    </div>
  );
};

export default FileRender;
