/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import React from 'react'
import Skyflow from 'skyflow-js'
import ComposableContainer from 'skyflow-js/types/core/external/collect/compose-collect-container'

import { useSkyflow } from '../../core/SkyflowElements/hook'

interface IOptions{
  /** Layout configuration for the container. */
  layout: Array<number>,
  /** Additional styles for the container. */
  styles?: object,
  /** Styles for the element's error text. */
  errorTextStyles?: object
}

/**
 *  Container for composable elements.
 */
export const useComposableContainer = (options: IOptions) => {
  const { skyflow } = useSkyflow()
  return React.useMemo(
    () => skyflow?.container(Skyflow.ContainerType.COMPOSABLE, options) as ComposableContainer,
    [],
  )
}
