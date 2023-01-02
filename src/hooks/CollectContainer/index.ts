/*
  Copyright (c) 2022 Skyflow, Inc. 
*/
import Skyflow from 'skyflow-js'
import CollectContainer from 'skyflow-js/types/core/external/collect/collect-container'

import { useSkyflow } from '../../core/hook'

const useCollectContainer = (): CollectContainer => {
  const { skyflow } = useSkyflow()

  return skyflow?.container(Skyflow.ContainerType.COLLECT) as CollectContainer
}

export default useCollectContainer
