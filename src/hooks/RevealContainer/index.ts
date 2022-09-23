/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import Skyflow from 'skyflow-js'
import RevealContainer from 'skyflow-js/types/core/external/reveal/reveal-container'

import { useSkyflow } from '../../core/hook'

const useRevealContainer = (): RevealContainer => {
  const { skyflow } = useSkyflow()

  return skyflow.container(Skyflow.ContainerType.REVEAL) as RevealContainer
}

export default useRevealContainer
