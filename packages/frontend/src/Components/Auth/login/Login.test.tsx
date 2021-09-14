import Login from "./Login";
import { fireEvent, render, screen } from "@testing-library/react";
import thunk from "redux-thunk";
import React from "react";
import { Provider } from "react-redux";
import { Middleware } from "@reduxjs/toolkit";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import authService from "../../../api/authService";

const middlewares: Middleware[] = [thunk];

const mockStore = configureStore(middlewares);

describe("Login comp is function", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  test("Login is function", () => {
    expect(Login).toBeInstanceOf(Object);
  });

  test("Login  render in page", async () => {
    const initialState = {
      auth: {
        userName: "userName",
        isAuthenticated: false,
      },
    };
    const store = mockStore(initialState);
    jest
      .spyOn(authService, "LoginUser")
      .mockResolvedValueOnce({ userID: "string", userName: "string" });

    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const form = screen.getByTestId("login-form-data-id");
    expect(form).toBeInTheDocument();
    const loginInput = screen.getByTestId("login-form-username-data-id");
    const passwordInput = screen.getByTestId("login-form-password-data-id");
    const submitBtn = screen.getByTestId("login-form-submit-data-id");
    expect(loginInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    fireEvent.change(loginInput, { target: { value: "root" } });
    fireEvent.change(passwordInput, { target: { value: "root" } });
    fireEvent.click(submitBtn);
    await new Promise((r) => setTimeout(r, 10));
    expect(authService.LoginUser).toHaveBeenCalledTimes(1);
  });

  test("Login   page redirect to root", () => {
    const initialState = {
      auth: {
        userName: "userName",
        isAuthenticated: true,
      },
    };
    const store = mockStore(initialState);

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.queryAllByTestId("login-form-data-id").length).toBe(0);
  });
});
