"use client";

import React, { useState, useEffect } from 'react';
import { useGeolocation } from '@/lib/hooks/useGeolocation';
import { useAuthStore } from '@/lib/store/authStore';
import CustomButton from './CustomButton';
import LoadingOverlay from './LoadingOverlay';

interface LocationPermissionProps {
  onLocationDetected?: (location: any) => void;
  onSkip?: () => void;
  showSkip?: boolean;
}

export default function LocationPermission({ 
  onLocationDetected, 
  onSkip, 
  showSkip = true 
}: LocationPermissionProps) {
  const [showPermission, setShowPermission] = useState(false);
  const [hasRequested, setHasRequested] = useState(false);
  const { location, error, loading, getCurrentPosition } = useGeolocation();
  const { setLocation } = useAuthStore();

  useEffect(() => {
    // Check if location permission was already granted
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted') {
          // Permission already granted, get location immediately
          getCurrentPosition();
        } else if (result.state === 'prompt') {
          // Permission not yet requested, show permission dialog
          setShowPermission(true);
        } else {
          // Permission denied, show permission dialog
          setShowPermission(true);
        }
      });
    } else {
      // Fallback for browsers that don't support permissions API
      setShowPermission(true);
    }
  }, [getCurrentPosition]);

  useEffect(() => {
    if (location.latitude && location.longitude && !hasRequested) {
      setHasRequested(true);
      setLocation(location);
      onLocationDetected?.(location);
      setShowPermission(false);
    }
  }, [location, setLocation, onLocationDetected, hasRequested]);

  const handleAllowLocation = () => {
    getCurrentPosition();
  };

  const handleSkip = () => {
    setShowPermission(false);
    onSkip?.();
  };

  if (!showPermission) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl">
        <div className="text-center">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Location Access
          </h3>
          
          <p className="text-sm text-gray-600 mb-6">
            We'd like to access your location to provide you with location-based features and personalized content.
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">
                {error.message}
              </p>
            </div>
          )}

          <div className="flex flex-col space-y-3">
            <CustomButton
              title={loading ? "Detecting Location..." : "Allow Location Access"}
              style={{
                backgroundColor: "#2E7D32",
                color: "#fff",
                width: "100%",
                height: 48,
              }}
              onPress={handleAllowLocation}
              disabled={loading}
            />
            
            {showSkip && (
              <button
                onClick={handleSkip}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
                disabled={loading}
              >
                Skip for now
              </button>
            )}
          </div>
        </div>
      </div>
      
      {loading && (
        <LoadingOverlay
          isOpen={loading}
          message="Getting your location..."
          animationType="pulse"
        />
      )}
    </div>
  );
}


