/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import React from 'react'
import {
  useCollectContainer,
  LENGTH_MATCH_RULE,
  CardHolderNameElement
} from 'skyflow-react-js'

function CustomValidations() {
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

  const lengthRule = {
    type: LENGTH_MATCH_RULE,
    params: {
      min: 4,
      max: 6,
      error: 'Must be between 4 and 6 alphabets',
    },
  }
  const validationArray = [lengthRule]

  return (
    <div className='CollectElements' style={{ width: '300px' }}>
      <CardHolderNameElement
        id={'collectCardName'}
        container={container}
        table={'table1'}
        column={'card_name'}
        label={'Collect Card Name'}
        validations={validationArray}
      />

      <button onClick={handleCollect}>Collect</button>
    </div>
  )
}

export default CustomValidations
