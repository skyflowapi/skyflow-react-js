/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import React, { FC } from 'react';
import Skyflow from 'skyflow-js';
import { SkyflowCollectElementProps } from '..';
import  useCollectListeners  from '../../hooks/CollectListner';

const ExpirationDateElement: FC<SkyflowCollectElementProps> = ({ ...props }) => {
  const divElement = document.createElement('div');
  if (props.id) {
    divElement.setAttribute('id', props.id);
  } else {
    divElement.setAttribute('id', 'collectExpirationDate');
  }
  React.useEffect(() => {
    try {

      const newElement = props.container.create({
        table: props.table,
        column: props.column,
        ...props.classes,
        placeholder: props.placeholder || 'MM/YYYY',
        label: props.label || '',
        type: Skyflow.ElementType.EXPIRATION_DATE,
      }, { enableCopy: false });

      newElement.mount(props.id ? `#${props.id}` : '#collectExpirationDate');
            
      useCollectListeners(props,newElement)
    } catch (e) {
    // eslint-disable-next-line no-console
      console.log(e);
    }
  }, []);

  return <div id={props.id ? props.id : 'collectExpirationDate'}></div>;
};

export default ExpirationDateElement;
