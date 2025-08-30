"use client";

import DashboardUploader from "@/customComp/DashboardUploader";

export default function DashboardPage() {
  return (
    <div style={{ padding: 24 }}>
      <h1 className="text-2xl font-semibold text-[#2E6939]">Dashboard</h1>
      <p className="text-sm text-gray-600 mb-4">Protected route inside (main).</p>

      <DashboardUploader
        title="Share your Product"
        onUploaded={(urls) => {
          console.log("uploaded urls:", urls);
        }}
      />
    </div>
  );
}

