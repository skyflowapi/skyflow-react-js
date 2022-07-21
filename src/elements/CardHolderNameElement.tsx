import React, { FC } from 'react';
import Skyflow from 'skyflow-js';
import { SkyflowCollectElementProps } from '.';

const CardHolderNameElement: FC<SkyflowCollectElementProps> = ({ ...props }) => {
  const divElement = document.createElement('div');
  if (props.id) {
    divElement.setAttribute('id', props.id);
  } else {
    divElement.setAttribute('id', 'collectCardName');
  }

  React.useEffect(() => {
    try {
  
      const newElement = props.container.create({
        table: props.table,
        column: props.column,
        ...props.classes,
        placeholder: props.placeholder || '',
        label: props.label || '',
        type: Skyflow.ElementType.CARDHOLDER_NAME,
      }, { enableCopy: true });

      newElement.mount(props.id ? `#${props.id}` : '#collectCardName');

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

  // // useListener(Skyflow.EventName.CHANGE, element , props.onChange);
  // useListener(Skyflow.EventName.BLUR, element, props.onBlur);
  // useListener(Skyflow.EventName.FOCUS, element as CollectElement, props.onFocus);
  // useListener(Skyflow.EventName.READY, element as CollectElement, props.onReady);

  return <div id={props.id ? props.id : 'collectCardName'}></div>;
};

export { CardHolderNameElement };
