"use client";

import Image from "next/image";
import React from "react";
import {
  BellIcon,
  GlobeIcon,
  HomeIcon,
  MessageIcon,
  SearchIcon,
  SettingsSlidersIcon,
  UsersIcon,
} from "./Icons";
import profileImg from "@/assets/images/profile.jpg";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import Logo from "@/customComp/Logo";
import { signOut, useSession } from "next-auth/react";
import { useGetUserApi } from "@/lib/hooks/useGetUserApi";
import { getInitials } from "@/utils/getInitials";

type NavItem = {
  icon: React.ReactNode;
  label: string;
  count?: string;
};

const navItems: NavItem[] = [
  { icon: <HomeIcon />, label: "Home" },
  { icon: <BellIcon />, label: "Notifications" },
  { icon: <MessageIcon />, label: "Messages" },
  { icon: <UsersIcon />, label: "Friends", count: "1000+" },
  { icon: <GlobeIcon />, label: "Languages" },
  { icon: <MessageIcon />, label: "Edit Profile" },
];



export const LeftSidebar: React.FC = () => {
  const router = useRouter();
  const getUserData = useGetUserApi();

  //  console.log("getUserData:", getUserData?.data?.data);

  const logout = useAuthStore.getState().logout;

  const { data } = useSession();
  const session = data;

  console.log("session:", session);

  const handlePageRouting = (item: string) => {
    switch (item) {
      case "Home":
        router.push("/");
        break;
      case "Edit Profile":
        router.push("/profile/edit-profile");
        break;
      case "Messages":
       router.push("/message");
        break;
      default:
        router.push("/");
    }
  };

  const logoutFn = () => {
    logout();
    signOut({ callbackUrl: "/login" });
  };

  // const logoutFn = async () => {
  //   console.log("Hello here");
  //   logout(); // clear zustand state immediately
  //   await signOut({ redirect: false }); // don't auto-redirect
  //   router.push("/login"); // push manually after signout finishes
  // };

  

  return (
    <aside className="h-[calc(100vh-56px)] bg-white border-r border-gray-200/70 overflow-y-auto">
      <div className="p-5">
        {/* User Profile Section */}
        <div className="flex items-center gap-3 mb-6">
          {/* <div className="h-14 w-14 rounded-full overflow-hidden">
            <Image
              src={profileImg}
              alt="logo"
              className="h-full w-full object-cover"
            />
          </div> */}

          <div className=" w-[100px] h-[100px] items-center justify-center flex text-3xl font-semibold bg-gray-200 text-gray-600 rounded-full overflow-hidden">
            {/* <Image
                    src={profile}
                    alt="image"
                    width={100}
                    height={100}
                    className="object-cover h-full w-full rounded-full "
                  /> */}
            {getInitials(getUserData?.data?.data?.full_name)}
          </div>

          <span className="text-lg font-semibold tracking-wide text-[#2E6939]">
            {getUserData?.data?.data?.full_name || "Virat Kohli"}

          </span>
        </div>
        {/* Search Section */}
        <div className="mb-6">
          <div
            className="rounded-xl bg-gray-100/70 px-3 py-2 flex items-center gap-2"
            onClick={() => {
              router.push("/search");
            }}
          >
            <SearchIcon className="text-gray-500" />
            <input
              placeholder="Search"
              className="w-full bg-transparent outline-none text-sm py-2"
            />
            <SettingsSlidersIcon className="text-gray-400" />
          </div>
        </div>
        {/* Navigation Items */}
        
        <nav className="mb-8 space-y-1">
          {navItems.map((item, index) => (
            <button
              key={item.label}

              className={`w-full flex items-center justify-between rounded-lg px-3 py-3 text-sm transition-colors ${
                index === 0 
                  ? "bg-green-100 text-green-700 border-l-4 border-green-600" 
                  : "hover:bg-gray-100/70"
              }`}

              onClick={() => {
                handlePageRouting(item.label);
              }}
            >
              <span className="flex items-center gap-3">
                <span className={index === 0 ? "text-green-700" : "text-gray-600"}>
                  {item.icon}
                </span>
                <span className={index === 0 ? "text-green-700 font-medium" : ""}>
                  {item.label}
                </span>
                {item.count ? (
                  <span className="text-xs text-gray-500">{item.count}</span>
                ) : null}
              </button>
            );
          })}
        </nav>
        {/* About Section */}
        <div className="space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
            About
          </div>
          <button className="w-full flex items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-100/70 text-sm">
            <span>About</span>
            <span className="text-gray-400">›</span>
          </button>
          <button className="w-full flex items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-100/70 text-sm">
            <span>Faykar Help</span>
            <span className="text-gray-400">›</span>
          </button>

          <button
            className="w-full flex items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-100/70 text-sm"
            onClick={logoutFn}
          >
            <span>Log out</span>
            <span className="text-gray-400">›</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
