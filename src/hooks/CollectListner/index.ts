/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import Skyflow from 'skyflow-js'
import CollectElement from 'skyflow-js/types/core/external/collect/collect-element'
import ComposableElement from 'skyflow-js/types/core/external/collect/compose-collect-element'
import { SkyflowCollectElementProps } from '../../elements'

export const useCollectListeners = (props: SkyflowCollectElementProps, element: CollectElement | ComposableElement): void => {
  if (props.onChange) {
    element.on(Skyflow.EventName.CHANGE, props.onChange)
  }
  if (props.onBlur) {
    element.on(Skyflow.EventName.BLUR, props.onBlur)
  }
  if (props.onFocus) {
    element.on(Skyflow.EventName.FOCUS, props.onFocus)
  }
  if (props.onReady) {
    element.on(Skyflow.EventName.READY, props.onReady)
  }
}

