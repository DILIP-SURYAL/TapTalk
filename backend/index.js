import dotenv from "dotenv";
import express from "express";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js";

// Load environment variables
dotenv.config({ path: ".env" });

// Connect to MongoDB
connectDb().catch((err) => {
  console.error("Failed to connect to MongoDB:", err);
});

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.get("/", (req, res) => {
  res.send("api is working");
});

// Start server
app
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
  .on("error", (error) => {
    console.error("Error starting the server:", error);
  });
