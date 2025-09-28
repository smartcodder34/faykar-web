"use client";

import Image, { type StaticImageData } from "next/image";
import React from "react";
import { CameraIcon } from "./Icons";
import story1 from "@/assets/images/image-2.png";
import story2 from "@/assets/images/image-1.png";
import { useRouter } from "next/navigation";

export const ShareBox: React.FC = () => {
    const router = useRouter();
  return (
    <div className="rounded-2xl bg-white border border-gray-200/70 shadow-sm">
      <div className="flex items-center gap-3 p-3">
        <div className="h-9 w-9 rounded-full overflow-hidden bg-gray-200" />
        <div className="flex-1">
          <div
            className="bg-green-900/90 text-white text-sm rounded-lg px-4 py-2 flex items-center justify-between"
            onClick={() => {
              router.push("/dashboard/create-product");
            }}
          >
            <span>Share your Product</span>
            <span className="bg-white/15 rounded p-1">
              <CameraIcon className="text-white" />
            </span>
          </div>
        </div>
      </div>

      <div className="px-3 pb-3">
        <div className="flex items-center gap-4 overflow-x-auto pb-2">
          <AddStoryCard />
          {sampleStories.map((s) => (
            <StoryCard key={s.name} imageSrc={s.src} name={s.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

const sampleStories: Array<{ name: string; src: StaticImageData }> = [
  { name: "Meru", src: story1 },
  { name: "Chandra", src: story2 },
  { name: "Namaha", src: story1 },
  { name: "Raamaya", src: story2 },
];

const AddStoryCard: React.FC = () => {
  return (
    <div className="w-24 shrink-0">
      <div className="h-28 rounded-xl bg-gray-100 flex items-center justify-center">
        <div className="h-9 w-9 rounded-full bg-white shadow flex items-center justify-center text-green-800 border border-gray-200">
          +
        </div>
      </div>
      <div className="text-xs text-center mt-2 text-gray-600">Abdul</div>
    </div>
  );
};

const StoryCard: React.FC<{ imageSrc: StaticImageData; name: string }> = ({ imageSrc, name }) => {
  return (
    <div className="w-24 shrink-0">
      <div className="h-28 rounded-xl overflow-hidden relative">
        <Image src={imageSrc} alt={name} className="h-full w-full object-cover" />
        <div className="absolute -bottom-3 left-1 h-8 w-8 rounded-full overflow-hidden ring-2 ring-white">
          <Image src={imageSrc} alt={name} className="h-full w-full object-cover" />
        </div>
      </div>
      <div className="text-xs text-center mt-4">{name}</div>
    </div>
  );
};

