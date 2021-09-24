import React from "react";

import thunk from "redux-thunk";

import { Middleware } from "@reduxjs/toolkit";
import configureStore from "redux-mock-store";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { TestRouterComp } from "./TestRouterComp";

const middlewares: Middleware[] = [thunk];

const mockStore = configureStore(middlewares);

describe("Login comp is function", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  test("Router instance", () => {
    const initialState = {
      auth: {
        userName: "userName",
        isAuthenticated: false,
      },
    };
    const history = createMemoryHistory();
    const store = mockStore(initialState);
    history.push("/login");
    render(
      <Router history={history}>
        <Provider store={store}>
          <TestRouterComp></TestRouterComp>
        </Provider>
      </Router>
    );

    expect(
      screen.getByTestId("login-form-username-data-id")
    ).toBeInTheDocument();
    // screen.debug();
  });
});
