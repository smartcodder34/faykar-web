
"use client"

import React from "react";
import { Settings } from "lucide-react";
import profile from "@/assets/images/profile.jpg"
import Image from "next/image";
import { useGetUserApi } from "@/lib/hooks/useGetUserApi";
import { getInitials } from "@/utils/getInitials";

export default function ProfileBox() {
    const getUserData = useGetUserApi();
  
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white border border-gray-200/70 shadow-sm p-4 w-full ">
      {/* Profile Image */}

      <div className=" w-[150px] h-[150px] items-center justify-center flex text-3xl font-semibold bg-gray-200 text-gray-600 rounded-full overflow-hidden">
        {/* <Image
          src={profile}
          alt="image"
          width={100}
          height={100}
          className="object-cover h-full w-full rounded-full "
        /> */}
        {getInitials(getUserData?.data?.data?.full_name)}
      </div>

      {/* Profile Info */}
      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-3">
          <h2 className="font-semibold text-lg text-green-700">
            {getUserData?.data?.data?.full_name}
          </h2>

          {/* Buttons */}
          <button className="px-3 py-1 rounded-md border text-sm font-medium bg-gray-100 hover:bg-gray-200">
            Following
          </button>
          <button className="px-3 py-1 rounded-md border text-sm font-medium bg-gray-100 hover:bg-gray-200">
            Message
          </button>
          <button className="p-2 rounded-md border bg-gray-100 hover:bg-gray-200">
            <Settings size={16} />
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-6 mt-2 text-sm text-gray-600">
          <span>
            <strong className="text-gray-900">100</strong> posts
          </span>
          <span>
            <strong className="text-gray-900">4M</strong> followers
          </span>
          <span>
            <strong className="text-gray-900">454</strong> following
          </span>
        </div>
      </div>
    </div>
  );
}
