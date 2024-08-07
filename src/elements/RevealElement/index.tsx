/*
  Copyright (c) 2022 Skyflow, Inc. 
*/
import React, { FC } from 'react'
import { SkyflowRevealElementProps } from '..'
import { v4 as uuid } from 'uuid';
import Skyflow from 'skyflow-js';
import useUpdateRevealElement from '../../hooks/UpdateRevealElement';

const RevealElement: FC<SkyflowRevealElementProps> = ({ ...props }) => {
  const uniqueDivId = React.useRef(uuid());
  const [element,setElement] = React.useState<any>(null);

  React.useEffect(() => {
    const divElement = document.getElementById(props?.id || `reveal-${uniqueDivId.current}`);
    try {
      if (divElement) {
        divElement.innerHTML = ''
      }
      const RevealElement = props?.container?.create(
        {
          token: props.token,
          ...props.classes,
          label: props.label || '',
          altText: props.altText || '',
          redaction: props.redaction || Skyflow.RedactionType.PLAIN_TEXT
        },
        { ...props.options },
      )
      setElement(RevealElement);
      const divId = props.id ? `#${props.id}` : `#reveal-${uniqueDivId.current}`;
      RevealElement.mount(divId)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }, [])

  React.useEffect(()=>{
    if(element){
      element?.setToken(props.token);
    }
  },[props.token])

  useUpdateRevealElement(props, element)
  return <div id={props.id ? props.id : `reveal-${uniqueDivId.current}` }></div>
}

export default React.memo(RevealElement);
