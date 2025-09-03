"use client";
import React from "react";
import Image from "next/image";
import {
  Bell,
  Home,
  MessageCircle,
  Search,
  Plus,
  CheckCircle,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";

export const Header: React.FC = () => {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200/70">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="h-14  flex ">
          {/* Center - Navigation Icons */}
          {/* Center - Navigation Icons */}
          <div className="flex flex-4 items-center justify-center">
            <div className="flex items-center gap-10">
              <button
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Home"
                onClick={()=>{
                  router.push("/dashboard")
                }}
              >
                <Home className="h-5 w-5 text-gray-600" />
              </button>
              <button
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Messages"
              >
                <MessageCircle className="h-5 w-5 text-gray-600" />
              </button>
              <button
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5 text-gray-600" />
              </button>
              <button
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="User"
                onClick={()=>{
                  router.push("/profile");
                }}
              >
                <User className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Right side - Action buttons and profile */}
          <div className="flex flex-1  items-center gap-3">
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Add"
            >
              <Plus className="h-5 w-5 text-gray-600" />
            </button>
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Verified"
            >
              <CheckCircle className="h-5 w-5 text-green-600" />
            </button>
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5 text-gray-600" />
            </button>

            {/* Profile Avatar */}
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center overflow-hidden">
              <img
                src="/api/placeholder/32/32"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
