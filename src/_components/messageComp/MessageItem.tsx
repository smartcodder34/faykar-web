"use client";

import React from "react";

interface MessageItemProps {
  message: {
    senderId: string;
    text: string;
  };
  currentUserId: string;
}

const MessageItem: React.FC<MessageItemProps> = ({
  message,
  currentUserId,
}) => {
  const isCurrentUser = message.senderId === currentUserId;
  console.log("Rendering MessageItem:", message);

  return (
    <div
      className={`flex mb-2 px-2 ${
        isCurrentUser ? "justify-end mr-3" : "justify-start ml-3"
      }`}
    >
      <div
        className={`max-w-[70%] p-3 rounded-2xl border border-neutral-200 ${
          isCurrentUser ? "bg-white text-gray-900" : "bg-green-700 text-white"
        }`}
      >
        <p className="text-sm sm:text-base break-words">{message.text}</p>
      </div>
    </div>
  );
};

export default MessageItem;
