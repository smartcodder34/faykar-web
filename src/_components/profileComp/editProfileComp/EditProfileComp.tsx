import { PostCard } from '@/_components/dashboardComp/PostCard'
import React from 'react'
import ProfileBox from '../ProfileBox'
import EditDetailsCard from './EditDetailsCard';

export default function EditProfileComp() {
  return (
    <main className="w-full max-w-2xl mx-auto space-y-5 px-3 md:px-0">
      {/* <ShareBox /> */}
      <ProfileBox />
      <EditDetailsCard />
    </main>
  );
}
