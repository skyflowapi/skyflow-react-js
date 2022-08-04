import React from 'react'
import ReactDOM from 'react-dom/client'
import { Env, LogLevel, SkyflowElements } from 'skyflow-react-js/types'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const getBearerToken = () => {
  return new Promise<string>((resolve, reject) => {
    const Http = new XMLHttpRequest()

    Http.onreadystatechange = () => {
      if (Http.readyState == 4) {
        if (Http.status == 200) {
          resolve('')
        } else {
          reject('Error occured')
        }
      }
    }

    Http.onerror = () => {
      reject('Error occured')
    }

    const url = ''
    Http.open('GET', url)
    Http.send()
  })
}

const config = {
  vaultID: '',
  vaultURL: '',
  getBearerToken,
  options: {
    logLevel: LogLevel.DEBUG,
    env: Env.DEV,
  },
}

root.render(
  <SkyflowElements config={config}>
    <App />
  </SkyflowElements>,
)
