/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import * as React from 'react'
import { render } from '@testing-library/react'
import CardNumberElement from '../../src/elements/CardNumber'
import useCollectContainer from '../../src/hooks/CollectContainer'
import useComposabelContainer from '../../src/hooks/ComposableContainer'
import CVVElement from '../../src/elements/CVV'
import PinElement from '../../src/elements/PIN'
import ExpirationDateElement from '../../src/elements/ExpirationDate'
import ExpirationMonthElement from '../../src/elements/ExpirationMonth'
import ExpirationYearElement from '../../src/elements/ExpirationYear'
import InputFieldElement from '../../src/elements/InputField'
import CardHolderNameElement from '../../src/elements/CardHolderName'
import ComposableContainer from '../../src/elements/ComposableContainer';

const foucsTrigger = jest.fn();
const blurTrigger = jest.fn();
const changeTrigger = jest.fn();
const readyTrigger = jest.fn();

const eventListenerMock = jest.fn().mockImplementation((_, handler) => {
  handler();
});
const mountMock = jest.fn();
const eventEmitterMock = jest.fn();

const composableEventEmitter = {
  _emit: eventEmitterMock,
};

const collectElementMock = {
  mount: mountMock,
  on: eventListenerMock
}

const composableElementMock = {
  on: eventListenerMock
}
 
jest.mock('../../src/hooks/CollectContainer', () => ({
  __esModule: true,
  default: (() => ({
    create: () => (collectElementMock),
    type: 'COLLECT'
  }))
}));

jest.mock('../../src/hooks/ComposableContainer', () => ({
  __esModule: true,
  default: (() => ({
    create: () => (composableElementMock),
    type: 'COMPOSABLE'
  }))
}));


