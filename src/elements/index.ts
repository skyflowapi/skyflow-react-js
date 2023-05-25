/*
	Copyright (c) 2022 Skyflow, Inc. 
*/


import CollectContainer from 'skyflow-js/types/core/external/collect/collect-container'
import ComposableContainer from 'skyflow-js/types/core/external/collect/compose-collect-container'
import RevealContainer, { IRevealElementOptions } from 'skyflow-js/types/core/external/reveal/reveal-container'
import { IValidationRule } from 'skyflow-js/types/utils/common'

/**
 *  sample documentation for collect element props
 */
export interface SkyflowCollectElementProps {
  /** used to declare the type of container you want to create*/
  container: CollectContainer | ComposableContainer
  /** sample documentation*/
  table: string
  /** sample documentation*/
  column: string
  /** sample documentation*/
  id?: string
  /** sample documentation*/
  label?: string
  /** sample documentation*/
  placeholder?: string
  /** sample documentation*/
  errorText?: string
  /** sample documentation*/
  validations?: IValidationRule[] | undefined
  /** sample documentation*/
  classes?: Record<string, unknown>
  /** sample documentation*/
  options?: ICollectElementOptions
  /** sample documentation*/
  onChange?: (state: unknown) => void
  /** sample documentation*/
  onFocus?: (state: unknown) => void
  /** sample documentation*/
  onBlur?: (state: unknown) => void
  /** sample documentation*/
  onReady?: (state: unknown) => void
  /** sample documentation*/
  eventEmitter?:any
  // TODO ref
}

/**
 *  sample documentation reveal element props
 */
export interface SkyflowRevealElementProps {
  /** sample documentation*/
  container: RevealContainer
  /** sample documentation*/
  token: string
  /** sample documentation*/
  id?: string
  /** sample documentation*/
  label?: string
  /** sample documentation*/
  altText?: string
  /** sample documentation*/
  classes?: Record<string, unknown>
  /** sample documentation*/
  options?: IRevealOptions
}

/**
 *  sample documentation collect element options
 */
export interface ICollectElementOptions {
  /** sample documentation*/
  required?: boolean
  /** sample documentation*/
  enableCardIcon?: boolean
  /** sample documentation*/
  format?: string
  /** sample documentation*/
  enableCopy?: boolean
}

export type IRevealOptions = {
  enableCopy?: boolean;
  format?:string
}
