module.exports = {
  rootDir: '../',
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsConfig: 'config/tsconfig.test.json',
    },
  },
};
