import CommentList from "./CommentList";
import { render, screen } from "@testing-library/react";
import React from "react";

describe("CommentList comp is function", () => {
  test("CommentList is function", () => {
    expect(CommentList).toBeInstanceOf(Object);
  });

  test("CommentList  render in page", async () => {
    render(
      <CommentList
        handleCancel={jest.fn}
        handleOk={jest.fn}
        visible
        comments={[
          {
            _id: "222",
            body: "body",
            userName: "root",
          },
        ]}
      />
    );
    const modal = screen.getByTestId("modal-comment-list-data-id");
    expect(modal).toBeInTheDocument();
  });
});
