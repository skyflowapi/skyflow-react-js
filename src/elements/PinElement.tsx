/* eslint-disable import/prefer-default-export */
import React, { FC } from 'react';
import Skyflow from 'skyflow-js';
import { ElementType } from 'skyflow-js/types/core/constants';
import CollectElement from 'skyflow-js/types/core/external/collect/CollectElement';
import { SkyflowElementProps } from '.';
import useElement from './useCollectElements';
import useListener from './useCollectListener';

const PinElement: FC<SkyflowElementProps> = ({ ...props }) => {
  const { element } = useElement('#collectPinElement', props, ElementType.CVV);

  useListener(Skyflow.EventName.CHANGE, element as CollectElement, props.onChange);
  useListener(Skyflow.EventName.BLUR, element as CollectElement, props.onBlur);
  useListener(Skyflow.EventName.FOCUS, element as CollectElement, props.onFocus);
  useListener(Skyflow.EventName.READY, element as CollectElement, props.onReady);

  return <div id='collectPinElement' />;
};

export { PinElement };
