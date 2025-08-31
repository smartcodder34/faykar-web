// src/components/layout/RightSidebar.tsx
"use client";

import React from "react";

export default function RightSidebar() {
  return (
    <aside className="w-80 h-full bg-white border-l border-gray-200 overflow-y-auto">
      <div className="p-5 space-y-6">
        {/* Latest Post Section */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-4 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="font-semibold mb-2">Your Latest Post</h3>
            <p className="text-sm opacity-90 mb-3">
              Add product details without a catalog or shop
            </p>
            <button className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors">
              See More
            </button>
          </div>
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
        </div>

        {/* Shop Now Banner */}
        <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-4 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium mb-2 inline-block">
              50% off for
            </div>
            <p className="text-sm mb-3">clothing & accessories</p>
            <button className="bg-green-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
              Shop Now
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Recent</h3>
          <div className="space-y-3">
            <RecentItem
              name="Patrick Light"
              time="Just Now"
              avatar="PL"
              bgColor="bg-blue-500"
            />
            <RecentItem
              name="Chris Morgan"
              time="2mins ago"
              avatar="CM"
              bgColor="bg-green-500"
            />
            <RecentItem
              name="Segun Lolake"
              time="15mins ago"
              avatar="SL"
              bgColor="bg-purple-500"
            />
            <RecentItem
              name="Chris"
              time="1hour ago"
              avatar="C"
              bgColor="bg-red-500"
            />
            <RecentItem
              name="Patrick Loom"
              time="11:20am"
              avatar="PL"
              bgColor="bg-indigo-500"
            />
            <RecentItem
              name="Patrick"
              time="11:20am"
              avatar="P"
              bgColor="bg-pink-500"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}

type RecentItemProps = {
  name: string;
  time: string;
  avatar: string;
  bgColor: string;
};

function RecentItem({ name, time, avatar, bgColor }: RecentItemProps) {
  return (
    <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
      <div
        className={`w-10 h-10 ${bgColor} rounded-full flex items-center justify-center`}
      >
        <span className="text-white text-sm font-medium">{avatar}</span>
      </div>
      <div className="flex-1">
        <p className="font-medium text-gray-900 text-sm">{name}</p>
        <p className="text-gray-500 text-xs">{time}</p>
      </div>
    </div>
  );
}
