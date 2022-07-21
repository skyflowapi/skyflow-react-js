import Skyflow from 'skyflow-js';
import RevealContainer from 'skyflow-js/types/core/external/reveal/RevealContainer';
import { useSkyflow } from '../core/SkyflowElements';

const useRevealContainer = (): RevealContainer => {
  const { skyflow } = useSkyflow();

  return skyflow.container(Skyflow.ContainerType.REVEAL) as RevealContainer;
};

export { useRevealContainer };
