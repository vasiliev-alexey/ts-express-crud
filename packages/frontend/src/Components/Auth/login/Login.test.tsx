// import React from "react";
// import { render, screen } from "@testing-library/react";
// import "@testing-library/jest-dom";
//
// import configureStore from "redux-mock-store";
//
// import { Provider } from "react-redux";
// import Login from "./Login";
// import { Middleware } from "@reduxjs/toolkit";
//
// const middlewares: Middleware[] = [];
//
// const mockStore = configureStore(middlewares);
//
// describe("Login comp is function", () => {
//   test("Login is function", () => {
//     expect(Login).toBeInstanceOf(Object);
//   });
//
//   test("Login must be render in page", () => {
//     const initialState = {
//       game: {
//         currenUserName: "userName",
//       },
//     };
//     const store = mockStore(initialState);
//
//     render(
//       <Provider store={store}>
//         <Login />
//       </Provider>
//     );
//     expect(screen.getByTestId("InputGroup-Test-Id")).toBeInTheDocument();
//   });
// });
