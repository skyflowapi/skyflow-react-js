import React, { FC } from 'react';
import Skyflow from 'skyflow-js';
import { SkyflowElementProps } from '.';

const PinElement: FC<SkyflowElementProps> = ({ ...props }) => {
  const divElement = document.createElement('div');
  divElement.setAttribute('id', 'collectPinElement');
  React.useEffect(() => {
    try {
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

      const newElement = props.container.create({
        table: props.table,
        column: props.column,
        ...elementStylesOptions,
        placeholder: props.placeholder || '',
        label: props.label || '',
        type: Skyflow.ElementType.PIN,
      }, { enableCopy: false });

      newElement.mount('#collectPinElement');
    } catch (e) {
    // eslint-disable-next-line no-console
      console.log(e);
    }
  }, []);

  // useListener(Skyflow.EventName.CHANGE, element as CollectElement, props.onChange);
  // useListener(Skyflow.EventName.BLUR, element as CollectElement, props.onBlur);
  // useListener(Skyflow.EventName.FOCUS, element as CollectElement, props.onFocus);
  // useListener(Skyflow.EventName.READY, element as CollectElement, props.onReady);

  return <div id='collectPinElement' />;
};

export { PinElement };
