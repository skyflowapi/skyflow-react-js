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
import FileInputElement from './elements/FileInputElement'
import PinElement from './elements/PINElement'
import ExpirationDateElement from './elements/ExpirationDateElement'
import RevealElement from './elements/RevealElement'
import InputFieldElement from './elements/InputFieldElement'
import ComposableContainerComponent from './elements/ComposableContainer'
import FileRenderElement from './elements/FileRenderElement'

import { useRevealContainer } from './hooks/RevealContainer'
import { useMakeSkyflowStyles } from './hooks/MakeSkyflowStyles'
import { useCollectListeners } from './hooks/CollectListner'
import { useCollectContainer } from './hooks/CollectContainer'
import { useComposableContainer } from './hooks/ComposableContainer'
import useRenderFile from './hooks/RenderFile'
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
  LENGTH_MATCH_RULE,
  REGEX_MATCH_RULE,
  InputFieldElement,
  useRenderFile,
  FileRenderElement,
  useSkyflow
}
