//
//
// import { Logger } from "tslog";
// import * as http from "http";
// import WebSocket from "ws";
//
// const logger: Logger = new Logger({ name: "socket-server" });
// export function createSocketServer(httpServer: http.Server): Server {
//   const io = new Server(httpServer, {
//     cors: {
//       origin: "*",
//     },
//   });
//
//   io.on("connection", (socket: Socket) => {
//     console.log("socket.id", socket.id); // ojIckSD2jqNzOqIrAGzL
//   });
//
//   return io;
// }
//
// export default createSocketServer;
