/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import React, { FC } from 'react'
import Skyflow from 'skyflow-js'
import { SkyflowCollectElementProps } from '..'
import useCollectListeners from '../../hooks/CollectListner'

const ExpirationMonthElement: FC<SkyflowCollectElementProps> = ({ ...props }) => {
  const divElement = document.createElement('div')
  if (props.id) {
    divElement.setAttribute('id', props.id)
  } else {
    divElement.setAttribute('id', 'collectExpirationMonth')
  }
  React.useEffect(() => {
    try {
      const newElement = props.container.create(
        {
          table: props.table,
          column: props.column,
          ...props.classes,
          placeholder: props.placeholder || '',
          label: props.label || '',
          type: Skyflow.ElementType.EXPIRATION_MONTH,
          validations: props.validations || [],
        },
        { ...props.options },
      )

      newElement.mount(props.id ? `#${props.id}` : '#collectExpirationMonth')

      useCollectListeners(props, newElement)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }, [])

  return <div id={props.id ? props.id : 'collectExpirationMonth'}></div>
}

export default ExpirationMonthElement
