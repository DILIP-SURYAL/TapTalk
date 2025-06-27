import React, { useState } from "react";
import { FaArrowLeft, FaCamera } from "react-icons/fa";
import avatar from "../assets/avatar.png"; // Assuming you have a default avatar image
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_END_POINT } from "../constant";
import { setUserData } from "../redux/userSlice";
const Profile = () => {
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const image = useRef();
  const [name, setName] = useState(userData?.name || "");
  const [saving, setSaving] = useState(false);
  const [frontEndImage, setFrontEndImage] = useState(userData.image || avatar);
  const [backEndImage, setbackEndImage] = useState(null);
  const handleChange = (e) => {
    let file = e.target.files[0];
    setFrontEndImage(URL.createObjectURL(file));
    setbackEndImage(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let formData = new FormData();
      formData.append("name", name);
      if (backEndImage) {
        formData.append("image", backEndImage);
      }
      let result = await axios.put(
        `${API_END_POINT}/api/user/profile`,
        formData,
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
    } catch (e) {
      console.log("profile image saving error", e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 relative flex items-center justify-center px-4">
      {/* Back Button */}
      <FaArrowLeft
        className="absolute top-6 left-6 text-2xl cursor-pointer text-gray-700"
        onClick={() => window.history.back()}
      />

      <form
        onSubmit={handleSave}
        className="flex flex-col items-center gap-6 w-full max-w-md"
      >
        {/* Profile Image */}
        <div className="relative ">
          <div className="w-32 h-32 rounded-full border-4 border-cyan-400 overflow-hidden relative">
            <img
              onClick={() => image.current.click()}
              src={frontEndImage}
              alt="Profile"
              className="absolute top-0 left-0 w-full h-full object-cover object-center cursor-pointer"
            />
          </div>
          <label htmlFor="profileImage">
            <div
              onClick={() => image.current.click()}
              className="absolute bottom-1 right-1 bg-white rounded-full p-2 border shadow-sm cursor-pointer"
            >
              <FaCamera className="text-gray-600" />
            </div>
            <input
              ref={image}
              placeholder="upload profile image"
              type="file"
              id="profileImage"
              name="profileImage"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Input Fields */}
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="w-full px-4 py-2 border-2 border-cyan-400 rounded-md outline-none focus:ring-2 focus:ring-cyan-300"
        />
        <input
          type="text"
          name="username"
          readOnly
          value={userData.userName}
          placeholder="Username"
          className="w-full px-4 py-2 border-2 border-cyan-400 rounded-md outline-none focus:ring-cyan-300"
        />
        <input
          type="email"
          name="email"
          readOnly
          value={userData.email}
          placeholder="Email"
          className="w-full px-4 py-2 border-2 border-cyan-400 rounded-md outline-none focus:ring-cyan-300"
        />

        {/* Save Button */}
        <button
          type="submit"
          className="mt-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-6 py-2 rounded-full shadow-lg hover:scale-105 transition duration-200"
        >
          {saving ? "saving..." : "save profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
