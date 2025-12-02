module.exports = {
  extensionsToTreatAsEsm: ['.js', '.jsx', '.ts', '.tsx'],
  testEnvironment: 'node',
  testMatch: ['**/tests/jest/**/*.test.[jt]s'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
};
