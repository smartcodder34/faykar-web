"use client";


import CustomSelect from "@/customComp/CustomSelect";
import { useDiscoverCategory, usePopularSearched } from "@/lib/api/discoversApi/discoverQuery";
import { useProductCategories } from "@/lib/api/productsApi/productQuery";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Item {
  title: string;
  value: string;
}

const CategoryScreen = () => {
  // Category states
  const [category1Open, setCategory1Open] = useState(false);
  const [category1Selected, setCategory1Selected] = useState<Item | null>(null);

  const getProductCategories = useProductCategories();
  const getDiscoverCategory = useDiscoverCategory(category1Selected);
  const getPopularSearched = usePopularSearched();

  const popularData = getPopularSearched?.data?.data;
  const getProductCategory = getDiscoverCategory?.data?.data?.products;

  console.log("category1Selected", category1Selected);
  console.log(
    "getDiscoverCategory55000",
    getDiscoverCategory?.data?.data?.products
  );

  useEffect(() => {
    if (category1Selected) {
      getDiscoverCategory.refetch();
    }
  }, [category1Selected]);

  //category 1 data from api
  const newProductCategory = getProductCategories?.data?.data?.categories.map(
    (v: any) => {
      return {
        title: v.name,
        value: v.id,
      };
    }
  );

  const products = [
    {
      id: 1,
      image: "https://example.com/burger.jpg",
      height: 200, // Tall
    },
    {
      id: 2,
      image: "https://example.com/jeans.jpg",
      height: 150, // Medium
    },
    {
      id: 3,
      image: "https://example.com/blazer.jpg",
      height: 180, // Medium-tall
    },
    {
      id: 4,
      image: "https://example.com/bananas.jpg",
      height: 150, // Medium
    },
    {
      id: 5,
      image: "https://example.com/shoes.jpg",
      height: 180, // Medium-tall
    },
    {
      id: 6,
      image: "https://example.com/strawberry.jpg",
      height: 180, // Medium-tall
    },
  ];

  // Split products into two columns for masonry layout
  const splitIntoColumns = (data: any[], numColumns: number = 2) => {
    const columns: any[][] = Array.from({ length: numColumns }, () => []);
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

  const columns = splitIntoColumns(products);
  console.log("columns", columns);

  const renderProductCard = (item: any) => (
    <div
      key={item.id}
      className="bg-white rounded-2xl overflow-hidden mb-4 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <img
        src={item.image}
        alt={`Product ${item.id}`}
        className="w-full object-cover"
        style={{ height: item.height }}
      />
    </div>
  );

  return (
    <div className="bg-white flex-1 min-h-screen">
      {/* Category Header */}

      {category1Selected ? (
        <div>
          <div className="px-5 pt-4 pb-3">
            <h2 className="text-xl font-bold text-green-700">Category</h2>
            <div className="flex items-center gap-2 mt-2">
              <div className="bg-green-600 px-4 py-2 rounded-full flex items-center">
                <span className="text-white font-medium mr-2">
                  {category1Selected?.title}
                </span>
                <button
                  onClick={() => setCategory1Selected(null)}
                  className="ml-1 hover:bg-green-700 rounded-full p-0.5 transition-colors"
                  aria-label="Remove category filter"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-white overflow-y-auto">
            {getProductCategory?.length === 0 ? (
              <div className="flex items-center justify-center py-20">
                <p className="text-gray-400 text-base">
                  No {category1Selected?.title} found
                </p>
              </div>
            ) : (
              <div className="flex px-4 pt-10 gap-4">
                {/* Left Column */}
                <div className="flex-1">
                  {columns[0]?.map((item) => renderProductCard(item))}
                </div>

                {/* Right Column */}
                <div className="flex-1">
                  {columns[1]?.map((item) => renderProductCard(item))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="px-5 pt-4 pb-3">
            <h2 className="text-xl font-bold text-green-700">Category</h2>
          </div>

          {/* Dropdown */}
          <div className="px-5 mb-6">
            <CustomSelect
              label="Select Category"
              primary
              selected={category1Selected}
              setSelected={setCategory1Selected}
              openDropDown={category1Open}
              setOpenDropDown={setCategory1Open}
              placeholder="Choose category"
              dataItem={newProductCategory}
            />
          </div>

          <div className="px-5 pb-3">
            <h3 className="text-lg font-semibold text-gray-800">
              Popular Search
            </h3>
          </div>

          {/* Popular Search List */}
          <div className="px-5 overflow-y-auto">
            {popularData?.length === 0 ? (
              <div className="flex items-center justify-center py-20">
                <p className="text-gray-400 text-base">No popular search</p>
              </div>
            ) : (
              popularData?.map((item: any) => (
                <button
                  key={item.id}
                  className="flex w-full my-1 items-center p-3 rounded-2xl bg-green-700  hover:bg-green-800 transition-colors"
                >
                  {/* Product Info */}
                  <div>
                    <p className="text-base font-semibold text-white mb-1 text-left">
                      {item.term}
                    </p>
                    <p className="text-sm text-white text-left">
                      total search: {item.total_searches}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryScreen;
