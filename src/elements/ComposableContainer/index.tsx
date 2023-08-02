/*
  Copyright (c) 2022 Skyflow, Inc. 
*/
import React, { FC, useState } from 'react'
import { ELEMENT_CREATED } from '../../utils/constants'
import EventEmitter from '../../utils/event-emitter'
import ComposableContainer from 'skyflow-js/types/core/external/collect/compose-collect-container';
import Skyflow from 'skyflow-js'
import { v4 as uuid } from 'uuid';

export interface IComposableContainer {
  /** Composable Skyflow elements wrapped within composable container. */
  children?: React.ReactNode
  /** Composable container instance. */
  container: ComposableContainer
  /** Unique ID for the composable container. */
  id?: string
  /** OnSubmit event handler.*/
  onSubmit?: () => void
}

/**
 *  Container for all Composable Elements.
 */
const ComposableContainerComponent: FC<IComposableContainer> = ({ children, ...props }) => {
  const uniqueDivId = uuid();
  const [currentCount, setCurrentCount] = useState(0);

  const eventEmitter: EventEmitter = new EventEmitter();

  eventEmitter.on(ELEMENT_CREATED, (data) => {
    setCurrentCount((prev) => prev + 1);
  });

  const iterateOverChildren = (children) => {
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;
      return React.cloneElement(child, { eventEmitter: eventEmitter } as Partial<unknown>)
    })
  };

  React.useEffect(() => {
    try {
      if (currentCount === React.Children.count(children)){
        props.container.mount(props.id ? `#${props.id}` : `#COMPOSABLE_CONTAINER-id-${uniqueDivId}`);
        
        if(props.onSubmit)
          props.container.on(Skyflow.EventName.SUBMIT,props.onSubmit)
      }
       
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }, [currentCount])

  return <div id={props.id ? props.id : `COMPOSABLE_CONTAINER-id-${uniqueDivId}`} style={{ width:'inherit',
    height:'100%'}}>
    {iterateOverChildren(children)}
  </div>
}

export default ComposableContainerComponent;
