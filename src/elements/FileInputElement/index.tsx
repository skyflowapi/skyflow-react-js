/*
  Copyright (c) 2022 Skyflow, Inc.
*/
import React, { FC, useState } from 'react'
import Skyflow from 'skyflow-js'
import CollectElement from 'skyflow-js/types/core/external/collect/collect-element'
import { SkyflowCollectElementProps } from '..'
import useCollectListeners from '../../hooks/CollectListner'
import { ELEMENT_CREATED } from '../../utils/constants'
import { SKYFLOW_ERROR_CODE } from '../../utils/errors'
import { v4 as uuid } from 'uuid';
import useUpdateElement from '../../hooks/UpdateElement'
import ComposableElement from 'skyflow-js/types/core/external/collect/compose-collect-element'

const FileInputElement: FC<SkyflowCollectElementProps> = ({ ...props }) => {
  const uniqueDivId = React.useRef(uuid());
  const [element, setElement] = React.useState<CollectElement | ComposableElement | null>(null);

  React.useEffect(() => {
    try {
      const newElement = props?.container.create(
        {
          skyflowID: props.skyflowID || '',
          table: props.table,
          column: props.column,
          placeholder: props.placeholder || '',
          label: props.label || '',
          ...props.classes,
          type: Skyflow.ElementType.FILE_INPUT,
          validations: props.validations || [],
        },
        { ...props.options },
      )

      setElement(newElement);

      if (props?.container.type === Skyflow.ContainerType.COLLECT) {
        const collectElement = newElement as CollectElement;
        collectElement.mount(props.id ? `#${props.id}` : `#FILE_INPUT-id-${uniqueDivId.current}`)
      }
      else if (props?.container.type === Skyflow.ContainerType.COMPOSABLE) {
        if (!props.eventEmitter)
          throw new Error(SKYFLOW_ERROR_CODE.COMPOSABLE_COMPONENT_NOT_PROVIDED.description);
        props.eventEmitter._emit(ELEMENT_CREATED, { id: 'FILE INPUT' })
      }
      useCollectListeners(props, newElement)
    }

    catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }, [])

  useUpdateElement(props, element);
  return (
    props?.container?.type === Skyflow.ContainerType.COLLECT
      ? (<div id={props.id ? props.id : `FILE_INPUT-id-${uniqueDivId.current}`}></div>)
      : (<></>)
  )
}

export default React.memo(FileInputElement)