import { http } from "@/lib/http";
import axios from "axios";

export const getSearchOption = async (value: any) => {
  try {
    const res = await axios.get(
      `/api/places/autocomplete?input=${encodeURIComponent(value)}`
    );
    const result = res.data;
    return result;
  } catch (error) {
    throw error;
  }
};

export const fetchLocationDetails = async (placeId: string | undefined) => {
  console.log("placeId2000", placeId);
  try {
    const response = await fetch(`/api/places/details?placeId=${placeId}`);
    const data = await response.json();
    const location = data.result?.geometry?.location;

    // Extract the address components
    const addressComponents = data.result?.address_components;
    const state =
      addressComponents.find((component: any) =>
        component.types.includes("administrative_area_level_1")
      )?.long_name || "";
    const country =
      addressComponents.find((component: any) =>
        component.types.includes("country")
      )?.short_name || "";
    const zipCode =
      addressComponents.find((component: any) =>
        component.types.includes("postal_code")
      )?.long_name || "";
    const city =
      addressComponents.find(
        (component: any) =>
          component.types.includes("locality") ||
          component.types.includes("sublocality")
      )?.long_name || "";
    const address = data.result.formatted_address || "";

  

    return {
      latitude: location.lat,
      longitude: location.lng,
      state,
      country,
      zipCode,
      city,
      address,
    };
  } catch (error) {
    console.error("Error fetching location details:", error);
    return null;
  }
};

export const reserveGeo = async (lat: any, lng: any) => {
  try {
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBvKpJTSYJpd1wWyYHwsW3BBjQOp1EQZ_w`
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
