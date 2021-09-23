import io from "socket.io-client";
const socket = io();

// httpServer.listen(3000);

socket.on("connect", () => {
  socket.emit("storeClientInfo", { customId: "000CustomIdHere0000" });
});

class WsService {
  test() {
    socket.emit("go go", "data");
  }

  sendActionToServer(data: { type: string; payload: Record<string, unknown> }) {
    socket.emit(data.type, data.payload);
  }
}

const wsService = new WsService();
export default wsService;
