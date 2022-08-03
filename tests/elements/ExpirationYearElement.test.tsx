/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import * as React from 'react'
import { render } from '@testing-library/react'
import CollectContainer from 'skyflow-js/types/core/external/collect/CollectContainer'
import ExpirationYearElement from '../../src/elements/ExpirationYear'

jest.mock('../../src/hooks/CollectContainer')

describe('ExpiryYearElement', () => {
  let container: CollectContainer
  let table: string
  let column: string
  let id: string
  let label: string
  let placeholder: string
  let validations: Array<Record<string, unknown>>
  let classes: Record<string, unknown>
  let onChange: jest.Mock
  let onFocus: jest.Mock
  let onBlur: jest.Mock
  let onReady: jest.Mock

  test('should match snapshot', () => {
    const expiryYearContainer = render(
      <ExpirationYearElement
        id={id}
        container={container}
        table={table}
        classes={classes}
        column={column}
        placeholder={placeholder}
        label={label}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        onReady={onReady}
        validations={validations}
      />,
    )
    expect(expiryYearContainer).toMatchSnapshot()
  })
})
