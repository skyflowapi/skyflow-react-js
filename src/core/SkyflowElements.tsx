import React, { useContext } from 'react';

interface IConfig {
  vaultID: string;
  vaultURL: string;
  getBearerToken: () => Promise<string>;
}

interface ISkyflowElements {
  children?: any
  config: IConfig
}

const SkyflowContext = React.createContext<IConfig>({
  vaultID: '',
  vaultURL: '',
  getBearerToken: () => new Promise<string>((resolve) => {
    resolve('');
  }),
});

const SkyflowElements:React.FC<ISkyflowElements> = ({ children, ...props }) => (
    <SkyflowContext.Provider value={props.config}>
      {children}
    </SkyflowContext.Provider>

);
const useSkyflow = () : IConfig => useContext(SkyflowContext);
export { SkyflowElements, useSkyflow };
