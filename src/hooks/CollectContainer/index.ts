/*
  Copyright (c) 2022 Skyflow, Inc. 
*/
import React from 'react'
import Skyflow from 'skyflow-js'
import CollectContainer from 'skyflow-js/types/core/external/collect/collect-container'

import { useSkyflow } from '../../core/SkyflowElements/hook'

/**
 * Container for Collect Elements.
 * @returns Returns the CollectContainer instance.
 */
export const useCollectContainer = (): CollectContainer => {
  const { skyflow } = useSkyflow()

  return React.useMemo(
    () => skyflow?.container(Skyflow.ContainerType.COLLECT) as CollectContainer,
    [],
  )
}
