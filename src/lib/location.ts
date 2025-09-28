import { useAuthStore, LocationData } from './store/authStore';

/**
 * Get the current user's location from the auth store
 */
export function getCurrentLocation(): LocationData | null {
  return useAuthStore.getState().location;
}

/**
 * Check if the user has location data
 */
export function hasLocation(): boolean {
  const location = getCurrentLocation();
  return !!(location && location.latitude && location.longitude);
}

/**
 * Get location coordinates as a formatted string
 */
export function getLocationString(): string {
  const location = getCurrentLocation();
  if (!location || !location.latitude || !location.longitude) {
    return 'Location not available';
  }
  
  if (location.address) {
    return location.address;
  }
  
  return `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`;
}

/**
 * Get location accuracy as a formatted string
 */
export function getLocationAccuracy(): string {
  const location = getCurrentLocation();
  if (!location || !location.accuracy) {
    return 'Unknown';
  }
  
  return `${Math.round(location.accuracy)}m`;
}

/**
 * Calculate distance between two coordinates using Haversine formula
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

/**
 * Check if a location is within a certain radius of the user's current location
 */
export function isWithinRadius(
  targetLat: number,
  targetLon: number,
  radiusKm: number
): boolean {
  const location = getCurrentLocation();
  if (!location || !location.latitude || !location.longitude) {
    return false;
  }
  
  const distance = calculateDistance(
    location.latitude,
    location.longitude,
    targetLat,
    targetLon
  );
  
  return distance <= radiusKm;
}
