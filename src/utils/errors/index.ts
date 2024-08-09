export const logs = {
  errorLogs: {
    COMPOSABLE_COMPONENT_NOT_PROVIDED: 'Component is not wrapped inside the `ComposableContainer`.',
    MISSING_ELEMENTID_IN_ELEMENT_MATCH_RULE:
      'Interface: collect element - Missing `elementId` in ValidationRule params at index %s1 in validations array.',
    INVALID_PARAMS_IN_ELEMENT_MATCH_RULE:
      'Interface: collect element - `element` param not supported in ValidationRule params at index %s1 in validations array. Pass `elementId` instead.',
  },
}

export const SKYFLOW_ERROR_CODE = {
  COMPOSABLE_COMPONENT_NOT_PROVIDED: {
    code: 400,
    description: logs.errorLogs.COMPOSABLE_COMPONENT_NOT_PROVIDED,
  },
  MISSING_ELEMENTID_IN_ELEMENT_MATCH_RULE: {
    code: 400,
    description: logs.errorLogs.MISSING_ELEMENTID_IN_ELEMENT_MATCH_RULE,
  },
  INVALID_PARAMS_IN_ELEMENT_MATCH_RULE: {
    code: 400,
    description: logs.errorLogs.INVALID_PARAMS_IN_ELEMENT_MATCH_RULE,
  },
}
