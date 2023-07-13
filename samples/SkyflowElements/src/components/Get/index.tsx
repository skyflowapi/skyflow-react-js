import React, { useState, useRef } from 'react'
import {useSkyflow} from 'skyflow-react-js'
import Skyflow from 'skyflow-js'

export const Get = () => {

  const skyflow = useSkyflow()

    const callGet = () => {
        const response = skyflow.get({
            records: [
              {
                ids: ['<SKYFLOW_ID1>', '<SKYFLOW_ID2>'],
                table: '<TABLE_NAME>',
                redaction: Skyflow.RedactionType.PLAIN_TEXT,
              },
              {
                columnValues: ['<COLUMN_VALUE1>', '<COLUMN_VALUE2>'],
                columnName: '<UNIQUE_COLUMN_NAME>',
                table: '<TABLE_NAME>',
                redaction: Skyflow.RedactionType.PLAIN_TEXT,
              },
            ],
          });        
          response.then((res: any) => {
          console.log(res)

        })
          .catch((e: any) => {
            console.log(e)
          });  
            
  }
  
    return (
        <div id='get-div'>
        <button id='get-button' onClick={callGet}>Get Records</button> 
        </div>
    )
    
}