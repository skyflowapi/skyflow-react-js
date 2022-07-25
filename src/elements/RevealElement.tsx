/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import React, { FC } from 'react';
import Skyflow from 'skyflow-js';
import { SkyflowRevealElementProps } from '.';
import { useSkyflow } from '../core/SkyflowElements';

const RevealElement: FC<SkyflowRevealElementProps> = ({ ...props }) => {
  const divElement = document.createElement('div');
  if (props.id) {
    console.log('ID', props.id);
    divElement.setAttribute('id', props.id);
  } else {
    divElement.setAttribute('id', 'revealElement');
  }

  React.useEffect(() => {
    try {

        const RevealElement = props.container.create({
            token:props.token,
            ...props.classes,
            altText: props.altText || '',
            label: props.label || ''
        })
    
          RevealElement.mount(props.id ? `#${props.id}` : '#revealElement');
    } catch (e) {
    // eslint-disable-next-line no-console
      console.log(e);
    }
  }, []);

  return <div id={props.id ? props.id : 'revealElement'}></div>;
};

export { RevealElement };
