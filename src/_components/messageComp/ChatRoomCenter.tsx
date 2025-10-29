"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { useForm } from "react-hook-form";
import { IoSend, IoChevronBack, IoEllipsisVertical } from "react-icons/io5";
import { db } from "@/lib/firebaseConfig";
import MessagesList from "@/_components/messageComp/MessagesList";
import { getRoomId } from "@/utils/getRoomId";
import useGetAllMessage from "@/lib/store/chatStore";
import { useGetUserApi } from "@/lib/hooks/useGetUserApi";

interface Message {
  id: string;
  text: string;
  senderId: string;
  receiverId: string;
  receiverName?: string;
  createdAt: Timestamp;
  readStatus?: boolean;
}

interface FormData {
  text: string;
}

const ChatRoomCenter = () => {
  const router = useRouter();
  const params = useSearchParams();

  const getUserData = useGetUserApi();

  const [messages, setMessages] = useState<Message[]>([]);
  const [isRoomReady, setIsRoomReady] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  interface ChatMessagesState {
    otherUserId?: string;
    seller?: { id?: string; full_name?: string };
    name?: string;
    currentUserName?: string;
    currentUserId?: string;
  }

  const chatMessages = useGetAllMessage((state) => state.chatMessages) as
    | ChatMessagesState
    | undefined
    | null
    | { otherUserId?: string; name?: string; seller?: { id?: string; full_name?: string }; currentUserName?: string; currentUserId?: string };
  console.log("Chat Messages from Store:", chatMessages);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { text: "" },
  });

  // Mock current user (replace with auth session)
  const currentUserId = getUserData.data?.data?.id;

  const sellerUserId = chatMessages?.otherUserId || chatMessages?.seller?.id;
  const sellerUserName = 
    chatMessages?.seller?.full_name || 
    chatMessages?.name || 
    "Unknown User";

 

  useEffect(() => {
    if (!currentUserId || !sellerUserId) return;

    createRoomIfNotExists();

    const roomId = getRoomId(currentUserId, sellerUserId);
    const docRef = doc(db, "rooms", roomId);
    const messageRef = collection(docRef, "messages");
    const q = query(messageRef, orderBy("createdAt", "asc"));
    
    const unsub = onSnapshot(q, (snapshot) => {
      const allMessages: Message[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as Message));
      setMessages(allMessages);
      console.log(allMessages, "testing");
      
      // Update room with latest message info if messages exist
      if (allMessages.length > 0) {
        const latestMessage = allMessages[allMessages.length - 1];
        const currentUserName = chatMessages?.currentUserName || getUserData.data?.data?.full_name || "Unknown";
        
        setDoc(docRef, {
          lastMessage: latestMessage.text,
          lastMessageAt: latestMessage.createdAt,
          lastSenderId: latestMessage.senderId,
          participantNames: {
            [currentUserId]: currentUserName,
            [sellerUserId]: sellerUserName,
          },
        }, { merge: true });
      }
    });

    return unsub;
  }, [currentUserId, sellerUserId]);

  const createRoomIfNotExists = async () => {
    if (!currentUserId || !sellerUserId || !sellerUserName) return;
    
    // Get names from store if available, otherwise from user data
    const currentUserName = chatMessages?.currentUserName || getUserData.data?.data?.full_name || "Unknown";
    
    const roomId = getRoomId(currentUserId, sellerUserId);
    console.log("Room ID:", roomId);

    const roomData = {
      roomId,
      participants: [currentUserId, sellerUserId],
      receiverName: sellerUserName, // Keep for backward compatibility
      participantNames: {
        [currentUserId]: currentUserName,
        [sellerUserId]: sellerUserName,
      },
      createdAt: Timestamp.fromDate(new Date()),
      lastMessage: "",
      lastMessageAt: Timestamp.fromDate(new Date()),
    };

    // Use setDoc with merge to not overwrite existing data
    await setDoc(doc(db, "rooms", roomId), roomData, { merge: true });
  };



  const handleMessages = async (data: any) => {
    if (!currentUserId || !sellerUserId) return;
    
    try {
      const currentUserName = chatMessages?.currentUserName || getUserData.data?.data?.full_name || "Unknown";
      
      const roomId = getRoomId(currentUserId, sellerUserId);
      const docRef = doc(db, "rooms", roomId);
      const messageRef = collection(docRef, "messages");
      
      await addDoc(messageRef, {
        text: data.text,
        senderId: currentUserId,
        receiverName: sellerUserName,
        receiverId: sellerUserId,
        timestamp: Timestamp.fromDate(new Date()),
        createdAt: Timestamp.fromDate(new Date()),
      });
      
      // Update room with last message info and both participant names
      await setDoc(docRef, {
        lastMessage: data.text,
        lastMessageAt: Timestamp.fromDate(new Date()),
        lastSenderId: currentUserId,
        participants: [currentUserId, sellerUserId],
        receiverName: sellerUserName,
        participantNames: {
          [currentUserId]: currentUserName,
          [sellerUserId]: sellerUserName,
        },
      }, { merge: true });
      
      // console.log("Message sent with ID: ", newDoc.id);
      // Clear the input after successful send
      reset();
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 sticky top-0 bg-white z-10">
        <button
          onClick={() => router.back()}
          className="p-1 hover:scale-105 transition"
        >
          <IoChevronBack size={24} className="text-green-700" />
        </button>

        <div className="flex flex-col items-center text-center">
          <h2 className="text-lg font-semibold text-green-700 truncate max-w-[200px] sm:max-w-xs">
            {chatMessages?.seller?.full_name ||
              chatMessages?.name ||
              "Unknown User"}
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm">Last seen recently</p>
        </div>

        <button className="p-1 hover:scale-105 transition">
          <IoEllipsisVertical size={22} className="text-green-700" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-50 px-2 sm:px-4 py-3">
        <MessagesList messages={messages} currentUserId={currentUserId} />
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form
        onSubmit={handleSubmit(handleMessages)}
        className="border-t border-gray-200 bg-white px-3 sm:px-4 py-3 sticky bottom-0"
      >
        <div className="flex items-center gap-2 bg-gray-100 rounded-2xl px-3 py-2 shadow-sm">
          <input
            {...register("text", {
              required: "Message is required",
              validate: (v) => v.trim().length > 0 || "Message cannot be empty",
            })}
            placeholder="Type message..."
            className="flex-1 bg-transparent focus:outline-none text-gray-700 text-sm sm:text-base resize-none"
            // disabled={!isRoomReady || isSending}
          />
          <button
            type="submit"
            // disabled={!isRoomReady || isSending}
            // className={`p-2 rounded-full transition  ${
            //   isSending || !isRoomReady
            //     ? "text-gray-400 cursor-not-allowed"
            //     : "text-green-700 hover:scale-110"
            // }`}
            className={`p-2 rounded-full transition text-green-700 hover:scale-110 
            }`}
          >
            <IoSend size={20} />
          </button>
        </div>

        {errors.text && (
          <p className="text-red-500 text-xs mt-1 ml-2">
            {errors.text.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default ChatRoomCenter;
