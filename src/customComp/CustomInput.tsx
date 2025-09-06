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
        <label className="mb-1 block text-sm font-medium text-black ">
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


// "use client";
// import React, { useState } from "react";

// type InputType = {
//   label?: string;
//   name?: string;
//   placeholder?: string;
//   icon?: React.ReactNode; // Left icon (for backward compatibility)
//   leftIcon?: React.ReactNode; // Explicit left icon
//   rightIcon?: React.ReactNode; // Right icon
//   iconPostion?: string; // Keep for backward compatibility
//   value?: string;
//   onChangeText?: (text?: string) => void;
//   secureTextEntry?: boolean;
//   keyboardType?: React.HTMLInputTypeAttribute;
//   primary?: boolean;
//   whiteBg?: boolean;
//   width?: number | string;
//   multiline?: boolean;
//   onBlur?: () => void;
//   onFocus?: () => void;
//   error?: string;
//   editable?: boolean;
//   isLoading?: boolean;
//   isArabic?: boolean;
//   responsive?: boolean; // New prop to enable/disable responsive behavior
//   minHeight?: number; // Minimum height for multiline inputs
// };

// const CustomInput = ({
//   label,
//   icon,
//   leftIcon,
//   rightIcon,
//   iconPostion,
//   onChangeText,
//   value,
//   placeholder,
//   secureTextEntry,
//   keyboardType = "text",
//   primary,
//   whiteBg,
//   error,
//   editable = true,
//   onFocus,
//   isArabic,
//   onBlur,
//   multiline,
//   isLoading,
//   width,
//   responsive = true,
//   minHeight = 80,
// }: InputType) => {
//   const [focused, setFocused] = useState(false);

//   // Determine icons
//   const getLeftIcon = () => {
//     if (leftIcon) return leftIcon;
//     if (icon && (!iconPostion || iconPostion === "left")) return icon;
//     return null;
//   };

//   const getRightIcon = () => {
//     if (rightIcon) return rightIcon;
//     if (icon && iconPostion === "right") return icon;
//     return null;
//   };

//   const getBgColor = () => {
//     if (primary) return "border border-gray-400";
//     if (whiteBg) return "bg-white border border-gray-200";
//     return "bg-gray-100 border border-gray-200";
//   };

//   // Responsive focus styles
//   const getFocusStyles = () => {
//     if (focused) {
//       return "ring-2 ring-blue-500 ring-opacity-50 border-blue-500";
//     }
//     return "";
//   };

//   // Responsive width class
//   const getWidthClass = () => {
//     if (width) return "";
//     if (responsive)
//       return "w-full max-w-none sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl";
//     return "w-full";
//   };

//   // Responsive padding and sizing
//   const getResponsiveClasses = () => {
//     if (responsive) {
//       return {
//         container: "px-2 sm:px-3 md:px-4",
//         input: "text-sm sm:text-base",
//         height: multiline
//           ? "min-h-[80px] sm:min-h-[100px]"
//           : "h-[45px] sm:h-[50px] md:h-[55px]",
//         iconSize: "text-base sm:text-lg md:text-xl",
//       };
//     }
//     return {
//       container: "px-3",
//       input: "text-sm",
//       height: multiline ? `min-h-[${minHeight}px]` : "h-[45px]",
//       iconSize: "text-base",
//     };
//   };

//   const leftIconElement = getLeftIcon();
//   const rightIconElement = getRightIcon();
//   const responsiveClasses = getResponsiveClasses();

//   return (
//     <div
//       className={`my-2 ${getWidthClass()}`}
//       style={{ width: width ? width : undefined }}
//     >
//       {label && (
//         <label className="mb-1 sm:mb-2 block text-xs sm:text-sm md:text-base font-medium text-black">
//           {label}
//         </label>
//       )}

//       <div
//         className={`
//           flex items-center rounded-xl sm:rounded-2xl 
//           ${responsiveClasses.container} 
//           ${getBgColor()} 
//           ${getFocusStyles()}
//           ${responsiveClasses.height}
//           transition-all duration-200 ease-in-out
//           ${multiline ? "items-start pt-2 sm:pt-3" : "items-center"}
//         `}
//       >
//         {/* Left Icon */}
//         {leftIconElement && (
//           <div
//             className={`mr-2 sm:mr-3 flex-shrink-0 ${
//               responsiveClasses.iconSize
//             } ${multiline ? "mt-1" : ""}`}
//           >
//             {leftIconElement}
//           </div>
//         )}

//         {/* Input / Textarea */}
//         {multiline ? (
//           <textarea
//             placeholder={placeholder}
//             disabled={!editable}
//             value={value}
//             onChange={(e) => onChangeText?.(e.target.value)}
//             onFocus={() => {
//               setFocused(true);
//               onFocus?.();
//             }}
//             onBlur={() => {
//               setFocused(false);
//               onBlur?.();
//             }}
//             className={`
//               flex-1 resize-none bg-transparent 
//               ${responsiveClasses.input} 
//               text-black placeholder-gray-400 
//               focus:outline-none
//               leading-relaxed
//               py-1 sm:py-2
//             `}
//             style={{
//               textAlign: isArabic ? "right" : "left",
//               minHeight: `${minHeight}px`,
//             }}
//             rows={responsive ? 3 : 2}
//           />
//         ) : (
//           <input
//             type={secureTextEntry ? "password" : keyboardType}
//             placeholder={placeholder}
//             disabled={!editable}
//             value={value}
//             onChange={(e) => onChangeText?.(e.target.value)}
//             onFocus={() => {
//               setFocused(true);
//               onFocus?.();
//             }}
//             onBlur={() => {
//               setFocused(false);
//               onBlur?.();
//             }}
//             className={`
//               flex-1 bg-transparent 
//               ${responsiveClasses.input} 
//               text-black placeholder-gray-400 
//               focus:outline-none
//               py-1 sm:py-2
//             `}
//             style={{ textAlign: isArabic ? "right" : "left" }}
//           />
//         )}

//         {/* Right Icon */}
//         {rightIconElement && (
//           <div
//             className={`ml-2 sm:ml-3 flex-shrink-0 ${
//               responsiveClasses.iconSize
//             } ${multiline ? "mt-1" : ""}`}
//           >
//             {rightIconElement}
//           </div>
//         )}
//       </div>

//       {error && (
//         <p className="mt-1 sm:mt-2 px-1 sm:px-2 text-xs sm:text-sm text-red-500 break-words">
//           {error}
//         </p>
//       )}
//     </div>
//   );
// };

// export default CustomInput;