/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import useRenderFile from '../../src/hooks/RenderFile'
import { act } from 'react-dom/test-utils';
import { renderHook } from '@testing-library/react';
import { FileRenderElements } from '../../src/elements';

jest.mock('../../src/elements', () => ({
  FileRenderElements: {
    'id' : 1,
    'name': 'Element 1'
  },
}));

describe('test useRenderFile', () => {
  it('should return the RevealElement if id exists in FileRenderElements', () => {
    const { result } = renderHook(() => useRenderFile('id'));
    act(() => {
      jest.runAllTimers();
    });
    expect(result.current).toBe(FileRenderElements['id']);
  });
})
