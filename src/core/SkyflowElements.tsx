import React, { useContext } from 'react';
import Skyflow from 'skyflow-js';

export interface IConfig {
  vaultID: string;
  vaultURL: string;
  getBearerToken: () => Promise<string>;
}

export interface ISkyflowElements {
  children?: any
  config: IConfig
}

export const SkyflowContext = React.createContext<IConfig>({
  vaultID: '',
  vaultURL: '',
  getBearerToken: () => new Promise<string>((resolve) => {
    resolve('');
  }),
});
const useSkyflow = () :{ skyflow: Skyflow, context: IConfig } => {
  const context = useContext(SkyflowContext);
  const skyflow = Skyflow.init({
    ...context,
    options: {
      logLevel: Skyflow.LogLevel.DEBUG,
      env: Skyflow.Env.PROD,
    },
  });

  return { skyflow, context };
};
const SkyflowElements:React.FC<ISkyflowElements> = ({ children, config }):JSX.Element => {
  // Initialize SKyflow
  useSkyflow();
  return (

    <SkyflowContext.Provider value={config}>
      {children}
    </SkyflowContext.Provider>

  );
};

export {
  SkyflowElements, useSkyflow,
};
