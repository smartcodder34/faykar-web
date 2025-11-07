import React from "react";
import ProfileBox from "../ProfileBox";
import ViewProfileCard from "./ViewProfileCard";

export default function ViewProfileComp({ viewUserProduct }: any) {
  return (
    <main className="flex-1 p-3 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto h-[calc(100vh-56px)]">
      <ProfileBox />
      <ViewProfileCard viewUserProduct={viewUserProduct} />
    </main>
  );
}
