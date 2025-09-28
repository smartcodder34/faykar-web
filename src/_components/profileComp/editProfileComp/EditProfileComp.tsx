import { PostCard } from '@/_components/dashboardComp/PostCard'
import React from 'react'
import ProfileBox from '../ProfileBox'
import EditDetailsCard from './EditDetailsCard';

export default function EditProfileComp() {
  return (
    <main className="flex-1 p-3 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto h-[calc(100vh-56px)]">
      <ProfileBox />
      <EditDetailsCard />
    </main>
  );
}
