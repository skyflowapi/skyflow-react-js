import type CollectContainer from 'skyflow-js/types/core/external/collect/CollectContainer';
import type RevealContainer from 'skyflow-js/types/core/external/reveal/RevealContainer';

export interface SkyflowElementProps {
  container: CollectContainer | RevealContainer
  table: string;
  column: string;
  id?: string;
  label?: string;
  placeholder?: string;
  altText?: string;
  errorText?: string;
  token?: string;
  validations?: Array<Object>;
  onChange?:Function;
  onFocus?: Function;
  onBlur?: Function;
  onReady?:Function ;
  // TODO ref
}

export { CardNumberElement } from './CardNumberElement';
export { CVVElement } from './CVVElement';
export { ExpirationMonthElement } from './ExpirationMonthElement';
export { ExpirationYearElement } from './ExpirationYearElement';
export { PinElement } from './PinElement';
export { ExpirationDateElement } from './ExpirationDateElement';
export { useContainer } from './useContainer';
export { useCollectContainer } from './useCollectContainer';
export { useRevealContainer } from './useRevealContainer';
