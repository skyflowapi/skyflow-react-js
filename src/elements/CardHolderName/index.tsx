/*
  Copyright (c) 2022 Skyflow, Inc.
*/
import React, { FC } from 'react'
import Skyflow from 'skyflow-js'
import CollectElement from 'skyflow-js/types/core/external/collect/collect-element'
import { SkyflowCollectElementProps } from '..'
import useCollectListeners from '../../hooks/CollectListner'
import { ELEMENT_CREATED } from '../../utils/constants'
import { SKYFLOW_ERROR_CODE } from '../../utils/errors'

const CardHolderNameElement: FC<SkyflowCollectElementProps> = ({ ...props }) => {

  const divElement = props.id && document.getElementById(props.id || 'collectCardName');

  React.useEffect(() => {
    if (divElement) {
      divElement.innerHTML = ''
    }
    try {
      const newElement = props.container.create(
        {
          table: props.table,
          column: props.column,
          ...props.classes,
          placeholder: props.placeholder || '',
          label: props.label || '',
          type: Skyflow.ElementType.CARDHOLDER_NAME,
          validations: props.validations || [],
        },
        { ...props.options },
      )

      if (props.container.type === Skyflow.ContainerType.COLLECT) {
        const collectElement = newElement as CollectElement;
        collectElement.mount(props.id ? `#${props.id}` : '#collectCardName')
      }
      else if (props.container.type === Skyflow.ContainerType.COMPOSABLE){
        if(!props.eventEmitter)
          throw new Error(SKYFLOW_ERROR_CODE.COMPOSABLE_COMPONENT_NOT_PROVIDED.description);       
        props.eventEmitter._emit(ELEMENT_CREATED, { id: 'CARD HOLDER NAME' })
      }

      useCollectListeners(props, newElement)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }, [props])

  return (
    props.container.type === Skyflow.ContainerType.COLLECT 
    ? (<div id={props.id ? props.id : 'collectCardName'}></div>) 
    : (<></>)
  )
}

export default CardHolderNameElement
