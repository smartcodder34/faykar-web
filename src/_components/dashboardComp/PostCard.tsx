"use client";

import Image from "next/image";
import React from "react";
import { BookmarkIcon, ChatBubbleIcon, HeartIcon, MapPinIcon, SendIcon } from "./Icons";
import img1 from "@/assets/images/image-1.png";
import img2 from "@/assets/images/image-2.png";

export const PostCard: React.FC = () => {
  return (
    <article className="rounded-2xl bg-white border border-gray-200/70 shadow-sm overflow-hidden">
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <Image src={img2} alt="author" className="h-full w-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold">Balaji</div>
            <div className="text-[11px] text-gray-500">sponsored post</div>
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra ..</p>
      </div>

      <div className="px-4">
        <div className="rounded-xl overflow-hidden border border-gray-200/70">
          <Image src={img1} alt="post" className="w-full h-auto object-cover" />
        </div>
      </div>

      <div className="px-4 py-3 flex items-center gap-4 text-gray-600">
        <button className="flex items-center gap-1 hover:text-green-700">
          <HeartIcon />
        </button>
        <button className="flex items-center gap-1 hover:text-green-700">
          <ChatBubbleIcon />
        </button>
        <button className="flex items-center gap-1 hover:text-green-700">
          <BookmarkIcon />
        </button>
        <div className="ml-auto text-[11px] text-gray-500 flex items-center gap-3">
          <span>13.5KM</span>
          <span>·</span>
          <span>54mins Away</span>
        </div>
      </div>

      <div className="px-4 pb-4 flex items-center gap-3">
        <div className="text-[11px] text-gray-500">Category:</div>
        <div className="text-[11px] text-gray-700">Beef Meat</div>
        <div className="ml-auto">
          <button className="inline-flex items-center gap-2 rounded-full bg-green-900/90 text-white text-xs px-3 py-2">
            <SendIcon />
            Direct Message
          </button>
        </div>
      </div>

      <div className="px-4 pb-4 flex items-center justify-between">
        <div className="text-[#1B5E20] text-xl font-semibold">$60</div>
      </div>
    </article>
  );
};

