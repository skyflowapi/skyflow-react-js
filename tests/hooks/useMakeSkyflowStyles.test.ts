/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import useMakeSkyflowStyles from '../../src/hooks/MakeSkyflowStyles'

const mockStyleObject = {
  inputStyles: {
    base: {
      border: '1px solid black',
    },
    empty: {},
    focus: {},
    invalid: {},
  },
  labelStyles: {
    base: {
      fontSize: '16px',
      fontWeight: 'bold',
    },
  },
  errorTextStyles: {
    base: {
      color: 'red',
    },
  },
}

const mockUseStyles = {
  useStyles: jest.fn().mockReturnValue(mockStyleObject),
}

describe('Test make syflow styles hook', () => {
  it('useMakestyles hook should not return undefined', () => {
    const result = useMakeSkyflowStyles(mockStyleObject)
    expect(result).not.toBe(undefined)
  })

  it('useStyles functiion to return classes object ', () => {
    expect(mockUseStyles.useStyles()).toBe(mockStyleObject)
  })

  it('useStyles function should not return empty object if styles are passed', () => {
    expect(mockUseStyles.useStyles()).not.toBe({})
  })
})
