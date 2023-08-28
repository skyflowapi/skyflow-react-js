import React from 'react';
import {
	CardNumberElement,
	CVVElement,
	useMakeSkyflowStyles,
	useComposableContainer,
	ComposableContainer,
	CardHolderNameElement,
	FileInputElement,
} from 'skyflow-react-js';

const ComposableElements = () => {

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
	const useCardCvvStyles = useMakeSkyflowStyles({
		inputStyles: {
			base: {
				fontFamily: 'Inter',
				fontStyle: 'normal',
				fontWeight: 400,
				fontSize: '14px',
				lineHeight: '21px',
			},
			complete: {
				color: '#4caf50',
			},
			empty: {},
			focus: {},
			invalid: {
				color: '#f44336',
			},
		},
		labelStyles: {
		},
		errorTextStyles: {
			base: {
				display: 'none'
			},
		},
	})

	const classes = useStyles();
	const cvvClasses = useCardCvvStyles();

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

	const handleFile = () => {
		const response = container.uploadFiles({});
		response
		  .then((res: unknown) => {
			console.log(JSON.stringify(res));
		  })
		  .catch((e: unknown) => {
			console.log(e);
		  });
	  };

	return (
		<div className='ComposableElements' >
			<ComposableContainer
				id={'composecontainer'}
				container={container}
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
				/>
				<CVVElement
					id='cvv'
					container={container}
					table='pii_fields'
					classes={cvvClasses}
					placeholder={'CVC'}
					column={'cvv'}
				/>
				<FileInputElement
					id='file-input'
					container={container}
					classes={classes}
					table={'table1'}
					column={'file-input'}
				/>
			</ComposableContainer >
			
			<button onClick={handleFile}>Submit file</button>
			
			<button onClick={handleCollect}>Collect</button>
		</div>
	);
};

export default ComposableElements;

