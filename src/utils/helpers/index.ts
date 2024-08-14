import { CollectElements, ComposableElements } from '../../elements'
import Skyflow from 'skyflow-js'
import { IValidationRule } from 'skyflow-js/types/utils/common'
import { SKYFLOW_ERROR_CODE } from '../errors'
import CollectContainer from 'skyflow-js/types/core/external/collect/collect-container'
import ComposableContainer from 'skyflow-js/types/core/external/collect/compose-collect-container'

export const createElementValueMatchRule = (
  container: CollectContainer | ComposableContainer,
  validations?: IValidationRule[],
) => {
  if (validations) {
    for (let index = 0; index < validations.length; index++) {
      const validationRule = validations[index]
      if (validationRule.type === Skyflow.ValidationRuleType.ELEMENT_VALUE_MATCH_RULE) {
        const { params } = validationRule
        if (params) {
          const hasElementId = 'elementId' in params
          const hasElement = 'element' in params
          if (hasElement && !hasElementId) {
            throw new Skyflow.Error(
              SKYFLOW_ERROR_CODE.INVALID_PARAMS_IN_ELEMENT_MATCH_RULE,
              [`${index}`],
              true,
            )
          } else if (!hasElementId) {
            throw new Skyflow.Error(
              SKYFLOW_ERROR_CODE.MISSING_ELEMENTID_IN_ELEMENT_MATCH_RULE,
              [`${index}`],
              true,
            )
          }
        }
        const elementId = validationRule.params.elementId
        if (container && container.type === Skyflow.ContainerType.COLLECT) {
          if (Object.prototype.hasOwnProperty.call(CollectElements, elementId)) {
            validationRule.params.element = CollectElements[elementId]
            validations[index] = validationRule
          }
        } else if (container && container.type === Skyflow.ContainerType.COMPOSABLE) {
          if (Object.prototype.hasOwnProperty.call(ComposableElements, elementId)) {
            validationRule.params.element = ComposableElements[elementId]
            validations[index] = validationRule
          }
        }

        return validations
      }
    }
  }
  return validations
}
