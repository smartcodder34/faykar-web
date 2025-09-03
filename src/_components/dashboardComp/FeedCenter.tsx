"use client";

import React from "react";
import { ShareBox } from "./ShareBox";
import { PostCard } from "./PostCard";


export const FeedCenter: React.FC = () => {
  return (
    <main className="w-full max-w-2xl mx-auto space-y-5 px-3 md:px-0">
      <ShareBox />
      <PostCard />
    </main>
  );
};

