import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_END_POINT } from "../constant";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_END_POINT}/api/auth/login`, {
        email,
        password,
      });

      console.log("Login success:", res?.data);
      setError("");

      // Optional: Save token to localStorage or context
      // localStorage.setItem("token", res.data.token);

      // Navigate to home/dashboard
      // navigate("/home");
    } catch (e) {
      console.error(e);
      const msg =
        e?.response?.data?.message || "Login failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-slate-200 flex items-center justify-center">
      <div className="w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[30px]">
        <div className="w-full h-[200px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex items-center justify-center">
          <h1 className="text-gray-600 font-bold text-[30px]">
            welcome to <span className="text-white">chatly</span>
          </h1>
        </div>

        <h1 className="text-gray-700 font-bold text-[20px] text-center">
          Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="w-full flex flex-col items-center gap-[20px]"
        >
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="w-[90%] h-[60px] border-2 border-[#20c7ff] px-[10px] py-[20px] rounded-lg shadow-gray-200 shadow-lg text-gray-700 text-[19px] outline-none"
            required
          />

          <div className="w-[90%] h-[60px] overflow-hidden relative">
            <input
              type={show ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full h-full border-2 border-[#20c7ff] px-[10px] py-[20px] rounded-lg shadow-gray-200 shadow-lg text-gray-700 text-[19px] outline-none"
              required
            />
            <span
              onClick={() => setShow((prev) => !prev)}
              className="select-none cursor-pointer absolute top-[13px] right-[20px] text-[19px] text-[#20c7ff] font-semibold"
            >
              {show ? "Hide" : "Show"}
            </span>
          </div>

          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="px-[20px] py-[10px] bg-[#20c7ff] rounded-2xl shadow-gray-400 shadow-lg text-[20px] w-[200px] mt-[20px] font-semibold hover:shadow-inner"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          <p className="mb-6">
            Want to create an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="cursor-pointer text-[#1ea9d8] font-semibold"
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
