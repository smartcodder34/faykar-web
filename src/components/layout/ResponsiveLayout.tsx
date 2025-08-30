// src/components/layout/ResponsiveLayout.tsx
"use client";

import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
import { Menu, X } from "lucide-react";

type ResponsiveLayoutProps = {
  children: React.ReactNode;
};

export default function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-20 left-4 z-40 lg:hidden bg-white p-2 rounded-lg shadow-md"
      >
        <Menu className="w-5 h-5" />
      </button>

      <div className="flex pt-16">
        {/* Sidebar */}
        <div
          className={`
          fixed lg:static inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        >
          <Sidebar />
          {/* Mobile overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </div>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 lg:mr-80 px-4 lg:px-6 py-6">
          <div className="max-w-4xl mx-auto">{children}</div>
        </main>

        {/* Right Sidebar */}
        <div className="hidden lg:block">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
