/*
  Copyright (c) 2022 Skyflow, Inc. 
*/
import React from 'react'
import { Env, LogLevel } from 'skyflow-js/types/utils/common'
import { skyflowContext, useSkyflowInit } from './hook'

export interface IConfig {
  /** ID of the vault to connect to. */
  vaultID: string,
  /** URL of the vault to connect to. */
  vaultURL: string,
  /** Function that retrieves a Skyflow bearer token from your backend. */
  getBearerToken: () => Promise<string>,
  /** Additional configuration options. */
  options?: {
    logLevel?: LogLevel
    env?: Env
  }
}

export interface ISkyflowElements {
  /** Children components to be wrapped by SkyflowElements. */
  children?: React.ReactNode,
  /** Configuration object for connecting to the Skyflow vault.*/
  config: IConfig
}

/**
 * Provides a secure way to integrate Skyflow into your React applications.
 */
const SkyflowElements: React.FC<ISkyflowElements> = React.memo(function SkyflowElements({ children, config }: ISkyflowElements) {
  // Initialize Skyflow
  const skyflow = useSkyflowInit(config)
  return <skyflowContext.Provider value={skyflow}>{children}</skyflowContext.Provider>
})

export default SkyflowElements
