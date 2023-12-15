import { useSkyflowClient } from '../../core/SkyflowElements/hook';
import React from 'react';
import Skyflow from 'skyflow-js';

/**
 * A hook to get the instance of Skyflow Client
 * @returns Returns the Skyflow Client instance.
 */
const useSkyflow = (): Skyflow => {
    const { skyflow } = useSkyflowClient()
    
    return React.useMemo(
    () => skyflow as Skyflow,
    [],
    )
}

export default useSkyflow
