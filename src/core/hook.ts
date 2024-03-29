/*
  Copyright (c) 2022 Skyflow, Inc. 
*/
import { IConfig } from 'core'
import React, { useContext } from 'react'
import Skyflow from 'skyflow-js'
import sdkVersion from '../../package.json'
export const skyflowContext = React.createContext<Skyflow | undefined>(undefined) 

const useSkyflowClient = () => {
  const skyflow = useContext(skyflowContext)
  return { skyflow };
}

const useSkyflowInit = (context:IConfig) => {
  localStorage.setItem('sdk_version',`${sdkVersion.name}@${sdkVersion.version}`);
  const skyflow = Skyflow.init({
    ...context
  })
  return skyflow;
}

export { useSkyflowClient, useSkyflowInit }
