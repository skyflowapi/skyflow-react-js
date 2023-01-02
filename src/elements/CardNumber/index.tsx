/*
  Copyright (c) 2022 Skyflow, Inc. 
*/
import React, { FC } from 'react'
import Skyflow from 'skyflow-js'
import { SkyflowCollectElementProps } from '..'
import useCollectListeners from '../../hooks/CollectListner'

const CardNumberElement: FC<SkyflowCollectElementProps> = ({ ...props }) => {

  React.useEffect(() => {
    try {
      const newElement = props.container.create(
        {
          table: props.table,
          column: props.column,
          ...props.classes,
          placeholder: props.placeholder || '',
          label: props.label || '',
          type: Skyflow.ElementType.CARD_NUMBER,
          validations: props.validations || [],
        },
        { ...props.options },
      )

      newElement.mount(props.id ? `#${props.id}` : '#collectCardNumber')

      useCollectListeners(props, newElement)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }, [])

  return <div id={props.id ? props.id : 'collectCardNumber'}></div>
}

export default CardNumberElement
