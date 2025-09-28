"use client";

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Plus, Upload } from 'lucide-react';
import CustomInput from '@/customComp/CustomInput';
import CustomSelect from '@/customComp/CustomSelect';
import CustomButton from '@/customComp/CustomButton';
import LoadingOverlay from '@/customComp/LoadingOverlay';
import ImageUploadComponent from '@/_components/productsComp/createProductComp/ImageUploadComponent';
import { useProductCategories, useSubProductCategories } from '@/lib/api/productsApi/productQuery';
import { useCreateProduct } from '@/lib/api/productsApi/productMutation';

interface Item {
  title: string;
  value: string;
}

interface CreateProductFormValues {
  images: string;
  description: string;
  mainCategory: string;
  subCategory: string;
  deliveryAvailable: string;
  price: string;
}

const mainCategories: Item[] = [
  { title: "SEA FOOD", value: "sea_food" },
  { title: "MEAT", value: "meat" },
  { title: "VEGETABLES", value: "vegetables" },
  { title: "FRUITS", value: "fruits" },
  { title: "DAIRY", value: "dairy" },
  { title: "GRAINS", value: "grains" },
];

const subCategories: Item[] = [
  { title: "Fresh Fish", value: "fresh_fish" },
  { title: "Frozen Fish", value: "frozen_fish" },
  { title: "Shellfish", value: "shellfish" },
  { title: "Crab", value: "crab" },
  { title: "Lobster", value: "lobster" },
];

const CreateProduct = () => {
  const [selectedMainCategory, setSelectedMainCategory] = useState<Item | null>(
    null
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState<Item | null>(
    null
  );
  const [mainCategoryOpen, setMainCategoryOpen] = useState(false);
  const [subCategoryOpen, setSubCategoryOpen] = useState(false);
  const [deliveryAvailable, setDeliveryAvailable] = useState<string>("yes");
  const [isLoading, setIsLoading] = useState(false);

  //upload image
  const [imageSelected, setImageSelected] = React.useState<string | null>(null);
  const [uploadData, setUploadData] = React.useState(Array(4).fill(null));
  const [currentIndex, setCurrentIndex] = React.useState<number | any>();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateProductFormValues>({
    mode: "onChange",
    defaultValues: {
      images: "",
      description: "",
      mainCategory: "",
      subCategory: "",
      deliveryAvailable: "yes",
      price: "",
    },
  });

  //MUTATION
  const getProductCategories = useProductCategories();
  const getSubProductCategories = useSubProductCategories(
    selectedMainCategory?.value
  );
  const createListingMutation = useCreateProduct();

  //category 1 data from api
  const newProductCategory = getProductCategories?.data?.data?.categories.map(
    (v: any) => {
      return {
        title: v.name,
        value: v.id,
      };
    }
  );

  const newSubProductCategory =
    getSubProductCategories?.data?.data?.sub_categories?.map((v: any) => {
      return {
        title: v.name,
        value: v.id,
      };
    });

    console.log("Selected Main Category:", selectedMainCategory);
    // console.log("Selected Sub Category:", selectedSubCategory);
    // console.log("Delivery Available:", deliveryAvailable);
    console.log("Is Form newProductCategory:", newProductCategory);
    console.log("Is Form newSubProductCategory:", newSubProductCategory);

  //form submit

  const onSubmit = async (data: CreateProductFormValues) => {
    setIsLoading(true);
    console.log("Form Data:", {
      ...data,
      mainCategory: selectedMainCategory?.value,
      subCategory: selectedSubCategory?.value,
      deliveryAvailable,
    });

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Handle success/error
    }, 2000);
  };

  return (
    <div className="flex-1 p-3 sm:p-6 overflow-y-auto h-[calc(100vh-56px)]">
      <article className="rounded-2xl bg-white border border-gray-200/70 shadow-sm overflow-hidden max-w-2xl mx-auto">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Create Product
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Add your product details to start selling
            </p>
          </div>

          <LoadingOverlay
            isOpen={isLoading}
            message="Uploading product..."
            animationType="pulse"
          />

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Select Image(s) Field */}
            <div className="my-2 w-full">
              <label className="mb-1 block text-sm font-medium text-black">
                Select Image(s)
              </label>
              {/* <div className="flex items-center rounded-2xl px-3 bg-green-50 border border-green-200" style={{ height: "45px" }}>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="flex-1 bg-transparent p-1 text-sm text-black placeholder-gray-400 focus:outline-none"
                  placeholder="Choose images..."
                />
                <div className="ml-2">
                  <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
                    <Plus className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div> */}

              <ImageUploadComponent />
            </div>

            {/* Description Field */}
            <Controller
              control={control}
              name="description"
              rules={{
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters long",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  label="Description"
                  primary
                  placeholder="Describe your product..."
                  multiline
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.description?.message}
                />
              )}
            />

            {/* Main Category Field */}
            <div className="my-2 w-full">
              <label className="mb-1 block text-sm font-medium text-black">
                Main Category
              </label>
              <CustomSelect
                placeholder="Select main category"
                selected={selectedMainCategory}
                setSelected={setSelectedMainCategory}
                openDropDown={mainCategoryOpen}
                setOpenDropDown={setMainCategoryOpen}
                dataItem={newProductCategory}
                primary
              />
            </div>

            {/* Select Category Field */}
            <div className="my-2 w-full">
              <label className="mb-1 block text-sm font-medium text-black">
                Select Category
              </label>
              <CustomSelect
                placeholder="Select category"
                selected={selectedSubCategory}
                setSelected={setSelectedSubCategory}
                openDropDown={subCategoryOpen}
                setOpenDropDown={setSubCategoryOpen}
                dataItem={newSubProductCategory}
                primary
              />
            </div>

            {/* Is Delivery Available Field */}
            <div className="my-2 w-full">
              <label className="mb-1 block text-sm font-medium text-black">
                Is Delivery Available
              </label>
              <div className="flex items-center gap-6 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="delivery"
                    value="yes"
                    checked={deliveryAvailable === "yes"}
                    onChange={(e) => setDeliveryAvailable(e.target.value)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="delivery"
                    value="no"
                    checked={deliveryAvailable === "no"}
                    onChange={(e) => setDeliveryAvailable(e.target.value)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">No</span>
                </label>
              </div>
            </div>

            {/* Price Field */}
            <Controller
              control={control}
              name="price"
              rules={{
                required: "Price is required",
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message: "Please enter a valid price",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  label="Price"
                  primary
                  placeholder="Enter price"
                  keyboardType="number"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.price?.message}
                />
              )}
            />

            {/* Upload Button */}
            <div className="pt-4">
              <CustomButton
                title="Upload"
                primary
                disabled={
                  !isValid || !selectedMainCategory || !selectedSubCategory
                }
                loading={isLoading}
                onPress={handleSubmit(onSubmit)}
                icon={<Upload className="h-4 w-4" />}
                iconPostion="left"
              />
            </div>
          </form>
        </div>
      </article>
    </div>
  );
};

export default CreateProduct;
