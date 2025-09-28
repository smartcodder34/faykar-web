"use client";

import { useEffect, useState } from 'react';
import { useGeolocation } from './useGeolocation';
import { useAuthStore } from '../store/authStore';

export function useLocationAfterLogin() {
  const [showLocationPermission, setShowLocationPermission] = useState(false);
  const [hasDetectedLocation, setHasDetectedLocation] = useState(false);
  const { location, error, loading, getCurrentPosition } = useGeolocation();
  const { setLocation, location: storedLocation } = useAuthStore();

  useEffect(() => {
    // Check if user is logged in and doesn't have location stored
    const isLoggedIn = useAuthStore.getState().isLoggedIn();
    
    if (isLoggedIn && !storedLocation && !hasDetectedLocation) {
      // Check if geolocation is supported
      if (navigator.geolocation) {
        // Check permission status
        if (navigator.permissions) {
          navigator.permissions.query({ name: 'geolocation' }).then((result) => {
            if (result.state === 'granted') {
              // Permission already granted, get location immediately
              getCurrentPosition();
            } else if (result.state === 'prompt') {
              // Show permission dialog
              setShowLocationPermission(true);
            }
            // If denied, don't show permission dialog
          });
        } else {
          // Fallback for browsers that don't support permissions API
          setShowLocationPermission(true);
        }
      }
    }
  }, [storedLocation, hasDetectedLocation, getCurrentPosition]);

  useEffect(() => {
    if (location.latitude && location.longitude && !hasDetectedLocation) {
      setHasDetectedLocation(true);
      setLocation(location);
      setShowLocationPermission(false);
    }
  }, [location, setLocation, hasDetectedLocation]);

  const handleAllowLocation = () => {
    getCurrentPosition();
  };

  const handleSkipLocation = () => {
    setShowLocationPermission(false);
    setHasDetectedLocation(true);
  };

  return {
    showLocationPermission,
    location,
    error,
    loading,
    handleAllowLocation,
    handleSkipLocation,
    hasDetectedLocation,
  };
}
