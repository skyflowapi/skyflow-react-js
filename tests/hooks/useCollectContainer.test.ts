/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import Skyflow from 'skyflow-js'
import {useCollectContainer} from '../../src/hooks/CollectContainer'
import React from 'react'
import * as hooks from '../../src/core/SkyflowElements/hook'
import { IConfig } from '../../src/core/SkyflowElements'

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

const CollectContainerMock: unknown = {
  create: jest.fn(),
  collect: jest.fn(),
}

const skyflowMock: unknown = {
  container: jest.fn().mockReturnValue(CollectContainerMock),
}

jest.spyOn(hooks, 'useSkyflow').mockReturnValue({
  skyflow: skyflowMock as Skyflow,
})

jest.spyOn(React,'useMemo').mockImplementation((arg)=>{
  return arg();
});

describe('test useCollectContainer', () => {
  it('should return collect container', () => {
    expect(useCollectContainer()).toBe(CollectContainerMock)
  })
})
