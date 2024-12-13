/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import use3DS from '../../src/hooks/ThreeDS'
import { renderHook } from '@testing-library/react'

describe('test useRenderFile', () => {
  it('should return the RevealElement if id exists in FileRenderElements', () => {
    const {result} = renderHook(() => use3DS())
    expect(result.current.getBroswerDetails).toBeDefined()
    expect(result.current.showChallenege).toBeDefined()
  })
})
