import axios from "axios";
import postService from "./postService";
import { nanoid } from "@reduxjs/toolkit";
jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("test postService", () => {
  it("check object instance", () => {
    expect(postService).toBeInstanceOf(Object);
  });

  it("check getPosts", async () => {
    const mocked = mockedAxios.get.mockReturnValueOnce(
      Promise.resolve([
        {
          id: "",
          _id: "",
          userName: "",
          title: "",
          body: "",
          contacts: "",
        },
      ])
    );
    await postService.getPosts(0, 3);

    expect(mocked).toBeCalledWith("http://localhost/post/list", {
      params: { limit: 3, start: 0 },
    });
  });

  it("check getPost if", async () => {
    const mocked = mockedAxios.get.mockReturnValueOnce(
      Promise.resolve([
        {
          id: "",
          _id: "",
          userName: "",
          title: "",
          body: "",
          contacts: "",
        },
      ])
    );

    const rndId = nanoid(10);

    await postService.getById(rndId);

    expect(mocked).toBeCalledWith("http://localhost/post/ad", {
      params: { id: rndId },
    });
  });

  it("check newPost", async () => {
    const mocked = mockedAxios.post.mockReturnValueOnce(
      Promise.resolve([
        {
          id: "",
          _id: "",
          userName: "",
          title: "",
          body: "",
          contacts: "",
        },
      ])
    );
    const rnd = nanoid().toString();

    await postService.newPost({
      id: rnd,
      _id: "",
      userName: "",
      title: "",
      body: rnd,
      contacts: "",
    });

    expect(mocked).toBeCalledWith(
      "http://localhost/post/new",
      { body: rnd, contacts: "", title: "" },
      { withCredentials: true }
    );
  });
  it("check editPost", async () => {
    const mocked = mockedAxios.post.mockReturnValueOnce(
      Promise.resolve([
        {
          id: "",
          _id: "",
          userName: "",
          title: "",
          body: "",
          contacts: "",
        },
      ])
    );
    const rnd = nanoid().toString();

    await postService.editPost({
      id: rnd,
      _id: "",
      userName: "",
      title: "",
      body: rnd,
      contacts: "",
    });

    expect(mocked).toBeCalledWith(
      "http://localhost/post/edit",
      {
        data: {
          _id: "",
          id: rnd,
          body: rnd,
          contacts: "",
          title: "",
          userName: "",
        },
      },
      { withCredentials: true }
    );
  });
  it("check addComment", async () => {
    const mocked = mockedAxios.post.mockReturnValueOnce(
      Promise.resolve([
        {
          id: "",
          _id: "",
          userName: "",
          title: "",
          body: "",
          contacts: "",
        },
      ])
    );
    const rnd = nanoid().toString();
    const commentText = nanoid().toString();

    await postService.addComment({
      postId: rnd,
      commentText,
    });

    expect(mocked).toBeCalledWith(
      "http://localhost/post/addComment",
      {
        postId: rnd,
        commentText,
      },

      { withCredentials: true }
    );
  });
});
