"use client";

import React from "react";
import { ShareBox } from "../dashboardComp/ShareBox";
import { PostCard } from "../dashboardComp/PostCard";
import ProfileBox from "./ProfileBox";


export const ProfileCenter: React.FC = () => {
  return (
    <main className="w-full max-w-2xl mx-auto space-y-5 px-3 md:px-0">
      {/* <ShareBox /> */}
      <ProfileBox />
      <PostCard />
    </main>
  );
};

