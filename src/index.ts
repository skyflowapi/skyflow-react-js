/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import SkyflowElements from './core'
import Skyflow, { CardType } from 'skyflow-js'

import CardHolderNameElement from './elements/CardHolderName'
import CardNumberElement from './elements/CardNumber'
import CVVElement from './elements/CVV'
import ExpirationMonthElement from './elements/ExpirationMonth'
import ExpirationYearElement from './elements/ExpirationYear'
import FileInputElement from './elements/FileInputElement'
import PinElement from './elements/PIN'
import ExpirationDateElement from './elements/ExpirationDate'
import RevealElement from './elements/RevealElement'
import InputFieldElement from './elements/InputField'
import ComposableContainerComponent from './elements/ComposableContainer'
import FileRenderElement from './elements/FileRenderElement'

import useRevealContainer from './hooks/RevealContainer'
import useMakeSkyflowStyles from './hooks/MakeSkyflowStyles'
import useCollectListeners from './hooks/CollectListner'
import useCollectContainer from './hooks/CollectContainer'
import useComposableContainer from './hooks/ComposableContainer'
import useRenderFile from './hooks/RenderFile'
import useSkyflow from './hooks/Skyflow'
import use3DS from './hooks/ThreeDS'
import { SkyflowCollectElementRef, SkyflowRenderElementRef, SkyflowRevealElementRef } from 'elements'

const LogLevel = Skyflow.LogLevel
const Env = Skyflow.Env

const LENGTH_MATCH_RULE = Skyflow.ValidationRuleType.LENGTH_MATCH_RULE
const REGEX_MATCH_RULE = Skyflow.ValidationRuleType.REGEX_MATCH_RULE
const ELEMENT_VALUE_MATCH_RULE = Skyflow.ValidationRuleType.ELEMENT_VALUE_MATCH_RULE

export {
  SkyflowElements,
  CardNumberElement,
  CVVElement,
  CardHolderNameElement,
  ExpirationDateElement,
  ExpirationMonthElement,
  ExpirationYearElement,
  FileInputElement,
  PinElement,
  RevealElement,
  useCollectContainer,
  useComposableContainer,
  useMakeSkyflowStyles,
  useRevealContainer,
  useCollectListeners,
  ComposableContainerComponent as ComposableContainer,
  LogLevel,
  Env,
  CardType,
  LENGTH_MATCH_RULE,
  REGEX_MATCH_RULE,
  ELEMENT_VALUE_MATCH_RULE,
  InputFieldElement,
  useRenderFile,
  FileRenderElement,
  useSkyflow,
  use3DS,
  SkyflowCollectElementRef,
  SkyflowRevealElementRef,
  SkyflowRenderElementRef,
}
