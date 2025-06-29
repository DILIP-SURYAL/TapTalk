import React, { useContext, useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiSend, FiSmile, FiImage } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import avatar from "../assets/avatar.png";
import { setOnlineUsers, setSelectedUser, setSocket } from "../redux/userSlice";
import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";
import axios from "axios";
import { API_END_POINT } from "../constant.js";
import { FcProcess } from "react-icons/fc";
import { RxCross1 } from "react-icons/rx";
import { setMessages } from "../redux/messageSlice.js";
import { io } from "socket.io-client";
import { SocketContext } from "../socket/socket.js";

const MessageArea = () => {
  const dispatch = useDispatch();
  const { selectedUser, userData } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.message);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef(messages);
  const socket = useContext(SocketContext);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    socket.on("newMessage", (mess) => {
      dispatch(setMessages([...messagesRef.current, mess]));
    });
  });

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackendImage(file);
      setImageFile(file);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim() && !backendImage) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("message", message);
      if (backendImage) {
        formData.append("image", backendImage);
      }

      const result = await axios.post(
        `${API_END_POINT}/api/message/send/${selectedUser._id}`,
        formData,
        { withCredentials: true }
      );

      dispatch(setMessages([...messages, result.data]));
      setMessage("");
      setBackendImage(null);
      setImageFile(null);
    } catch (err) {
      console.log("Message not sent", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[75%] h-full bg-gray-100 flex flex-col justify-between">
      {!selectedUser ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
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
          {/* Chat Header */}
          <div className="bg-[#328cb6] rounded-bl-3xl rounded-br-3xl p-4 flex items-center shadow">
            <button className="text-white mr-3">
              <FiArrowLeft
                size={20}
                onClick={() => dispatch(setSelectedUser(null))}
              />
            </button>
            <img
              src={selectedUser.image || avatar}
              alt={selectedUser.name}
              className="w-10 h-10 rounded-full mr-3 border-2 border-white"
            />
            <h2 className="text-white text-lg font-semibold">
              {selectedUser.name || selectedUser.userName || "User"}
            </h2>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, idx) => (
              <div key={idx} className="mb-4">
                {msg.sender === selectedUser._id ? (
                  <ReceiverMessage image={msg.image} text={msg.message} />
                ) : (
                  <SenderMessage image={msg.image} text={msg.message} />
                )}
              </div>
            ))}

            {/* Image Preview */}
            {imageFile && (
              <div className="fixed bottom-24 right-10 mt-2 z-20 bg-white p-2 rounded-lg shadow">
                <RxCross1
                  className="cursor-pointer absolute top-1 right-1 text-red-500"
                  onClick={() => {
                    setBackendImage(null);
                    setImageFile(null);
                  }}
                />
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                  className="w-32 h-32 rounded-lg object-cover border"
                />
              </div>
            )}
          </div>

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="absolute bottom-24 left-10 z-10">
              <EmojiPicker
                height={400}
                width={300}
                onEmojiClick={handleEmojiClick}
              />
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 bg-gray-100 flex items-center gap-2 relative">
            <button
              className="text-gray-500"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            >
              <FiSmile size={24} />
            </button>

            <label className="text-gray-500 cursor-pointer">
              <FiImage size={24} />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
            </label>

            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
              className="flex-1 p-3 rounded-full outline-none border border-gray-300 shadow-sm"
            />

            <button
              type="submit"
              disabled={loading}
              onClick={handleSend}
              className="ml-2 bg-[#328cb6] text-white p-3 rounded-full shadow-md hover:bg-[#0288D1] transition"
            >
              {!loading ? <FiSend size={20} /> : <FcProcess size={20} />}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MessageArea;
