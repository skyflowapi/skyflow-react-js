/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import SkyflowElements from './core'
import Skyflow from 'skyflow-js'

import CardHolderNameElement from './elements/CardHolderName'
import CardNumberElement from './elements/CardNumber'
import CVVElement from './elements/CVV'
import ExpirationMonthElement from './elements/ExpirationMonth'
import ExpirationYearElement from './elements/ExpirationYear'
import PinElement from './elements/PIN'
import ExpirationDateElement from './elements/ExpirationDate'
import RevealElement from './elements/RevealElement'
import InputFieldElement from './elements/InputField'
import ComposableContainerComponent from './elements/ComposableContainer'

import useRevealContainer from './hooks/RevealContainer'
import useMakeSkyflowStyles from './hooks/MakeSkyflowStyles'
import useCollectListeners from './hooks/CollectListner'
import useCollectContainer from './hooks/CollectContainer'
import useComposableContainer from './hooks/ComposableContainer'
import useSkyflow from './hooks/Skyflow'
const LogLevel = Skyflow.LogLevel
const Env = Skyflow.Env

const LENGTH_MATCH_RULE = Skyflow.ValidationRuleType.LENGTH_MATCH_RULE
const REGEX_MATCH_RULE = Skyflow.ValidationRuleType.REGEX_MATCH_RULE

export {
  SkyflowElements,
  CardNumberElement,
  CVVElement,
  CardHolderNameElement,
  ExpirationDateElement,
  ExpirationMonthElement,
  ExpirationYearElement,
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
  LENGTH_MATCH_RULE,
  REGEX_MATCH_RULE,
  InputFieldElement,
  useSkyflow
}
