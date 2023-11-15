/*
  Copyright (c) 2022 Skyflow, Inc.
*/
import React, { useState } from 'react';
import FileRender from '../FileRenderElements';
import { FileInputElement, useCollectContainer, useMakeSkyflowStyles } from 'skyflow-react-js';

const FileUploadAndRender = () => {
  const [visible , setVisible] = useState(false);
  const [id, updateId] = useState('');
  const collectContainer = useCollectContainer();
  const handleUpload = () => {
    collectContainer.uploadFiles({}).then(data => 
        { 
        updateId('<SKYFLOW_ID>');
        setVisible(true);
        console.log(data);

      }).catch(error => console.log(error));
  }
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
    <div >
        <FileInputElement
            id={'fileElement-1'}
            container={collectContainer} 
            classes={classes}
            skyflowID={'<SKYFLOW_ID>'}
            column={'file'}
            table={'table'}
            />
        { visible && <FileRender id={id}/>}
    <button onClick={handleUpload}>upload Files</button>
    </div>
  );
};
export default FileUploadAndRender;
