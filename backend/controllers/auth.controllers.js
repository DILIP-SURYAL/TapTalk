import generateToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { userName, password, email } = req.body;

    const isUserExists = await User.findOne({ userName });
    const isEmailExists = await User.findOne({ email });

    if (isUserExists) {
      return res.status(400).json({ message: "Account is already exists" });
    }

    if (isEmailExists) {
      return res.status(400).json({ message: "Account is already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    const token = await generateToken(user._id);

    return res
      .cookie("token", token, {
        httpOnly: true, // recommended for security
        secure: true, // set true in production
        sameSite: "None", // or 'Strict' / 'None' depending on use case
      })
      .status(201)
      .json(user);
  } catch (e) {
    console.log(e);
  }
};

export const login = async (req, res) => {
  try {
    const { password, email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "please create an account" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "incorrect Passoword" });
    }
    const token = await generateToken(user._id);

    return res
      .cookie("token", token, {
        httpOnly: true, // recommended for security
        secure: true, // set true in production
        sameSite: "None", // or 'Strict' / 'None' depending on use case
      })
      .status(201)
      .json({ message: "logged in Successfully", user });
  } catch (e) {
    console.log(e);
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "log out successfully" });
  } catch (e) {
    return res.status(400).json({ message: `login error ` });
  }
};
