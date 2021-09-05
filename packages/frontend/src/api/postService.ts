import axios from "axios";

export interface PostDtoType {
  id: string;
  title: string;
  body: string;
  contacts: string;
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
    const response = await axios.post(
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

  getPosts = async (): Promise<PostDtoType[]> => {
    const response = await axios.get<PostDtoType[]>(`${this.authHost}/list`);
    return response.data;
  };

  getById = async (adId: string): Promise<PostDtoType> => {
    const res = await axios.get<PostDtoType>(`${this.authHost}/ad`, {
      params: { id: adId },
    });

    return res.data;
  };
}

const postService = new PostService("http://localhost:5000/post");
export default postService;
