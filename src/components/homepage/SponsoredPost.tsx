// src/components/homepage/SponsoredPost.tsx
"use client";

import React from "react";
import { Heart, MessageCircle, Share, Bookmark, Users, MapPin, Clock } from "lucide-react";

export default function SponsoredPost() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Post Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white font-medium">B</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-gray-900">Balaji</h3>
              <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-medium">
                sponsored post
              </span>
            </div>
          </div>
        </div>

        <p className="mt-4 text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra ..
        </p>
      </div>

      {/* Product Image */}
      <div className="px-6">
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80"
            alt="Beef cuts"
            className="w-full h-64 object-cover"
          />
        </div>
      </div>

      {/* Post Actions and Info */}
      <div className="p-6 pt-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors">
              <MessageCircle className="w-5 h-5" />
            </button>
            <button className="flex items-center space-x-1 text-gray-600 hover:text-green-500 transition-colors">
              <Share className="w-5 h-5" />
            </button>
            <button className="flex items-center space-x-1 text-gray-600 hover:text-yellow-500 transition-colors">
              <Bookmark className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-4 h-4 text-green-600" /> 13.5KM
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-4 h-4 text-gray-600" /> 54mins Away
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Category:</span>
            <span className="text-sm font-medium text-gray-900">Beef Meat</span>
          </div>

          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">Direct Message</span>
            </button>
            <span className="text-2xl font-bold text-green-600">$60</span>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-2">View all 57 comments</p>
      </div>
    </div>
  );
}
