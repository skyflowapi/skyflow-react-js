/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import Skyflow from 'skyflow-js';
import CollectContainer from 'skyflow-js/types/core/external/collect/CollectContainer';
import { useSkyflow } from '../core/SkyflowElements';



const useCollectContainer = (): CollectContainer => {
  const { skyflow } = useSkyflow();

  return skyflow.container(Skyflow.ContainerType.COLLECT) as CollectContainer;
};

export { useCollectContainer };
