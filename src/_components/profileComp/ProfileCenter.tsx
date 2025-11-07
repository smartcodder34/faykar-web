"use client";

import React from "react";
import ProfileBox from "./ProfileBox";
import ProfileCard from "./ProfileCard";

export const ProfileCenter: React.FC = () => {
  return (
    <main className="flex-1 p-3 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto h-[calc(100vh-56px)]">
      <ProfileBox />
      <ProfileCard />
    </main>
  );
};
