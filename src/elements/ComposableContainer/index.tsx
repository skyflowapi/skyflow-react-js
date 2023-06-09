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
  /** sample documentation*/
  children?: React.ReactNode
  /** sample documentation*/
  container: ComposableContainer
  /** sample documentation*/
  id?: string
  /** sample documentation*/
  onSubmit?: () => void
}

/**
 *  sample documentation for ComposableContainerComponent
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
