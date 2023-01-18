/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import Skyflow from 'skyflow-js'
import ComposableContainer from 'skyflow-js/types/core/external/collect/compose-collect-container';

import { useSkyflow } from '../../core/hook'

const  useComposableContainer = (options) => {
  const { skyflow } = useSkyflow()
    return skyflow?.container(Skyflow.ContainerType.COMPOSABLE,options) as ComposableContainer;
}

export default useComposableContainer;
