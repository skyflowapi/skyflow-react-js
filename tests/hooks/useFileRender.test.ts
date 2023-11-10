/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import Skyflow from 'skyflow-js'
import useRenderFile from '../../src/hooks/RenderFile'
import React from 'react'
import { IConfig } from '../../src/core'

const mockContext: IConfig = {
  vaultID: '',
  vaultURL: '',
  getBearerToken: jest.fn(),
  options: {
    logLevel: Skyflow.LogLevel.ERROR,
    env: Skyflow.Env.PROD,
  },
}

const mockUseContext = jest.fn().mockImplementation(() => mockContext)

React.useContext = mockUseContext

Skyflow.init = jest.fn()

const useRenderFileMock: unknown = {
    'id': 1,
    'name': 'Element 1',
}

const mockFileRenderElements = {
    'revealElement-1': {
      id: 1,
      name: 'Element 1',
    },
  };

jest
.spyOn(React, 'useState')
.mockImplementation(
  () => [mockFileRenderElements['revealElement-1'], jest.fn()]
);
jest.spyOn(React,'useEffect').mockImplementation((arg)=>{
  return arg();
});

describe('test useRenderFile', () => {
    it('should return useRenderFile', () => {
        expect(useRenderFile('div')).toStrictEqual(useRenderFileMock);
    });
})
