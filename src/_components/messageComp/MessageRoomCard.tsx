"use client";

import React, { useEffect, useMemo, useState } from "react";
import { roomsRef } from "@/lib/firebaseConfig";
import { onSnapshot, Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import {
  IoChevronBack,
  IoSearch,
  IoCloseCircle,
  IoChatbubblesOutline,
  IoCheckmarkDone,
} from "react-icons/io5";
import { useGetUserApi } from "@/lib/hooks/useGetUserApi";
import useGetAllMessage from "@/lib/store/chatStore";

interface RoomData {
  id: string;
  roomId: string;
  participants: string[];
  participantNames?: { [userId: string]: string };
  lastMessage?: string;
  receiverName: string;
  lastMessageAt?: Timestamp;
  lastSenderId?: string;
  createdAt: Timestamp;
}

interface MessagePreview {
  id: string;
  roomId: string;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  isRead: boolean;
  otherUserId: string;
  lastMessageAt?: Timestamp;
}

const MessageRoomCard = () => {
  const router = useRouter();
  const getUserData = useGetUserApi();
  const currentUserId = getUserData.data?.data?.id;

  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const setChatMessages = useGetAllMessage((state) => state.setChatMessages);
  const chatMessages = useGetAllMessage((state) => state.chatMessages);
  console.log("Chat Messages from Store:", chatMessages);
  console.log("currentUserIdg", currentUserId);


  // Fetch rooms where current user is a participant
  useEffect(() => {
    if (!currentUserId) {
      console.warn("No current user ID available");
      setIsLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      roomsRef,
      (snapshot) => {
        const allRooms = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((room: any) => room.participants?.includes(currentUserId))
          .sort((a: any, b: any) => {
            const aTime = a.lastMessageAt?.toMillis() || 0;
            const bTime = b.lastMessageAt?.toMillis() || 0;
            return bTime - aTime;
          }) as RoomData[];

        setRooms(allRooms);
        setIsLoading(false);
        console.log("allRooms", allRooms);
      },
      (error) => {
        console.error("Error fetching rooms:", error);
        setIsLoading(false);
      }
    );
    console.log("unsubscribe", unsubscribe);

    return () => unsubscribe();
  }, [currentUserId]);

  // Transform rooms into message previews
  const messagesPreviews = useMemo<MessagePreview[]>(() => {
    if (!currentUserId) return [];

    return rooms.map((room) => {
      const otherUserId =
        room.participants?.find((id) => id !== currentUserId) || "";

      const formatTime = (timestamp?: Timestamp) => {
        if (!timestamp) return "";

        const date = timestamp.toDate();
        const now = new Date();
        const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

        if (diffInHours < 24) {
          return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });
        } else if (diffInHours < 48) {
          return "Yesterday";
        } else if (diffInHours < 168) {
          return date.toLocaleDateString("en-US", { weekday: "short" });
        } else {
          return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
        }
      };

      // Get the other person's name from participantNames or fallback to receiverName
      const otherPersonName = room.participantNames?.[otherUserId] || room.receiverName || "Unknown";

      return {
        id: room.id,
        roomId: room.roomId,
        name: otherPersonName,
        lastMessage: room.lastMessage || "No messages yet",
        time: formatTime(room.lastMessageAt),
        unreadCount: 0,
        isRead: room.lastSenderId === currentUserId,
        otherUserId,
        lastMessageAt: room.lastMessageAt,
      };
    });
  }, [rooms, currentUserId]);

  // Filter messages
  const filteredMessages = useMemo(() => {
    if (!searchQuery.trim()) return messagesPreviews;
    const query = searchQuery.toLowerCase();
    return messagesPreviews.filter(
      (msg) =>
        msg.name.toLowerCase().includes(query) ||
        msg.lastMessage.toLowerCase().includes(query)
    );
  }, [messagesPreviews, searchQuery]);

  const handleOpenChatRoom = (message: MessagePreview) => {
    router.push(`/message/chat-room`);
    console.log("Open chat room with:", message);
    
    // Get current user's name
    const currentUserName = getUserData?.data?.data?.full_name || "Unknown";
    
    // Pass the message with current user info
    setChatMessages({
      ...message,
      currentUserName,
      currentUserId,
      // Also set as seller for consistency with header display
      seller: {
        id: message.otherUserId,
        full_name: message.name,
      },
    });
  };

  // frequently chatted
  const frequentlyChattedRooms = useMemo(
    () => messagesPreviews.slice(0, 5),
    [messagesPreviews]
  );

  return (
    <div className="min-h-screen">
      {/* Header */}

      {/* Search bar */}
      <div className="px-4 py-3">
        <div className="flex items-center border border-green-700 rounded-full px-3 py-2">
          <IoSearch size={18} className="text-green-700" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chat here..."
            className="flex-1 ml-2 text-sm focus:outline-none"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")}>
              <IoCloseCircle size={18} className="text-gray-400" />
            </button>
          )}
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
          <div className="animate-spin h-6 w-6 border-2 border-green-700 border-t-transparent rounded-full mb-2" />
          <p>Loading conversations...</p>
        </div>
      )}

      {/* Empty */}
      {!isLoading && messagesPreviews.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <IoChatbubblesOutline size={48} />
          <p className="mt-2">No conversations yet</p>
          <p className="text-sm text-gray-400">
            Start chatting with sellers to see your messages here
          </p>
        </div>
      )}

      {/* Main content */}
      {!isLoading && messagesPreviews.length > 0 && (
        <div className="px-4">
          {/* Recent Chats */}
          {frequentlyChattedRooms.length > 0 && (
            <div className="mb-6">
              <h2 className="text-base font-semibold mb-2">Recent Chats</h2>
              <div className="flex space-x-4 overflow-x-auto pb-2">
                {frequentlyChattedRooms.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => handleOpenChatRoom(room)}
                    className="flex flex-col items-center"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gray-200 flex items-center justify-center relative">
                      <span className="text-green-700 font-semibold">
                        {room.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)}
                      </span>
                      {room.unreadCount > 0 && (
                        <span className="absolute bottom-1 right-1 w-3 h-3 bg-red-500 rounded-full border border-white" />
                      )}
                    </div>
                    <span className="mt-1 text-xs text-gray-700 truncate w-16 text-center">
                      {room.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* All Messages */}
          <div className="pb-10">
            <h2 className="text-base font-semibold mb-3">
              All Messages ({filteredMessages.length})
            </h2>
            {filteredMessages.map((message) => (
              <button
                key={message.id}
                onClick={() => handleOpenChatRoom(message)}
                className="w-full flex items-center justify-between border-b py-3 hover:bg-gray-50 transition"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-green-700 font-semibold">
                      {message.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900">
                      {message.name}
                    </p>
                    <p
                      className={`text-xs truncate ${
                        message.isRead
                          ? "text-gray-400"
                          : "text-green-700 font-semibold"
                      }`}
                    >
                      {message.isRead ? "You: " : ""}
                      {message.lastMessage}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 mb-1">{message.time}</p>
                  {message.unreadCount > 0 ? (
                    <span className="bg-green-700 text-white rounded-full text-xs px-2 py-0.5">
                      {message.unreadCount}
                    </span>
                  ) : message.isRead ? (
                    <IoCheckmarkDone size={16} className="text-green-700" />
                  ) : null}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageRoomCard;
