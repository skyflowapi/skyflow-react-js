/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import { StylesConfig } from '../../types'

const useMakeSkyflowStyles = (
  styles: StylesConfig = {},
): (() => StylesConfig) => {
  return function useStyles() {
    const classes: StylesConfig = styles

    return classes
  }
}
export default useMakeSkyflowStyles
