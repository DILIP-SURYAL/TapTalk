import User from "../models/user.model.js";
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findOne({ userId });

    if (!user) return res.status(400).json({ message: "user not found" });

    return res.status(200).json(user);
  } catch (e) {
    return res.status(500).json({ message: "internal server error", e });
  }
};
