"use client";

import Image from "next/image";
import React from "react";
import { BellIcon, GlobeIcon, HomeIcon, MessageIcon, SearchIcon, SettingsSlidersIcon, UsersIcon } from "./Icons";
import logo from "@/assets/images/logo.png";

type NavItem = {
  icon: React.ReactNode;
  label: string;
  count?: string;
};

const navItems: NavItem[] = [
  { icon: <HomeIcon />, label: "Home" },
  { icon: <BellIcon />, label: "Notifications" },
  { icon: <MessageIcon />, label: "Messages" },
  { icon: <UsersIcon />, label: "Friends", count: "1000+" },
  { icon: <GlobeIcon />, label: "Languages" },
];

export const LeftSidebar: React.FC = () => {
  return (
    <aside className="hidden lg:block lg:w-72 xl:w-80 shrink-0 border-r border-gray-200/70 h-[calc(100vh-0px)] sticky top-0">
      <div className="p-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <Image src={logo} alt="logo" className="h-full w-full object-contain" />
          </div>
          <span className="text-xl font-semibold tracking-wide">FAYKAR</span>
        </div>

        <div className="mt-5">
          <div className="rounded-xl bg-gray-100/70 px-3 py-2 flex items-center gap-2">
            <SearchIcon className="text-gray-500" />
            <input
              placeholder="Search"
              className="w-full bg-transparent outline-none text-sm py-2"
            />
            <SettingsSlidersIcon className="text-gray-400" />
          </div>
        </div>

        <nav className="mt-5 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center justify-between rounded-lg px-3 py-3 hover:bg-gray-100/70 text-sm"
            >
              <span className="flex items-center gap-3">
                <span className="text-green-700">{item.icon}</span>
                <span>{item.label}</span>
              </span>
              {item.count ? (
                <span className="text-xs text-gray-500">{item.count}</span>
              ) : null}
            </button>
          ))}
        </nav>

        <div className="mt-8 space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">About</div>
          <button className="w-full flex items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-100/70 text-sm">
            <span>About</span>
            <span className="text-gray-400">›</span>
          </button>
          <button className="w-full flex items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-100/70 text-sm">
            <span>Faykar Help</span>
            <span className="text-gray-400">›</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

