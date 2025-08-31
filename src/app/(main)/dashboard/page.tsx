import Header from '@/customComp/dashboard/Header';
import LeftSidebar from '@/customComp/dashboard/LeftSidebar';
import MainContent from '@/customComp/dashboard/MainContent';
import RightSidebar from '@/customComp/dashboard/RightSidebar';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <LeftSidebar />
        <MainContent />
        <RightSidebar />
      </div>
    </div>
  );
}

