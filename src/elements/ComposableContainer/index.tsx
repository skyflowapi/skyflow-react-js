/*
  Copyright (c) 2022 Skyflow, Inc. 
*/
import React, { FC, useState } from 'react'
import { ELEMENT_CREATED } from '../../utils/constants'
import EventEmitter from '../../utils/event-emitter'

const ComposableContainer: FC<any> = ({ children, ...props }) => {

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
      if (currentCount === React.Children.count(children))
        props.container.mount(props.id ? `#${props.id}` : '#composableContainer');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }, [currentCount])

  return <div id={props.id ? props.id : 'composeContainer'} style={{ width:'inherit',
    height:'100%'}}>
    {iterateOverChildren(children)}
  </div>
}

export default ComposableContainer;
