"use client";

import React from "react";
import { LeftSidebar } from "./LeftSidebar";
import { RightSidebar } from "./RightSidebar";
import { FeedCenter } from "./FeedCenter";
import { Header } from "./Header";


export const DashboardShell: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="mx-auto max-w-[1400px] grid grid-cols-1 lg:grid-cols-[18rem_minmax(0,1fr)] xl:grid-cols-[18rem_minmax(0,1fr)_20rem]">
        <LeftSidebar />

        <div className="py-6">
          <FeedCenter />
          {children}
        </div>
        <RightSidebar />
      </div>
    </div>
  );
};
