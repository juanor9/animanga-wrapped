module.exports = {
  extensionsToTreatAsEsm: ['.jsx', '.ts', '.tsx'],
  testEnvironment: 'node',
  testMatch: ['**/tests/jest/**/*.test.[jt]s'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      {
        presets: [
          '@babel/preset-env',
          ['@babel/preset-react', { runtime: 'automatic' }],
          '@babel/preset-typescript',
        ],
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!(chai)/)'],
};
