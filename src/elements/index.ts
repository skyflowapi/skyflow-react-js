/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import Skyflow from 'skyflow-js';
import type CollectContainer from 'skyflow-js/types/core/external/collect/CollectContainer';
import type RevealContainer from 'skyflow-js/types/core/external/reveal/RevealContainer';

export interface SkyflowCollectElementProps {
  container: CollectContainer 
  table: string;
  column: string;
  id?: string;
  label?: string;
  placeholder?: string;
  errorText?: string;
  validations?: Array<Object>;
  classes?: Object;
  onChange?:Function;
  onFocus?: Function;
  onBlur?: Function;
  onReady?:Function ;
  // TODO ref
}

export interface SkyflowRevealElementProps {
  container: RevealContainer 
  token:string
  id?: string;
  label?: string;
  classes?: Object;
}

export { CardNumberElement } from './CardNumberElement';
export { CardHolderNameElement } from './CardHolderNameElement';
export { CVVElement } from './CVVElement';
export { ExpirationMonthElement } from './ExpirationMonthElement';
export { ExpirationYearElement } from './ExpirationYearElement';
export { PinElement } from './PinElement';
export { ExpirationDateElement } from './ExpirationDateElement';
export { RevealElement } from './RevealElement';
