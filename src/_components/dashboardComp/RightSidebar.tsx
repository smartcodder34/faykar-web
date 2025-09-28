"use client";

import Image from "next/image";
import React from "react";
import promoImg from "@/assets/images/image-1.png";

const recents = [
  { name: "Patrick Light", time: "Just Now" },
  { name: "Chris Morgan", time: "2mins ago" },
  { name: "Segun Lolake", time: "15mins ago" },
  { name: "Chris", time: "1hour ago" },
  { name: "Patrick Loom", time: "11:20am" },
  { name: "Patrick", time: "11:20am" },
];

export const RightSidebar: React.FC = () => {
  return (
    <aside className="h-[calc(100vh-56px)] bg-white border-l border-gray-200/70 overflow-y-auto">
      <div className="p-5 space-y-5">
        {/* Your Latest Post Section */}
        <div className="rounded-xl bg-gray-50 border border-gray-200/70 shadow-sm p-4">
          <div className="text-sm font-semibold text-green-600 mb-2">Your Latest Post</div>
          <p className="text-xs text-gray-600 mb-3">Add product details without a catalog or shop</p>
          <button className="text-green-600 text-xs font-semibold hover:text-green-700 transition-colors">See More</button>
        </div>

        {/* Advertisement Section */}
        <div className="rounded-xl overflow-hidden border border-gray-200/70 shadow-sm relative">
          <div className="h-36 w-full relative">
            <Image src={promoImg} alt="promo" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-lg font-bold mb-2">50% off for clothing &</div>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="rounded-xl bg-white border border-gray-200/70 shadow-sm">
          <div className="px-4 py-3 text-sm font-semibold text-gray-900 border-b border-gray-100">Recent</div>
          <div className="divide-y divide-gray-100">
            {recents.map((r) => (
              <div key={r.name} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                <div className="h-9 w-9 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <div className="h-full w-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
                    {r.name.charAt(0)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{r.name}</div>
                  <div className="text-xs text-gray-500">{r.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

