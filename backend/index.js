import dotenv from "dotenv";
import express from "express";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// Load environment variables
dotenv.config({ path: ".env" });

// Connect to MongoDB
connectDb().catch((err) => {
  console.error("Failed to connect to MongoDB:", err);
});

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Optional: Enable CORS if frontend is on another port
// const corsOptions = {
//   origin: process.env.CLIENT_URL,
//   credentials: true,
// };
// app.use(cors(corsOptions));

// Routes
app.use("/api/auth", authRouter);
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
