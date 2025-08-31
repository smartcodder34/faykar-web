"use client";

import React from "react";
import Image from "next/image";
import { BellIcon, HomeIcon, MessageIcon, SearchIcon } from "./Icons";
import logo from "@/assets/images/logo.png";

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200/70">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="h-14 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 overflow-hidden rounded">
              <Image src={logo} alt="Faykar" className="h-full w-full object-contain" />
            </div>
            <span className="hidden sm:block font-semibold tracking-wide">FAYKAR</span>
          </div>

          <div className="flex-1 max-w-xl">
            <label className="w-full flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-2">
              <SearchIcon className="text-gray-500" />
              <input
                placeholder="Search products, people, posts"
                className="w-full bg-transparent outline-none text-sm"
              />
            </label>
          </div>

          <div className="ml-auto flex items-center gap-4 text-gray-700">
            <button className="p-2 rounded-full hover:bg-gray-100" aria-label="Home">
              <HomeIcon />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100" aria-label="Messages">
              <MessageIcon />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100" aria-label="Notifications">
              <BellIcon />
            </button>
            <div className="h-8 w-8 rounded-full bg-gray-200" />
          </div>
        </div>
      </div>
    </header>
  );
};

