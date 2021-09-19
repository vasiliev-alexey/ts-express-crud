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
    const btn = screen.getByTestId("ad-form-submit-data-id");
    const inputContacts = screen.getByTestId("ad-form-contacts-data-id");
    const inputTitle = screen.getByTestId("ad-form-title-data-id");
    expect(btn).toBeInTheDocument();
    expect(inputContacts).toBeInTheDocument();
    fireEvent.change(inputContacts, { target: { value: "inputContacts" } });
    fireEvent.change(inputTitle, { target: { value: "inputTitle" } });
    fireEvent.submit(btn);
  });
});
