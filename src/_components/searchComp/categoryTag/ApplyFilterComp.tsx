


"use client";

import React from "react";
import Image from "next/image";

interface Product {
  id: number;
  image: string;
  height: number;
}

interface ApplyFilterCompProps {
  discoverCategoryMutation?: any;
}

const ApplyFilterComp: React.FC<ApplyFilterCompProps> = ({
  discoverCategoryMutation,
}) => {
  const products: Product[] = [
    {
      id: 1,
      image: "https://example.com/burger.jpg",
      height: 200,
    },
    {
      id: 2,
      image: "https://example.com/jeans.jpg",
      height: 150,
    },
    {
      id: 3,
      image: "https://example.com/blazer.jpg",
      height: 180,
    },
    {
      id: 4,
      image: "https://example.com/bananas.jpg",
      height: 150,
    },
    {
      id: 5,
      image: "https://example.com/shoes.jpg",
      height: 180,
    },
    {
      id: 6,
      image: "https://example.com/strawberry.jpg",
      height: 180,
    },
  ];

  // Split products into two columns for masonry layout
  const splitIntoColumns = (data: Product[], numColumns: number = 2) => {
    const columns: Product[][] = Array.from({ length: numColumns }, () => []);
    const columnHeights = Array(numColumns).fill(0);

    data.forEach((item) => {
      // Find the shortest column
      const shortestColumnIndex = columnHeights.indexOf(
        Math.min(...columnHeights)
      );
      columns[shortestColumnIndex].push(item);
      columnHeights[shortestColumnIndex] += item.height;
    });

    return columns;
  };

  const renderProductCard = (item: Product) => (
    <button
      key={item.id}
      className="bg-white rounded-2xl overflow-hidden mb-4 w-full cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => console.log("Product clicked:", item.id)}
    >
      <div style={{ position: "relative", width: "100%", height: item.height }}>
        <Image
          src={item.image}
          alt={`Product ${item.id}`}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 50vw, 33vw"
        />
      </div>
    </button>
  );

  const columns = splitIntoColumns(products);
  console.log("columns", columns);

  return (
    <div className="flex-1  overflow-auto">
      {discoverCategoryMutation?.data?.data?.products?.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-gray-400 text-base">Nothing here yet</p>
        </div>
      ) : (
        <div className="flex px-4 bg-red-400 pt-10 gap-4">
          {/* Left Column */}
          <div className="flex-1 max-w-[calc(50%-8px)]">
            {columns[0]?.map((item) => renderProductCard(item))}
          </div>

          {/* Right Column */}
          <div className="flex-1 max-w-[calc(50%-8px)]">
            {columns[1]?.map((item) => renderProductCard(item))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyFilterComp;
