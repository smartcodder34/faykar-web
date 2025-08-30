// src/components/homepage/ProductGrid.tsx (Mobile Responsive Version)
"use client";

import React from "react";
import { Plus } from "lucide-react";

const productData = [
  {
    id: 1,
    name: "Abdul",
    image: null,
    hasAddButton: true,
  },
  {
    id: 2,
    name: "Meru",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Chandra",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    name: "Namaha",
    image:
      "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 5,
    name: "Raamaya",
    image:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=400&q=80",
  },
];

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
      {productData.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          image={product.image}
          hasAddButton={product.hasAddButton}
        />
      ))}
    </div>
  );
}

type ProductCardProps = {
  name: string;
  image?: string | null;
  hasAddButton?: boolean;
};

function ProductCard({ name, image, hasAddButton }: ProductCardProps) {
  if (hasAddButton) {
    return (
      <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-dashed border-gray-300 hover:border-green-500 transition-colors cursor-pointer group">
        <div className="flex flex-col items-center justify-center h-24 md:h-32 space-y-2 md:space-y-3">
          <div className="w-8 h-8 md:w-12 md:h-12 bg-gray-100 group-hover:bg-green-100 rounded-full flex items-center justify-center transition-colors">
            <Plus className="w-4 h-4 md:w-6 md:h-6 text-gray-400 group-hover:text-green-600" />
          </div>
          <span className="text-gray-600 group-hover:text-green-700 font-medium text-center text-xs md:text-sm">
            {name}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group">
      <div className="aspect-square relative overflow-hidden">
        {image && (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        {/* User Avatar Overlay */}
        <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center shadow-md">
            <span className="text-gray-700 text-xs font-medium">
              {name.charAt(0)}
            </span>
          </div>
        </div>
      </div>
      <div className="p-2 md:p-3">
        <span className="text-gray-900 font-medium text-xs md:text-sm">
          {name}
        </span>
      </div>
    </div>
  );
}
