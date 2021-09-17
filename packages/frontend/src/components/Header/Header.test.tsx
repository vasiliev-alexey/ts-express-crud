import Header from "./Header";
import { fireEvent, render, screen } from "@testing-library/react";
import thunk from "redux-thunk";
import React from "react";
import { Provider } from "react-redux";
import { Middleware } from "@reduxjs/toolkit";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";

const middlewares: Middleware[] = [thunk];

const mockStore = configureStore(middlewares);

describe("Header comp is function", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  test("Header is function", () => {
    expect(Header).toBeInstanceOf(Object);
  });

  test("Header  render in page", async () => {
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
          <Header />
        </Provider>
      </MemoryRouter>
    );
    const header = screen.getByTestId("header-data-id");
    const menu = screen.getByTestId("menu-addAdd-data-id");
    const menuItem = screen.getByTestId("ToolBar-addAdd-data-id");
    expect(header).toBeInTheDocument();
    expect(menu).toBeInTheDocument();
    expect(menuItem).toBeInTheDocument();
    const avatar = screen.getByTestId("header-with-auth-data-id");
    expect(avatar).toBeInTheDocument();
    fireEvent.click(menu);
    fireEvent.click(menuItem);
  });

  test("Header   page redirect to root", () => {
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
          <Header />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.queryAllByTestId("login-form-data-id").length).toBe(0);
  });

  test("Header   with btn login", () => {
    const initialState = {
      auth: {
        userName: "userName",
        isAuthenticated: false,
      },
    };
    const store = mockStore(initialState);

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </MemoryRouter>
    );
    const btnLogin = screen.getByTestId("header-login-btn-data-id");
    const btnRegister = screen.getByTestId("header-register-btn-data-id");
    expect(btnLogin).toBeInTheDocument();
    expect(btnRegister).toBeInTheDocument();
    fireEvent.click(btnLogin);
    fireEvent.click(btnRegister);
  });
});
