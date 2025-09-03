import { Header } from '@/_components/dashboardComp/Header'
import { LeftSidebar } from '@/_components/dashboardComp/LeftSidebar'
import { RightSidebar } from '@/_components/dashboardComp/RightSidebar'
import EditProfileComp from '@/_components/profileComp/editProfileComp/EditProfileComp';
import React from 'react'

export default function EditProfile() {
  return (
    <div className=" flex bg-gray-100 ">
      <LeftSidebar />
      <div className=" flex-4">
        <Header />
        <div className=" flex">
          <EditProfileComp />
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
