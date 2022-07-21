import React, { FC } from 'react';

const useMakeSkyflowStyles = (styles: Object = {}):Function => {
   
    return function useStyles(){
        const classes:Object = styles
       
        return classes;
    }
}
export {useMakeSkyflowStyles}