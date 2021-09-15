import Register from "./Register";
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

describe("Register comp is function", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  test("Register is function", () => {
    expect(Register).toBeInstanceOf(Object);
  });

  test("Register  render in page", async () => {
    const initialState = {
      auth: {
        userName: "userName",
        isAuthenticated: false,
      },
    };
    const store = mockStore(initialState);
    jest
      .spyOn(authService, "RegisterUser")
      .mockResolvedValueOnce({ userID: "string", userName: "string" });

    render(
      <Provider store={store}>
        <Register />
      </Provider>
    );
    const form = screen.getByTestId("register-form-data-id");
    expect(form).toBeInTheDocument();
    const userNameInput = screen.getByTestId("register-form-username-data-id");
    const passwordInput = screen.getByTestId("register-form-password-data-id");
    const submitBtn = screen.getByTestId("register-form-submit-data-id");
    expect(userNameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    fireEvent.change(userNameInput, { target: { value: "root" } });
    fireEvent.change(passwordInput, { target: { value: "root" } });
    fireEvent.click(submitBtn);
    await new Promise((r) => setTimeout(r, 10));
    expect(authService.RegisterUser).toHaveBeenCalledTimes(1);
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
          <Register />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.queryAllByTestId("register-form-data-id").length).toBe(0);
  });

  test("Register   page  with error", () => {
    const initialState = {
      auth: {
        userName: "userName",
        isAuthenticated: false,
        errorMessage: "some error",
      },
    };
    const store = mockStore(initialState);

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Register />
        </Provider>
      </MemoryRouter>
    );
    expect(
      screen.getByTestId("register-form-data-error-id")
    ).toBeInTheDocument();
  });
});
