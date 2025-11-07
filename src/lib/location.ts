// import { useAuthStore, LocationData } from './store/authStore';

// /**
//  * Get the current user's location from the auth store
//  */
// export function getCurrentLocation(): LocationData | null {
//   return useAuthStore.getState().location;
// }

// /**
//  * Check if the user has location data
//  */
// export function hasLocation(): boolean {
//   const location = getCurrentLocation();
//   return !!(location && location.latitude && location.longitude);
// }

// /**
//  * Get location coordinates as a formatted string
//  */
// export function getLocationString(): string {
//   const location = getCurrentLocation();
//   if (!location || !location.latitude || !location.longitude) {
//     return 'Location not available';
//   }
  
//   if (location.address) {
//     return location.address;
//   }
  
//   return `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`;
// }

// /**
//  * Get location accuracy as a formatted string
//  */
// export function getLocationAccuracy(): string {
//   const location = getCurrentLocation();
//   if (!location || !location.accuracy) {
//     return 'Unknown';
//   }
  
//   return `${Math.round(location.accuracy)}m`;
// }

// /**
//  * Calculate distance between two coordinates using Haversine formula
//  */
// export function calculateDistance(
//   lat1: number,
//   lon1: number,
//   lat2: number,
//   lon2: number
// ): number {
//   const R = 6371; // Radius of the Earth in kilometers
//   const dLat = (lat2 - lat1) * Math.PI / 180;
//   const dLon = (lon2 - lon1) * Math.PI / 180;
//   const a = 
//     Math.sin(dLat/2) * Math.sin(dLat/2) +
//     Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
//     Math.sin(dLon/2) * Math.sin(dLon/2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//   const distance = R * c; // Distance in kilometers
//   return distance;
// }

// /**
//  * Check if a location is within a certain radius of the user's current location
//  */
// export function isWithinRadius(
//   targetLat: number,
//   targetLon: number,
//   radiusKm: number
// ): boolean {
//   const location = getCurrentLocation();
//   if (!location || !location.latitude || !location.longitude) {
//     return false;
//   }
  
//   const distance = calculateDistance(
//     location.latitude,
//     location.longitude,
//     targetLat,
//     targetLon
//   );
  
//   return distance <= radiusKm;
// }



// import { useAuthStore, LocationData } from "./store/authStore";

// /**
//  * Get the current user's location from the auth store
//  */
// export function getCurrentLocation(): LocationData | null {
//   return useAuthStore.getState().location;
// }

// /**
//  * Check if the user has location data
//  */
// export function hasLocation(): boolean {
//   const location = getCurrentLocation();
//   return !!(location && location.latitude && location.longitude);
// }

// /**
//  * Get location coordinates as a formatted string
//  */
// export function getLocationString(): string {
//   const location = getCurrentLocation();
//   if (!location || !location.latitude || !location.longitude) {
//     return "Location not available";
//   }

//   // If we have an address, return it
//   if (location.address && location.address.trim()) {
//     return location.address;
//   }

//   // If we have city and country, combine them
//   if (location.city && location.country) {
//     return `${location.city}, ${location.country}`;
//   }

//   // If we only have country
//   if (location.country) {
//     return location.country;
//   }

//   // Fallback to coordinates with a more user-friendly format
//   return `${location.latitude.toFixed(4)}°N, ${location.longitude.toFixed(
//     4
//   )}°E`;
// }

// /**
//  * Get location accuracy as a formatted string
//  */
// export function getLocationAccuracy(): string {
//   const location = getCurrentLocation();
//   if (!location || !location.accuracy) {
//     return "Unknown";
//   }

//   const accuracy = Math.round(location.accuracy);
//   if (accuracy > 1000) {
//     return `~${Math.round(accuracy / 1000)}km`;
//   }
//   return `~${accuracy}m`;
// }

// /**
//  * Get a short location string for display in small spaces
//  */
// export function getShortLocationString(): string {
//   const location = getCurrentLocation();
//   if (!location || !location.latitude || !location.longitude) {
//     return "Unknown";
//   }

//   if (location.address) {
//     // Try to get just the city/locality from the address
//     const parts = location.address.split(",");
//     if (parts.length > 0) {
//       return parts[0].trim();
//     }
//   }

//   if (location.city) {
//     return location.city;
//   }

//   // Fallback to simplified coordinates
//   return `${location.latitude.toFixed(2)}°, ${location.longitude.toFixed(2)}°`;
// }

