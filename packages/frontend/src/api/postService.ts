import axios from "axios";

export interface PostDtoType {
  id: string;
  _id?: string;
  userName?: string;
  title: string;
  body: string;
  contacts: string;
  comments?: { _id?: string; userName: string; body: string }[];
}

export interface PostsInfoDtoType {
  total: number;
}

class PostService {
  constructor(private authHost: string) {}

  newPost = async ({ title, body, contacts }: PostDtoType): Promise<void> => {
    const response = await axios.post(
      `${this.authHost}/new`,
      {
        title,
        body,
        contacts,
      },
      {
        withCredentials: true,
      }
    );

    if (response.status === 301) {
      return response.data;
    } else {
      return null;
    }
  };
  editPost = async (data: PostDtoType): Promise<void> => {
    await axios.post(
      `${this.authHost}/edit`,
      {
        data,
      },
      {
        withCredentials: true,
      }
    );

    return;
  };

  getPosts = async (start: number, limit: number): Promise<PostDtoType[]> => {
    const response = await axios.get<PostDtoType[]>(`${this.authHost}/list`, {
      params: { start, limit },
    });
    return response.data;
  };
  getPostsInfo = async (): Promise<PostsInfoDtoType> => {
    const response = await axios.get<PostsInfoDtoType>(
      `${this.authHost}/listInfo`
    );
    return response.data;
  };

  getById = async (adId: string): Promise<PostDtoType> => {
    const res = await axios.get<PostDtoType>(`${this.authHost}/ad`, {
      params: { id: adId },
    });

    return res.data;
  };

  addComment = async ({
    postId,
    commentText,
  }: {
    postId: string;
    commentText: string;
  }): Promise<number> => {
    await axios.post(
      `${this.authHost}/addComment`,
      {
        postId,
        commentText,
      },
      {
        withCredentials: true,
      }
    );

    return 201;
  };
}

const postService = new PostService(`${window.location.origin}/post`);
export default postService;
