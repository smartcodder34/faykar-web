"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";
import DiscoverScreen from "./categoryTag/DiscoverScreen";
import AccountsScreen from "./categoryTag/AccountsScreen";
import CategoryScreen from "./categoryTag/CategoryScreen";
import ApplyFilter from "./categoryTag/ApplyFilter";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("Discover");

  // Category tabs
  const tabs = ["Discover", "Accounts", "Category"];

  const handleFilter = () => {
    setSelectedTab("Filter");
  };

  const renderTab = (tab: string) => (
    <button
      key={tab}
      onClick={() => setSelectedTab(tab)}
      className={`flex-1 py-4 rounded-2xl font-semibold text-base transition-all ${
        selectedTab === tab
          ? "bg-[#2E6939] text-white shadow-md"
          : "bg-gray-300 text-gray-600 hover:bg-gray-400"
      }`}
    >
      {tab}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Search Input */}
        <div className="mb-8">
          <div className="bg-white border-2 border-[#2E6939] rounded-full px-6 py-4 flex items-center gap-3 shadow-sm">
            <Search size={24} className="text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products here....."
              className="flex-1 outline-none text-base placeholder:text-gray-400"
            />
            <button
              onClick={handleFilter}
              className="hover:opacity-70 transition-opacity"
            >
              <SlidersHorizontal size={24} className="text-[#2E6939]" />
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-6">
          <div className="flex gap-4">{tabs.map(renderTab)}</div>
        </div>

        {/* Subtitle Text */}
        {/* Subtitle */}
        <h2 className="text-lg text-gray-600 mb-6 font-light">
          See products available near you
        </h2>

        {/* Content */}
        <div>
          {selectedTab === "Discover" && <DiscoverScreen />}
          {selectedTab === "Accounts" && (
            <AccountsScreen searchQuery={searchQuery} />
          )}
          {selectedTab === "Category" && <CategoryScreen />}
          {selectedTab === "Filter" && <ApplyFilter />}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
