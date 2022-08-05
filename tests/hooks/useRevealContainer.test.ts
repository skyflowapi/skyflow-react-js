/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import Skyflow from 'skyflow-js'
import useRevealContainer from '../../src/hooks/RevealContainer'
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

const RevealContainerMock: unknown = {
  create: jest.fn(),
  reveal: jest.fn(),
}

const skyflowMock: unknown = {
  container: jest.fn().mockReturnValue(RevealContainerMock),
}

jest.spyOn(hooks, 'useSkyflow').mockReturnValue({
  skyflow: skyflowMock as Skyflow,
  context: mockContext,
})

describe('test useRevealContainer', () => {
  it('should return reveal container', () => {
    expect(useRevealContainer()).toBe(RevealContainerMock)
  })
})
