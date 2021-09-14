/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  projects: [
    {
      displayName: "dom",
      clearMocks: true,
      resetMocks: true,
      testEnvironment: "jsdom",

      setupFilesAfterEnv: ["./jest/setupTests.ts"],

      coverageThreshold: {
        global: {
          branches: 60,
          functions: 60,
          lines: 60,
          statements: 60,
        },
      },
      //  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
      testMatch: ["**/packages/frontend/**/*.test.ts?(x)"],

      transform: {
        "^.+\\.tsx?$": "babel-jest",

        ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
          "jest-transform-stub",
      },
      moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    },
    {
      displayName: "node",

      testMatch: ["**/api/**/*.test.ts?(x)"],
      clearMocks: true,
      resetMocks: true,
      testEnvironment: "node",

      coverageThreshold: {
        global: {
          branches: 60,
          functions: 60,
          lines: 60,
          statements: 60,
        },
      },
      setupFiles: ["dotenv/config"],
      globals: {
        "ts-jest": {
          diagnostics: false,
        },
      },
      transform: {
        "^.+\\.tsx?$": "babel-jest",
      },
      moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    },
  ],
};
