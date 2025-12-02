module.exports = {
  extensionsToTreatAsEsm: ['.jsx', '.ts', '.tsx'],
  testEnvironment: 'node',
  testMatch: ['**/tests/jest/**/*.test.[jt]s'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(chai)/)'],
};
