import axios from "axios";
import { pathToFileURL } from "url";

class AuthService {
  constructor(private authHost: string) {}

  LoginUser = async (
    username: string,
    password: string
  ): Promise<{ userID: string; userName: string }> => {
    const response = await axios.post(
      `${this.authHost}/login`,
      {
        username,
        password,
      },
      {
        withCredentials: true,
      }
    );

    return { userID: response.data.userId, userName: username };
  };

  RegisterUser = async (
    username: string,
    password: string
  ): Promise<{ userID: string; userName: string }> => {
    console.log("sswwwwwwwwwwwws");

    try {
      const response = await axios.post(
        `${this.authHost}/register`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );
      return { userID: response.data.userId, userName: username };
    } catch (e) {
      if (e.response.status === 401) {
        throw e.response.data;
      }
    }
  };
  logout = async (): Promise<void> => {
    await axios.get(`${this.authHost}/logout`, {});
  };
}

const authService = new AuthService(`${window.location.origin}/auth`);
export default authService;
window.location.host;
