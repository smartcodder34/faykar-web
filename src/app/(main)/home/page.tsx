// // src/app/(main)/homepage/page.tsx
// "use client";

// import React from "react";
// // import MainLayout from "@/components/layout/MainLayout";
// import Header from "@/components/layout/Header";
// import Sidebar from "@/components/layout/Sidebar";
// import RightSidebar from "@/components/layout/RightSidebar";
// import ShareProductSection from "@/components/homepage/ShareProductSection";
// import ProductGrid from "@/components/homepage/ProductGrid";
// import SponsoredPost from "@/components/homepage/SponsoredPost";

// export default function HomePage() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
//       <div className="flex">
//         <Sidebar />
//         <main className="flex-1 p-6 ml-64 mr-80">
//           <div className="max-w-4xl mx-auto space-y-6">
//             <ShareProductSection />
//             <ProductGrid />
//             <SponsoredPost />
//           </div>
//         </main>
//         <RightSidebar />
//       </div>
//     </div>
//   );
// }


// // src/app/(main)/page.tsx (or homepage/page.tsx)
// "use client";

// import React from "react";
// import Header from "@/components/layout/Header";
// import Sidebar from "@/components/layout/Sidebar";
// import RightSidebar from "@/components/layout/RightSidebar";
// import ShareProductSection from "@/components/homepage/ShareProductSection";
// import ProductGrid from "@/components/homepage/ProductGrid";
// import SponsoredPost from "@/components/homepage/SponsoredPost";

// export default function HomePage() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
//       <div className="flex pt-16">
//         <Sidebar />
//         <main className="flex-1 p-6 ml-64 mr-80">
//           <div className="max-w-4xl mx-auto space-y-6">
//             <ShareProductSection />
//             <ProductGrid />
//             <SponsoredPost />
//           </div>
//         </main>
//         <RightSidebar />
//       </div>
//     </div>
//   );
// }


// src/app/(main)/page.tsx
"use client";

import React from "react";
import ResponsiveLayout from "@/components/layout/ResponsiveLayout";
import ShareProductSection from "@/components/homepage/ShareProductSection";
import StoriesRow from "@/components/homepage/StoriesRow";
import SponsoredPost from "@/components/homepage/SponsoredPost";

export default function HomePage() {
  return (
    <ResponsiveLayout>
      <div className="space-y-6">
        <ShareProductSection />
        <StoriesRow />
        <SponsoredPost />
      </div>
    </ResponsiveLayout>
  );
}