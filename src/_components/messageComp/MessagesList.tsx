"use client";

import React from "react";
import MessageItem from "./MessageItem";

interface MessagesListProps {
  messages: {
    senderId: string;
    text: string;
  }[];
  currentUserId: string;
}

const MessagesList: React.FC<MessagesListProps> = ({
  messages,
  currentUserId,
}) => {
  return (
    <div className="flex flex-col overflow-y-auto h-full py-3 px-2 space-y-2">
      {messages && messages.length > 0 ? (
        messages.map((message, index) => (
          <MessageItem
            key={index}
            message={message}
            currentUserId={currentUserId}
          />
        ))
      ) : (
        <div className="text-center text-gray-500 py-6">No messages yet</div>
      )}
    </div>
  );
};

export default MessagesList;
