/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import * as React from 'react';
import { render } from '@testing-library/react';
import {CardNumberElement}from '../../src/elements/CardNumberElement'
import CollectContainer from 'skyflow-js/types/core/external/collect/CollectContainer';

jest.mock('../../src/hooks/useCollectContainer')

describe('CardNumberElement', () => {
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

    test('should match snapshot', () => {
        const cardContainer = render( 
        <CardNumberElement  
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
        expect(cardContainer).toMatchSnapshot();
    })
})