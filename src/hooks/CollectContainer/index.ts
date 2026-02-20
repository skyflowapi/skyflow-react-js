/*
  Copyright (c) 2022 Skyflow, Inc. 
*/
import React from 'react'
import Skyflow from 'skyflow-js'
import CollectContainer from 'skyflow-js/types/core/external/collect/collect-container'
import { ContainerOptions } from '../../common'
import { useSkyflowClient } from '../../core/hook'

const useCollectContainer = (options?: ContainerOptions): CollectContainer => {
  const { skyflow } = useSkyflowClient()

  return React.useMemo(
    () => options ? skyflow?.container(Skyflow.ContainerType.COLLECT, options) as CollectContainer : skyflow?.container(Skyflow.ContainerType.COLLECT) as CollectContainer,
    [],
  )
}

export default useCollectContainer
