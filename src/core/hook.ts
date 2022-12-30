/*
  Copyright (c) 2022 Skyflow, Inc. 
*/
import { IConfig } from 'core'
import React, { useContext } from 'react'
import Skyflow from 'skyflow-js'

export const skyflowContext = React.createContext<Skyflow | undefined>( undefined) 

const useSkyflow = () => {
  const skyflow = useContext(skyflowContext)
  return { skyflow };
}

const useSkyflowInit = (context:IConfig) => {
  const skyflow = Skyflow.init({
    ...context
  })
  return skyflow;
}

export { useSkyflow, useSkyflowInit }
