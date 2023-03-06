import React from 'react'
import Skyflow from 'skyflow-js'
import CollectElement from 'skyflow-js/types/core/external/collect/collect-element'
import ComposableElement from 'skyflow-js/types/core/external/collect/compose-collect-element'
import { SkyflowCollectElementProps } from '../../elements'

const useUpdateElement = (
  props: SkyflowCollectElementProps,
  element: CollectElement | ComposableElement | null,
): void => {

  React.useEffect(() => {
    if (element) {
      if (props?.container.type === Skyflow.ContainerType.COMPOSABLE) {
        element?.update({
          table: props.table,
        })
      }
    }
  }, [props.table])

  React.useEffect(() => {
    if (element) {
      if (props?.container.type === Skyflow.ContainerType.COMPOSABLE) {
        element?.update({
          column: props.column,
        })
      }
    }
  }, [props.column])

  React.useEffect(() => {
    if (element) {
      if (props?.container.type === Skyflow.ContainerType.COMPOSABLE) {
        element?.update({
          validations: props.validations,
        })
      }
    }
  }, [props.validations])

  React.useEffect(() => {
    if (element) {
      if (props?.container.type === Skyflow.ContainerType.COMPOSABLE) {
        element?.update({
          label: props.label,
        })
      }
    }
  }, [props.label])

  React.useEffect(() => {
    if (element) {
      if (props?.container.type === Skyflow.ContainerType.COMPOSABLE) {
        element?.update({
          placeholder: props.placeholder,
        })
      }
    }
  }, [props.placeholder])


  React.useEffect(() => {
    if (element) {
        element.update({
          ...props.classes
        })
    }
  }, [props.classes])

}

export default useUpdateElement
