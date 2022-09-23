/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import Skyflow from 'skyflow-js'
import CollectElement from 'skyflow-js/types/core/external/collect/collect-element'
import { SkyflowCollectElementProps } from '../../elements'

const useCollectListeners = (props: SkyflowCollectElementProps, element: CollectElement): void => {
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

export default useCollectListeners
