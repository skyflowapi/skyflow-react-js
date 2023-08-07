/*
	Copyright (c) 2022 Skyflow, Inc. 
*/


import CollectContainer from 'skyflow-js/types/core/external/collect/collect-container'
import ComposableContainer from 'skyflow-js/types/core/external/collect/compose-collect-container'
import RevealContainer, { IRevealElementOptions } from 'skyflow-js/types/core/external/reveal/reveal-container'
import { IValidationRule } from 'skyflow-js/types/utils/common'

/**
 *  Configuration for a Collect Element.
 */
export interface SkyflowCollectElementProps {
  /** Type of the container. */
  container: CollectContainer | ComposableContainer
  /** Table that the data belongs to. */
  table: string
  /** Column that the data belongs to. */
  column: string
  /** ID that is passed to the element. */
  id?: string
  /** Label for the element. */
  label?: string
  /** Placeholder text for the element. */
  placeholder?: string
  /** Error text to display. */
  errorText?: string
  /** Input validation rules for the element. */
  validations?: IValidationRule[] | undefined
  /** Styles that should be applied to the element. */
  classes?: Record<string, unknown>
  /** Options that can be passed to an element. */
  options?: ICollectElementOptions
  /** Function to call when the onChange event triggers. */
  onChange?: (state: unknown) => void
  /** Function to call when the onFocus event triggers. */
  onFocus?: (state: unknown) => void
  /** Function to call when the onBlur event triggers. */
  onBlur?: (state: unknown) => void
  /** Function to call when the onReady event triggers. */
  onReady?: (state: unknown) => void
  /** Event emitter for the element. */
  eventEmitter?:any
  // TODO ref
}

/**
 *  Configuration for Reveal Elements.
 */
export interface SkyflowRevealElementProps {
  /** Type of the container. */
  container: RevealContainer
  /** A token to retrieve the value of. */
  token: string
  /** ID that is passed to the element. */
  id?: string
  /** Label for the Reveal Element. */
  label?: string
  /** Alternative text for the Reveal Element. */
  altText?: string
  /** Styles that should be applied to the element. */
  classes?: Record<string, unknown>
  /** Additional configuration options. */
  options?: IRevealOptions
}

/**
 *  Options for a Collect Element.
 */
export interface ICollectElementOptions {
  /** Indicates whether the element is required or not. */
  required?: boolean
  /** Indicates whether to enable the card icon for the card number Collect Element. */
  enableCardIcon?: boolean
  /** Format of the Collect Element. */
  format?: string
  /** If `true`, displays a copy button that copies the Collect Element value to the clipboard. Defaults to `false`. */
  enableCopy?: boolean
}

export type IRevealOptions = {
  enableCopy?: boolean;
  format?:string
}
