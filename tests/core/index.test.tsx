import { render, screen } from '@testing-library/react'
import SkyflowElements, { IConfig } from '../../src/core/index'
import { skyflowContext } from '../../src/core/hook'
import React, { useContext } from 'react'
import Skyflow from 'skyflow-js'
import '@testing-library/jest-dom'

const mockContext: IConfig = {
  vaultID: 'abc',
  vaultURL: 'url',
  getBearerToken: jest.fn(),
  options: {
    logLevel: Skyflow.LogLevel.ERROR,
    env: Skyflow.Env.PROD,
  },
}

Skyflow.init = jest.fn()

const TestingComponent = () => {
  const { vaultID, vaultURL } = useContext(skyflowContext)
  return (
    <>
      <div data-testid='vault-id'>{vaultID}</div>
      <div data-testid='vault-url'>{vaultURL}</div>
    </>
  )
}

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <skyflowContext.Provider value={providerProps}>{ui}</skyflowContext.Provider>,
    renderOptions,
  )
}

describe('<SkyflowElements />', () => {
  test('test vault id default value', () => {
    render(<TestingComponent />)
    expect(screen.getByTestId('vault-id')).toHaveTextContent('')
  })

  test('vault ID and vault URL value from provider', () => {
    const providerProps = {
      ...mockContext,
    }
    customRender(<TestingComponent />, { providerProps })
    expect(screen.getByTestId('vault-id')).toHaveTextContent('abc')
    expect(screen.getByTestId('vault-url')).toHaveTextContent('url')
  })

  test('SkyflowElements /Consumer shows vaultID and vaultURL', () => {
    const wrapper = ({ children }) => (
      <SkyflowElements config={mockContext}>{children}</SkyflowElements>
    )

    render(<TestingComponent />, { wrapper })
    expect(screen.getByTestId('vault-id')).toHaveTextContent('abc')
    expect(screen.getByTestId('vault-url')).toHaveTextContent('url')
  })
})
