import React from 'react';
import {
    useCollectContainer,
    InputFieldElement,
    useMakeSkyflowStyles,
    CardNumberElement,
} from 'skyflow-react-js';

const InputFormatting = () => {
    const container = useCollectContainer();

    const handleCollect = () => {
        const response = container.collect();
        response
            .then((res: unknown) => {
                console.log(JSON.stringify(res));
            })
            .catch((e: unknown) => {
                console.log(e);
            });
    };

    const useStyles = useMakeSkyflowStyles({
        inputStyles: {
            base: {
                border: '1px solid black',
                borderRadius: '4px',
                color: '#1d1d1d',
                padding: '10px 16px',
                fontFamily: '"Roboto", sans-serif'
            },
            complete: {
                color: '#4caf50',
            },
            empty: {},
            focus: {},
            invalid: {
                color: '#f44336',
            },
            global: {
                '@import': 'url("https://fonts.googleapis.com/css2?family=Roboto&display=swap")',
            }
        },
        labelStyles: {
            base: {
                fontSize: '16px',
                fontWeight: 'bold',
                fontFamily: '"Roboto", sans-serif'
            },
            global: {
                '@import': 'url("https://fonts.googleapis.com/css2?family=Roboto&display=swap")',
            },
            requiredAsterisk: {
                color: 'red'
            }
        },
        errorTextStyles: {
            base: {
                color: 'red',
                fontFamily: '"Roboto", sans-serif'
            },
            global: {
                '@import': 'url("https://fonts.googleapis.com/css2?family=Roboto&display=swap")',
            },
        },
    });

    const classes = useStyles();

    // Phone Number (+91 XXXXX-XXXXX)
    const numberOptions = {
        format: '+91 XXXXX-XXXXX',
        translation: { 'X': '[0-9]' }
    };

    // Email (XXXXX@XXXXX.XXX)
    const emailOptions = {
        format: 'XXXXXXXXXX@XXXXXXXXXX.XXX',
        translation: { 'X': '[A-Za-z0-9._%+-]' }
    };

    // OTP spaced format: "XXX-XXX"
    const otpOptions = {
        format: 'XXX-XXX',
        translation: { 'X': '[0-9]' }
    };

    return (
        <div className='CollectElements' style={{ width: '300px' }}>
            {/* Card Number (Default Format) */}
             <CardNumberElement
                id={'collectCardNumber2'}
                container={container}
                table={'table1'}
                classes={classes}
                column={'card_number'}
                label={'Collect Card Number'}
                skyflowID={'<SKYFLOW_ID>'}
            />

            {/* Number Field */}
            <InputFieldElement
                id='number'
                container={container}
                classes={classes}
                table={'table1'}
                column={'number'}
                label={'Number'}
                options={numberOptions}
            />

            {/* Email Field */}
            <InputFieldElement
                id='email'
                container={container}
                classes={classes}
                table={'table1'}
                column={'email'}
                label={'Email'}
                options={emailOptions}
            />


            {/* OTP Field */}
            <InputFieldElement
                id='otp'
                container={container}
                classes={classes}
                table={'table1'}
                column={'otp'}
                label={'OTP'}
                options={otpOptions}
            />
           
            <button onClick={handleCollect}>Collect</button>
        </div>
    );
};

export default InputFormatting;
