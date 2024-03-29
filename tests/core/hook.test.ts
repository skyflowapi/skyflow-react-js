/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import React from 'react'
import Skyflow from 'skyflow-js'
import { IConfig } from '../../src/core'
import { useSkyflowClient } from '../../src/core/hook'

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

const CollectContainerMock: unknown = {
  create: jest.fn(),
  collect: jest.fn(),
}

const skyflowMock: unknown = {
  container: jest.fn().mockReturnValue(CollectContainerMock),
}
Skyflow.init = jest.fn().mockReturnValue(skyflowMock)

const mockReturnValue = {
  skyflow: skyflowMock as Skyflow,
}

describe('test useSkyflowClient hook', () => {
  it('should return skyflow object and context', () => {
    expect(useSkyflowClient()).not.toBe(undefined)
  })
  it('should not return undefined', () => {
    expect(useSkyflowClient()).not.toBe(undefined)
  })
})
