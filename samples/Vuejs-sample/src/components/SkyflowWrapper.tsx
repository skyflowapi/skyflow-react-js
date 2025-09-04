import React from 'react';
import { SkyflowElements } from 'skyflow-react-js';

interface Props {
  children: React.ReactNode;
}
const getBearerToken = () => {
  return new Promise<string>((resolve, reject) => {
    const Http = new XMLHttpRequest();

    Http.onreadystatechange = () => {
      if (Http.readyState === 4) {
        if (Http.status === 200) {
          resolve('');
        } else {
          reject('Error occured');
        }
      }
    };

    Http.onerror = () => {
      reject('Error occured');
    };

    const url = '<TOKEN_END_POINT_URL>'
    Http.open('GET', url)
    Http.send()
  })
}

export const SkyflowWrapper: React.FC<Props> = ({ children }) => {
  const config = {
    vaultID: '<VAULT_ID>', // Replace with your vault ID
    vaultURL: '<VAULT_URL>', // Replace with your vault URL
    getBearerToken: getBearerToken
  };

  return (
    <SkyflowElements config={config}>
      {children}
    </SkyflowElements>
  );
};