/*
  Copyright (c) 2022 Skyflow, Inc. 
*/
import React, { FC } from 'react'
import { SkyflowRevealElementProps } from '..'

const RevealElement: FC<SkyflowRevealElementProps> = ({ ...props }) => {

  const divElement = props.id && document.getElementById(props.id || 'revealElement');

  React.useEffect(() => {
    try {
      if (divElement) {
        divElement.innerHTML = ''
      }
      const RevealElement = props.container.create(
        {
          token: props.token,
          ...props.classes,
          label: props.label || '',
        },
        { ...props.options },
      )
      RevealElement.mount(props.id ? `#${props.id}` : '#revealElement')
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }, [props])




  return <div id={props.id ? props.id : 'revealElement'}></div>
}

export default RevealElement
