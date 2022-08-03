/*
	Copyright (c) 2022 Skyflow, Inc. 
*/

import type CollectContainer from 'skyflow-js/types/core/external/collect/CollectContainer'
import RevealContainer, {
  IRevealElementOptions,
} from 'skyflow-js/types/core/external/reveal/RevealContainer'
import { IValidationRule } from 'skyflow-js/types/utils/common'

export interface SkyflowCollectElementProps {
  container: CollectContainer
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
  // TODO ref
}

export interface SkyflowRevealElementProps {
  container: RevealContainer
  token: string
  id?: string
  label?: string
  classes?: Record<string, unknown>
  options?: IRevealOptions
}

export interface ICollectElementOptions {
  required?: boolean
  enableCardIcon?: boolean
  format?: string
  enableCopy?: boolean
}

export type IRevealOptions = IRevealElementOptions
