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
        {
          userName,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Signup success:", res?.data);
      setError("");
      dispatch(setUserData(res?.data));
      navigate("/login");
    } catch (err) {
      console.error(err);
      const msg =
        err?.response?.data?.message || "Signup failed. Please try again.";
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
            welcome to <span className="text-white">Taptalk</span>
          </h1>
        </div>

        <h1 className="text-gray-700 font-bold text-[20px] text-center">
          Sign Up
        </h1>

        <form
          onSubmit={handleSignup}
          className="w-full flex flex-col items-center gap-[20px]"
        >
          <input
            type="text"
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter username"
            className="w-[90%] h-[60px] border-2 border-[#20c7ff] px-[10px] py-[20px] rounded-lg shadow-gray-200 shadow-lg text-gray-700 text-[19px] outline-none"
            required
          />

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
              onClick={() => setShow(!show)}
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
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <p className="mb-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="cursor-pointer text-[#1ea9d8] font-semibold"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
