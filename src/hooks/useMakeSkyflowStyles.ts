/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import React, { FC } from 'react';

const useMakeSkyflowStyles = (styles: Object = {}):Function => {
   
    return function useStyles(){
        const classes:Object = styles
       
        return classes;
    }
}
export {useMakeSkyflowStyles}