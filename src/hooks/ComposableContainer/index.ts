/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import React from 'react'
import Skyflow from 'skyflow-js'
import ComposableContainer from 'skyflow-js/types/core/external/collect/compose-collect-container'

import { useSkyflowClient } from '../../core/hook'

const useComposableContainer = (options) => {
  const { skyflow } = useSkyflowClient()
  return React.useMemo(
    () => skyflow?.container(Skyflow.ContainerType.COMPOSABLE, options) as ComposableContainer,
    [],
  )
}

export default useComposableContainer;
