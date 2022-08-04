import React from 'react'
import {
  CardNumberElement,
  CVVElement,
  ExpirationMonthElement,
  ExpirationYearElement,
  PinElement,
  ExpirationDateElement,
  useCollectContainer,
  useMakeSkyflowStyles,
} from 'skyflow-react-js'

function CollectElements() {
  const container = useCollectContainer()

  const handleCollect = () => {
    const response = container.collect()
    response
      .then((res: unknown) => {
        console.log(JSON.stringify(res))
      })
      .catch((e: unknown) => {
        console.log(e)
      })
  }

  const useStyles = useMakeSkyflowStyles({
    inputStyles: {
      base: {
        border: '1px solid black',
        borderRadius: '4px',
        color: '#1d1d1d',
        padding: '10px 16px',
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
      base: {
        fontSize: '16px',
        fontWeight: 'bold',
      },
    },
    errorTextStyles: {
      base: {
        color: 'red',
      },
    },
  })

  const classes = useStyles()

  return (
    <div className='CollectElements' style={{ width: '300px' }}>
      <CardNumberElement
        id={'collectCardNumber'}
        container={container}
        table={'table1'}
        classes={classes}
        column={'card_number'}
        label={'Collect Card Number'}
      />
      <CVVElement
        id='cvv'
        container={container}
        table='table1'
        classes={classes}
        column={'cvv'}
        label='Collect CVV'
      />
      <ExpirationMonthElement
        id='mon'
        container={container}
        classes={classes}
        table='table1'
        column={'exp_month'}
        label='Collect Exp Month'
        placeholder='MM'
      />
      <ExpirationYearElement
        id='year'
        container={container}
        classes={classes}
        table='table1'
        column={'exp_year'}
        label='Collect Exp Year'
        placeholder='YY'
      />
      <ExpirationDateElement
        id='date'
        container={container}
        classes={classes}
        table={'table1'}
        column={'card_expiration'}
        label={'Expiration Date'}
      />
      <PinElement
        id='pin'
        container={container}
        classes={classes}
        table={'table1'}
        column={'card_pin'}
        label={'Pin'}
      />

      <button onClick={handleCollect}>Collect</button>
    </div>
  )
}

export default CollectElements
