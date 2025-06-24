import React, { useState } from "react";
import { FaArrowLeft, FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/download.png"; // Assuming you have a default avatar image
const Profile = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    // TODO: Save profile logic here
    console.log("Saving profile:", form);
  };

  return (
    <div className="min-h-screen bg-blue-50 relative flex items-center justify-center px-4">
      {/* Back Button */}
      <FaArrowLeft
        className="absolute top-6 left-6 text-2xl cursor-pointer text-gray-700"
        onClick={() => navigate(-1)}
      />

      <div className="flex flex-col items-center gap-6 w-full max-w-md">
        {/* Profile Image */}
        <div className="relative">
          <img
            src={avatar}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-cyan-400 object-cover"
          />
          <div className="absolute bottom-1 right-1 bg-white rounded-full p-2 border shadow-sm cursor-pointer">
            <FaCamera className="text-gray-600" />
          </div>
        </div>

        {/* Input Fields */}
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border-2 border-cyan-400 rounded-md outline-none focus:ring-2 focus:ring-cyan-300"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full px-4 py-2 border-2 border-cyan-400 rounded-md outline-none focus:ring-2 focus:ring-cyan-300"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border-2 border-cyan-400 rounded-md outline-none focus:ring-2 focus:ring-cyan-300"
        />

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="mt-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-6 py-2 rounded-full shadow-lg hover:scale-105 transition duration-200"
        >
          Save profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
