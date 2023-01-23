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
import { v4 as uuid } from 'uuid';

const CardNumberElement: FC<SkyflowCollectElementProps> = ({ ...props }) => {
  const uniqueDivId = uuid();
  React.useEffect(() => {
    try {
      const newElement = props?.container.create(
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
  
      if(props?.container.type === Skyflow.ContainerType.COLLECT){
        const collectElement = newElement as CollectElement;
        collectElement.mount(props.id ? `#${props.id}` : `#CARD_NUMBER-id-${uniqueDivId}`)
      }
      else if (props?.container.type === Skyflow.ContainerType.COMPOSABLE){
        if(!props.eventEmitter)
          throw new Error(SKYFLOW_ERROR_CODE.COMPOSABLE_COMPONENT_NOT_PROVIDED.description);    
        props.eventEmitter._emit(ELEMENT_CREATED,{id : 'CARD NUMBER'})
      }

      useCollectListeners(props, newElement)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }, [])
  
  return (
    props.container.type === Skyflow.ContainerType.COLLECT 
    ? (<div id={props.id ? props.id : `CARD_NUMBER-id-${uniqueDivId}`}></div>) 
    : (<></>)
  )
}

export default CardNumberElement
