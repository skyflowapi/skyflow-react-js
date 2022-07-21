import { useEffect } from 'react';
import CollectElement from 'skyflow-js/types/core/external/collect/CollectElement';
import { EventName } from 'skyflow-js/types/utils/common';

const useListeners = (
  eventType: EventName,
  element?: CollectElement,
  listener?: Function,
) => {
  useEffect(() => {
    if (element && listener) {
      element.on(eventType, listener)
    }
  }, [element, listener]);
};

export default useListeners;
