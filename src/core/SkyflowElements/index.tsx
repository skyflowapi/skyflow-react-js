/*
  Copyright (c) 2022 Skyflow, Inc. 
*/
import React from 'react'
import { Env, LogLevel } from 'skyflow-js/types/utils/common'
import { skyflowContext, useSkyflowInit } from './hook'

export interface IConfig {
  /** sample documentation*/
  vaultID: string,
  /** sample documentation*/
  vaultURL: string,
  /** sample documentation*/
  getBearerToken: () => Promise<string>,
  /** sample documentation*/
  options?: {
    logLevel?: LogLevel
    env?: Env
  }
}

export interface ISkyflowElements {
  /** sample documentation*/
  children?: React.ReactNode,
  /** sample documentation*/
  config: IConfig
}

/**
 * sample documentation for SkyflowElements
 */
const SkyflowElements: React.FC<ISkyflowElements> = React.memo(function SkyflowElements({ children, config }: ISkyflowElements) {
  // Initialize Skyflow
  const skyflow = useSkyflowInit(config)
  return <skyflowContext.Provider value={skyflow}>{children}</skyflowContext.Provider>
})

export default SkyflowElements
