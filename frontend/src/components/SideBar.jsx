import { useEffect, useState, useCallback } from "react";
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

const SideBar = ({ onClose }) => {
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
      await axios.post(
        `${API_END_POINT}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(setUserData(null));
      dispatch(setSelectedUser(null));
      dispatch(setMessages([]));
      dispatch(setOtherUsers(null));
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSearch = useCallback(async () => {
    if (query.trim() === "") return setSearchResults([]);
    try {
      const res = await axios.get(
        `${API_END_POINT}/api/user/search?query=${query}`,
        { withCredentials: true }
      );
      setSearchResults(res.data);
    } catch (err) {
      console.error("Search failed:", err);
    }
  }, [query]);

  useEffect(() => {
    const delay = setTimeout(() => handleSearch(), 300);
    return () => clearTimeout(delay);
  }, [query, handleSearch]);

  const resetSearch = () => {
    setSearch(false);
    setQuery("");
    setSearchResults([]);
  };

  const handleUserSelect = (user) => {
    dispatch(setSelectedUser(user));
    dispatch(setMessages([]));
    resetSearch();
    if (window.innerWidth < 1024) {
      onClose?.();
    }
  };

  const usersToShow = query.trim() ? searchResults : otherUsers;

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      {/* Header */}
      <div className="bg-blue-500 pt-8 lg:pt-16 pb-6 px-4 text-white rounded-none lg:rounded-b-2xl shadow">
        {/* Close Button */}
        <div className="flex justify-between items-center mb-4 lg:hidden">
          <div></div>
          <button onClick={onClose} className="hover:text-white">
            <FiX size={24} />
          </button>
        </div>

        {/* Profile Info */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold">chatly</h2>
            <p className="text-sm lg:text-base mt-1">
              Hi, {userData?.name || userData?.userName || "User"}
            </p>
          </div>
          <img
            src={userData?.image || avatar}
            alt="profile"
            onClick={() => navigate("/profile")}
            className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border-2 border-white cursor-pointer hover:border-4 transition-all"
          />
        </div>

        {/* Search or Online Users */}
        {!search ? (
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <button
              onClick={() => setSearch(true)}
              className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition"
            >
              <FiSearch size={20} />
            </button>
            <div className="flex gap-3">
              {otherUsers
                ?.filter((user) => onlineUsers?.includes(user._id))
                .slice(0, 6)
                .map((user) => (
                  <div
                    key={user._id}
                    className="relative cursor-pointer hover:scale-105 transition"
                    onClick={() => handleUserSelect(user)}
                  >
                    <img
                      src={user.image || avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full border-2 border-white"
                    />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full" />
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-3 bg-white/20 rounded-full px-4 py-2"
          >
            <FiSearch size={20} className="text-white" />
            <input
              type="text"
              placeholder="Search users..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-white/70 outline-none text-sm"
              autoFocus
            />
            <button
              onClick={resetSearch}
              className="text-white hover:text-red-300"
            >
              <FiX size={20} />
            </button>
          </form>
        )}
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {usersToShow?.length > 0 ? (
          usersToShow.map((user) => (
            <div
              key={user._id}
              onClick={() => handleUserSelect(user)}
              className="flex items-center gap-4 p-3 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition"
            >
              <div className="relative">
                <img
                  src={user.image || avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full"
                />
                {onlineUsers?.includes(user._id) && (
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800 truncate">
                  {user.name || user.userName || "Unknown"}
                </p>
                {onlineUsers?.includes(user._id) && (
                  <span className="text-green-600 text-sm">Online</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-8 text-sm">
            {query.trim() ? "No users found" : "No users available"}
          </p>
        )}
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition"
        >
          <FiLogOut size={20} />
        </button>
      </div>
    </div>
  );
};

export default SideBar;
