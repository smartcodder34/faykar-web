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
    <aside className="hidden xl:block xl:w-80 shrink-0 h-[calc(100vh-0px)] sticky top-0">
      <div className="p-5 space-y-5">
        <div className="rounded-xl bg-white border border-gray-200/70 shadow-sm p-4">
          <div className="text-sm font-semibold text-gray-900">Your Latest Post</div>
          <p className="mt-1 text-xs text-gray-500">Add product details without a catalog or shop</p>
          <button className="mt-3 text-green-800 text-xs font-semibold">See More</button>
        </div>

        <div className="rounded-xl overflow-hidden border border-gray-200/70 shadow-sm">
          <div className="h-36 w-full relative">
            <Image src={promoImg} alt="promo" className="h-full w-full object-cover" />
          </div>
        </div>

        <div className="rounded-xl bg-white border border-gray-200/70 shadow-sm">
          <div className="px-4 py-3 text-sm font-semibold">Recent</div>
          <div className="divide-y">
            {recents.map((r) => (
              <div key={r.name} className="flex items-center gap-3 px-4 py-3">
                <div className="h-9 w-9 rounded-full overflow-hidden bg-gray-200" />
                <div className="flex-1">
                  <div className="text-sm font-medium">{r.name}</div>
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

