const generateJestConfig = ({ esModules }) => {
  const esModuleslist = Array.isArray(esModules) ? esModules.join('|') : esModules
  return {
    coveragePathIgnorePatterns: ['<rootDir>/src/Model'],
    coverageThreshold: {
      global: {
        branches: 50,
        functions: 70,
        lines: 70,
        statements: 70,
      },
    },
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.test.json',
      },
    },
    moduleNameMapper: {
      '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    preset: 'ts-jest/presets/default-esm',
    setupFiles: [],
    setupFilesAfterEnv: ['jest-sorted', 'jest-extended/all'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    testTimeout: 15000,
    transform: {
      [`(${esModuleslist}).+\\.js$`]: 'babel-jest',
      '^.+\\.tsx?$': 'ts-jest',
    },
    transformIgnorePatterns: [`./node_modules/(?!${esModuleslist})`],
  }
}

module.exports = generateJestConfig({ esModules: ['is-ip', 'ip-regex'] })
