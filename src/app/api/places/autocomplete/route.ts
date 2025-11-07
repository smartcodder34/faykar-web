import { NextRequest, NextResponse } from "next/server";

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const input = searchParams.get("input");

  if (!input) {
    return NextResponse.json(
      { error: "Input parameter is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        input
      )}&components=country:us&types=geocode&key=AIzaSyBvKpJTSYJpd1wWyYHwsW3BBjQOp1EQZ_w`
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Autocomplete error:", error);
    return NextResponse.json(
      { error: "Failed to fetch autocomplete results" },
      { status: 500 }
    );
  }
}
