import React from 'react'
import CollectElement from 'skyflow-js/types/core/external/collect/collect-element'
import ComposableElement from 'skyflow-js/types/core/external/collect/compose-collect-element'
import { ICollectElementOptions, SkyflowCollectElementProps } from '../../elements'
import { createElementValueMatchRule } from '../../utils/helpers'

const useUpdateElement = (
  props: SkyflowCollectElementProps & ICollectElementOptions,
  element: CollectElement | ComposableElement | null,
): void => {
  React.useEffect(() => {
    if (element && props?.container) {
      element.update({
        table: props.table,
      })
    }
  }, [props.table])

  React.useEffect(() => {
    if (element && props?.container) {
      element.update({
        column: props.column,
      })
    }
  }, [props.column])

  React.useEffect(() => {
    if (element && props?.container) {
      element.update({
        validations: createElementValueMatchRule(props.validations),
      })
    }
  }, [props.validations])

  React.useEffect(() => {
    if (element && props?.container) {
      element.update({
        label: props.label,
      })
    }
  }, [props.label])

  React.useEffect(() => {
    if (element && props?.container) {
      element.update({
        placeholder: props.placeholder,
      })
    }
  }, [props.placeholder])

  React.useEffect(() => {
    if (element && props?.container) {
      element.update({
        ...props.classes,
      })
    }
  }, [props.classes])

  React.useEffect(() => {
    if (element && props?.container) {
      element.update({
        skyflowID: props.skyflowID,
      })
    }
  }, [props.skyflowID])

  React.useEffect(() => {
    if (element && props?.container && props.options?.cardMetadata?.scheme) {
      element.update({
        cardMetadata:{
          scheme: props.options?.cardMetadata?.scheme
        }
      })
    }
  }, [props.options?.cardMetadata?.scheme])
}

export default useUpdateElement
