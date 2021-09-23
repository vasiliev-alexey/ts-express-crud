import { store } from "../store/store";
import io from "socket.io-client";
import { serverSync } from "../store/chatSlice";
const socket = io();

class WsService {
  constructor() {
    socket.on("chat/syncMessages", (data) => {
      console.log("chat/syncMessages", data);
      store.dispatch(serverSync(data));
    });
  }

  sendActionToServer(data: { type: string; payload: Record<string, unknown> }) {
    socket.emit(data.type, data.payload);
  }
}

const wsService = new WsService();
export default wsService;
