import React, { useEffect, useRef } from "react";
import avatar from "../assets/avatar.png";

const ReceiverMessage = ({ text, image, userImage }) => {
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
      className="flex items-end gap-2 justify-start mb-3 px-2 sm:px-4"
    >
      {/* Avatar */}
      <img
        src={userImage || avatar}
        alt="sender avatar"
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white shadow"
      />

      {/* Message bubble */}
      <div className="max-w-[70%] sm:max-w-[60%] px-4 py-2 bg-white text-black rounded-2xl rounded-bl-none shadow-md break-words">
        {image && (
          <img
            src={image}
            alt="received"
            className="mb-2 rounded-md w-full max-w-[180px] sm:max-w-[220px] max-h-[220px] object-cover"
          />
        )}
        {text && <p className="whitespace-pre-line">{text}</p>}
      </div>
    </div>
  );
};

export default ReceiverMessage;
