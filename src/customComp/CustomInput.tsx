"use client";
import React, { useState } from "react";

type InputType = {
  label?: string;
  name?: string;
  placeholder?: string;
  icon?: React.ReactNode; // Left icon (for backward compatibility)
  leftIcon?: React.ReactNode; // Explicit left icon
  rightIcon?: React.ReactNode; // Right icon
  iconPostion?: string; // Keep for backward compatibility
  value?: string;
  onChangeText?: (text?: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: React.HTMLInputTypeAttribute;
  primary?: boolean;
  whiteBg?: boolean;
  width?: number | string;
  multiline?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  error?: string;
  editable?: boolean;
  isLoading?: boolean;
  isArabic?: boolean;
};

const CustomInput = ({
  label,
  icon,
  leftIcon,
  rightIcon,
  iconPostion,
  onChangeText,
  value,
  placeholder,
  secureTextEntry,
  keyboardType = "text",
  primary,
  whiteBg,
  error,
  editable = true,
  onFocus,
  isArabic,
  onBlur,
  multiline,
  isLoading,
  width,
}: InputType) => {
  const [focused, setFocused] = useState(false);

  // Determine icons
  const getLeftIcon = () => {
    if (leftIcon) return leftIcon;
    if (icon && (!iconPostion || iconPostion === "left")) return icon;
    return null;
  };

  const getRightIcon = () => {
    if (rightIcon) return rightIcon;
    if (icon && iconPostion === "right") return icon;
    return null;
  };

  const getBgColor = () => {
    if (primary) return "border border-gray-400 ";
    if (whiteBg) return "bg-white border border-gray-200";
    return "bg-gray-100 border border-gray-200";
  };

  const leftIconElement = getLeftIcon();
  const rightIconElement = getRightIcon();

  return (
    <div className="my-2 w-full" style={{ width }}>
      {label && (
        <label className="mb-1 block text-sm font-medium text-black">
          {label}
        </label>
      )}

      <div
        className={`flex items-center rounded-2xl px-3 ${getBgColor()}`}
        style={{ height: "45px" }}
      >
        {/* Left Icon */}
        {leftIconElement && <div className="mr-2">{leftIconElement}</div>}

        {/* Input / Textarea */}
        {multiline ? (
          <textarea
            placeholder={placeholder}
            disabled={!editable}
            value={value}
            onChange={(e) => onChangeText?.(e.target.value)}
            onFocus={() => {
              setFocused(true);
              onFocus?.();
            }}
            onBlur={() => {
              setFocused(false);
              onBlur?.();
            }}
            className={`flex-1 resize-none bg-transparent p-1 text-sm text-black placeholder-gray-400 focus:outline-none`}
            style={{ textAlign: isArabic ? "right" : "left" }}
          />
        ) : (
          <input
            type={secureTextEntry ? "password" : keyboardType}
            placeholder={placeholder}
            disabled={!editable}
            value={value}
            onChange={(e) => onChangeText?.(e.target.value)}
            onFocus={() => {
              setFocused(true);
              onFocus?.();
            }}
            onBlur={() => {
              setFocused(false);
              onBlur?.();
            }}
            className={`flex-1 bg-transparent p-1 text-sm text-black placeholder-gray-400 focus:outline-none`}
            style={{ textAlign: isArabic ? "right" : "left" }}
          />
        )}

        {/* Right Icon */}
        {rightIconElement && <div className="ml-2">{rightIconElement}</div>}
      </div>

      {error && <p className="mt-1 px-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default CustomInput;
