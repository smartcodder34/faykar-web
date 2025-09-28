"use client";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CustomInput from "@/customComp/CustomInput";
import CustomButton from "@/customComp/CustomButton";
import { User, Mail, MapPin, FileText } from "lucide-react";
import CustomSelect from "@/customComp/CustomSelect";
import { useGetUserApi } from "@/lib/hooks/useGetUserApi";
import { useEditUser } from "@/lib/hooks/useRegister";
import LoadingOverlay from "@/customComp/LoadingOverlay";

type EditProfileFormValues = {
  full_name: string;
  phone_number: string;
  email: string;
  region: string;
  bio: string;
};

interface Item {
  title: string;
  value: string;
  price?: string;
}
const sexOptions = [
  { title: "Male", value: "male" },
  { title: "Female", value: "female" },
  { title: "Others", value: "others" },
];

export default function EditDetailsCard() {
  const [selectedSex, setSelectedSex] = useState<Item | null>(null);
  const [sexDropdownOpen, setSexDropdownOpen] = useState(false);

  const getUserData = useGetUserApi();
  const editUserProfile = useEditUser();

  console.log("selectedSex:", selectedSex);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      full_name: "",
      phone_number: "",
      email: "",
      address: "",
      bio: "",
      region: "kwara",
    },
  });

  React.useEffect(() => {
    if (getUserData?.data) {
      const userData = getUserData.data.data.gender;

      reset({
        full_name: getUserData?.data?.data?.full_name,
        phone_number: getUserData?.data?.data?.phone_number?.toString() || "",
        email: getUserData?.data?.data?.email,
        bio: getUserData?.data?.data?.bio || "",
        region: getUserData?.data?.data?.region || "",
      });
      const matchingGender = sexOptions.find((item) => item.value === userData);
      setSelectedSex(matchingGender || null);
    }
  }, [getUserData?.data, reset]);

  const onSubmit = (data: EditProfileFormValues) => {
    console.log("Form Data:", data);
    editUserProfile.mutate({
      full_name: data.full_name || getUserData?.data?.data?.full_name,
      email: data.email || getUserData?.data?.data?.email,
      region: data.region || getUserData?.data?.data?.region,
      bio: data.bio || getUserData?.data?.data?.bio,
      gender: selectedSex?.value || "",
    });
  };

  return (
    <article className="rounded-2xl bg-white border border-gray-200/70 shadow-sm overflow-hidden">
      <LoadingOverlay
        isOpen={editUserProfile.isPending}
        message="updating..."
        animationType="pulse"
      />
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
            name="full_name"
            rules={{
              required: "Username is required",
              minLength: {
                value: 2,
                message: "Username must be at least 2 characters long",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                label="full name"
                primary
                placeholder="Enter your username"
                leftIcon={<User size={18} className="text-gray-400" />}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors.full_name?.message}
              />
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
              <CustomInput
                label=" Email Address"
                primary
                placeholder="Enter your email address"
                leftIcon={<Mail size={18} className="text-gray-400" />}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors.email?.message}
              />
            )}
          />

          {/* Address Field */}
          <Controller
            control={control}
            name="region"
            rules={{
              required: "Region is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                label="Region"
                primary
                placeholder="Enter your full address"
                leftIcon={<MapPin size={18} className="text-gray-400" />}
                // multiline
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors.region?.message}
              />
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

          {/* Bio Field */}
          <Controller
            control={control}
            name="bio"
            rules={{
              required: "Bio is required",
              // maxLength: {
              //   value: 500,
              //   message: "Bio must not exceed 500 characters",
              // },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                label="Bio"
                primary
                placeholder="Tell us about yourself..."
                leftIcon={<FileText size={18} className="text-gray-400" />}
                // multiline
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors.bio?.message}
              />
            )}
          />

          {/* Update Button */}
          <div className="pt-4">
            <CustomButton
              title="Update Profile"
              primary
              disabled={!isValid}
              loading={editUserProfile.isPending}
              onPress={handleSubmit(onSubmit)}
            />
          </div>
        </form>
      </div>
    </article>
  );
}
