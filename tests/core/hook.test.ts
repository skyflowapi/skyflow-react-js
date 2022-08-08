/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import React from 'react'
import Skyflow from 'skyflow-js'
import { IConfig } from '../../src/core'
import { useSkyflow } from '../../src/core/hook'

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
  context: mockContext,
}

describe('test useSkyflow hook', () => {
  it('should return skyflow object and context', () => {
    expect(useSkyflow()).toStrictEqual(mockReturnValue)
  })
  it('should not return undefined', () => {
    expect(useSkyflow()).not.toBe(undefined)
  })
})
