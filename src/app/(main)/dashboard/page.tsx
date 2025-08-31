import React from 'react';
import { Header, LeftSidebar, MainContent, RightSidebar } from '@/customComp';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Main Layout */}
      <div className="flex">
        {/* Left Sidebar */}
        <LeftSidebar />
        
        {/* Main Content */}
        <MainContent />
        
        {/* Right Sidebar */}
        <RightSidebar />
      </div>
    </div>
  );
}

