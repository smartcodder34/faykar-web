"use client";

import { useState, useEffect, useCallback } from 'react';
import { useGeolocated } from "react-geolocated";


export interface LocationData {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  timestamp: number | null;
  address?: string;
  city?: string;
  country?: string;
}

export interface GeolocationError {
  code: number;
  message: string;
}

export interface UseGeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
  watchPosition?: boolean;
}

export interface UseGeolocationReturn {
  location: LocationData;
  error: GeolocationError | null;
  loading: boolean;
  getCurrentPosition: () => void;
  watchPosition: () => void;
  clearWatch: () => void;
  getAddressFromCoords: (lat: number, lng: number) => Promise<string>;
}

const defaultLocation: LocationData = {
  latitude: null,
  longitude: null,
  accuracy: null,
  timestamp: null,
};

export function useGeolocation(options: UseGeolocationOptions = {}): UseGeolocationReturn {
  const {
    enableHighAccuracy = true,
    timeout = 10000,
    maximumAge = 300000, // 5 minutes
    watchPosition = false,
  } = options;

  const [location, setLocation] = useState<LocationData>(defaultLocation);
  const [error, setError] = useState<GeolocationError | null>(null);
  const [loading, setLoading] = useState(false);
  const [watchId, setWatchId] = useState<number | null>(null);

  const getAddressFromCoords = useCallback(async (lat: number, lng: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
      const data = await response.json();
      
      if (data.city && data.countryName) {
        return `${data.city}, ${data.countryName}`;
      }
      return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    } catch (err) {
      console.error('Error fetching address:', err);
      return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    }
  }, []);

  const successCallback = useCallback(async (position: GeolocationPosition) => {
    const { latitude, longitude, accuracy } = position.coords;
    const timestamp = position.timestamp;
    
    setLocation({
      latitude,
      longitude,
      accuracy,
      timestamp,
    });
    
    setError(null);
    setLoading(false);

    // Get address from coordinates
    try {
      const address = await getAddressFromCoords(latitude, longitude);
      setLocation(prev => ({
        ...prev,
        address,
      }));
    } catch (err) {
      console.error('Error getting address:', err);
    }
  }, [getAddressFromCoords]);

  const errorCallback = useCallback((error: GeolocationPositionError) => {
    let errorMessage = 'Unknown error occurred';
    
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMessage = 'Location access denied by user';
        break;
      case error.POSITION_UNAVAILABLE:
        errorMessage = 'Location information is unavailable';
        break;
      case error.TIMEOUT:
        errorMessage = 'Location request timed out';
        break;
    }

    setError({
      code: error.code,
      message: errorMessage,
    });
    setLoading(false);
  }, []);

  const getCurrentPosition = useCallback(() => {
    if (!navigator.geolocation) {
      setError({
        code: -1,
        message: 'Geolocation is not supported by this browser',
      });
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      successCallback,
      errorCallback,
      {
        enableHighAccuracy,
        timeout,
        maximumAge,
      }
    );
  }, [enableHighAccuracy, timeout, maximumAge, successCallback, errorCallback]);

  const watchPositionCallback = useCallback(() => {
    if (!navigator.geolocation) {
      setError({
        code: -1,
        message: 'Geolocation is not supported by this browser',
      });
      return;
    }

    setLoading(true);
    setError(null);

    const id = navigator.geolocation.watchPosition(
      successCallback,
      errorCallback,
      {
        enableHighAccuracy,
        timeout,
        maximumAge,
      }
    );

    setWatchId(id);
  }, [enableHighAccuracy, timeout, maximumAge, successCallback, errorCallback]);

  const clearWatch = useCallback(() => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
  }, [watchId]);

  // Auto-start watching position if enabled
  useEffect(() => {
    if (watchPosition) {
      watchPositionCallback();
    }

    return () => {
      clearWatch();
    };
  }, [watchPosition, watchPositionCallback, clearWatch]);

  return {
    location,
    error,
    loading,
    getCurrentPosition,
    watchPosition: watchPositionCallback,
    clearWatch,
    getAddressFromCoords,
  };
}