// /**
//  * Calculate distance between two coordinates using Haversine formula
//  */
// export function calculateDistance(
//   lat1: number,
//   lon1: number,
//   lat2: number,
//   lon2: number
// ): number {
//   const R = 6371; // Radius of the Earth in kilometers
//   const dLat = ((lat2 - lat1) * Math.PI) / 180;
//   const dLon = ((lon2 - lon1) * Math.PI) / 180;
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos((lat1 * Math.PI) / 180) *
//       Math.cos((lat2 * Math.PI) / 180) *
//       Math.sin(dLon / 2) *
//       Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   const distance = R * c; // Distance in kilometers
//   return distance;
// }

// /**
//  * Check if a location is within a certain radius of the user's current location
//  */
// export function isWithinRadius(
//   targetLat: number,
//   targetLon: number,
//   radiusKm: number
// ): boolean {
//   const location = getCurrentLocation();
//   if (!location || !location.latitude || !location.longitude) {
//     return false;
//   }

//   const distance = calculateDistance(
//     location.latitude,
//     location.longitude,
//     targetLat,
//     targetLon
//   );

//   return distance <= radiusKm;
// }

// /**
//  * Manually trigger reverse geocoding for existing coordinates
//  */
// export async function updateLocationAddress(): Promise<void> {
//   const location = getCurrentLocation();
//   if (
//     !location ||
//     !location.latitude ||
//     !location.longitude ||
//     location.address
//   ) {
//     return; // No coordinates or address already exists
//   }

//   try {
//     const { useGeolocation } = await import("./hooks/useGeolocation");
//     // This is a bit of a workaround - in a real app you might want to expose this differently

//     // For now, let's implement the reverse geocoding directly
//     const response = await fetch(
//       `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${location.latitude}&longitude=${location.longitude}&localityLanguage=en`
//     );

//     if (response.ok) {
//       const data = await response.json();
//       let address = "";

//       if (data.locality && data.countryName) {
//         address = `${data.locality}, ${data.countryName}`;
//       } else if (data.city && data.countryName) {
//         address = `${data.city}, ${data.countryName}`;
//       } else if (data.principalSubdivision && data.countryName) {
//         address = `${data.principalSubdivision}, ${data.countryName}`;
//       } else if (data.countryName) {
//         address = data.countryName;
//       }

//       if (address) {
//         useAuthStore.getState().setLocation({
//           ...location,
//           address,
//           city: data.locality || data.city,
//           country: data.countryName,
//         });
//       }
//     }
//   } catch (error) {
//     console.error("Error updating location address:", error);
//   }
// }

// src/lib/api/location.ts
import { http } from "@/lib/http"; // Using your existing axios instance

/**
 * Reverse geocode: Get address from latitude and longitude
 */
export const reverseGeocode = async (lat: number, lng: number) => {
  try {
    const res = await http.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );
    
    const response = res.data;
    
    if (response.results && response.results.length > 0) {
      const result = response.results[0];
      const formattedAddress = result.formatted_address;
      
      // Extract city and country for a cleaner display
      const addressComponents = result.address_components;
      const city = addressComponents.find((component: any) =>
        component.types.includes("locality") ||
        component.types.includes("administrative_area_level_1")
      )?.long_name || "";
      
      const country = addressComponents.find((component: any) =>
        component.types.includes("country")
      )?.long_name || "";
      
      // Create a clean address (City, Country format)
      const cleanAddress = city && country ? `${city}, ${country}` : formattedAddress;
      
      return {
        address: cleanAddress,
        formattedAddress: formattedAddress,
        city,
        country,
      };
    } else {
      console.error("No results found for reverse geocoding.");
      return {
        address: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
        formattedAddress: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
        city: "",
        country: "",
      };
    }
  } catch (error) {
    console.error("Error in reverse geocoding:", error);
    throw error;
  }
};

/**
 * Get user's current position and address
 */
export const getCurrentLocationWithAddress = async () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        const timestamp = position.timestamp;
        
        try {
          // Get address from coordinates
          const addressData = await reverseGeocode(latitude, longitude);
          
          resolve({
            latitude,
            longitude,
            accuracy,
            timestamp,
            address: addressData.address,
            formattedAddress: addressData.formattedAddress,
            city: addressData.city,
            country: addressData.country,
          });
        } catch (error) {
          // Return coordinates even if address lookup fails
          resolve({
            latitude,
            longitude,
            accuracy,
            timestamp,
            address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
            formattedAddress: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
            city: "",
            country: "",
          });
        }
      },
      (error) => {
        let errorMessage = "Unknown error occurred";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied by user";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out";
            break;
        }
        
        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  });
};