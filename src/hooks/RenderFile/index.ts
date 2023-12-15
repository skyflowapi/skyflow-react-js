/*
  Copyright (c) 2022 Skyflow, Inc. 
*/
import { FileRenderElements } from '../../elements'
import { useEffect, useState } from 'react'
import RevealElement from 'skyflow-js/types/core/external/reveal/reveal-element';

/**
 * A hook to get the instance of Render File Element.
 * @returns Returns the Render File Element instance.
 */
const useRenderFile = (id: string): RevealElement | undefined => {
  const [renderElement, setRenderElement] = useState<RevealElement>();

  useEffect(() => {
    if (Object.prototype.hasOwnProperty.call(FileRenderElements, id)) {
      setRenderElement(FileRenderElements[id]);
    }
  }, [id]);
  
  return renderElement;
};

export default useRenderFile
