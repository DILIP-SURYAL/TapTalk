import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  getCurrentUser,
  editProfile,
  getOtherUsers,
  searchUsers,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.js";
const userRouter = express.Router();

userRouter.get("/current", isAuth, getCurrentUser);
userRouter.get("/others", isAuth, getOtherUsers);
userRouter.put("/profile", isAuth, upload.single("image"), editProfile);
userRouter.get("/search", isAuth, searchUsers);
export default userRouter;
