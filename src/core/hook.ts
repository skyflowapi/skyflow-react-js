import React, { useContext } from 'react';
import Skyflow from 'skyflow-js';
import { Env, LogLevel } from 'skyflow-js/types/utils/common';
import { IConfig } from '.';

export const SkyflowContext = React.createContext<IConfig>({
  vaultID: '',
  vaultURL: '',
  getBearerToken: () => new Promise<string>((resolve) => {
    resolve('');
  }),
});

const useSkyflow = (logLevel?: LogLevel, env?: Env): { skyflow: Skyflow, context: IConfig } => {
  const context = useContext(SkyflowContext);
  const skyflow = Skyflow.init({
    ...context,
    options: {
      logLevel: logLevel ? logLevel : Skyflow.LogLevel.ERROR,
      env: env ? env : Skyflow.Env.PROD, 
    },
  });

  return { skyflow, context };
};
export { useSkyflow };