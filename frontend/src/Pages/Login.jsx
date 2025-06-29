import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_END_POINT } from "../constant";
import { setLoading, setUserData } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const res = await axios.post(
        `${API_END_POINT}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      setError("");
      dispatch(setUserData(res?.data.user));
    } catch (e) {
      const msg =
        e?.response?.data?.message || "Login failed. Please try again.";
      setError(msg);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-200 px-4">
      <div className="w-full max-w-sm md:max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-cyan-400 h-36 md:h-40 flex items-center justify-center rounded-b-3xl shadow-md">
          <h1 className="text-xl md:text-2xl font-bold text-gray-700">
            Welcome to <span className="text-white">Taptalk</span>
          </h1>
        </div>

        {/* Form */}
        <div className="px-6 py-8 md:px-8 md:py-10 flex flex-col items-center">
          <h2 className="text-lg md:text-xl font-bold text-gray-700 mb-4">
            Login
          </h2>

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
            {/* Email */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
              className="w-full px-4 py-3 border-2 border-cyan-400 rounded-lg text-gray-700 text-base shadow-sm outline-none"
            />

            {/* Password */}
            <div className="relative w-full">
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full px-4 py-3 border-2 border-cyan-400 rounded-lg text-gray-700 text-base shadow-sm outline-none"
              />
              <span
                onClick={() => setShow((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-500 font-semibold text-sm cursor-pointer select-none"
              >
                {show ? "Hide" : "Show"}
              </span>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 py-3 bg-cyan-400 hover:bg-cyan-500 text-white font-semibold rounded-lg shadow-md transition duration-300 disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>

            {/* Switch to Sign Up */}
            <p className="text-center text-sm mt-4 text-gray-600">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-cyan-500 font-semibold cursor-pointer"
              >
                Sign up
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
