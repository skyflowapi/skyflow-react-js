import { useState } from 'react';
import Skyflow from 'skyflow-js';
import { ElementType } from 'skyflow-js/types/core/constants';
import CollectContainer from 'skyflow-js/types/core/external/collect/CollectContainer';
import CollectElement from 'skyflow-js/types/core/external/collect/CollectElement';
import RevealContainer from 'skyflow-js/types/core/external/reveal/RevealContainer';
import RevealElement from 'skyflow-js/types/core/external/reveal/RevealElement';
import { useSkyflow } from '../core/SkyflowElements';
import { SkyflowElementProps } from './index';

const useElement = (
  id:string,
  elementProps: SkyflowElementProps,
  elementType: ElementType,
  // TODO Options
): {
  element: CollectElement | RevealElement,
  elementContainer: CollectContainer | RevealContainer
} => {
  const [element, setElement] = useState<CollectElement | RevealElement>();
  const { vaultID, vaultURL, getBearerToken } = useSkyflow();

  const skyflow = Skyflow.init({
    vaultID,
    vaultURL,
    getBearerToken,
    options: {
      logLevel: Skyflow.LogLevel.ERROR,
      env: Skyflow.Env.PROD,
    },
  });

  const elementContainer = skyflow.container(Skyflow.ContainerType.COLLECT);
  try {
    const revealView = document.getElementById('revealView');
    revealView.style.visibility = 'hidden';

    // custom styles for collect elements
    const elementStylesOptions = {
      inputStyles: {
        base: {
          border: '1px solid #eae8ee',
          padding: '10px 16px',
          borderRadius: '4px',
          color: '#1d1d1d',
          marginTop: '4px',
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
          color: '#f44336',
        },
      },
    };

    // create collect elements
    const newElement = elementContainer.create({
      table: elementProps.table,
      column: elementProps.column,
      ...elementStylesOptions,
      placeholder: elementProps.placeholder || elementType,
      label: elementProps.label || elementType,
      type: elementType,
      // type: Skyflow.ElementType.CARD_NUMBER,
    });

    newElement.mount(`#${id}`);
    setElement(newElement);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
  return { element, elementContainer };
};

export default useElement;
