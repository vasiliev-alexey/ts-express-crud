import "@testing-library/jest-dom/extend-expect";
// @ts-ignore
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };
