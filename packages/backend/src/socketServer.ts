import { Server, Socket } from "socket.io";

import { Logger } from "tslog";
import * as http from "http";

const logger: Logger = new Logger({ name: "socket-server" });
export function createSocketServer(httpServer: http.Server): Server {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connect", (socket: Socket) => {
    logger.info(`connected client with id: ${socket.id}`);

    socket.on("connect", () => {
      logger.info(`disconnect  client${socket.id}`);
    });

    socket.on("SEND_MESSAGE", (data) => {
      logger.info(`work it`, data);

      socket.broadcast.to(socket.id).emit("message", "for your eyes only");
    });

    socket.on("GET_INIT_MESSAGES", (data) => {
      logger.info(`work it`, data);

      socket.emit("chat/syncMessages", "for your eyes only");
    });

    socket.on("disconnect", () => {
      logger.info(`disconnect  client${socket.id}`);
    });
  });
  return io;
}

export default createSocketServer;
