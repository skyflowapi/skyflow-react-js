/*
	Copyright (c) 2022 Skyflow, Inc. 
*/

const useMakeSkyflowStyles = (
  styles: Record<string, unknown> = {},
): (() => Record<string, unknown>) => {
  return function useStyles() {
    const classes: Record<string, unknown> = styles

    return classes
  }
}
export default useMakeSkyflowStyles
