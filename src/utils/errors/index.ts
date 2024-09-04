import sdkDetails from '../../../package.json'

const sdkLanguageAndVersion = `React SDK v${sdkDetails.version}`;

export const logs = {
  errorLogs: {
    COMPOSABLE_COMPONENT_NOT_PROVIDED: `${sdkLanguageAndVersion} Component is not wrapped inside the \`ComposableContainer\`.`,
    MISSING_ELEMENTID_IN_ELEMENT_MATCH_RULE:
      `${sdkLanguageAndVersion} Validation error. Missing 'element id' param in validations array at index %s1. Specify a valid value for element id param.`,
    INVALID_PARAMS_IN_ELEMENT_MATCH_RULE:
      `${sdkLanguageAndVersion} Validation error. Invalid 'params' for validation rule found in validations array at index %s1. Specify valid params for validation rule.`,
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
