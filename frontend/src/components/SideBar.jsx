import React, { useEffect, useState, useCallback } from "react";
import { FiSearch, FiLogOut, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  setOtherUsers,
  setSelectedUser,
  setUserData,
} from "../redux/userSlice";
import avatar from "../assets/avatar.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_END_POINT } from "../constant";
import { setMessages } from "../redux/messageSlice";

const SideBar = () => {
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData, otherUsers, onlineUsers } = useSelector(
    (state) => state.user
  );

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${API_END_POINT}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(setUserData(null));
      dispatch(setSelectedUser(null));
      dispatch(setMessages([]));
      dispatch(setOtherUsers(null));
      console.log("Logout successful:", response.data);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      navigate("/login");
    }
  };

  const handleSearch = useCallback(async () => {
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.get(
        `${API_END_POINT}/api/user/search?query=${query}`,
        { withCredentials: true }
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Search failed:", error);
    }
  }, [query]);

  useEffect(() => {
    const delay = setTimeout(() => {
      handleSearch();
    }, 300); // debounce

    return () => clearTimeout(delay); // cleanup
  }, [query, handleSearch]);

  const resetSearch = () => {
    setSearch(false);
    setQuery("");
    setSearchResults([]);
  };

  const usersToShow = query.trim() !== "" ? searchResults : otherUsers;

  return (
    <div className="w-[25%] h-full flex flex-col justify-between bg-gray-200">
      {/* Header */}
      <div className="bg-[#03A9F4] rounded-br-4xl rounded-bl-4xl pt-40 pb-10 p-4 shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-white text-lg font-bold">chatly</h2>
            <h1 className="text-white text-xl font-semibold mt-1">
              Hii, {userData.name || userData.userName || "User"}
            </h1>
          </div>
          <img
            onClick={() => navigate("/profile")}
            src={userData.image || avatar}
            alt="profile"
            className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
          />
        </div>

        {/* Online users + search toggle */}
        <div className="mt-5">
          {!search ? (
            <div className="flex items-center gap-3">
              <div
                className="bg-white text-[#03A9F4] p-2 rounded-full cursor-pointer shadow"
                onClick={() => setSearch(true)}
              >
                <FiSearch size={20} />
              </div>
              {otherUsers
                ?.filter((user) => onlineUsers.includes(user._id))
                .map((user) => (
                  <div
                    key={user._id}
                    className="relative cursor-pointer"
                    onClick={() => {
                      dispatch(setSelectedUser(user));
                      dispatch(setMessages([]));
                    }}
                  >
                    <img
                      src={user.image || avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full shadow-md border-2 border-white"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>
                ))}
            </div>
          ) : (
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
                type="button"
                onClick={resetSearch}
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
        {usersToShow?.map((user) => (
          <div
            key={user._id}
            onClick={() => {
              dispatch(setSelectedUser(user));
              dispatch(setMessages([]));
              resetSearch();
            }}
            className="flex items-center bg-white shadow-md rounded-full px-4 py-2 cursor-pointer hover:bg-gray-100 transition"
          >
            <div className="relative mr-3">
              <img
                src={user.image || avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              )}
            </div>
            <span className="text-gray-800 font-medium">
              {user.name || user.userName || "Unknown"}
            </span>
          </div>
        ))}
      </div>

      {/* Logout */}
      <div className="p-4">
        <button className="bg-[#03A9F4] text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-[#0288D1] transition">
          <FiLogOut onClick={handleLogout} size={22} />
        </button>
      </div>
    </div>
  );
};

export default SideBar;
