// src/components/homepage/ShareProductSection.tsx
"use client";

import React from "react";
import { ImageIcon } from "lucide-react";

export default function ShareProductSection() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center space-x-4">
        {/* User Avatar */}
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-medium">VK</span>
        </div>

        {/* Share Input */}
        <div className="flex-1">
          <button className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-medium transition-colors text-left">
            Share your Product
          </button>
        </div>

        {/* Image Upload Button */}
        <button className="p-3 hover:bg-gray-100 rounded-2xl transition-colors">
          <ImageIcon className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
