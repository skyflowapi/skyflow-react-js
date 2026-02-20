/*
  Copyright (c) 2022 Skyflow, Inc.
*/
import type {
  ContainerOptions,
  ErrorTextStyles,
  LabelStyles,
  InputStyles,
} from 'skyflow-js/types/utils/common';

export type {
  ContainerOptions,
  ErrorTextStyles,
  LabelStyles,
  InputStyles,
};

export interface StylesConfig {
  inputStyles?: InputStyles;
  labelStyles?: LabelStyles;
  errorTextStyles?: ErrorTextStyles;
}

export interface CollectElementState {
  elementType: string;
  isEmpty: boolean;
  isFocused: boolean;
  isValid: boolean;
  isComplete: boolean;
  value?: string;
}

export interface ElementClassesConfig {
  inputStyles?: InputStyles;
  labelStyles?: LabelStyles;
  errorTextStyles?: ErrorTextStyles;
}

export interface EventCallback {
  priority: boolean;
  callback: EventCallbackFunction;
}

export type EventCallbackFunction = (...args: any[]) => void;

export interface ComposableSubmitResponse {
  records?: Array<{
    table: string;
    fields: Record<string, any>;
  }>;
  errors?: Array<{
    code: number;
    description: string;
  }>;
}

