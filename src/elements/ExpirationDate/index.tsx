/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import React, { FC } from 'react'
import Skyflow from 'skyflow-js'
import CollectElement from 'skyflow-js/types/core/external/collect/collect-element'
import { CollectElements, ComposableElements, SkyflowCollectElementProps, SkyflowCollectElementRef } from '..'
import useCollectListeners from '../../hooks/CollectListner'
import { ELEMENT_CREATED } from '../../utils/constants'
import { SKYFLOW_ERROR_CODE } from '../../utils/errors'
import { v4 as uuid } from 'uuid';
import useUpdateElement from '../../hooks/UpdateElement'
import ComposableElement from 'skyflow-js/types/core/external/collect/compose-collect-element'
import { createElementValueMatchRule } from '../../utils/helpers'

const ExpirationDateElement = React.forwardRef<SkyflowCollectElementRef, SkyflowCollectElementProps>(({ ...props }, ref) => {
  const uniqueDivId = React.useRef(uuid());
  const [element,setElement] = React.useState<CollectElement | ComposableElement | null>(null);

  React.useImperativeHandle(ref, () => {
    return {
      setErrorMessage: (errorMessage: string) => {
        if(element && 'setErrorOverride' in element && typeof element.setErrorOverride === 'function'){
          element.setErrorOverride(errorMessage);
        }
      }
    }
  }, [element]);

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
          type: Skyflow.ElementType.EXPIRATION_DATE,
          validations: props.validations || [],
        },
        { ...props.options },
      ) 
      
      setElement(newElement);
      if(props?.container.type === Skyflow.ContainerType.COLLECT){
        const collectElement = newElement as CollectElement;
        collectElement.mount(props.id ? `#${props.id}` : `#EXPIRATION_DATE-id-${uniqueDivId.current}`)
        CollectElements[props.id as string] = collectElement
      } 
      else if (props?.container.type === Skyflow.ContainerType.COMPOSABLE){
        if(!props.eventEmitter)
          throw new Error(SKYFLOW_ERROR_CODE.COMPOSABLE_COMPONENT_NOT_PROVIDED.description);    
        const composableElement = newElement as ComposableElement
        ComposableElements[props.id as string] = composableElement
        props.eventEmitter._emit(ELEMENT_CREATED,{id : 'EXPIRATION DATE'})
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
    ? (<div id={props.id ? props.id : `EXPIRATION_DATE-id-${uniqueDivId.current}`}></div>) 
    : (<></>)
  )
});

export default React.memo(ExpirationDateElement)
