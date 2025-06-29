import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { sendMessage } from "../controllers/message.controllers.js";
import { upload } from "../middlewares/multer.js";
import { getMessages } from "../controllers/message.controllers.js";
const messageRouter = express.Router();

messageRouter.post(
  "/send/:receiver",
  isAuth,
  upload.single("image"),
  sendMessage
);
messageRouter.get(
  "/get/:receiver",
  isAuth,
  upload.single("image"),
  getMessages
);
export default messageRouter;
