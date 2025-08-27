"use client";
import React from "react";

type ButtonType = {
  title: string;
  disabled?: boolean;
  loading?: boolean;
  primary?: boolean;
  danger?: boolean;
  whiteBg?: boolean;
  borderBn?: boolean;
  icon?: React.ReactNode;
  iconPostion?: "left" | "right";
  onPress?: () => void;
  rounded?: boolean;
  style?: React.CSSProperties;
};

const CustomButton = ({
  title,
  disabled,
  primary,
  danger,
  loading,
  whiteBg,
  borderBn,
  onPress,
  rounded,
  style,
  icon,
  iconPostion = "left",
}: ButtonType) => {
  const getClasses = () => {
    if (disabled) return "bg-gray-300 text-black cursor-not-allowed";
    if (primary) return "bg-blue-600 text-white hover:bg-blue-700";
    if (rounded) return "bg-blue-600 text-white rounded-full hover:bg-blue-700";
    if (danger) return "bg-red-600 text-white hover:bg-red-700";
    if (whiteBg)
      return "bg-white text-blue-600 border border-gray-300 hover:bg-gray-50";
    if (borderBn) return "border border-gray-300 text-black";
    return "bg-gray-200 text-black";
  };

  return (
    <button
      className={`flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition-all ${getClasses()}`}
      style={style}
      onClick={onPress}
      disabled={disabled || loading}
    >
      {/* Left Icon */}
      {icon && iconPostion === "left" && <span>{icon}</span>}

      {/* Button Text / Loader */}
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
      ) : (
        <span>{title}</span>
      )}

      {/* Right Icon */}
      {icon && iconPostion === "right" && <span>{icon}</span>}
    </button>
  );
};

export default CustomButton;
