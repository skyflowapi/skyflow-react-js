/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import * as React from 'react'
import { render } from '@testing-library/react'
import FileRenderElement from '../../src/elements/FileRenderElement'
import RevealContainer from 'skyflow-js/types/core/external/reveal/reveal-container'
import Skyflow from 'skyflow-js'
import useRevealContainer from '../../src/hooks/RevealContainer'

const mountMock = jest.fn();
const eventListenerMock = jest.fn();

const revealElementMock = {
  mount: mountMock,
  on: eventListenerMock
}

jest.mock('../../src/hooks/RevealContainer', () => ({
  __esModule: true,
  default: (() => ({
    create: () => (revealElementMock),
    type: 'REVEAL'
  }))
}))
jest.mock('uuid',()=>{return {
  v4 :()=>('12443')
}
})

describe('RevealElement', () => {
  let container: RevealContainer
  let id: string
  let classes: Record<string, unknown>
  let collectContainer;

  test('should reveal element', async () => {
    const revealContainer = useRevealContainer();

    const renderElement = render(
    <FileRenderElement container={revealContainer} id={'id'} skyflowID={'id'} column={'column'} table={'table'}/>,
    )
    expect(renderElement).toMatchSnapshot()
  })

  test('should test file render element without id', () => {
    const revealContainer = useRevealContainer();
    const renderElement = render(
    <FileRenderElement container={revealContainer} id={''} classes={classes} skyflowID={'id'} column={'column'} table={'table'}/>,
    )
    expect(renderElement).toMatchSnapshot()
  })

  test('should  test file render element error scenario', () => {
    const renderElement = render(
    <FileRenderElement container={collectContainer} id={'123'} classes={classes} skyflowID={'id'} column={'column'} table={'table'}/>,
    )
    expect(renderElement).toMatchSnapshot()
  })
})
