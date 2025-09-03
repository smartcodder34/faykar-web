import { FeedCenter } from "@/_components/dashboardComp/FeedCenter";
import { DashboardShell } from "../../../_components/dashboardComp/DashboardShell";
import { Header } from "../../../_components/dashboardComp/Header";
import { LeftSidebar } from "../../../_components/dashboardComp/LeftSidebar";
import { RightSidebar } from "../../../_components/dashboardComp/RightSidebar";

export default function DashboardPage() {
  // return <DashboardShell />;
  return (
    <div className=" flex bg-gray-100 ">
      <LeftSidebar />
      <div className=" flex-4">
        <Header />
        <div className=" flex">
          <FeedCenter />
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}


