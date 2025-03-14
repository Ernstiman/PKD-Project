module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./jest.setup.js'],
    moduleNameMapper: {
        '^canvas$': '../__mocks__/canvas.js'
      },
    collectCoverage: true,
    // coverageReporters: ['text', 'lcov'],
  };