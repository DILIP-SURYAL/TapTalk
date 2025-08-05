import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_END_POINT } from "../constant";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${API_END_POINT}/api/auth/signup`,
        { userName, email, password },
        { withCredentials: true }
      );

      setError("");
      dispatch(setUserData(res?.data));
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Signup failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-200 px-4">
      <div className="w-full max-w-sm md:max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-cyan-400 py-10 flex items-center justify-center rounded-b-3xl shadow-md">
          <h1 className="text-xl md:text-2xl font-bold text-gray-700">
            Welcome to <span className="text-white">Taptalk</span>
          </h1>
        </div>

        {/* Form */}
        <div className="px-6 py-8 md:px-8 md:py-10 flex flex-col items-center">
          <h2 className="text-lg md:text-xl font-bold text-gray-700 mb-4">
            Sign Up
          </h2>

          <form onSubmit={handleSignup} className="w-full flex flex-col gap-4">
            {/* Username */}
            <input
              type="text"
              name="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter username"
              required
              className="w-full px-4 py-3 border-2 border-cyan-400 rounded-lg text-gray-700 text-base shadow-sm outline-none"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
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
                name="password"
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
              <p className="text-red-500 text-center text-sm">{error}</p>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 py-3 bg-cyan-400 hover:bg-cyan-500 text-white font-semibold rounded-lg shadow-md transition duration-300 disabled:opacity-60"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>

            {/* Redirect */}
            <p className="text-center text-sm mt-4 text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-cyan-500 font-semibold cursor-pointer"
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
