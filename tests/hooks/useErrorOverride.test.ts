import { renderHook } from '@testing-library/react'
import { useImperativeHandle } from 'react';
import Skyflow from 'skyflow-js';
import CollectElement from 'skyflow-js/types/core/external/collect/collect-element';
import RevealElement from 'skyflow-js/types/core/external/reveal/reveal-element';
import ComposableElement from 'skyflow-js/types/core/external/collect/compose-collect-element';
import useErrorOverride from '../../src/hooks/OverrideError';

describe('test useErrorOverride', () => {
  it('should set error override when element and container type are valid', () => {
    const mockSetErrorOverride = jest.fn();
    const mockElement = {
      setErrorOverride: mockSetErrorOverride,
    } as unknown as CollectElement;

    const mockRef = { current: null as unknown as { setErrorOverride: (message: string) => void } | null };

    const props = {table:'table1', container:{type:Skyflow.ContainerType.COLLECT}}

    renderHook(() => useErrorOverride(mockElement, mockRef, props as any));

    if (mockRef.current) {
      mockRef.current.setErrorOverride('Test error message');
    }

    expect(mockSetErrorOverride).toHaveBeenCalledWith('Test error message');
  });

  it('should not throw an error if element is null', () => {
    const mockRef = { current: null as unknown as { setErrorOverride: (message: string) => void } | null };
    const mockProps = {table:'table1', container:{type:Skyflow.ContainerType.COLLECT}}

    renderHook(() => useErrorOverride(null, mockRef, mockProps as any));

    expect(() => {
      if (mockRef.current) {
        mockRef.current.setErrorOverride('Test error message');
      }
    }).not.toThrow();
  });

  it('should not set error override if container type is not COLLECT or REVEAL', () => {
    const mockSetErrorOverride = jest.fn();
    const mockElement = {
      setErrorOverride: mockSetErrorOverride,
    } as unknown as CollectElement;

    const mockRef = { current: null as unknown as { setErrorOverride: (message: string) => void } | null };

    const mockProps = {table:'table1', container: { type: 'INVALID_TYPE' }}

    renderHook(() => useErrorOverride(mockElement, mockRef, mockProps as any));

    if (mockRef.current) {
      mockRef.current.setErrorOverride('Test error message');
    }

    expect(mockSetErrorOverride).not.toHaveBeenCalled();
  });

  it('should set error override for REVEAL container type', () => {
    const mockSetErrorOverride = jest.fn();
    const mockElement = {
      setErrorOverride: mockSetErrorOverride,
    } as unknown as RevealElement;

    const mockRef = { current: null as unknown as { setErrorOverride: (message: string) => void } | null };
    const mockProps = {table:'table1', container:{type:Skyflow.ContainerType.REVEAL}}

    renderHook(() => useErrorOverride(mockElement, mockRef, mockProps as any));

    if (mockRef.current) {
      mockRef.current.setErrorOverride('Test error message');
    }

    expect(mockSetErrorOverride).toHaveBeenCalledWith('Test error message');
  });
});