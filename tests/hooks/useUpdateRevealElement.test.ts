import React from 'react'
import Skyflow from 'skyflow-js'
import useUpdateRevealElement from '../../src/hooks/UpdateRevealElement'

const updateMethodMock = jest.fn()
const elementMock = {
  update: updateMethodMock,
}

describe('test useUpdateElement hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
    jest.spyOn(React, 'useEffect').mockImplementation((arg) => {
      return arg()
    })
  })

  it('should call update method with label props for Reveal Element', () => {
    const props = { label: '', container: { type: Skyflow.ContainerType.REVEAL } }
    useUpdateRevealElement(props as any, elementMock as any)
    expect(updateMethodMock).toBeCalled()
  })

  it('should call update method with altText props Reveal Element', () => {
    const props = { altText: '', container: { type: Skyflow.ContainerType.REVEAL } }
    useUpdateRevealElement(props as any, elementMock as any)
    expect(updateMethodMock).toBeCalled()
  })

  it('should call update method with classes props Reveal Element', () => {
    const props = { classes: '', container: { type: Skyflow.ContainerType.REVEAL } }
    useUpdateRevealElement(props as any, elementMock as any)
    expect(updateMethodMock).toBeCalled()
  })

  it('should call update method with redaction props Reveal Element', () => {
    const props = { redaction: '', container: { type: Skyflow.ContainerType.REVEAL } }
    useUpdateRevealElement(props as any, elementMock as any)
    expect(updateMethodMock).toBeCalled()
  })

  it('should call update method with token props Reveal Element', () => {
    const props = { token: '', container: { type: Skyflow.ContainerType.REVEAL } }
    useUpdateRevealElement(props as any, elementMock as any)
    expect(updateMethodMock).toBeCalled()
  })

  it('should not call update method with no container ', () => {
    useUpdateRevealElement({ altText: '' } as any, elementMock as any)
    expect(updateMethodMock).not.toBeCalled()
  })
})
