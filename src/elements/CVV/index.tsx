/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import React, { FC } from 'react'
import Skyflow from 'skyflow-js'
import { SkyflowCollectElementProps } from '..'
import { ELEMENT_CREATED } from '../../utils/constants'
import useCollectListeners from '../../hooks/CollectListner'
import CollectElement from 'skyflow-js/types/core/external/collect/collect-element'

const CVVElement: FC<SkyflowCollectElementProps> = ({ ...props }) => {

  React.useEffect(() => {
    try {
      const newElement = props.container.create(
        {
          table: props.table,
          column: props.column,
          ...props.classes,
          placeholder: props.placeholder || '',
          label: props.label || '',
          type: Skyflow.ElementType.CVV,
          validations: props.validations || [],
        },
        { ...props.options },
      )

      if(props.container.type === Skyflow.ContainerType.COLLECT){
        const collectElement = newElement as CollectElement;
        collectElement.mount(props.id ? `#${props.id}` : '#collectCVVNumber')
      }
      else if (props.container.type === Skyflow.ContainerType.COMPOSABLE)
        props.eventEmitter._emit(ELEMENT_CREATED,{id : 'CVV'})
    
      useCollectListeners(props, newElement)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }, [])

  return (
    props.container.type === Skyflow.ContainerType.COLLECT 
    ? (<div id={props.id ? props.id : 'collectCVVNumber'}></div>) 
    : (<></>)
  )
}

export default CVVElement
