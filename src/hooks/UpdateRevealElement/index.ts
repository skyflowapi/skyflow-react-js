import React from 'react'
import { SkyflowRevealElementProps } from 'elements'
import RevealElement from 'skyflow-js/types/core/external/reveal/reveal-element'

const useUpdateRevealElement = (
  props: SkyflowRevealElementProps,
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
          token: props.token,
        })
      }
    }
  }, [props.token])

  React.useEffect(() => {
    if (element) {
      if (props?.container !== undefined) {
        element.update({
          label: props.label,
        })
      }
    }
  }, [props.label])

  React.useEffect(() => {
    if (element) {
      if (props?.container !== undefined) {
        element.update({
          redaction: props.redaction,
        })
      }
    }
  }, [props.redaction])
}

export default useUpdateRevealElement
