/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import * as React from 'react'
import { render } from '@testing-library/react'
import FileRenderElement from '../../src/elements/FileRenderElement'
import RevealContainer from 'skyflow-js/types/core/external/reveal/reveal-container'
import Skyflow from 'skyflow-js'

jest.mock('../../src/hooks/RevealContainer')
jest.mock('uuid',()=>{return {
  v4 :()=>('12443')
}
})

describe('RevealElement', () => {
  let container: RevealContainer
  let id: string
  let classes: Record<string, unknown>

  test('should match snapshot', () => {
    const renderElement = render(
    <FileRenderElement container={container} id={id} classes={classes} skyflowID={'id'} column={'column'} table={'table'}/>,
    )
    expect(renderElement).toMatchSnapshot()
  })
})
