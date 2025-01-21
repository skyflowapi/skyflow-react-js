import React, { useRef, useState } from 'react'
import {
  CardNumberElement,
  CardType,
  useCollectContainer,
  useMakeSkyflowStyles,
} from 'skyflow-react-js'

const CardBrandChoiceSample = () => {
  // Use this state to update cardschema list to provide choice
  const [scheme,setScheme] = useState<typeof CardType[]>([]);
  
  // Use this to aviod unnesscary bin api calls.
  const binUpdate = useRef(false);

  // Create collect container.
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
      dropdownIcon: {
        // Pass styles for the dropdown icon.
      },
      dropdown: {
        // Pass styles for the card choice dropdown.
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


  const classes = useStyles()

  // collect handler
  const handleCollect = () => {
    const response = container.collect({
      tokens: true,
    })
    response
      .then((res: unknown) => {
        console.log(JSON.stringify(res))
      })
      .catch((e: unknown) => {
        console.log(e)
      })
  }

  // Cardnumber element change handler
  const handleCardChange = (state:any) => {
    console.log('Changed State',state);

    const currentBin = state.value.slice(0,8);
    
    if(currentBin.length >= 8 && !binUpdate.current){
      binUpdate.current = true;
      // Perform Bin Lookup
      binLookup(currentBin)
      .then((response) => response.text())
      .then((result) => {
        const cardData = JSON.parse(result)['cards_data'];
        const schemeList = getCardSchems(cardData)
        if(schemeList.length >= 2) 
          setScheme(schemeList)  // update card schemeList 
      })
      .catch((error) => console.error(error));

    }else if(currentBin.length < 8 && binUpdate.current){
      binUpdate.current = false;
      setScheme([]);
    }
  }

  // Sample Bin lookup api call. 
  const binLookup = (bin:string) => {
    const myHeaders = new Headers();
    myHeaders.append('X-skyflow-authorization', '<BEARER_TOKEN>'); // TODO: replace bearer token
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      'BIN': bin
    });

    const requestOptions:any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    // TODO: replace <VAULT_URL>  
    return fetch('https://<VAULT_URL>/v1/card_lookup', requestOptions);
  };

  // Handle to parse card scheme from the bin api response. 
  const getCardSchems = (cardData:any)=>{
    const schemeList:any[] = [];
    // cardData will results in array of length more than 1 if it is cobranded. 
    cardData.forEach((card:any)=>{
      if(card.card_scheme === 'VISA'){
          schemeList.push(CardType.VISA);
      }else if(card.card_scheme === 'MASTERCARD'){
          schemeList.push(CardType.MASTERCARD)
      }else if(card.card_scheme === 'CARTES BANCAIRES'){
        schemeList.push(CardType.CARTES_BANCAIRES)
      }
    })

    return schemeList
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <CardNumberElement
          container={container}
          table={'pii_fields'}
          classes={classes}
          column={'card_number'}
          label={'Card Number'}
          options={{
            required: true,  // existing options
            cardMetadata:{ scheme: scheme } // pass the cardscheme state here.
        }}
          onChange={handleCardChange} // pass change handler.
        />
    
        <button onClick={handleCollect}>Collect</button>
      </header>
    </div>
  )
}

export default CardBrandChoiceSample;