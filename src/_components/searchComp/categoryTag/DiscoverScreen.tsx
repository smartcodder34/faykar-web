"use client";

import React, { useState } from "react";
import { MessageCircle, Heart } from "lucide-react";
import discoverData from "@/mocks/discoverMocks.json";

// Sample product data matching the image
const sampleProducts = [
  {
    id: 1,
    name: "Burger Deluxe",
    image: "/api/placeholder/400/400",
  },
  {
    id: 2,
    name: "Denim Stack",
    image: "/api/placeholder/400/400",
  },
  {
    id: 3,
    name: "Red Jacket",
    image: "/api/placeholder/400/400",
  },
  {
    id: 4,
    name: "Banana Bundle",
    image: "/api/placeholder/400/400",
  },
  {
    id: 5,
    name: "Nike Sneakers",
    image: "/api/placeholder/400/400",
  },
  {
    id: 6,
    name: "Strawberry",
    image: "/api/placeholder/400/400",
  },
  {
    id: 7,
    name: "Burger Special",
    image: "/api/placeholder/400/400",
  },
  {
    id: 8,
    name: "Blue Jeans",
    image: "/api/placeholder/400/400",
  },
  {
    id: 9,
    name: "Fresh Bananas",
    image: "/api/placeholder/400/400",
  },
  {
    id: 10,
    name: "Red Kicks",
    image: "/api/placeholder/400/400",
  },
  {
    id: 11,
    name: "Fresh Berry",
    image: "/api/placeholder/400/400",
  },
];

const DiscoverScreen = () => {
  return (
    <div className="bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Masonry Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[100px]">
        Nothing here to see
        </div>
      </div>
    </div>
  );
};

export default DiscoverScreen;





  // {
  //   sampleProducts.map((product, index) => {
  //     // Create the masonry pattern
  //     let gridClass = "";

  //     // First column pattern (large items at positions 0, 6)
  //     if (index === 0 || index === 6) {
  //       gridClass = "row-span-2";
  //     }
  //     // Fourth column pattern (tall items at positions 3, 8)
  //     else if (index === 3 || index === 8) {
  //       gridClass = "row-span-2";
  //     }
  //     // Regular items
  //     else {
  //       gridClass = "row-span-1";
  //     }

  //     return (
  //       <div
  //         key={product.id}
  //         className={`group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer ${gridClass}`}
  //       >
  //         {/* Product Image */}
  //         <div className="w-full h-full relative overflow-hidden">
  //           <img
  //             src={product.image}
  //             alt={product.name}
  //             className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
  //           />

  //           {/* Hover Overlay */}
  //           <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
  //         </div>
  //       </div>
  //     );
  //   });
  // }