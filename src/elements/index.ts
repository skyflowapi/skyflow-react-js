/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import type CollectContainer from 'skyflow-js/types/core/external/collect/CollectContainer'
import type RevealContainer from 'skyflow-js/types/core/external/reveal/RevealContainer'

export interface SkyflowCollectElementProps {
  container: CollectContainer
  table: string
  column: string
  id?: string
  label?: string
  placeholder?: string
  errorText?: string
  validations?: Array<Record<string, unknown>>
  classes?: Record<string, unknown>
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
}