describe('test collect elements', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  test('test card number collect Element ', () => {
    const container = useCollectContainer();
    const cardContainer = render(
      <CardNumberElement
        id={'id'}
        container={container}
        table={'table1'}
        column={'string'}
        placeholder={'XXXX XXXX XXXX'}
        label={'Card Number'}
        onChange={changeTrigger}
        onBlur={blurTrigger}
        onFocus={foucsTrigger}
        onReady={readyTrigger}
        validations={[]}
      />,
    )
    expect(cardContainer).toMatchSnapshot()
    expect(mountMock).toBeCalled();
    expect(eventListenerMock).toBeCalled();
  });

  test('test card number composable Element ', () => {
    const container = useComposabelContainer({ layout: [1] });
    const cardContainer = render(
      <CardNumberElement
        id={'id'}
        container={container}
        table={'table1'}
        column={'string'}
        placeholder={'XXXX XXXX XXXX'}
        label={'Card Number'}
        eventEmitter={composableEventEmitter}
        onChange={changeTrigger}
        onBlur={blurTrigger}
        onFocus={foucsTrigger}
        onReady={readyTrigger}
        validations={[]}
      />,
    )
    expect(cardContainer).toMatchSnapshot()
    expect(eventEmitterMock).toBeCalled();
    expect(eventListenerMock).toBeCalledTimes(4);
  });

  test('test cvv collect Element ', () => {
    const container = useCollectContainer();
    const cvvContainer = render(
      <CVVElement
        id={''}
        container={container}
        table={''}
        column={'string'}
        placeholder={'CVV'}
        label={'Cvv'}
        onChange={changeTrigger}
        onBlur={blurTrigger}
        onFocus={foucsTrigger}
        onReady={readyTrigger}
        validations={[]}
      />,
    )
    expect(cvvContainer).toMatchSnapshot()
    expect(mountMock).toBeCalled();
    expect(eventListenerMock).toBeCalled();
  });

  test('test cvv  composable Element ', () => {
    const container = useComposabelContainer({ layout: [1] });
    const cvvContainer = render(
      <CVVElement
        container={container}
        table={'table1'}
        column={'string'}
        placeholder={'CVV'}
        label={'Cvv'}
        onChange={changeTrigger}
        onBlur={blurTrigger}
        onFocus={foucsTrigger}
        onReady={readyTrigger}
        validations={[]}
        eventEmitter={composableEventEmitter}
      />,
    )
    expect(cvvContainer).toMatchSnapshot()
    expect(eventEmitterMock).toBeCalled();
    expect(eventListenerMock).toBeCalled();
  });

  test('test Pin collect Element ', () => {
    const container = useCollectContainer();
    const PinContainer = render(
      <PinElement
        id={''}
        container={container}
        table={''}
        column={'string'}
        placeholder={'Pin'}
        label={'Pin'}
        onChange={changeTrigger}
        onBlur={blurTrigger}
        onFocus={foucsTrigger}
        onReady={readyTrigger}
        validations={[]}
      />,
    )
    expect(PinContainer).toMatchSnapshot()
    expect(mountMock).toBeCalled();
    expect(eventListenerMock).toBeCalled();
  });

  test('test Pin composable Element ', () => {
    const container = useComposabelContainer({ layout: [1] });
    const PinContainer = render(
      <PinElement
        container={container}
        table={'table1'}
        column={'string'}
        placeholder={'Pin'}
        label={'Pin'}
        onChange={changeTrigger}
        onBlur={blurTrigger}
        onFocus={foucsTrigger}
        onReady={readyTrigger}
        validations={[]}
        eventEmitter={composableEventEmitter}
      />,
    )
    expect(PinContainer).toMatchSnapshot()
    expect(eventEmitterMock).toBeCalled();
    expect(eventListenerMock).toBeCalled();
  });

  test('test cardHolderName collect Element ', () => {
    const container = useCollectContainer();
    const cardHolderNameContainer = render(
      <CardHolderNameElement
        id={''}
        container={container}
        table={''}
        column={'string'}
        placeholder={'cardHolderName'}
        label={'cardHolderName'}
        onChange={changeTrigger}
        onBlur={blurTrigger}
        onFocus={foucsTrigger}
        onReady={readyTrigger}
        validations={[]}
      />,
    )
    expect(cardHolderNameContainer).toMatchSnapshot()
    expect(mountMock).toBeCalled();
    expect(eventListenerMock).toBeCalled();
  });

  test('test cardHolderName composable Element ', () => {
    const container = useComposabelContainer({ layout: [1] });
    const cardHolderNameContainer = render(
      <CardHolderNameElement
        container={container}
        table={'table1'}
        column={'string'}
        placeholder={'cardHolderName'}
        label={'cardHolderName'}
        onChange={changeTrigger}
        onBlur={blurTrigger}
        onFocus={foucsTrigger}
        onReady={readyTrigger}
        validations={[]}
        eventEmitter={composableEventEmitter}
      />,
    )
    expect(cardHolderNameContainer).toMatchSnapshot()
    expect(eventEmitterMock).toBeCalled();
    expect(eventListenerMock).toBeCalled();
  });

  test('test inputField collect Element ', () => {
    const container = useCollectContainer();
    const inputFieldContainer = render(
      <InputFieldElement
        id={''}
        container={container}
        table={''}
        column={'string'}
        placeholder={'inputField'}
        label={'inputField'}
        onChange={changeTrigger}
        onBlur={blurTrigger}
        onFocus={foucsTrigger}
        onReady={readyTrigger}
        validations={[]}
      />,
    )
    expect(inputFieldContainer).toMatchSnapshot()
    expect(mountMock).toBeCalled();
    expect(eventListenerMock).toBeCalled();
  });

  test('test inputField  composable Element ', () => {
    const container = useComposabelContainer({ layout: [1] });
    const inputFieldContainer = render(
      <InputFieldElement
        container={container}
        table={'table1'}
        column={'string'}
        placeholder={'inputField'}
        label={'inputField'}
        onChange={changeTrigger}
        onBlur={blurTrigger}
        onFocus={foucsTrigger}
        onReady={readyTrigger}
        validations={[]}
        eventEmitter={composableEventEmitter}
      />,
    )
    expect(inputFieldContainer).toMatchSnapshot()
    expect(eventEmitterMock).toBeCalled();
    expect(eventListenerMock).toBeCalled();
  });

  test('test expirationDate collect Element ', () => {
    const container = useCollectContainer();
    const expirationDateContainer = render(
      <ExpirationDateElement
        id={''}
        container={container}
        table={''}
        column={'string'}
        placeholder={'expirationDate'}
        label={'expirationDate'}
        onChange={changeTrigger}
        onBlur={blurTrigger}
        onFocus={foucsTrigger}
        onReady={readyTrigger}
        validations={[]}
      />,
    )
    expect(expirationDateContainer).toMatchSnapshot()
    expect(mountMock).toBeCalled();
    expect(eventListenerMock).toBeCalled();
  });

  test('test expirationDate  composable Element ', () => {
    const container = useComposabelContainer({ layout: [1] });
    const expirationDateContainer = render(
      <ExpirationDateElement
        container={container}
        table={'table1'}
        column={'string'}
        placeholder={'expirationDate'}
        label={'expirationDate'}
        onChange={changeTrigger}
        onBlur={blurTrigger}
        onFocus={foucsTrigger}
        onReady={readyTrigger}
        validations={[]}
        eventEmitter={composableEventEmitter}
      />,
    )
    expect(expirationDateContainer).toMatchSnapshot()
    expect(eventEmitterMock).toBeCalled();
    expect(eventListenerMock).toBeCalled();
  });

  test('test expirationMonth collect Element ', () => {
    const container = useCollectContainer();
    const expirationMonthContainer = render(
      <ExpirationMonthElement
        id={''}
        container={container}
        table={''}
        column={'string'}
        placeholder={'expirationMonth'}
        label={'expirationMonth'}
        onChange={changeTrigger}
        onBlur={blurTrigger}
        onFocus={foucsTrigger}
        onReady={readyTrigger}
        validations={[]}
      />,
    )
    expect(expirationMonthContainer).toMatchSnapshot()
    expect(mountMock).toBeCalled();
    expect(eventListenerMock).toBeCalled();
  });

  test('test expirationMonth  composable Element ', () => {
    const container = useComposabelContainer({ layout: [1] });
    const expirationMonthContainer = render(
      <ExpirationMonthElement
        container={container}
        table={'table1'}
        column={'string'}
        placeholder={'expirationMonth'}
        label={'expirationMonth'}
        onChange={changeTrigger}
        onBlur={blurTrigger}
        onFocus={foucsTrigger}
        onReady={readyTrigger}
        validations={[]}
        eventEmitter={composableEventEmitter}
      />,
    )
    expect(expirationMonthContainer).toMatchSnapshot()
    expect(eventEmitterMock).toBeCalled();
    expect(eventListenerMock).toBeCalled();
  });

  test('test expirationYear collect Element ', () => {
    const container = useCollectContainer();
    const expirationYearContainer = render(
      <ExpirationYearElement
        id={''}
        container={container}
        table={''}
        column={'string'}
        placeholder={'expirationYear'}
        label={'expirationYear'}
        onChange={changeTrigger}
        onBlur={blurTrigger}
        onFocus={foucsTrigger}
        onReady={readyTrigger}
        validations={[]}
      />,
    )
    expect(expirationYearContainer).toMatchSnapshot()
    expect(mountMock).toBeCalled();
    expect(eventListenerMock).toBeCalled();
  });

  test('test expirationYear composable Element ', () => {
    const container = useComposabelContainer({ layout: [1] });
    const expirationYearContainer = render(
      <ExpirationYearElement
        container={container}
        table={'table1'}
        column={'string'}
        placeholder={'expirationYear'}
        label={'expirationYear'}
        onChange={changeTrigger}
        onBlur={blurTrigger}
        onFocus={foucsTrigger}
        onReady={readyTrigger}
        validations={[]}
        eventEmitter={composableEventEmitter}
      />,
    )
    expect(expirationYearContainer).toMatchSnapshot()
    expect(eventEmitterMock).toBeCalled();
    expect(eventListenerMock).toBeCalled();
  });

  test('test composable container element', () => {
    const container = useComposabelContainer({ layout: [1] });
    const composableContainer = render(
      <ComposableContainer
        id={'id'}
        container={container}
      >
        <ExpirationYearElement
          container={container}
          table={'table1'}
          column={'string'}
          label={'expirationYear'}
        />,

        <CardNumberElement
          id={'id'}
          container={container}
          table={'table1'}
          column={'string'}
          label={'Card Number'}
        />,

      </ComposableContainer>
    )
    expect(composableContainer).toMatchSnapshot();

  });


});