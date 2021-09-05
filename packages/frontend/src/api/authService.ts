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
  logout = async (): Promise<{ userID: string; userName: string }> => {
    const response = await axios.get(`${this.authHost}/logout`, {});

    return;
  };
}

const authService = new AuthService("http://localhost:5000/auth");
export default authService;
