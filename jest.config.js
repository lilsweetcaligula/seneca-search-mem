module.exports = {
  transform: {
  },
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.js'],
  watchPathIgnorePatterns: ['dist\\/'],
  collectCoverageFrom: ['src/**/*.ts'],
  coverageProvider: 'v8',
};
