import AdsList from "./AdsList";
import { fireEvent, render, screen } from "@testing-library/react";
import thunk from "redux-thunk";
import React from "react";
import { Provider } from "react-redux";
import { Middleware } from "@reduxjs/toolkit";
import configureStore from "redux-mock-store";
import { MemoryRouter, Router } from "react-router-dom";
import postService from "../../api/postService";
import { convertToRaw, EditorState } from "draft-js";
import { createMemoryHistory } from "history";

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
  });

  test("AdsList  button test", async () => {
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
        userName: "root",
        body: JSON.stringify(
          convertToRaw(EditorState.createEmpty().getCurrentContent())
        ),
        contacts: "contacts",

        comments: [{ _id: "1", userName: "root", body: "body" }],
      },
    ]);

    const store = mockStore(initialState);
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Provider store={store}>
          <AdsList />
        </Provider>
      </Router>
    );
    await new Promise((r) => setTimeout(r, 1));

    const btnEdit = screen.getByTestId("modal-btn-edit-data-id");
    const btnAddComment = screen.getByTestId("modal-btn-add-comment-data-id");
    const btnListComment = screen.getByTestId("modal-btn-list-comment-data-id");
    expect(btnEdit).toBeInTheDocument();
    expect(btnAddComment).toBeInTheDocument();
    expect(btnListComment).toBeInTheDocument();
    fireEvent.click(btnEdit);
    fireEvent.click(btnAddComment);
    fireEvent.click(btnListComment);
  });
});
