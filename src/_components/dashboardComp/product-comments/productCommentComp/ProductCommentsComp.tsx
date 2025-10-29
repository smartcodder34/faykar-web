"use client";
import ProfileBox from "@/_components/profileComp/ProfileBox";
import React from "react";
import ProductCommentList from "./productCommentList";

export default function ProductCommentComp({ viewUserProduct }: any) {
  return (
    <main className="flex-1 p-3 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto h-[calc(100vh-56px)]">
      <ProfileBox />
      <ProductCommentList viewUserProduct={viewUserProduct} />
    </main>
  );
}
