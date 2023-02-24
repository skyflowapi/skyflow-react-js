/*
  Copyright (c) 2022 Skyflow, Inc. 
*/
import React from 'react'
import Skyflow from 'skyflow-js'
import RevealContainer from 'skyflow-js/types/core/external/reveal/reveal-container'

import { useSkyflow } from '../../core/hook'

const useRevealContainer = (): RevealContainer => {
  const { skyflow } = useSkyflow()
  return React.useMemo(
    () => skyflow?.container(Skyflow.ContainerType.REVEAL) as RevealContainer,
    [],
  )
}

export default useRevealContainer
