/*
	Copyright (c) 2022 Skyflow, Inc. 
*/

/**
 * A hook to create Skyflow styles for a component.
 */
export const useMakeSkyflowStyles = (
  styles: Record<string, unknown> = {}
): (() => Record<string, unknown>) => {
  return function useStyles() {
    const classes: Record<string, unknown> = styles

    return classes
  }
}
