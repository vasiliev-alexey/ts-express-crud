import requireAuth from "./requireAuth";
import { render, screen } from "@testing-library/react";
import React from "react";
import { nanoid } from "@reduxjs/toolkit";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

class DummyComp extends React.Component<{ testData: string }> {
  render() {
    return <p data-testid={`${this.props.testData}`}>ddd</p>;
  }
}

describe("requireAuth comp is function", () => {
  test("requireAuth is function", () => {
    expect(requireAuth).toBeInstanceOf(Function);
  });

  test("requireAuth  true is render", () => {
    const history = createMemoryHistory();
    const rndPath = `/${nanoid(10).toString()}`;
    history.push(rndPath);
    render(
      <Router history={history}>
        {React.createElement(requireAuth(DummyComp, true), {
          testData: "testData",
        })}
      </Router>
    );
    expect(screen.getByTestId("testData")).toBeInTheDocument();
    expect(history.location.pathname).toEqual(rndPath);
  });

  test("requireAuth false is  notrender", () => {
    const history = createMemoryHistory();

    const rndPath = `/${nanoid(10).toString()}`;
    history.push(rndPath);
    render(
      <Router history={history}>
        {React.createElement(requireAuth(DummyComp, false), {
          testData: "testData",
        })}
      </Router>
    );

    expect(screen.queryAllByTestId("testData").length).toBe(0);
    expect(history.location.pathname).toEqual("/");
  });
});
