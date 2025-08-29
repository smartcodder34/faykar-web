// "use client";

// import Image from "next/image";
// import React from "react";
// import logo2 from "@/assets/images/logo2.png";

// type LoadingOverlayProps = {
//   isOpen: boolean;
//   message?: string;
//   backdropClassName?: string;
// };

// export default function LoadingOverlay({
//   isOpen,
//   message = "Loading...",
//   backdropClassName,
// }: LoadingOverlayProps) {
//   if (!isOpen) return null;
//   return (
//     <div
//       className={
//         "fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 " +
//         (backdropClassName || "")
//       }
//       aria-live="assertive"
//       role="alert"
//     >
//       <div className="flex flex-col items-center justify-center rounded-2xl bg-white/30 px-6 py-6 shadow-xl">
//         <div className="relative h-22 w-22">
//           <Image src={logo2} alt="loading" fill className="object-contain animate-pulse" />
//         </div>
//         <p className="mt-3 text-sm font-medium text-gray-700">{message}</p>
//       </div>
//     </div>
//   );
// }


"use client";
import Image from "next/image";
import React from "react";
import logo2 from "@/assets/images/logo2.png";

type LoadingOverlayProps = {
  isOpen: boolean;
  message?: string;
  backdropClassName?: string;
  animationType?: "spin" | "pulse" | "bounce" | "fade";
};

export default function LoadingOverlay({
  isOpen,
  message = "Loading...",
  backdropClassName,
  animationType = "spin",
}: LoadingOverlayProps) {
  if (!isOpen) return null;

  const getAnimationClass = () => {
    switch (animationType) {
      case "spin":
        return "animate-spin";
      case "pulse":
        return "animate-pulse";
      case "bounce":
        return "animate-bounce";
      case "fade":
        return "animate-pulse";
      default:
        return "animate-spin";
    }
  };

  return (
    <div
      className={
        "fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-sm " +
        (backdropClassName || "")
      }
      aria-live="assertive"
      role="alert"
    >
      <div className="flex flex-col items-center justify-center rounded-2xl bg-white/90 px-8 py-8 shadow-2xl border border-white/20">
        {/* Option 1: Spinning Logo with Ring */}
        <div className="relative">
          {/* Outer spinning ring */}
          <div className="absolute inset-0 h-24 w-24 rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin"></div>
          {/* Logo in center */}
          <div className="relative h-16 w-16 m-4">
            <Image
              src={logo2}
              alt="loading"
              fill
              className={`object-contain ${getAnimationClass()}`}
            />
          </div>
        </div>

        {/* Loading dots animation */}
        <div className="flex space-x-1 mt-4">
          <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div
            className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>

        <p className="mt-4 text-base font-medium text-gray-700">{message}</p>
      </div>
    </div>
  );
}