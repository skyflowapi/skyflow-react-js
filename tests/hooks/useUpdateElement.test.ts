import React from 'react';
import Skyflow from 'skyflow-js';
import useUpdateElement from '../../src/hooks/UpdateElement';

const updateMethodMock = jest.fn();
const elementMock = {
    update: updateMethodMock
}

describe('test useUpdateElement hook',()=>{
    beforeEach(()=>{
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.spyOn(React,'useEffect').mockImplementation((arg)=>{
        return arg();
    });
  
    });
    
    it('should call update menthod with table props for Composable Element',()=>{
        const props = {table:'',container:{type:Skyflow.ContainerType.COMPOSABLE}}
        useUpdateElement(props as any, elementMock as any);
        expect(updateMethodMock).toBeCalled();
    });
    
    it('should call update menthod with table props Collect Element',()=>{
        const props = {table:'',container:{type:Skyflow.ContainerType.COLLECT}}
        useUpdateElement(props as any, elementMock as any);
        expect(updateMethodMock).toBeCalled();
    });

    it('should not call update method with no container ',()=>{
        useUpdateElement({table:''} as any, elementMock as any);
        expect(updateMethodMock).not.toBeCalled();
    });

    it('should call update if options have cardmetadata',()=>{
        useUpdateElement({options:{cardMetadata:{scheme:[]}},container:{type:Skyflow.ContainerType.COLLECT}} as any, elementMock as any);
        expect(updateMethodMock).toBeCalled();
    })
});