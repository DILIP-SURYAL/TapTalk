import { uploadOnCloudinary } from "../config/cloudinary.js";
import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select("-password"); // Optionally exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (e) {
    console.error("Error in getCurrentUser:", e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const editProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name } = req.body;
    console.log(name);
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
      console.log("hii there", req.file.path);
    }

    let user = await User.findByIdAndUpdate(
      userId,
      { name, image },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (e) {
    console.error("Error in editProfile:", e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getOtherUsers = async (req, res) => {
  try {
    let users = await User.find({ _id: { $ne: req.userId } }).select(
      "-password -email -createdAt -updatedAt"
    );
    return res.status(200).json(users);
  } catch (e) {
    console.log("problem in getOtherUsers", e);
    return res.status(500).json({ message: "erron in getOtherUsers", e });
  }
};

export const searchUsers = async (req, res) => {
  try {
    let { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    const response = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { userName: { $regex: query, $options: "i" } },
      ],
    });

    return res.status(200).json(response);
  } catch (e) {
    console.log("problem in searchUsers", e);
    return res.status(500).json({ message: "erron in getOtherUsers", e });
  }
};
