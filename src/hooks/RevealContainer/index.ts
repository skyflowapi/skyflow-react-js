/*
  Copyright (c) 2022 Skyflow, Inc. 
*/
import React from 'react'
import Skyflow from 'skyflow-js'
import RevealContainer from 'skyflow-js/types/core/external/reveal/reveal-container'

import { useSkyflowClient } from '../../core/hook'

const useRevealContainer = (options?): RevealContainer => {
  const { skyflow } = useSkyflowClient()
  return React.useMemo(
    () => options ? skyflow?.container(Skyflow.ContainerType.REVEAL, options) as RevealContainer : skyflow?.container(Skyflow.ContainerType.REVEAL) as RevealContainer,
    [],
  )
}

export default useRevealContainer
