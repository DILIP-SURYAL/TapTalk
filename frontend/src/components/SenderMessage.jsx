import React from "react";
import { useEffect } from "react";
import { useRef } from "react";

const SenderMessage = ({ text, image }) => {
  let scroll = useRef();
  useEffect(() => {
    scroll?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [text, image]);
  if (text === "" && !image) return;
  return (
    <div className="flex justify-end mb-3" ref={scroll}>
      <div className="max-w-xs px-4 py-2 bg-[#328cb6] text-white rounded-2xl rounded-br-none shadow-md">
        {/* Show image if available */}
        {image && (
          <img
            src={image}
            alt="sent"
            className="mb-2 rounded-md max-w-[200px] max-h-[200px] object-cover"
          />
        )}

        {/* Show message text if exists */}
        {text && <p className="whitespace-pre-line break-words">{text}</p>}
      </div>
    </div>
  );
};

export default SenderMessage;
