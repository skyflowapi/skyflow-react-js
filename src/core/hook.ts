/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import React, { useContext } from 'react'
import Skyflow from 'skyflow-js'
import { IConfig } from '.'

export const skyflowContext = React.createContext<IConfig>({
  vaultID: '',
  vaultURL: '',
  getBearerToken: () =>
    new Promise<string>((resolve) => {
      resolve('')
    }),
  options: {
    logLevel: Skyflow.LogLevel.ERROR,
    env: Skyflow.Env.PROD,
  },
})

const useSkyflow = (): { skyflow: Skyflow; context: IConfig } => {
  const context = useContext(skyflowContext)
  const skyflow = Skyflow.init({
    ...context,
  })
  return { skyflow, context }
}
export { useSkyflow }
