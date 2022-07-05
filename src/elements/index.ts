export interface SkyflowElementProps {
  table: string;
  column: string;
  id?: string;
  label?: string;
  placeholder?: string;
  altText?: string;
  errorText?: string;
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
