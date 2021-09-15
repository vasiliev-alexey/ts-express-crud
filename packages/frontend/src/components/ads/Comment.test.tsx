import Comment from "./Comment";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import postService from "../../api/postService";

describe("Comment comp is function", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  test("Comment is function", () => {
    expect(Comment).toBeInstanceOf(Object);
  });

  test("Comments  render in page", async () => {
    render(
      <Comment
        handleCancel={jest.fn}
        handleOk={jest.fn}
        postId={null}
        visible
      />
    );

    const textArea = screen.getByTestId(
      "comment-textarea-data-id"
    ) as HTMLTextAreaElement;
    expect(screen.getByTestId("modal-form-data-id")).toBeInTheDocument();
    expect(textArea).toBeInTheDocument();

    fireEvent.change(textArea, { target: { value: "23" } });
    expect(textArea.value).toBe("23");
  });

  test("Comments behavior test ", async () => {
    const handleOk = jest.fn();

    jest.spyOn(postService, "addComment").mockResolvedValueOnce(201);

    render(
      <Comment
        handleCancel={jest.fn}
        handleOk={handleOk}
        postId={null}
        visible
      />
    );

    const btnOk = screen.getByText("OK").parentNode;

    expect(btnOk).toBeInTheDocument();

    fireEvent.click(btnOk);
    await new Promise((r) => setTimeout(r, 10));
    expect(handleOk).toHaveBeenCalled();
  });

  test("Comments behavior test with err ", async () => {
    const handleOk = jest.fn();

    jest.spyOn(postService, "addComment").mockResolvedValueOnce(404);

    render(
      <Comment
        handleCancel={jest.fn}
        handleOk={handleOk}
        postId={null}
        visible
      />
    );

    const btnOk = screen.getByText("OK").parentNode;

    expect(btnOk).toBeInTheDocument();
    fireEvent.click(btnOk);
    await new Promise((r) => setTimeout(r, 10));
    expect(handleOk).not.toHaveBeenCalled();
  });
});
