// src/components/layout/Header.tsx
"use client";

import React from "react";
import Logo from "@/customComp/Logo";
import { Search, MessageSquare, Home, Plus, Bell, Menu } from "lucide-react";

type HeaderProps = {
  onOpenSidebar?: () => void;
};

export default function Header({ onOpenSidebar }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-16">
      <div className="flex items-center justify-between px-4 md:px-6 h-full">
        {/* Left: Menu (mobile) + Logo */}
        <div className="flex items-center gap-2">
          <button
            aria-label="Open menu"
            onClick={onOpenSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
          <Logo height={32} />
        </div>

        {/* Center: Navigation icons with active indicator */}
        <nav className="hidden sm:flex items-center gap-6">
          <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 h-1 w-6 bg-green-600 rounded-full" />
            <Home className="w-6 h-6 text-green-600" />
          </button>
          <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <MessageSquare className="w-6 h-6 text-gray-600" />
          </button>
          <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <Search className="w-6 h-6 text-gray-600" />
          </button>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <Plus className="w-6 h-6 text-gray-700" />
          </button>
          <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <Bell className="w-6 h-6 text-gray-700" />
          </button>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">V</span>
          </div>
        </div>
      </div>
    </header>
  );
}
