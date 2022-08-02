/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import * as React from 'react';
import { render } from '@testing-library/react';
import {CardHolderNameElement}from '../../src/elements/CardHolderNameElement'
import CollectContainer from 'skyflow-js/types/core/external/collect/CollectContainer';

jest.mock('../../src/hooks/useCollectContainer')

describe('CardNameElement', () => {
    let container: CollectContainer 
    let table: string;
    let column: string;
    let id: string;
    let label: string;
    let placeholder: string;
    let errorText: string;
    let validations: Array<Object>;
    let classes: Object;
    let onChange:jest.Mock;
    let onFocus: jest.Mock;
    let onBlur: jest.Mock;
    let onReady:jest.Mock;

    test('should match snapshot', () => {
        const cardNameContainer = render( 
        <CardHolderNameElement  
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
        expect(cardNameContainer).toMatchSnapshot();
    })
})