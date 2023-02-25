/*
	Copyright (c) 2022 Skyflow, Inc. 
*/


import CollectContainer from 'skyflow-js/types/core/external/collect/collect-container'
import ComposableContainer from 'skyflow-js/types/core/external/collect/compose-collect-container'
import RevealContainer, { IRevealElementOptions } from 'skyflow-js/types/core/external/reveal/reveal-container'
import { IValidationRule } from 'skyflow-js/types/utils/common'

export interface SkyflowCollectElementProps {
  container: CollectContainer | ComposableContainer
  table: string
  column: string
  id?: string
  label?: string
  placeholder?: string
  errorText?: string
  validations?: IValidationRule[] | undefined
  classes?: Record<string, unknown>
  options?: ICollectElementOptions
  onChange?: (state: unknown) => void
  onFocus?: (state: unknown) => void
  onBlur?: (state: unknown) => void
  onReady?: (state: unknown) => void
  eventEmitter?:any
  // TODO ref
}

export interface SkyflowRevealElementProps {
  container: RevealContainer
  token: string
  id?: string
  label?: string
  altText?: string
  classes?: Record<string, unknown>
  options?: IRevealOptions
}

export interface ICollectElementOptions {
  required?: boolean
  enableCardIcon?: boolean
  format?: string
  enableCopy?: boolean
}

export type IRevealOptions = {
  enableCopy?: boolean;
  format?:string
}
