import React from 'react'
import Skyflow from 'skyflow-js'
import ThreeDS from 'skyflow-js/types/core/external/threeds/threeds'

const use3DS = ():typeof ThreeDS => {
  return React.useMemo(() => Skyflow.ThreeDS, [])
}

export default use3DS
