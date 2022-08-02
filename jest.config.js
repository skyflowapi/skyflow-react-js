/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    'skyflow-react-js':
      '<rootDir>node_modules/skyflow-react-js/dist/main.js',
  },
};
