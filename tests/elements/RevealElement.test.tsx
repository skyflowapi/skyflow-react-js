/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import * as React from 'react'
import { render } from '@testing-library/react'
import RevealElement from '../../src/elements/RevealElement'
import RevealContainer from 'skyflow-js/types/core/external/reveal/reveal-container'


jest.mock('../../src/hooks/RevealContainer')

describe('RevealElement', () => {
  let container: RevealContainer
  let token: string
  let id: string
  let label: string
  let classes: Record<string, unknown>

  test('should match snapshot', () => {
    const revealElement = render(
      <RevealElement container={container} id={id} token={token} classes={classes} label={label} />,
    )
    expect(revealElement).toMatchSnapshot()
  })
})
