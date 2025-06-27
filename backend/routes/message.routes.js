import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { sendMessage } from "../controllers/message.controllers.js";
import { upload } from "../middlewares/multer.js";

const messageRouter = express.Router();

userRouter.post("/send/:receiver", isAuth, upload.single("image"), sendMessage);
export default userRouter;
