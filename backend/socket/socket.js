import http from "http";
import express from "express";
import { Server } from "socket.io";
let app = express();

const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "https://taptalk-realtimechatapp.onrender.com",
    credentials: true, // ✅ allow credentials
  },
});
export const userSocketMap = {};
export const getReceiverSocketId = (recId) => {
  return userSocketMap[recId];
};
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("New user connected:", userId, socket.id);
  if (userId != undefined) {
    userSocketMap[userId] = socket.id;
  }
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});
export { app, server };
