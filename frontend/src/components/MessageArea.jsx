"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiSend, FiSmile, FiImage, FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import avatar from "../assets/avatar.png";
import { setSelectedUser } from "../redux/userSlice";
import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";
import axios from "axios";
import { API_END_POINT } from "../constant.js";
import { FcProcess } from "react-icons/fc";
import { RxCross1 } from "react-icons/rx";
import { setMessages } from "../redux/messageSlice.js";
import { SocketContext } from "../socket/socket.js";

const MessageArea = ({ onOpenSidebar }) => {
  const dispatch = useDispatch();
  const { selectedUser, userData } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.message);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef(messages);
  const messagesEndRef = useRef(null);
  const socket = useContext(SocketContext);

  // Keep ref up to date
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Socket listener
  useEffect(() => {
    const handleNew = (m) => dispatch(setMessages([...messagesRef.current, m]));
    socket.on("newMessage", handleNew);
    return () => socket.off("newMessage", handleNew);
  }, [socket, dispatch]);

  // Emoji picker handler
  const handleEmojiClick = ({ emoji }) => {
    setMessage((m) => m + emoji);
    setShowEmojiPicker(false);
  };

  // Image selection handler
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackendImage(file);
      setImageFile(file);
    }
  };

  // Send message handler
  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim() && !backendImage) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("message", message);
      if (backendImage) formData.append("image", backendImage);

      const res = await axios.post(
        `${API_END_POINT}/api/message/send/${selectedUser._id}`,
        formData,
        {
          withCredentials: true,
        }
      );

      dispatch(setMessages([...messages, res.data]));
      setMessage("");
      setBackendImage(null);
      setImageFile(null);
      setShowEmojiPicker(false);
    } catch (err) {
      console.error("Message not sent", err);
    } finally {
      setLoading(false);
    }
  };

  // No user selected
  if (!selectedUser) {
    return (
      <div className="flex flex-col h-full bg-gray-50">
        {/* Mobile header */}
        <div className="lg:hidden bg-white border-b p-4 flex items-center shadow-sm">
          <button
            onClick={onOpenSidebar}
            className="text-gray-600 p-2 -ml-2 rounded-lg hover:bg-gray-100 transition"
          >
            <FiMenu size={24} />
          </button>
          <h1 className="ml-3 text-lg font-semibold">Taptalk</h1>
        </div>

        {/* Welcome content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
              alt="Welcome"
              className="w-24 h-24 sm:w-32 sm:h-32 mx-auto opacity-60 mb-6"
            />
            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              Welcome to Taptalk 👋
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              Select a user from the sidebar to start chatting.
            </p>
            <button
              onClick={onOpenSidebar}
              className="lg:hidden mt-6 bg-[#03A9F4] text-white px-6 py-3 rounded-full font-medium hover:bg-[#0288D1] transition"
            >
              Browse Users
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#03A9F4] to-[#0288D1] p-4 flex items-center shadow-lg shrink-0 z-10">
        {/* Back on mobile */}
        <button
          className="text-white mr-3 lg:hidden p-2 rounded-lg hover:bg-white/10 transition"
          onClick={() => dispatch(setSelectedUser(null))}
        >
          <FiArrowLeft size={20} />
        </button>

        {/* Sidebar toggle on tablet */}
        <button
          onClick={onOpenSidebar}
          className="text-white mr-2 hidden lg:block xl:hidden p-2 rounded-lg hover:bg-white/10 transition"
        >
          <FiMenu size={20} />
        </button>

        {/* Avatar & Name */}
        <img
          src={selectedUser.image || avatar}
          alt={selectedUser.name}
          className="w-10 h-10 rounded-full mr-3 border-2 border-white/30 shadow-md"
        />

        <div className="flex-1 min-w-0">
          <h2 className="text-white text-base lg:text-lg font-semibold truncate">
            {selectedUser.name || selectedUser.userName}
          </h2>
        </div>
      </div>

      {/* Messages List */}
      <div
        className="overflow-y-auto bg-gray-50 p-4"
        style={{
          height: "calc(100vh - 64px - 90px)", // viewport height - header - input
          minHeight: "calc(100vh - 64px - 90px)",
          maxHeight: "calc(100vh - 64px - 90px)",
        }}
      >
        {messages.length ? (
          messages.map((msg, i) => (
            <div key={i} className="mb-4">
              {msg.sender === selectedUser._id ? (
                <ReceiverMessage
                  userImage={selectedUser.image}
                  image={msg.image}
                  text={msg.message}
                />
              ) : (
                <SenderMessage
                  userImage={userData.image}
                  image={msg.image}
                  text={msg.message}
                />
              )}
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full min-h-[200px]">
            <p className="text-gray-500">No messages yet. Say hello!</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Image Preview */}
      {imageFile && (
        <div className="fixed bottom-24 right-4 bg-white p-3 rounded-xl shadow-xl z-30 border">
          <button
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            onClick={() => {
              setBackendImage(null);
              setImageFile(null);
            }}
          >
            <RxCross1 size={12} />
          </button>
          <img
            src={URL.createObjectURL(imageFile) || "/placeholder.svg"}
            alt="Preview"
            className="w-24 h-24 lg:w-32 lg:h-32 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowEmojiPicker(false)}
          />
          <div className="absolute bottom-20 left-4 z-50 shadow-2xl rounded-lg overflow-hidden">
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              width={280}
              height={350}
            />
          </div>
        </>
      )}

      {/* Input Area - Fixed with proper space allocation */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 z-20">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          {/* Emoji Button */}
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition flex-shrink-0"
            onClick={() => setShowEmojiPicker((v) => !v)}
          >
            <FiSmile size={20} />
          </button>

          {/* Image Upload Button */}
          <label className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition cursor-pointer flex-shrink-0">
            <FiImage size={20} />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </label>

          {/* Text Input - with proper constraints */}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message…"
            className="flex-1 min-w-0 px-4 py-2.5 rounded-full border border-gray-300 focus:border-[#03A9F4] focus:ring-1 focus:ring-[#03A9F4] outline-none bg-white text-base"
            disabled={loading}
            style={{ fontSize: "16px" }} // Prevents zoom on iOS
          />

          {/* Send Button - always visible */}
          <button
            type="submit"
            disabled={loading || (!message.trim() && !backendImage)}
            className="bg-[#03A9F4] text-white p-2.5 rounded-full shadow-lg hover:bg-[#0288D1] disabled:opacity-50 disabled:cursor-not-allowed transition flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            {loading ? (
              <FcProcess size={18} className="animate-spin" />
            ) : (
              <FiSend size={18} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageArea;
