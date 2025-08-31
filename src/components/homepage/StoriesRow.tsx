// src/components/homepage/StoriesRow.tsx
"use client";

import React from "react";
import { Plus } from "lucide-react";

type Story = {
  id: number;
  name: string;
  image?: string | null;
  isAdd?: boolean;
};

const stories: Story[] = [
  { id: 1, name: "Abdul", image: null, isAdd: true },
  {
    id: 2,
    name: "Meru",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Chandra",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    name: "Namaha",
    image:
      "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 5,
    name: "Raamaya",
    image:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=400&q=80",
  },
];

export default function StoriesRow() {
  return (
    <div className="flex items-stretch gap-3 overflow-x-auto scrollbar-hide pb-1">
      {stories.map((s) => (
        <StoryCard key={s.id} story={s} />
      ))}
    </div>
  );
}

function StoryCard({ story }: { story: Story }) {
  if (story.isAdd) {
    return (
      <div className="w-28 shrink-0 bg-white rounded-2xl border-2 border-dashed border-gray-300 hover:border-green-600 transition-colors flex flex-col items-center justify-center p-4 cursor-pointer">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-3">
          <Plus className="w-5 h-5 text-gray-500" />
        </div>
        <span className="text-gray-600 text-sm font-medium">{story.name}</span>
      </div>
    );
  }

  return (
    <div className="w-28 shrink-0 bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      <div className="relative aspect-[3/4]">
        {story.image && (
          <img
            src={story.image}
            alt={story.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute -bottom-5 left-2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center">
          <span className="text-gray-700 text-xs font-medium">
            {story.name.charAt(0)}
          </span>
        </div>
      </div>
      <div className="px-3 pt-6 pb-3">
        <span className="text-sm font-medium text-gray-900">{story.name}</span>
      </div>
    </div>
  );
}
