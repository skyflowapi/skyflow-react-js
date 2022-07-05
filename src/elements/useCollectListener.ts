/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react';
import Skyflow from 'skyflow-js';
import CollectElement from 'skyflow-js/types/core/external/collect/CollectElement';
import RevealElement from 'skyflow-js/types/core/external/reveal/RevealElement';
import { EventName } from 'skyflow-js/types/utils/common';

const useListeners = (
  eventType: EventName,
  element?: CollectElement,
  listener?: Function,
) => {
  useEffect(() => {
    if (element && listener) {
      element.on(eventType, listener);
    }
  }, [element, listener]);
};

export default useListeners;
