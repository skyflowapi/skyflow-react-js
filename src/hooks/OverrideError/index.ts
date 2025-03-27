import {
  SkyflowCollectElementProps,
  SkyflowCollectElementRef,
  SkyflowRenderElementProps,
  SkyflowRenderElementRef,
  SkyflowRevealElementProps,
  SkyflowRevealElementRef,
} from 'elements'
import { ForwardedRef, useImperativeHandle } from 'react'
import CollectElement from 'skyflow-js/types/core/external/collect/collect-element'
import RevealElement from 'skyflow-js/types/core/external/reveal/reveal-element'
import Skyflow from 'skyflow-js'
import ComposableElement from 'skyflow-js/types/core/external/collect/compose-collect-element'

const useErrorOverride = (
  element: CollectElement | ComposableElement | RevealElement | null,
  ref: ForwardedRef<SkyflowCollectElementRef | SkyflowRevealElementRef | SkyflowRenderElementRef>,
  props: SkyflowCollectElementProps | SkyflowRevealElementProps | SkyflowRenderElementProps,
) => {
  if (
    props?.container?.type == Skyflow.ContainerType.COLLECT ||
    props?.container?.type == Skyflow.ContainerType.REVEAL
  ) {
    useImperativeHandle(
      ref,
      () => ({
        setErrorOverride: (errorMessage: string) => {
          if (element && 'setErrorOverride' in element) {
            element.setErrorOverride(errorMessage)
          }
        },
      }),
      [element],
    )
  }
}

export default useErrorOverride
