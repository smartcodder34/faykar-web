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

  const handlePageRouting = (item: string) => {
    console.log("item", item);
    if (item === "Edit Profile") {
      router.push("/profile/edit-profile");
    }
  };

  return (
    // <aside className="hidden lg:block lg:w-72 xl:w-80 shrink-0 border-r border-gray-200/70  sticky top-14">
    <aside className="  flex-1 bg-white">
      <div className="p-5">
        <div className="mb-6">
          <Logo height={20} />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 rounded-full overflow-hidden">
            <Image
              src={profileImg}
              alt="logo"
              className="h-full w-full object-cover"
            />
          </div>
          <span className=" text-lg font-semibold tracking-wide text-[#2E6939]">
            {getUserData?.data?.data?.full_name}
          </span>
        </div>

        <div className="mt-5">
          <div className="rounded-xl bg-gray-100/70 px-3 py-2 flex items-center gap-2">
            <SearchIcon className="text-gray-500" />
            <input
              placeholder="Search"
              className="w-full bg-transparent outline-none text-sm py-2"
            />
            <SettingsSlidersIcon className="text-gray-400" />
          </div>
        </div>

        <nav className="mt-5 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center justify-between rounded-lg px-3 py-3 hover:bg-gray-100/70 text-sm"
              onClick={() => {
                handlePageRouting(item.label);
              }}
            >
              <span className="flex items-center gap-3">
                <span className="text-green-700">{item.icon}</span>
                <span>{item.label}</span>
              </span>
              {item.count ? (
                <span className="text-xs text-gray-500">{item.count}</span>
              ) : null}
            </button>
          ))}
        </nav>

        <div className="mt-8 space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
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
