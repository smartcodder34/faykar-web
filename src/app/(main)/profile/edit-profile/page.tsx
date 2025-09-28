import { Header } from '@/_components/dashboardComp/Header'
import { LeftSidebar } from '@/_components/dashboardComp/LeftSidebar'
import { RightSidebar } from '@/_components/dashboardComp/RightSidebar'
import EditProfileComp from '@/_components/profileComp/editProfileComp/EditProfileComp';
import React from 'react'

export default function EditProfile() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header />
      
      {/* Main Layout */}
      <div className="flex max-w-[1400px] mx-auto">
        {/* Left Sidebar - Hidden on mobile, visible on lg+ */}
        <div className="hidden lg:block lg:w-80 xl:w-80 shrink-0">
          <LeftSidebar />
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 min-w-0 w-full lg:w-auto">
          <EditProfileComp />
        </div>
        
        {/* Right Sidebar - Hidden on mobile/tablet, visible on xl+ */}
        <div className="hidden xl:block xl:w-80 shrink-0">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
