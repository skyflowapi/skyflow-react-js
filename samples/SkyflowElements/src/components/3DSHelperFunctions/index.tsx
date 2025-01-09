/*
	Copyright (c) 2022 Skyflow, Inc.
*/
import React from 'react'
import { use3DS } from 'skyflow-react-js'

const ThreeDSHelperFunctions = () => {
  const threeDS = use3DS()

  const generateBrowserDetails = () => {
    const browserDetails = threeDS.getBrowserDetails()
    const browserDetailsDiv = document.getElementById('threeDSBrowserDetails')
    if (browserDetailsDiv) {
      browserDetailsDiv.innerHTML = JSON.stringify(browserDetails)
    }
  }

  const showChallenge = () => {
    const actionButtons = document.getElementById('actionButtons')
    const challengeWindow = document.getElementById('challengeWindow')
    if (challengeWindow) {
      const challengeIFrame = threeDS.showChallenge('<acs-url>', '<c-req>', '04', challengeWindow)
      challengeIFrame.addEventListener('load', function () {
        if ( actionButtons && actionButtons.hidden) {
          challengeIFrame.hidden = true
          actionButtons.hidden = false
        } else if(actionButtons) {
          actionButtons.hidden = true
        }
      })
    }
  }
  return (
    <div className='CollectElements' style={{ width: '300px' }}>
      <div id='actionButtons'>
        <h3>3DS Browser Details</h3>
        <div>
          <button onClick={generateBrowserDetails}>Generate Browser Details</button>
          <button onClick={showChallenge}>Show Challenge</button>
        </div>
        <div></div>
        <pre id='threeDSBrowserDetails'></pre>
      </div>
      <div id='challengeWindow'></div>
      <div id='threeDSBrowserDetails'></div>
    </div>
  )
}

export default ThreeDSHelperFunctions
