"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Bell,
  Home,
  MessageCircle,
  Search,
  Plus,
  User,
  Menu,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Logo from "@/customComp/Logo";
import profileImg from "@/assets/images/profile.jpg";

export const Header: React.FC = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200/70">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <div className="h-14 flex items-center justify-between">
            {/* Left - Mobile Menu Button + FAYKAR Logo */}
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Toggle mobile menu"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5 text-gray-600" />
                ) : (
                  <Menu className="h-5 w-5 text-gray-600" />
                )}
              </button>
              <Logo height={24} />
            </div>

            {/* Center - Navigation Icons (Hidden on mobile) */}
            <div className="hidden lg:flex items-center gap-8">
              <button
                className="flex flex-col items-center gap-1 p-2 hover:bg-gray-100 transition-colors relative"
                aria-label="Home"
                onClick={() => {
                  router.push("/dashboard");
                }}
              >
                <Home className="h-5 w-5 text-green-600" />
                <div className="w-6 h-0.5 bg-green-600 rounded-full"></div>
              </button>
              <button
                className="flex flex-col items-center gap-1 p-2 hover:bg-gray-100 transition-colors"
                aria-label="Messages"
                onClick={() => {
                  router.push("/message");
                }}
              >
                <MessageCircle className="h-5 w-5 text-gray-600" />
              </button>
              <button
                className="flex flex-col items-center gap-1 p-2 hover:bg-gray-100 transition-colors"
                aria-label="Search"
                onClick={() => {
                  router.push("/search");
                }}
              >
                <Search className="h-5 w-5 text-gray-600" />
              </button>
              <button
                className="flex flex-col items-center gap-1 p-2 hover:bg-gray-100 transition-colors"
                aria-label="User"
                onClick={() => {
                  router.push("/profile");
                }}
              >
                <User className="h-5 w-5 text-gray-600" />
              </button>
              <button
                className="flex flex-col items-center gap-1 p-2 hover:bg-gray-100 transition-colors"
                aria-label="Add"
              >
                <Plus className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Right side - Action buttons and profile */}
            <div className="flex items-center gap-3">
              <button
                className="hidden sm:block p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Messages"
              >
                <MessageCircle className="h-5 w-5 text-gray-600" />
              </button>
              <button
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5 text-gray-600" />
              </button>

              {/* Profile Avatar */}
              <div className="h-8 w-8 rounded-full overflow-hidden">
                <Image
                  src={profileImg}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="p-5">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between mb-6">
                <Logo height={24} />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* Mobile Navigation Items */}
              <div className="space-y-2">
                <button
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
                  onClick={() => {
                    router.push("/dashboard");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Home className="h-5 w-5 text-green-600" />
                  <span className="text-green-600 font-medium">Home</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-left">
                  <MessageCircle className="h-5 w-5 text-gray-600" />
                  <span>Messages</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-left">
                  <Search className="h-5 w-5 text-gray-600" />
                  <span>Search</span>
                </button>
                <button
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
                  onClick={() => {
                    router.push("/profile");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <User className="h-5 w-5 text-gray-600" />
                  <span>Profile</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-left">
                  <Plus className="h-5 w-5 text-gray-600" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
