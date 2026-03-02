/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import { StylesConfig } from '../../common'

const useMakeSkyflowStyles = (
  styles: StylesConfig = {},
): (() => StylesConfig) => {
  return function useStyles() {
    const classes: StylesConfig = styles

    return classes
  }
}
export default useMakeSkyflowStyles
