/*
	Copyright (c) 2022 Skyflow, Inc.
*/
import React from 'react'
import { use3DS } from 'skyflow-react-js'

const ThreeDSHelperFunctions = () => {
  const threeDS = use3DS()

  const generateBrowserDetails = () => {
    const browserDetails = threeDS.getBroswerDetails()
    const browserDetailsDiv = document.getElementById('threeDSBrowserDetails')
    if (browserDetailsDiv) {
      browserDetailsDiv.innerHTML = JSON.stringify(browserDetails)
    }
  }
  return (
    <div className='CollectElements' style={{ width: '300px' }}>
      <button onClick={generateBrowserDetails}>Generate Browser Details</button>
      <div id='threeDSBrowserDetails'></div>
    </div>
  )
}

export default ThreeDSHelperFunctions
