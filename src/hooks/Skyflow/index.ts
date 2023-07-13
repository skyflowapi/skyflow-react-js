import { useSkyflowClient } from '../../core/hook';
import React from 'react';
import Skyflow from 'skyflow-js';

const useSkyflow = (): Skyflow => {
    const { skyflow } = useSkyflowClient()
    
    return React.useMemo(
    () => skyflow as Skyflow,
    [],
    )
}

export default useSkyflow
