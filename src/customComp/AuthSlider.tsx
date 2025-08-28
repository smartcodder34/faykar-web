"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import image1 from "@/assets/images/image-1.png";
import image2 from "@/assets/images/image-2.png";


type LogoProps = {
  height?: number;
};

/**
 * Small reusable logo component. Expects the logo image to be placed at
 * public/favkar-logo.png. If the file is missing, alt text will be shown.
 *
 *
 */

// Basic carousel state

export const AuthSlider = ({ height = 28 }: LogoProps) => {
  const images1 = useMemo(
    () => [
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1400&q=80",
    ],
    []
  );
  const images = useMemo(() => [image1, image2], []);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div className="rounded-3xl overflow-hidden shadow-xl bg-white h-[520px] relative flex items-center justify-center">
      <Image
        alt="carousel image"
        src={images[activeIndex]}
        className=" object-cover"
        // width={100}
        // height={100}
      />
    </div>
  );
};
