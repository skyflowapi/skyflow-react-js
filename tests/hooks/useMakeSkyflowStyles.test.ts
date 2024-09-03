/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import { renderHook } from '@testing-library/react';
import useMakeSkyflowStyles from '../../src/hooks/MakeSkyflowStyles';

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
};

describe('useMakeSkyflowStyles Hook', () => {
  it('should not return undefined', () => {
    const { result } = renderHook(() => useMakeSkyflowStyles(mockStyleObject));
    expect(result.current).not.toBe(undefined);
  });

  it('useStyles function should return the passed styles object', () => {
    const { result } = renderHook(() => {
      const useStyles = useMakeSkyflowStyles(mockStyleObject);
      return useStyles();
    });
    expect(result.current).toBe(mockStyleObject);
  });

  it('useStyles function should not return an empty object if styles are passed', () => {
    const { result } = renderHook(() => {
      const useStyles = useMakeSkyflowStyles(mockStyleObject);
      return useStyles();
    });
    expect(result.current).not.toEqual({});
  });

  it('should return an empty object if styles are passed', () => {
    const { result } = renderHook(() => {
      const useStyles = useMakeSkyflowStyles();
      return useStyles();
    });
    expect(result.current).toEqual({});
  });
});
