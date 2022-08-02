/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import * as React from 'react';
import { render } from '@testing-library/react';
import CollectContainer from 'skyflow-js/types/core/external/collect/CollectContainer';
import { CVVElement } from '../../src/elements';
import {useCollectContainer} from '../../src/hooks/useCollectContainer'

 jest.mock('../../src/hooks/useCollectContainer')


describe('CVVElement', () => {
    let container: CollectContainer
    let table: string;
    let column: string;
    let id: string;
    let label: string;
    let placeholder: string;
    let altText: string;
    let errorText: string;
    let validations: Array<Object>;
    let classes: Object;
    let onChange:jest.Mock;
    let onFocus: jest.Mock;
    let onBlur: jest.Mock;
    let onReady:jest.Mock;



   beforeEach(()=>{
        //  container={};
        table = "test";
         table = 'test';
         column="cvv";
         id= 'id';
         label= 'cvv';
         placeholder= 'Enter CVV';
         altText= "CVV";
         errorText= "error";
         validations= [{}];
         classes= {};
         onChange=jest.fn();
         onFocus= jest.fn();
         onBlur= jest.fn();
         onReady=jest.fn();

         jest.mocked(useCollectContainer).mockReturnValue(container as CollectContainer);
   })
   
    test('should match snapshot', () => {
        const cvvContainer = render( 
        <CVVElement  
            container={container} 
            table={'table1'} 
            classes={classes}  
            column={'card_number'} 
            label={"Collect Card Number"} 
            onChange={onChange} 
            onBlur={onBlur}
            onFocus={onFocus}
            onReady={onReady}
            />
        )
        expect(cvvContainer).toMatchSnapshot();
    })
})