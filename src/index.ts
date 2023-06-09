/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import SkyflowElements from './core/SkyflowElements'
import Skyflow from 'skyflow-js'

import CardHolderNameElement from './elements/CardHolderNameElement'
import CardNumberElement from './elements/CardNumberElement'
import CVVElement from './elements/CVVElement'
import ExpirationMonthElement from './elements/ExpirationMonthElement'
import ExpirationYearElement from './elements/ExpirationYearElement'
import PinElement from './elements/PinElement'
import ExpirationDateElement from './elements/ExpirationDateElement'
import RevealElement from './elements/RevealElement'
import InputFieldElement from './elements/InputFieldElement'
import ComposableContainerComponent from './elements/ComposableContainer'

import {useRevealContainer} from './hooks/RevealContainer'
import {useMakeSkyflowStyles} from './hooks/MakeSkyflowStyles'
import {useCollectListeners} from './hooks/CollectListner'
import {useCollectContainer} from './hooks/CollectContainer'
import {useComposableContainer} from './hooks/ComposableContainer'

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
  InputFieldElement
}
