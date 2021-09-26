import { createChatServer } from "../socketServer";
import http from "http";
import WebSocket from "ws";
import { nanoid } from "nanoid";

function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

describe("test socket server", function () {
  let server: http.Server;
  let client: WebSocket;
  let otherClient: WebSocket;

  let socServer: WebSocket.Server;

  function startServer(port: number): Promise<http.Server> {
    const srv = http.createServer();

    return new Promise((resolve) => {
      srv.listen(port, () => resolve(srv));
    });
  }

  function waitForSocketState(socket: WebSocket, state: number) {
    return new Promise<void>(function (resolve) {
      setTimeout(function () {
        if (socket.readyState === state) {
          resolve();
        } else {
          waitForSocketState(socket, state).then(resolve);
        }
      }, 5);
    });
  }

  beforeAll(async () => {
    server = await startServer(4003);
    socServer = createChatServer(server);
    client = new WebSocket(`ws://localhost:4003/chat`);
    otherClient = new WebSocket(`ws://localhost:4003/chat`);
  });

  afterAll(() => {
    server.close();
    otherClient.close();
    client.close();
    socServer.close();
  });

  test("test  expect function ", () => {
    expect(createChatServer).toBeInstanceOf(Function);
  });

  test("test expect error on sent not valid message  ", async () => {
    expect(socServer).not.toBeNull();

    await waitForSocketState(client, client.OPEN);

    client.on("message", (data) => {
      expect(data).toEqual("Error message send to server");
    });

    client.send(JSON.stringify({ data: "data" }));
  });

  test("test expect send resp  on sent   valid message  ", async () => {
    expect(socServer).not.toBeNull();

    const rndString = nanoid(12);
    await waitForSocketState(client, client.OPEN);
    await waitForSocketState(otherClient, client.OPEN);

    otherClient.on("message", (data) => {
      const res = JSON.parse(data.toString());
      expect(res.type).toEqual("MESSAGE_FROM_SERVER");
      expect(res.message).toEqual(rndString);
    });

    client.send(
      JSON.stringify({ type: "MESSAGE_FROM_CLIENT", data: rndString })
    );
    await sleep(10);
  });
});
