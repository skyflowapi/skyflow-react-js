/*
  Copyright (c) 2022 Skyflow, Inc. 
*/
import React, { FC } from 'react'
import { SkyflowRevealElementProps } from '..'
import { v4 as uuid } from 'uuid';

const RevealElement: FC<SkyflowRevealElementProps> = ({ ...props }) => {
  const uniqueDivId = uuid();
  React.useEffect(() => {
    const divElement = document.getElementById(props?.id || `reveal-${uniqueDivId}`);
    try {
      if (divElement) {
        divElement.innerHTML = ''
      }
      const RevealElement = props?.container.create(
        {
          token: props.token,
          ...props.classes,
          label: props.label || '',
        },
        { ...props.options },
      )
      RevealElement.mount(props.id ? `#${props.id}` : `#reveal-${uniqueDivId}`)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }, [props])




  return <div id={props.id ? props.id : `reveal-${uniqueDivId}` }></div>
}

export default RevealElement
