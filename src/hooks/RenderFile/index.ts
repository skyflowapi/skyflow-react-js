/*
  Copyright (c) 2022 Skyflow, Inc. 
*/
import { FileRenderElements } from '../../elements'
import { useEffect, useState } from 'react'
import RevealElement from 'skyflow-js/types/core/external/reveal/reveal-element';

// const useRenderFile = (id: string): Promise<unknown> => {
//     console.log(FileRenderElements.id,FileRenderElements.id, id);
//     return React.useMemo(() =>FileRenderElements.id.renderFile() as Promise<unknown>, [id]);
// };
// const useRenderFile = (id: string): RevealElement => {
//   // element.renderFile().then(data => console.log(data)).catch(err => console.log(err))
//   console.log(FileRenderElements, FileRenderElements[id]);
//   if (Object.prototype.hasOwnProperty.call(FileRenderElements, id)) {
//     console.log('===========', );
//   } else
//    {
//     console.log('not here');
//   }
//   return FileRenderElements[id as string]
// };
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
