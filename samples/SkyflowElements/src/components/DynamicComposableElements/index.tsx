/*
	Copyright (c) 2023 Skyflow, Inc.
*/
import React, { useState } from 'react';
import {
	CardNumberElement,
	CVVElement,
	useMakeSkyflowStyles,
	CardHolderNameElement,
	ComposableContainer,
	useComposableContainer,
	LENGTH_MATCH_RULE,
	ExpirationDateElement,
} from 'skyflow-react-js';

const DynamicComposableElements = () => {
	// State for validation rules on cvv field.
	const [cvvValidationRules,setCvvValidationRules] = useState<any>([]);

	const useStyles = useMakeSkyflowStyles({
		inputStyles: {
			base: {
				fontFamily: 'Inter',
				fontStyle: 'normal',
				fontWeight: 400,
				fontSize: '14px',
				lineHeight: '21px',
				color: '#1d1d1d',
				padding: '0px 16px'
			},
			complete: {
				color: '#4caf50',
			}

		},
		empty: {
		},
		focus: {
		},
		invalid: {
			color: '#f44336',
		},
	});
	
	const classes = useStyles();

	const containerOptions = {
		layout: [1, 3],
		styles: {
			base: {
				border: '1px solid #DFE3EB',
				padding: '8px',
				borderRadius: '4px',
				margin: '12px 2px',
			}
		},
		errorTextSyles: {
			base: {
				color: '#f44336'
			}
		}
	}

	const container = useComposableContainer(containerOptions);

	const handleCollect = () => {
		const options = {
			tokens: true
		}
		const response = container?.collect(options);
		response
			?.then((res: any) => {
				console.log(JSON.stringify(res));
			})
			.catch((e: any) => {
				console.log(e);
			});
	};

	// Sample helper function to determine cvv length. 
	const findCvvLength = (cardBinValue:string)=>{
		const amexRegex = /^3[47][0-9]{4}$/
		return amexRegex.test(cardBinValue.slice(0,6)) ? 4 : 3
	};	

	// Validation Rules for cvv element.
	const length3Rule = {
		type: LENGTH_MATCH_RULE,
		params: {
		  max: 3,
		  error: 'cvv must be 3 digits',
		},
	  };

	  const length4Rule = {
		type: LENGTH_MATCH_RULE,
		params: {
		  min: 4,
		  error: 'cvv must be 4 digits',
		},
	  };

	// OnChange listener for cardNumber element.
	const onChangeHandler = (state:any)=>{
		if(state.isValid){
			// update cvv element validation rule.
			if(findCvvLength(state.value) === 3)
				setCvvValidationRules([length3Rule]); 
			else
				setCvvValidationRules([length4Rule]);
		}
	};	

	const handleSubmit = ()=>{
		// Your implementation when the SUBMIT(enter) event occurs.
		console.log('OnSubmit listener Triggred..!')
	};

	return (
		<div className='ComposableElements' >
			<ComposableContainer
				id={'dynamicomposecontainer'}
				container={container}
				onSubmit={handleSubmit} // Pass onSubmit handler. 
			>
				<CardHolderNameElement
					id={'collectCardHolderName'}
					container={container}
					table={'pii_fields'}
					classes={classes}
					placeholder={'Cardholder Name'}
					column={'first_name'}
				/>
				<CardNumberElement
					id={'collectCardNumber'}
					container={container}
					table={'pii_fields'}
					classes={classes}
					placeholder={'XXXX XXXX XXXX XXXX'}
					column={'card_number'}
					onChange={onChangeHandler}
				/>
				<ExpirationDateElement 
					id='expiry_date'
					container={container}
					table={'pii_fields'}
					column={'expiry_date'}
					classes={classes}
					placeholder={'MM/YY'}
				/>
				<CVVElement
					id='cvv'
					container={container}
					table='pii_fields'
					classes={classes}
					placeholder={'CVC'}
					column={'cvv'}
					validations={cvvValidationRules} // pass validations state.
				/>
			</ComposableContainer >

			<button onClick={handleCollect}>Collect</button>
		</div>
	);
};

export default DynamicComposableElements;

