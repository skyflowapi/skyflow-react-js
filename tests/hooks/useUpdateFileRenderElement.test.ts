import React from 'react'
import Skyflow from 'skyflow-js'
import useUpdateFileRenderElement from '../../src/hooks/UpdateFileRenderElement'

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

  it('should call update menthod with table props for File Render Element', () => {
    const props = { table: '', container: { type: Skyflow.ContainerType.REVEAL } }
    useUpdateFileRenderElement(props as any, elementMock as any)
    expect(updateMethodMock).toBeCalled()
  })

  it('should call update menthod with column props File Render Element', () => {
    const props = { column: '', container: { type: Skyflow.ContainerType.REVEAL } }
    useUpdateFileRenderElement(props as any, elementMock as any)
    expect(updateMethodMock).toBeCalled()
  })

  it('should call update menthod with altText props File Render Element', () => {
    const props = { altText: '', container: { type: Skyflow.ContainerType.REVEAL } }
    useUpdateFileRenderElement(props as any, elementMock as any)
    expect(updateMethodMock).toBeCalled()
  })

  it('should call update menthod with classes props File Render Element', () => {
    const props = { classes: '', container: { type: Skyflow.ContainerType.REVEAL } }
    useUpdateFileRenderElement(props as any, elementMock as any)
    expect(updateMethodMock).toBeCalled()
  })

  it('should call update menthod with skyflowID props File Render Element', () => {
    const props = { skyflowID: '', container: { type: Skyflow.ContainerType.REVEAL } }
    useUpdateFileRenderElement(props as any, elementMock as any)
    expect(updateMethodMock).toBeCalled()
  })

  it('should not call update method with no container ', () => {
    useUpdateFileRenderElement({ table: '' } as any, elementMock as any)
    expect(updateMethodMock).not.toBeCalled()
  })
})
