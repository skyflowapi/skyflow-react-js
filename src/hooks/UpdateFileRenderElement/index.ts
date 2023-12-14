import React from 'react'
import { SkyflowRenderElementProps } from 'elements'
import RevealElement from 'skyflow-js/types/core/external/reveal/reveal-element'

const useUpdateFileRenderElement = (
  props: SkyflowRenderElementProps,
  element: RevealElement | null,
): void => {
  React.useEffect(() => {
    if (element) {
      if (props?.container !== undefined) {
        element.update({
          altText: props.altText,
        })
      }
    }
  }, [props.altText])

  React.useEffect(() => {
    if (element) {
      if (props?.container !== undefined) {
        element.update({
          ...props.classes,
        })
      }
    }
  }, [props.classes])

  React.useEffect(() => {
    if (element) {
      if (props?.container !== undefined) {
        element.update({
          skyflowID: props.skyflowID,
        })
      }
    }
  }, [props.skyflowID])

  React.useEffect(() => {
    if (element) {
      if (props?.container !== undefined) {
        element.update({
          skyflowID: props.table,
        })
      }
    }
  }, [props.table])

  React.useEffect(() => {
    if (element) {
      if (props?.container !== undefined) {
        element.update({
          skyflowID: props.column,
        })
      }
    }
  }, [props.column])
}

export default useUpdateFileRenderElement
