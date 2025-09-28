
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import { useLocationAfterLogin } from "@/lib/hooks/useLocationAfterLogin";
import LocationPermission from "@/customComp/LocationPermission";


export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter();
  const {
    showLocationPermission,
    handleAllowLocation,
    handleSkipLocation,
  } = useLocationAfterLogin();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace("/login");
    }
  }, [router]);

  if (!isLoggedIn()) {
    return null;
  }

  return (
    <>
      {children}
      {showLocationPermission && (
        <LocationPermission
          onLocationDetected={handleAllowLocation}
          onSkip={handleSkipLocation}
          showSkip={true}
        />
      )}
    </>
  );
}

