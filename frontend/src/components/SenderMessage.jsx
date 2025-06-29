import React, { useEffect, useRef } from "react";
import avatar from "../assets/avatar.png"; // Default avatar

const SenderMessage = ({ text, image, userImage }) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [text, image]);

  if (!text && !image) return null;

  return (
    <div
      ref={scrollRef}
      className="flex justify-end items-end gap-2 mb-3 px-2 sm:px-4"
    >
      {/* Message bubble */}
      <div className="max-w-[70%] sm:max-w-[60%] px-4 py-2 bg-[#328cb6] text-white rounded-2xl rounded-br-none shadow-md break-words">
        {image && (
          <img
            src={image}
            alt="sent"
            className="mb-2 rounded-md w-full max-w-[180px] sm:max-w-[220px] max-h-[220px] object-cover"
          />
        )}
        {text && <p className="whitespace-pre-line">{text}</p>}
      </div>

      {/* Sender Avatar */}
      <img
        src={userImage || avatar}
        alt="sender avatar"
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white shadow"
      />
    </div>
  );
};

export default SenderMessage;
