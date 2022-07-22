import React, { FC } from 'react';
import Skyflow from 'skyflow-js';
import { SkyflowCollectElementProps } from '.';
import { useCollectListeners } from '../hooks';

const CVVElement: FC<SkyflowCollectElementProps> = ({ ...props }) => {
  const divElement = document.createElement('div');
  if (props.id) {
    divElement.setAttribute('id', props.id);
  } else {
    divElement.setAttribute('id', 'collectCVVNumber');
  }
  React.useEffect(() => {
    try {

      const newElement = props.container.create({
        table: props.table,
        column: props.column,
        ...props.classes,
        placeholder: props.placeholder || '',
        label: props.label || '',
        type: Skyflow.ElementType.CVV,
      }, { enableCopy: false });

      newElement.mount(props.id ? `#${props.id}` : '#collectCVVNumber');
      
      useCollectListeners(props,newElement)
      
    } catch (e) {
    // eslint-disable-next-line no-console
      console.log(e);
    }
  }, []);

  return <div id={props.id ? props.id : 'collectCVVNumber'}></div>;
};

export { CVVElement };
