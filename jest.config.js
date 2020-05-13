module.exports = {
  globals: {
    'ts-jest': {
      babelConfig: false,
      tsConfig: 'tsconfig.json',
    },
  },
  testPathIgnorePatterns: ['/node_modules/', 'build'],
  preset: 'react-native',
  transform: {
    '^.+\\.(js|ts|tsx)$': require.resolve('react-native/jest/preprocessor.js'),
  },
}
