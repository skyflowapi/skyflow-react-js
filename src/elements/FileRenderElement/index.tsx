/*
  Copyright (c) 2022 Skyflow, Inc. 
*/
import React, { FC } from 'react'
import { FileRenderElements, SkyflowRenderElementProps } from '..'
import { v4 as uuid } from 'uuid';

const FileRenderElement: FC<SkyflowRenderElementProps> = ({ ...props }) => {
  const uniqueDivId = React.useRef(uuid());

  React.useEffect(() => {
    const divElement = document.getElementById(props?.id || `reveal-${uniqueDivId.current}`);
    try {
      if (divElement) {
        divElement.innerHTML = ''
      }
      const FileRenderElement = props?.container.create(
        {
          ...props.classes,
          altText: props.altText || '',
          skyflowID: props.skyflowID,
          column: props.column,
          table: props.table,
        }
      )
      FileRenderElement.mount(props.id ? `#${props.id}` : `#reveal-${uniqueDivId.current}`)
      FileRenderElements[props.id as string] = FileRenderElement
    } catch (e) {
      console.error(e)
    }
  }, [])

  return <div id={props.id ? props.id : `reveal-${uniqueDivId.current}` }></div>
}

export default React.memo(FileRenderElement);
