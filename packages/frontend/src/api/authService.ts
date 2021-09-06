import axios from "axios";

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
  };
  logout = async (): Promise<void> => {
    await axios.get(`${this.authHost}/logout`, {});
  };
}

const authService = new AuthService("http://localhost:4000/auth");
export default authService;
