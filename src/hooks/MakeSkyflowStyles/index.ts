/*
	Copyright (c) 2022 Skyflow, Inc. 
*/

/**
 *  sample documentation for useMakeSkyflowStyles hook
 * @param styles: Record<string, unknown>
 * @param style: string
 */
export const useMakeSkyflowStyles = (
  styles: Record<string, unknown> = {}
): (() => Record<string, unknown>) => {
  return function useStyles() {
    const classes: Record<string, unknown> = styles

    return classes
  }
}
