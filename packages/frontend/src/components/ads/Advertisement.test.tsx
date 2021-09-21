import Advertisement from "./Advertisement";
import { fireEvent, render, screen } from "@testing-library/react";
import thunk from "redux-thunk";
import React from "react";
import { Provider } from "react-redux";
import { Middleware } from "@reduxjs/toolkit";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import postService from "../../api/postService";
import { createMemoryHistory } from "history";
import { convertToRaw, EditorState } from "draft-js";

const middlewares: Middleware[] = [thunk];

const mockStore = configureStore(middlewares);

describe("Advertisement comp is function", () => {
  test("Advertisement is function", () => {
    expect(Advertisement).toBeInstanceOf(Object);
  });

  test("Advertisement  not render list  in page with no data", async () => {
    const initialState = {
      auth: {
        userName: "userName",
        isAuthenticated: true,
      },
    };
    const store = mockStore(initialState);

    const editPost = jest.spyOn(postService, "editPost").mockResolvedValue();
    jest.spyOn(postService, "getById").mockResolvedValue({
      id: "1",
      _id: "1",
      title: "string",
      userName: "root",
      body: JSON.stringify(
        convertToRaw(EditorState.createEmpty().getCurrentContent())
      ),
      contacts: "contacts",

      comments: [{ _id: "1", userName: "root", body: "body" }],
    });

    const history = createMemoryHistory();

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Advertisement
            history={history}
            location={null}
            match={{ params: { id: "1" }, isExact: true, path: "", url: "" }}
          />
        </Provider>
      </MemoryRouter>
    );
    const form = screen.getByTestId("ad-form-data-id");
    expect(form).toBeInTheDocument();
    const btn = screen.getByTestId("ad-form-submit-data-id");
    const inputContacts = screen.getByTestId("ad-form-contacts-data-id");
    const inputTitle = screen.getByTestId("ad-form-title-data-id");
    expect(btn).toBeInTheDocument();
    expect(inputContacts).toBeInTheDocument();
    fireEvent.change(inputContacts, { target: { value: "inputContacts" } });
    fireEvent.change(inputTitle, { target: { value: "inputTitle" } });
    fireEvent.submit(form);
    await new Promise((r) => setTimeout(r, 10));
    await expect(editPost).toHaveBeenCalled();
  });
  test("Advertisement  click new Post", async () => {
    const initialState = {
      auth: {
        userName: "userName",
        isAuthenticated: true,
      },
    };
    const store = mockStore(initialState);

    const newPost = jest.spyOn(postService, "newPost").mockResolvedValue();
    const history = createMemoryHistory();

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Advertisement
            history={history}
            location={null}
            match={{
              params: { id: undefined },
              isExact: true,
              path: "",
              url: "",
            }}
          />
        </Provider>
      </MemoryRouter>
    );
    const form = screen.getByTestId("ad-form-data-id");
    expect(form).toBeInTheDocument();
    const btn = screen.getByTestId("ad-form-submit-data-id");
    const inputContacts = screen.getByTestId("ad-form-contacts-data-id");
    const inputTitle = screen.getByTestId("ad-form-title-data-id");
    expect(btn).toBeInTheDocument();
    expect(inputContacts).toBeInTheDocument();
    fireEvent.change(inputContacts, { target: { value: "inputContacts" } });
    fireEvent.change(inputTitle, { target: { value: "inputTitle" } });
    fireEvent.submit(form);
    await new Promise((r) => setTimeout(r, 10));
    await expect(newPost).toHaveBeenCalled();
  });

  test("Advertisement  click close btn", async () => {
    const initialState = {
      auth: {
        userName: "userName",
        isAuthenticated: true,
      },
    };
    const store = mockStore(initialState);

    jest.spyOn(postService, "getPosts").mockResolvedValue([]);
    jest.spyOn(postService, "getById").mockResolvedValue({
      id: "1",
      _id: "1",
      title: "string",
      userName: "root",
      body: JSON.stringify(
        convertToRaw(EditorState.createEmpty().getCurrentContent())
      ),
      contacts: "contacts",

      comments: [{ _id: "1", userName: "root", body: "body" }],
    });

    const history = createMemoryHistory();
    history.push("/ddd");
    expect(history.location.pathname).toBe("/ddd");
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Advertisement
            history={history}
            location={null}
            match={{ params: { id: "1" }, isExact: true, path: "", url: "" }}
          />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByTestId("ad-form-data-id")).toBeInTheDocument();
    const btn = screen.getByTestId("ad-form-close-data-id");
    fireEvent.click(btn);
    expect(history.location.pathname).toBe("/");
  });
  test("Advertisement  type  editor in page", async () => {
    const initialState = {
      auth: {
        userName: "userName",
        isAuthenticated: true,
      },
    };
    const store = mockStore(initialState);

    jest.spyOn(postService, "getPosts").mockResolvedValue([]);
    jest.spyOn(postService, "getById").mockResolvedValue({
      id: "1",
      _id: "1",
      title: "string",
      userName: "root",
      body: JSON.stringify(
        convertToRaw(EditorState.createEmpty().getCurrentContent())
      ),
      contacts: "contacts",

      comments: [{ _id: "1", userName: "root", body: "body" }],
    });

    const history = createMemoryHistory();
    history.push("/ddd");
    expect(history.location.pathname).toBe("/ddd");
    const container = render(
      <MemoryRouter>
        <Provider store={store}>
          <Advertisement
            history={history}
            location={null}
            match={{ params: { id: "1" }, isExact: true, path: "", url: "" }}
          />
        </Provider>
      </MemoryRouter>
    );

    const editor = container.container.querySelector(".demo-editor");
    expect(editor).not.toBeNull();
  });
});
