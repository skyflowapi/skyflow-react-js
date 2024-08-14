/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import React, { FC } from 'react'
import Skyflow from 'skyflow-js'
import { CollectElements, ComposableElements, SkyflowCollectElementProps } from '..'
import { ELEMENT_CREATED } from '../../utils/constants'
import useCollectListeners from '../../hooks/CollectListner'
import CollectElement from 'skyflow-js/types/core/external/collect/collect-element'
import { SKYFLOW_ERROR_CODE } from '../../utils/errors'
import { v4 as uuid } from 'uuid';
import useUpdateElement from '../../hooks/UpdateElement'
import ComposableElement from 'skyflow-js/types/core/external/collect/compose-collect-element'
import { createElementValueMatchRule } from '../../utils/helpers'

const CVVElement: FC<SkyflowCollectElementProps> = ({ ...props }) => {
  const uniqueDivId = React.useRef(uuid());
  const [element,setElement] = React.useState<CollectElement| ComposableElement | null>(null);

  React.useEffect(() => {
    try {
      props.validations = createElementValueMatchRule(props.container, props.validations)
      const newElement = props?.container.create(
        {
          table: props.table,
          column: props.column,
          ...(props.skyflowID ? {skyflowID: props.skyflowID} : {}),
          ...props.classes,
          placeholder: props.placeholder || '',
          label: props.label || '',
          type: Skyflow.ElementType.CVV,
          validations: props.validations || [],
        },
        { ...props.options },
      )
      
      setElement(newElement);

      if(props?.container.type === Skyflow.ContainerType.COLLECT){
        const collectElement = newElement as CollectElement;
        const divId = props.id ? `#${props.id}` : `#CVV-id-${uniqueDivId.current}`
        collectElement.mount(divId)
        CollectElements[props.id as string] = collectElement
      }
      else if (props?.container.type === Skyflow.ContainerType.COMPOSABLE){
        if(!props.eventEmitter)
          throw new Error(SKYFLOW_ERROR_CODE.COMPOSABLE_COMPONENT_NOT_PROVIDED.description);    
        const composableElement = newElement as ComposableElement
        ComposableElements[props.id as string] = composableElement
        props.eventEmitter._emit(ELEMENT_CREATED,{id : 'CVV'})
      }
    
      useCollectListeners(props, newElement)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }, [])

  useUpdateElement(props, element);

  return (
    props?.container?.type === Skyflow.ContainerType.COLLECT 
    ? (<div id={props.id ? props.id : `CVV-id-${uniqueDivId.current}`}></div>) 
    : (<></>)
  )
}

export default React.memo(CVVElement);
