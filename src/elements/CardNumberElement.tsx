import React, { FC } from 'react';
import Skyflow from 'skyflow-js';
import { SkyflowCollectElementProps } from '.';
import useCollectListener from './../hooks/useCollectListener';

const CardNumberElement: FC<SkyflowCollectElementProps> = ({ ...props }) => {
  const divElement = document.createElement('div');
  if (props.id) {
    divElement.setAttribute('id', props.id);
  } else {
    divElement.setAttribute('id', 'collectCardNumber');
  }

  React.useEffect(() => {
    try {
      const newElement = props.container.create({
        table: props.table,
        column: props.column,
        ...props.classes,
        placeholder: props.placeholder || '',
        label: props.label || '',
        type: Skyflow.ElementType.CARD_NUMBER,
      }, { enableCopy: true });

      newElement.mount(props.id ? `#${props.id}` : '#collectCardNumber');
      
      if(props.onChange){
        newElement.on(Skyflow.EventName.CHANGE,props.onChange);
      }
      if(props.onBlur){
        newElement.on(Skyflow.EventName.BLUR,props.onBlur);
      }
      if(props.onFocus){
        newElement.on(Skyflow.EventName.FOCUS,props.onFocus);
      }
      if(props.onReady){
        newElement.on(Skyflow.EventName.READY,props.onReady);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }, []);

  return <div id={props.id ? props.id : 'collectCardNumber'}></div>;
};

export { CardNumberElement };
