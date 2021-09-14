import AdsList from "./AdsList";
import { render, screen } from "@testing-library/react";
import thunk from "redux-thunk";
import React from "react";
import { Provider } from "react-redux";
import { Middleware } from "@reduxjs/toolkit";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import postService from "../../api/postService";
import { convertToRaw, EditorState } from "draft-js";

const middlewares: Middleware[] = [thunk];

const mockStore = configureStore(middlewares);

describe("AdsList comp is function", () => {
  beforeEach(() => {
    // jest.resetAllMocks();
    // jest.restoreAllMocks();
  });

  test("AdsList is function", () => {
    expect(AdsList).toBeInstanceOf(Object);
  });

  test("AdsList  not render list  in page with no data", async () => {
    const initialState = {
      auth: {
        userName: "userName",
        isAuthenticated: true,
      },
    };
    const store = mockStore(initialState);

    jest.spyOn(postService, "getPosts").mockResolvedValue([]);

    render(
      <MemoryRouter>
        <Provider store={store}>
          <AdsList />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText("wait")).toBeInTheDocument();
  });
});
describe("AdsList with data", () => {
  test("AdsList   render list  in page with  data", async () => {
    const initialState = {
      auth: {
        userName: "root",
        isAuthenticated: true,
      },
    };

    jest.spyOn(postService, "getPosts").mockResolvedValue([
      {
        id: "1",
        _id: "1",
        title: "string",
        body: JSON.stringify(
          convertToRaw(EditorState.createEmpty().getCurrentContent())
        ),
        contacts: "contacts",
      },
    ]);

    const store = mockStore(initialState);

    render(
      <MemoryRouter>
        <Provider store={store}>
          <AdsList />
        </Provider>
      </MemoryRouter>
    );
    await new Promise((r) => setTimeout(r, 1));
    screen.debug();
  });
});
