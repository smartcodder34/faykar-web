"use client";
import { Header } from "@/_components/dashboardComp/Header";
import { LeftSidebar } from "@/_components/dashboardComp/LeftSidebar";
import { RightSidebar } from "@/_components/dashboardComp/RightSidebar";
import ViewProfileComp from "@/_components/profileComp/viewProfileComp/ViewProfileComp";
import LoadingOverlay from "@/customComp/LoadingOverlay";
import { useViewProduct } from "@/lib/api/productsApi/productQuery";
import { useParams } from "next/navigation";
import React from "react";

export default function ViewProfile() {
  const params = useParams();
  const itemId = typeof params.id === "string" ? params.id : "";
  
  const viewUserProduct = useViewProduct(itemId);

  console.log(viewUserProduct, "viewUserProductBB");
  React.useEffect(() => {
    if (itemId) {
      console.log("View Product Data:", viewUserProduct.data);
      viewUserProduct.refetch();
    }
  }, [itemId]);

  return (
    <div className="min-h-screen bg-gray-100">
      <LoadingOverlay
        isOpen={viewUserProduct.isLoading}
        message="logging in..."
        animationType="pulse"
      />
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
          <ViewProfileComp viewUserProduct={viewUserProduct} />
        </div>

        {/* Right Sidebar - Hidden on mobile/tablet, visible on xl+ */}
        <div className="hidden xl:block xl:w-80 shrink-0">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
