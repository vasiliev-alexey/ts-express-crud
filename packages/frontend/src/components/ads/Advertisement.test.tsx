import Advertisement from "./Advertisement";
import { render, screen } from "@testing-library/react";
import thunk from "redux-thunk";
import React from "react";
import { Provider } from "react-redux";
import { Middleware } from "@reduxjs/toolkit";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import postService from "../../api/postService";
import { createMemoryHistory } from "history";

const middlewares: Middleware[] = [thunk];

const mockStore = configureStore(middlewares);

describe("Advertisement comp is function", () => {
  beforeEach(() => {
    // jest.resetAllMocks();
    // jest.restoreAllMocks();
  });

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
  });
});
