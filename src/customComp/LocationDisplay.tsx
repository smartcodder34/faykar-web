"use client";

import React from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { getLocationString, getLocationAccuracy, hasLocation } from '@/lib/location';

interface LocationDisplayProps {
  showAccuracy?: boolean;
  className?: string;
}

export default function LocationDisplay({ 
  showAccuracy = true, 
  className = "" 
}: LocationDisplayProps) {
  const { location } = useAuthStore();

  if (!hasLocation()) {
    return (
      <div className={`text-gray-500 text-sm ${className}`}>
        Location not available
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <div className="flex flex-col">
        <span className="text-sm text-gray-800">
          {getLocationString()}
        </span>
        {showAccuracy && (
          <span className="text-xs text-gray-500">
            Accuracy: {getLocationAccuracy()}
          </span>
        )}
      </div>
    </div>
  );
}
