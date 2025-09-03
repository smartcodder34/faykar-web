import { Header } from '@/_components/dashboardComp/Header'
import { LeftSidebar } from '@/_components/dashboardComp/LeftSidebar'
import { RightSidebar } from '@/_components/dashboardComp/RightSidebar'
import { ProfileCenter } from '@/_components/profileComp/ProfileCenter'
import React from 'react'

const ProfilePage = () => {
  return (
    <div className=" flex bg-gray-100">
      <LeftSidebar />
      <div className=" flex-4">
        <Header />
        <div className=" flex">
          <ProfileCenter />
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage