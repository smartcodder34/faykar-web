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
import logo from "@/assets/images/logo.png";

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200/70">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="h-14 flex items-center justify-between">
          {/* Left side - Logo */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 overflow-hidden rounded">
              <Image
                src={logo}
                alt="Faykar"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="hidden sm:block font-semibold tracking-wide">
              FAYKAR
            </span>
          </div>

          {/* Center - Navigation Icons */}
          <div className="flex items-center gap-6">
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Home"
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
            >
              <User className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Right side - Action buttons and profile */}
          <div className="flex items-center gap-3">
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
