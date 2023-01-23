/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import Skyflow from 'skyflow-js'
import useComposableContainer from '../../src/hooks/ComposableContainer'
import React from 'react'
import * as hooks from '../../src/core/hook'
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

const ComposableContainerMock: unknown = {
  create: jest.fn(),
  collect: jest.fn(),
}

const skyflowMock: unknown = {
  container: jest.fn().mockReturnValue(ComposableContainerMock),
}

jest.spyOn(hooks, 'useSkyflow').mockReturnValue({
  skyflow: skyflowMock as Skyflow,
})

jest.spyOn(React,'useMemo').mockImplementation((arg)=>{
  return arg();
});


describe('test useComposableContainer', () => {
  it('should return composable container', () => {
    expect(useComposableContainer({layout:[1]})).toBe(ComposableContainerMock)
  })
})
