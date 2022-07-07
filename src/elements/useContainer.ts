import CollectContainer from 'skyflow-js/types/core/external/collect/CollectContainer';
import RevealContainer from 'skyflow-js/types/core/external/reveal/RevealContainer';
import { ContainerType } from 'skyflow-js/types/Skyflow';

import { useSkyflow } from '../core/SkyflowElements';

const useContainer = (type: ContainerType): CollectContainer | RevealContainer => {
  const { skyflow } = useSkyflow();
  let elementContainer:CollectContainer | RevealContainer = {} as never;

  if (type === 'COLLECT') {
    console.log('TYPE', type);
    elementContainer = skyflow.container(type) as CollectContainer;
  } if (type === 'REVEAL') {
    elementContainer = skyflow.container(type) as RevealContainer;
  }
  console.log('CON', elementContainer);
  return elementContainer;
};

export { useContainer };
