import React, { useState } from "react";
import { FiSearch, FiArrowLeft, FiLogOut, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import avatar from "../assets/avatar.png";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData, otherUsers } = useSelector((state) => state.user);
  return (
    <div className="w-[25%] h-full flex flex-col justify-between bg-gray-200">
      {/* Top bubble section */}
      <div className="bg-[#03A9F4] rounded-br-4xl rounded-bl-4xl pt-40 pb-10 p-4 shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-white text-lg font-bold">chatly</h2>
            <h1 className="text-white text-xl font-semibold mt-1">
              Hii , {userData.name || "User"}
            </h1>
          </div>
          <img
            onClick={() => navigate("/profile")}
            src={userData.image || avatar}
            alt="profile"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
        </div>

        <div className="mt-5">
          {!search && (
            <div className="flex items-center gap-3">
              <div
                className="bg-white text-[#03A9F4] p-2 rounded-full cursor-pointer shadow"
                onClick={() => setSearch(true)}
              >
                <FiSearch size={20} />
              </div>
              {otherUsers?.map((user, index) => (
                <img
                  key={index}
                  src={user.image || avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full shadow-md border-2 border-white"
                />
              ))}
            </div>
          )}

          {search && (
            <form
              className="flex items-center gap-2 bg-white rounded-full shadow px-4 py-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <FiSearch size={20} className="mr-2" />
              <input
                type="text"
                placeholder="Search users..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 outline-none text-black placeholder-gray-500"
              />
              <button
                type="submit  "
                onClick={() => {
                  setSearch(false);
                  setQuery("");
                }}
                className="text-[#0f1416]"
              >
                <FiX size={20} />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Chat user list */}
      <div className="p-4 pt-10 space-y-4 flex flex-col overflow-y-auto h-[60vh]">
        {otherUsers?.map((user) => (
          <div
            key={user.id}
            onClick={() => dispatch(setSelectedUser(user))}
            className="flex items-center bg-white shadow-md rounded-full px-4 py-2 cursor-pointer hover:bg-gray-100 transition"
          >
            <img
              src={user.image || avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <span className="text-gray-800 font-medium">
              {user.name || user.userName}
            </span>
          </div>
        ))}
      </div>

      {/* Back button bottom-left */}
      <div className="p-4">
        <button className="bg-[#03A9F4] text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-[#0288D1] transition">
          <FiLogOut size={22} />
        </button>
      </div>
    </div>
  );
};

export default SideBar;
