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
