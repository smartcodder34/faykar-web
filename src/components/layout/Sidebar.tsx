// src/components/layout/Sidebar.tsx
"use client";

import React from "react";
import {
  Search,
  Home,
  Bell,
  MessageSquare,
  Users,
  Globe,
  HelpCircle,
  Info,
} from "lucide-react";
import CustomInput from "@/customComp/CustomInput";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-16 w-64 h-full bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* User Profile Section */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-medium">VK</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Virat Kohli</h3>
          </div>
        </div>

        {/* Search */}
        <CustomInput
          placeholder="Search"
          leftIcon={<Search className="w-4 h-4 text-gray-400" />}
        />

        {/* Navigation Menu */}
        <nav className="space-y-2">
          <SidebarItem
            icon={<Home className="w-5 h-5" />}
            label="Home"
            active
          />
          <SidebarItem
            icon={<Bell className="w-5 h-5" />}
            label="Notifications"
          />
          <SidebarItem
            icon={<MessageSquare className="w-5 h-5" />}
            label="Messages"
          />
          <SidebarItem
            icon={<Users className="w-5 h-5" />}
            label="Friends"
            badge="1000+"
          />
          <SidebarItem icon={<Globe className="w-5 h-5" />} label="Languages" />
        </nav>

        {/* Bottom Section */}
        <div className="space-y-2 pt-6 border-t border-gray-200">
          <SidebarItem
            icon={<Info className="w-5 h-5" />}
            label="About"
            expandable
          />
          <SidebarItem
            icon={<HelpCircle className="w-5 h-5" />}
            label="Faykar Help"
            expandable
          />
        </div>
      </div>
    </aside>
  );
}

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string;
  expandable?: boolean;
};

function SidebarItem({
  icon,
  label,
  active,
  badge,
  expandable,
}: SidebarItemProps) {
  return (
    <button
      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
        active
          ? "bg-green-50 text-green-700"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <span className={active ? "text-green-600" : "text-gray-500"}>
        {icon}
      </span>
      <span className="flex-1 font-medium">{label}</span>
      {badge && (
        <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
          {badge}
        </span>
      )}
      {expandable && (
        <span className="text-gray-400">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      )}
    </button>
  );
}
