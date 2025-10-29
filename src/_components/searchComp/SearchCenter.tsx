"use client";

import React from "react";
import SearchCard from "./SearchCard";

export const SearchCenter: React.FC = () => {
  return (
    <main className="flex-1 p-3 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto h-[calc(100vh-56px)]">
      {/* <ProfileBox /> */}
      <SearchCard />
    </main>
  );
};
