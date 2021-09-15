import authService from "./authService";
import axios from "axios";
jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;
describe("test authService", () => {
  it("check object instance", () => {
    expect(authService).toBeInstanceOf(Object);
  });

  it("check LoginUser", async () => {
    const mocked = mockedAxios.post.mockReturnValueOnce(
      Promise.resolve({
        data: { userId: 1 },
      })
    );
    await authService.LoginUser("root", "root");

    expect(mocked).toBeCalledWith(
      "http://localhost/auth/login",
      { password: "root", username: "root" },
      { withCredentials: true }
    );
  });

  it("check RegisterUser", async () => {
    const mocked = mockedAxios.post.mockReturnValueOnce(
      Promise.resolve({
        data: { userId: 1 },
      })
    );
    await authService.RegisterUser("root", "root");

    expect(mocked).toBeCalledWith(
      "http://localhost/auth/register",
      { password: "root", username: "root" },
      { withCredentials: true }
    );
  });

  it("check logout", async () => {
    const mocked = mockedAxios.get.mockReturnValueOnce(null);
    await authService.logout();

    expect(mocked).toBeCalledWith(
      "http://localhost/auth/logout",

      {}
    );
  });
});
