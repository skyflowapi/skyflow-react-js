/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    './src/core/*.{ts,tsx}',
    './src/elements/**/*.{ts,tsx}',
    './src/hooks/**/*.{ts,tsx}',
  ],
  moduleNameMapper: {
    'skyflow-react-js':
      '<rootDir>node_modules/skyflow-react-js/lib/index.js',
  },
};
