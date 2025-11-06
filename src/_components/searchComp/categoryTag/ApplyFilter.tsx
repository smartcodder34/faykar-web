

"use client";


import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { X } from "lucide-react";
import { useProductCategories } from "@/lib/api/productsApi/productQuery";
import { useDiscoverCategoryMutation } from "@/lib/api/discoversApi/discoverMutation";
import { useLocationSearch } from "@/lib/hooks/useLocationSearch";
import { useGetLocationDetails } from "@/lib/api/googlePlacesApi/googleQuery";
import ApplyFilterComp from "./ApplyFilterComp";
import CustomInput from "@/customComp/CustomInput";
import CustomSelect from "@/customComp/CustomSelect";

interface Item {
  title: string;
  value: string;
}

const ApplyFilter = () => {
  const MIN_DEFAULT = 10;
  const MAX_DEFAULT = 500;

  const [minPrice, setMinPrice] = useState(MIN_DEFAULT.toString());
  const [maxPrice, setMaxPrice] = useState(MAX_DEFAULT.toString());
  // Category states
  const [category1Open, setCategory1Open] = useState(false);
  const [category1Selected, setCategory1Selected] = useState<Item | null>(null);
  const [filterApplied, setFilterApplied] = useState(false);

  // const userLocation = useGetLocation().userLocation;

  const handleFilterApplied =()=>{
    setFilterApplied(true)
  }

  const handlecloseFilterApplied = () => {
    setFilterApplied(false);
  };

  // api calls
  const getProductCategories = useProductCategories();
  const discoverCategoryMutation =
    useDiscoverCategoryMutation(handleFilterApplied);

  //category 1 data from api
  const newProductCategory = getProductCategories?.data?.data?.categories.map(
    (v: any) => {
      return {
        title: v.name,
        value: v.id,
      };
    }
  );

  const { control, handleSubmit, formState } = useForm();
  const {
    term,
    option,
    city,
    handleLocationChange,
    onOptionSelect,
    getSearchOptionQuery,
  } = useLocationSearch();

  const handleAddressSelect = (
    item: any,
    onChange: (value: string) => void
  ) => {
    onChange(item.description);
    onOptionSelect(item);
  };

  const getLocationData = useGetLocationDetails(city?.place_id);

  useEffect(() => {
    if (city) {
      getLocationData.refetch();
    }
  }, [city]);

  console.log("getLocationData", getLocationData?.data);

  const handleApplyFilter = (data: any) => {
    const requestedPayload = {
      location: getLocationData?.data,
      minPrice,
      maxPrice,
      category: category1Selected,
      address: data.address,
    };
    console.log("requestedPayload33", requestedPayload);
    discoverCategoryMutation.mutate(requestedPayload);
  };

  console.log(
    "discoverCategoryMutation",
    discoverCategoryMutation?.data?.data?.products
  );

  const getAllfilterData =
    minPrice !== "" &&
    maxPrice !== "" &&
    category1Selected !== null &&
    getLocationData?.data &&
    discoverCategoryMutation?.data?.data?.products;

  console.log("getAllfilterData", getAllfilterData);

  const handleClose = () => {
    setCategory1Selected(null);
    setMinPrice(MIN_DEFAULT.toString());
    setMaxPrice(MAX_DEFAULT.toString());
    discoverCategoryMutation.reset();
  };

  return (
    <div className=" flex-1 overflow-y-auto">
      <div className="px-5 pt-4">
        {/* Location Section */}
        {filterApplied ? (
          <div>
            <div className="">
              <button
                onClick={handlecloseFilterApplied}
                className="ml-1 flex justify-end w-full"
              >
                <div className="flex items-center">
                  <X size={16} className="text-black" />
                </div>
              </button>
              <div className="flex flex-row justify-between mt-2 gap-2 flex-wrap">
                <div className="bg-green-600 px-4 py-2 rounded-full flex flex-row items-center">
                  <span className="text-white font-medium mr-2">
                    {minPrice} - {maxPrice}
                  </span>
                </div>
                <div className="bg-green-600 px-4 py-2 rounded-full flex flex-row items-center">
                  <span className="text-white font-medium mr-2">
                    {getLocationData?.data?.city}
                  </span>
                </div>
                <div className="bg-green-600 px-4 py-2 rounded-full flex flex-row items-center">
                  <div className="">
                    <span className="text-white font-medium mr-2">
                      {category1Selected?.title}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <ApplyFilterComp
              discoverCategoryMutation={discoverCategoryMutation}
            />
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Location
              </h2>

              <div className="my-3">
                <Controller
                  control={control}
                  name="address"
                  rules={{
                    required: "Address is required",
                  }}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <div className="relative">
                      <CustomInput
                        primary
                        label="Address"
                        placeholder="Enter your address"
                        value={term?.description || value}
                        onChangeText={(text?: string) => {
                          const val = text ?? "";
                          onChange(val);
                          handleLocationChange(val);
                        }}
                        onBlur={onBlur}
                      />

                      {term && (
                        <div className="z-50 max-h-60 overflow-y-auto bg-gray-50 w-full rounded-lg mt-2 shadow-lg">
                          {getSearchOptionQuery.isLoading ? (
                            <p className="py-10 text-center">Loading...</p>
                          ) : getSearchOptionQuery.isError ? (
                            <p className="py-10 text-center">
                              Something went wrong
                            </p>
                          ) : (
                            option.map((item: any) => (
                              <button
                                key={item.place_id}
                                className="w-full text-left my-2 px-3 py-2 hover:bg-gray-100 transition-colors"
                                onClick={() =>
                                  handleAddressSelect(item, onChange)
                                }
                              >
                                <span className="text-purple-600">
                                  {item.description}
                                </span>
                              </button>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>

            {/* Price Range Section */}
            <div className="mb-6">
              <div className="flex flex-row justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-green-700">
                  Price Range
                </h2>
                <span className="text-base font-medium text-gray-600">
                  ${minPrice}-${maxPrice}
                </span>
              </div>

              {/* Range Slider Visual */}
              {/* <div className="mb-4">
                <div className="h-1 bg-gray-200 rounded-full relative">
                  <div
                    className="h-1 bg-green-700 rounded-full absolute"
                    style={{ width: "70%" }}
                  />
                </div>
                <div className="flex flex-row justify-between mt-2 relative">
                  <div
                    className="w-5 h-5 bg-green-700 rounded-full -mt-5 absolute"
                    style={{ left: "0%" }}
                  />
                  <div
                    className="w-5 h-5 bg-green-700 rounded-full -mt-5 absolute"
                    style={{ right: "30%" }}
                  />
                </div>
              </div> */}

              {/* Range Slider Visual */}
              <div className="mb-4">
                <div className="h-1 bg-gray-200 rounded-full relative">
                  <div
                    className="h-1 bg-green-700 rounded-full absolute"
                    style={{
                      left: `${
                        ((parseInt(minPrice) - MIN_DEFAULT) /
                          (MAX_DEFAULT - MIN_DEFAULT)) *
                        100
                      }%`,
                      width: `${
                        ((parseInt(maxPrice) - parseInt(minPrice)) /
                          (MAX_DEFAULT - MIN_DEFAULT)) *
                        100
                      }%`,
                    }}
                  />
                </div>
                <div className="flex flex-row justify-between mt-2 relative">
                  <input
                    type="range"
                    min={MIN_DEFAULT}
                    max={MAX_DEFAULT}
                    value={minPrice}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (value < parseInt(maxPrice)) {
                        setMinPrice(value.toString());
                      }
                    }}
                    className="absolute w-full opacity-0 cursor-pointer"
                    style={{ top: "-10px" }}
                  />
                  <div
                    className="w-5 h-5 bg-green-700 rounded-full -mt-5 absolute pointer-events-none"
                    style={{
                      left: `${
                        ((parseInt(minPrice) - MIN_DEFAULT) /
                          (MAX_DEFAULT - MIN_DEFAULT)) *
                        100
                      }%`,
                      transform: "translateX(-50%)",
                    }}
                  />
                  <input
                    type="range"
                    min={MIN_DEFAULT}
                    max={MAX_DEFAULT}
                    value={maxPrice}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (value > parseInt(minPrice)) {
                        setMaxPrice(value.toString());
                      }
                    }}
                    className="absolute w-full opacity-0 cursor-pointer"
                    style={{ top: "-10px" }}
                  />
                  <div
                    className="w-5 h-5 bg-green-700 rounded-full -mt-5 absolute pointer-events-none"
                    style={{
                      left: `${
                        ((parseInt(maxPrice) - MIN_DEFAULT) /
                          (MAX_DEFAULT - MIN_DEFAULT)) *
                        100
                      }%`,
                      transform: "translateX(-50%)",
                    }}
                  />
                </div>
              </div>

              {/* Min Max Inputs */}
              <div className="flex flex-row gap-4 mt-6">
                <div className="flex-1">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Min"
                    className="border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-900 w-full placeholder:text-gray-400"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Max"
                    className="border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-900 w-full placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Category Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Category
              </h2>

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

            {/* Apply Filter Button */}
            <button
              onClick={handleSubmit(handleApplyFilter)}
              className="bg-green-700 rounded-full py-4 w-full text-center mb-8 hover:bg-green-800 transition-colors active:scale-98"
            >
              <span className="text-white text-base font-semibold">
                Apply Filter
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyFilter;
