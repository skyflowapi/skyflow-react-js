import React from 'react'
import CollectElement from 'skyflow-js/types/core/external/collect/collect-element'
import ComposableElement from 'skyflow-js/types/core/external/collect/compose-collect-element'
import { SkyflowCollectElementProps } from '../../elements'

const useUpdateElement = (
  props: SkyflowCollectElementProps,
  element: CollectElement | ComposableElement | null,
): void => {

  React.useEffect(() => {
    if (element) {
      if (props?.container !== undefined) {
        element.update({
          table: props.table,
        })
      }
    }
  }, [props.table])

  React.useEffect(() => {
    if (element) {
      if (props?.container !== undefined) {
        element.update({
          column: props.column,
        })
      }
    }
  }, [props.column])

  React.useEffect(() => {
    if (element) {
      if (props?.container !== undefined) {
        element.update({
          validations: props.validations,
        })
      }
    }
  }, [props.validations])

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
          placeholder: props.placeholder,
        })
      }
    }
  }, [props.placeholder])


  React.useEffect(() => {
    if (element) {
      if (props?.container !== undefined) {
        element.update({
          ...props.classes
        })
      }
    }
  }, [props.classes])

  React.useEffect(() => {
    if (element) {
      if (props?.container !== undefined) {
        element.update({
          skyflowID: props.skyflowID
        })
      }
    }
  }, [props.skyflowID])

}

export default useUpdateElement
