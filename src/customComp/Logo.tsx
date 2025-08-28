"use client";
import React from "react";

type LogoProps = {
  height?: number;
};

/**
 * Small reusable logo component. Expects the logo image to be placed at
 * public/favkar-logo.png. If the file is missing, alt text will be shown.
 */
export default function Logo({ height = 28 }: LogoProps) {
  return (
    <div className="flex items-center gap-2">
      <img
        src="/favkar-logo.png"
        alt="FAVKAR"
        style={{ height, width: "auto" }}
      />
    </div>
  );
}

