import React from "react";
import { FiArrowLeft, FiSend } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../assets/avatar.png";
import { setSelectedUser } from "../redux/userSlice";

const messages = [
  { id: 1, text: "hii", sender: "me" },
  // Add more messages here
];

const MessageArea = () => {
  const { selectedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div className="w-[75%] h-full bg-gray-100 flex flex-col justify-between">
      {/* If no user is selected */}
      {!selectedUser ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png" // You can use any illustration or emoji
            alt="Welcome"
            className="w-32 h-32 mb-6 opacity-80"
          />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Welcome to Chatly 👋
          </h2>
          <p className="text-gray-500">
            Select a user from the left panel to start chatting.
          </p>
        </div>
      ) : (
        <>
          {/* Chat header */}
          <div className="bg-[#328cb6] rounded-bl-3xl rounded-br-3xl p-4 flex items-center shadow">
            <button className="text-white mr-3">
              <FiArrowLeft
                size={20}
                onClick={() => dispatch(setSelectedUser(null))}
              />
            </button>
            <img
              src={selectedUser?.image || avatar}
              alt={selectedUser?.name}
              className="w-10 h-10 rounded-full mr-3 border-2 border-white"
            />
            <h2 className="text-white text-lg font-semibold">
              {selectedUser?.name || selectedUser.userName || "User"}
            </h2>
          </div>

          {/* Messages area */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "me" ? "justify-end" : "justify-start"
                } mb-3`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl shadow-md ${
                    msg.sender === "me"
                      ? "bg-[#328cb6] text-white rounded-br-none"
                      : "bg-white text-black rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Message input */}
          <div className="p-4 bg-gray-100 flex items-center">
            <input
              type="text"
              placeholder="Message"
              className="flex-1 p-3 rounded-full outline-none border border-gray-300 shadow-sm"
            />
            <button className="ml-3 bg-[#328cb6] text-white p-3 rounded-full shadow-md hover:bg-[#0288D1] transition">
              <FiSend size={20} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MessageArea;
