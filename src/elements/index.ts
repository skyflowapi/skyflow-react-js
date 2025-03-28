/*
	Copyright (c) 2022 Skyflow, Inc. 
*/


import { CardType } from 'skyflow-js/types/core/constants';
import CollectContainer from 'skyflow-js/types/core/external/collect/collect-container'
import ComposableContainer from 'skyflow-js/types/core/external/collect/compose-collect-container'
import RevealContainer from 'skyflow-js/types/core/external/reveal/reveal-container'
import { IValidationRule, RedactionType } from 'skyflow-js/types/utils/common'

export const FileRenderElements = {};
export const CollectElements = {};
export const ComposableElements = {};

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
  skyflowID?:string
  ref?: {current: SkyflowCollectElementRef | null};
  // TODO ref 
}

export interface SkyflowCollectElementRef {
    setErrorOverride: (errorMessage: string) => void;
}

export interface SkyflowRevealElementProps {
  container: RevealContainer
  token: string
  id?: string
  label?: string
  altText?: string
  classes?: Record<string, unknown>
  options?: IRevealOptions
  redaction?: RedactionType
  ref?: {current: SkyflowRevealElementRef | null}
}

export interface SkyflowRevealElementRef {
  setErrorOverride: (errorMessage: string) => void;
}

export interface SkyflowRenderElementProps {
  container: RevealContainer
  id: string
  altText?: string
  classes?: Record<string, unknown>
  skyflowID:string
  table: string
  column: string
  ref?: {current: SkyflowRenderElementRef | null};
}

export interface SkyflowRenderElementRef {
  setErrorOverride: (errorMessage: string) => void;
}

export interface ICollectElementOptions {
  required?: boolean
  enableCardIcon?: boolean
  format?: string
  enableCopy?: boolean
  allowedFileType?: string[]
  preserveFileName?: boolean
  cardMetadata ?: ICardMetadata
}

export type IRevealOptions = {
  enableCopy?: boolean;
  format?:string
}

export type ICardMetadata = {
  scheme?: typeof CardType[]
}