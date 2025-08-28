"use client";
import React from "react";
import logo from "@/assets/images/logo.png";
import Image from "next/image";

type LogoProps = {
  height?: number;
};

/**
 * Small reusable logo component. Expects the logo image to be placed at
 * public/favkar-logo.png. If the file is missing, alt text will be shown.
 */
export default function Logo({ height = 28 }: LogoProps) {
  return (
    <div className=" w-[199] h-10">
      <Image
        src={logo}
        alt="image"
        width={100}
        height={100}
        className="object-cover h-full w-full "
      />
    </div>
  );
}
