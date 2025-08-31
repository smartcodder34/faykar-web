// src/components/homepage/ShareProductSection.tsx
"use client";

import React from "react";
import { ImageIcon } from "lucide-react";

export default function ShareProductSection() {
  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 md:gap-4">
        {/* User Avatar */}
        <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-medium text-sm md:text-base">
            VK
          </span>
        </div>

        {/* Share Input */}
        <div className="flex-1">
          <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-2xl font-medium transition-colors text-left">
            Share your Product
          </button>
        </div>

        {/* Image Upload Button */}
        <button className="p-2.5 md:p-3 hover:bg-gray-100 rounded-2xl transition-colors">
          <ImageIcon className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
