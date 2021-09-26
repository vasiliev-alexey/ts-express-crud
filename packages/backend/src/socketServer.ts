import WebSocket, { Data, Server } from "ws";
import * as http from "http";
import { Logger } from "tslog";
import { nanoid } from "nanoid";
const logger = new Logger({ name: "socket-server" });

const connMap: Map<string, WebSocket> = new Map<string, WebSocket>();

interface Message {
  type: string;
  payload: Record<string, unknown>;
}

function IsValidMessage(data: Data): undefined | Message {
  const msg = JSON.parse(data.toString());

  logger.debug("d", msg);

  if (!msg) return undefined;
  if (!msg["type"]) {
    return undefined;
  }
  return {
    type: msg.type,
    payload: msg.data,
  };
}

export function createChatServer(server: http.Server): Server {
  const socketServer = new WebSocket.Server({ server, path: "/chat" });

  socketServer.on("connection", (ws: WebSocket, req) => {
    const id = req.headers["sec-websocket-key"]?.toString() || nanoid(10);
    connMap.set(id, ws);
    logger.debug("Client connected:", id);

    ws.on("message", (data) => {
      logger.debug("message data:", data);

      const msg = JSON.parse(data.toString()).data;

      const message = IsValidMessage(data);

      if (!message) {
        logger.error("Error message send to server");
        ws.send("Error message send to server");
        return;
      }

      logger.debug("connMap", connMap.size);

      logger.debug("message", JSON.parse(data.toString()).data);

      connMap.forEach((k, v) => {
        if (v !== id) {
          logger.debug("send to => ", v);
          k.send(JSON.stringify({ type: "MESSAGE_FROM_SERVER", message: msg }));
        }
      });

      //  connMap[1].send(`Hi ${msg}`);
    });
  });

  return socketServer;
}
