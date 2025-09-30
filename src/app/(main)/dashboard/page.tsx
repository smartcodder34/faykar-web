"use client";

import { FeedCenter } from "@/_components/dashboardComp/FeedCenter";
import { Header } from "../../../_components/dashboardComp/Header";
import { LeftSidebar } from "../../../_components/dashboardComp/LeftSidebar";
import { RightSidebar } from "../../../_components/dashboardComp/RightSidebar";
import { useAuthStore } from "@/lib/store/authStore";
import { useGeolocated } from "react-geolocated";
import axios from "axios";
import React from "react";


export default function DashboardPage() {
  const { location } = useAuthStore();
  const setLocation = useAuthStore((state) => state.setLocation); 


  // console.log(location, "location2000");

  const reserveGeo = async () => {
    try {
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location?.latitude},${location?.longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );
      const response = res.data;
      if (response.results && response.results.length > 0) {
        // Assuming you want the first result's formatted address
        const formattedAddress = response.results[0].formatted_address;
        return formattedAddress;
      } else {
        console.error("No results found.");
      }
    } catch (error) {
      throw error;
    }
  };


  React.useEffect(() => {
    const fetchAddress = async () => {
      if (location && (!location.address || location.address === "")) {
        const address = await reserveGeo();
        setLocation({ ...location, address });
      }
    };
    fetchAddress();
  }, [location]);



  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header />
      
      {/* Location Info Banner */}
      {location && (
        <div className="bg-green-50 border-b border-green-200 px-4 py-2">
          <div className="max-w-[1400px] mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm text-green-800">
                Location: {location.address || `${location.latitude?.toFixed(4)}, ${location.longitude?.toFixed(4)}`}
              </span>
            </div>
            <span className="text-xs text-green-600">
              Accuracy: {location.accuracy ? `${Math.round(location.accuracy)}m` : 'Unknown'}
            </span>
          </div>
        </div>
      )}
      
      {/* Main Layout */}
      <div className="flex max-w-[1400px] mx-auto">
        {/* Left Sidebar - Hidden on mobile, visible on lg+ */}
        <div className="hidden lg:block lg:w-80 xl:w-80 shrink-0">
          <LeftSidebar />
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 min-w-0 w-full lg:w-auto">
          <FeedCenter />
        </div>
        
        {/* Right Sidebar - Hidden on mobile/tablet, visible on xl+ */}
        <div className="hidden xl:block xl:w-80 shrink-0">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}


