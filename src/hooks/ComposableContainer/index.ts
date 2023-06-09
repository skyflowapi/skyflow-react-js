/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import React from 'react'
import Skyflow from 'skyflow-js'
import ComposableContainer from 'skyflow-js/types/core/external/collect/compose-collect-container'

import { useSkyflow } from '../../core/SkyflowElements/hook'

interface IOptions{
  /** sample documentation*/
  layout: Array<number>,
  /** sample documentation*/
  styles?: object,
  /** sample documentation*/
  errorTextSyles?: object
}

/**
 *  sample documentation for useComposableContainer hook
 */
export const useComposableContainer = (options: IOptions) => {
  const { skyflow } = useSkyflow()
  return React.useMemo(
    () => skyflow?.container(Skyflow.ContainerType.COMPOSABLE, options) as ComposableContainer,
    [],
  )
}
