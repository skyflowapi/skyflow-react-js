import React, { useState } from 'react'
import {
  CardHolderNameElement,
  CardNumberElement,
  FileInputElement,
  useCollectContainer,
  useMakeSkyflowStyles,
} from 'skyflow-react-js'

const DynamicCollectElements = () => {
  const [nameLabel, setNameLabel] = useState<any>('name')
  const [table, setTable] = useState<string>('dummy-table')
  const [skyflowID, setSkyflowID] = useState<string>('dummy-id')

  const container = useCollectContainer()

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
      cardIcon: {
        position: 'absolute',
        left: '8px',
        bottom: 'calc(50% - 12px)',
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
        color: 'blue',
      },
    },
  })

  const options = {
    enableCopy: true,
  }

  const classes = useStyles()

  const handleCollect = () => {
    const response = container.collect({
      tokens: true,
    })
    response
      .then((res: unknown) => {
        console.log(JSON.stringify(res))
        return res
      })
      .then((res: any) => {
        const id = res.records[0].fields.skyflow_id
        setSkyflowID(id)
      })
      .catch((e: unknown) => {
        console.log(e)
      })
  }

  React.useEffect(() => {
    if (skyflowID !== 'dummy-id') {
      container
        .uploadFiles({})
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [skyflowID])

  const handleUpdate = () => {
    setNameLabel('Collect CardHolder Name')
    setTable('pii_fields')
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <CardNumberElement
          container={container}
          table={table}
          classes={classes}
          column={'card_number'}
          label={'Collect Card Number'}
          options={options}
        />

        <CardHolderNameElement
          container={container}
          table={table}
          column={'name'}
          label={nameLabel}
          classes={classes}
          options={options}
        />

        <FileInputElement
          container={container}
          table={table}
          column={'file'}
          label={'Collect File'}
          classes={classes}
          skyflowID={skyflowID}
        />
        <button onClick={handleCollect}>Collect</button>
        <button onClick={handleUpdate}>Update</button>
      </header>
    </div>
  )
}

export default DynamicCollectElements
