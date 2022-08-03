/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import React from 'react'
import { Env, LogLevel } from 'skyflow-js/types/utils/common'
import { SkyflowContext, useSkyflow } from './hook'

export interface IConfig {
  vaultID: string
  vaultURL: string
  getBearerToken: () => Promise<string>
  options?: {
    logLevel?: LogLevel
    env?: Env
  }
}

export interface ISkyflowElements {
  children?: React.ReactNode
  config: IConfig
}

const SkyflowElements: React.FC<ISkyflowElements> = ({ children, config }): JSX.Element => {
  // Initialize SKyflow
  useSkyflow()
  return <SkyflowContext.Provider value={config}>{children}</SkyflowContext.Provider>
}

export default React.memo(SkyflowElements)
