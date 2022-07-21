import { useEffect } from 'react';
import CollectElement from 'skyflow-js/types/core/external/collect/CollectElement';
import { EventName } from 'skyflow-js/types/utils/common';

const useListeners = (
  eventType: EventName,
  element?: CollectElement,
  listener?: Function,
) => {
  console.log("Element: " + element)
  console.log("listener",listener)
  useEffect(() => {
    if (element && listener) {
      // newElement.on(Skyflow.EventName.CHANGE,props.onChange);
      element.on(eventType, listener)
      // element.on(eventType, listener);
    }
  }, [element, listener]);
};

export default useListeners;
