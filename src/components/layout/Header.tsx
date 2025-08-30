// src/components/layout/Header.tsx
"use client";

import React from "react";
import Logo from "@/customComp/Logo";
import { Search, MessageSquare, Home, Plus, Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-16">
      <div className="flex items-center justify-between px-6 h-full">
        {/* Logo */}
        <div className="flex items-center">
          <Logo height={32} />
        </div>

        {/* Navigation Icons */}
        <div className="flex items-center space-x-8">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Home className="w-6 h-6 text-green-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <MessageSquare className="w-6 h-6 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Search className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Plus className="w-6 h-6 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-6 h-6 text-gray-600" />
          </button>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">V</span>
          </div>
        </div>
      </div>
    </header>
  );
}
