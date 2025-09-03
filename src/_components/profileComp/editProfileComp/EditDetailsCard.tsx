"use client";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CustomInput from "@/customComp/CustomInput";
import CustomButton from "@/customComp/CustomButton";
import { User, Mail, MapPin } from "lucide-react";
import CustomSelect from "@/customComp/CustomSelect";

type EditProfileFormValues = {
  username: string;
  email: string;
  address: string;
};

export default function EditDetailsCard() {
    const [selectedSex, setSelectedSex] = useState(null);
    const [sexDropdownOpen, setSexDropdownOpen] = useState(false);


    const sexOptions = [
      { title: "Male", value: "male" },
      { title: "Female", value: "female" },
    ];
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: "Namaha Chandra", // Pre-filled with current user data
      email: "namaha.chandra@example.com",
      address: "123 Main Street, City, Country",
    },
  });

  const onSubmit = async (data: EditProfileFormValues) => {
    console.log("Update profile data:", data);
    // Here you would typically call your API to update the profile
    // Example: updateProfile.mutate(data);
  };

  return (
    <article className="rounded-2xl bg-white border border-gray-200/70 shadow-sm overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Edit Profile</h2>
          <p className="text-sm text-gray-600 mt-1">
            Update your personal information
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username Field */}
          <Controller
            control={control}
            name="username"
            rules={{
              required: "Username is required",
              minLength: {
                value: 2,
                message: "Username must be at least 2 characters long",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <CustomInput
                  primary
                  placeholder="Enter your username"
                  leftIcon={<User size={18} className="text-gray-400" />}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.username?.message}
                />
              </div>
            )}
          />

          {/* Email Field */}
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <CustomInput
                  primary
                  placeholder="Enter your email address"
                  leftIcon={<Mail size={18} className="text-gray-400" />}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.email?.message}
                />
              </div>
            )}
          />

          {/* Address Field */}
          <Controller
            control={control}
            name="address"
            rules={{
              required: "Address is required",
              minLength: {
                value: 10,
                message: "Please provide a complete address",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <CustomInput
                  primary
                  placeholder="Enter your full address"
                  leftIcon={<MapPin size={18} className="text-gray-400" />}
                  multiline
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.address?.message}
                />
              </div>
            )}
          />

          <CustomSelect
            label="Sex"
            placeholder="Select your sex"
            selected={selectedSex}
            setSelected={setSelectedSex}
            openDropDown={sexDropdownOpen}
            setOpenDropDown={setSexDropdownOpen}
            dataItem={sexOptions}
            primary={true}
          />

          {/* Update Button */}
          <div className="pt-4">
            <CustomButton
              title="Update Profile"
              primary
              disabled={!isValid}
              onPress={handleSubmit(onSubmit)}
            />
          </div>
        </form>
      </div>
    </article>
  );
}