// src/context/SocketContext.js
import { createContext } from "react";
import { io } from "socket.io-client";

export const socket = io("https://taptalk-realtimechat-backend.onrender.com", {
  autoConnect: false,
  withCredentials: true,
});

export const SocketContext = createContext(socket);
