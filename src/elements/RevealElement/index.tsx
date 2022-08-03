/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import React, { FC } from 'react'
import { SkyflowRevealElementProps } from '..'

const RevealElement: FC<SkyflowRevealElementProps> = ({ ...props }) => {
  const divElement = document.createElement('div')
  if (props.id) {
    divElement.setAttribute('id', props.id)
  } else {
    divElement.setAttribute('id', 'revealElement')
  }

  React.useEffect(() => {
    try {
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
      console.log(e)
    }
  }, [])

  return <div id={props.id ? props.id : 'revealElement'}></div>
}

export default RevealElement
