export const logs = {
  errorLogs: {
    COMPOSABLE_COMPONENT_NOT_PROVIDED: 'Component is not wrapped inside the `ComposableContainer`.',
  },
}

export const SKYFLOW_ERROR_CODE = {
  COMPOSABLE_COMPONENT_NOT_PROVIDED: {
    code: 400,
    description: logs.errorLogs.COMPOSABLE_COMPONENT_NOT_PROVIDED,
  },
}
