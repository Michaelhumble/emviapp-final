
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MapOptions } from '@/types/map';
import { defaultMapStyles } from '@/components/map/mapStyles';

// Define context value type
interface GoogleMapsContextValue {
  isLoaded: boolean;
  loadError: string | null;
  map: google.maps.Map | null;
  initMap: (containerRef: HTMLDivElement, options: MapOptions) => void;
  addMarker: (position: google.maps.LatLngLiteral, title?: string) => google.maps.Marker | null;
}

// Create the context with a default undefined value
const GoogleMapsContext = createContext<GoogleMapsContextValue | undefined>(undefined);

// Hook for using the Google Maps context
export const useGoogleMaps = () => {
  const context = useContext(GoogleMapsContext);
  if (context === undefined) {
    throw new Error('useGoogleMaps must be used within a GoogleMapsProvider');
  }
  return context;
};

interface GoogleMapsProviderProps {
  children: ReactNode;
  apiKey?: string;
}

export const GoogleMapsProvider: React.FC<GoogleMapsProviderProps> = ({ 
  children, 
  apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  // Load the Google Maps script
  useEffect(() => {
    if (!apiKey) {
      setLoadError('Google Maps API key is missing');
      return;
    }

    // Check if script is already loaded
    if (window.google && window.google.maps) {
      setIsLoaded(true);
      return;
    }

    // Create script element
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.id = 'google-maps-script';
    
    script.addEventListener('load', () => {
      setIsLoaded(true);
    });
    
    script.addEventListener('error', () => {
      setLoadError('Failed to load Google Maps API');
    });

    document.head.appendChild(script);

    return () => {
      // Clean up function
      if (document.getElementById('google-maps-script')) {
        document.getElementById('google-maps-script')?.remove();
      }
    };
  }, [apiKey]);

  // Initialize map when ref and options are provided
  const initMap = (containerRef: HTMLDivElement, options: MapOptions) => {
    if (!isLoaded || !window.google || !containerRef) {
      return;
    }
    
    try {
      const mapOptions = {
        center: options.center,
        zoom: options.zoom || 11,
        mapTypeId: options.mapTypeId || 'roadmap',
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
        styles: options.styles || defaultMapStyles
      };

      const newMap = new window.google.maps.Map(containerRef, mapOptions);
      setMap(newMap);
      
      // Add a marker at the center location if none exists yet
      if (options.center) {
        new window.google.maps.Marker({
          position: options.center,
          map: newMap,
          title: "Location"
        });
      }
      
      return newMap;
    } catch (error) {
      console.error('Error initializing Google Map:', error);
      setLoadError('Error initializing map');
      return null;
    }
  };

  // Function to add a marker to the map
  const addMarker = (position: google.maps.LatLngLiteral, title?: string) => {
    if (!map || !window.google) return null;
    
    return new window.google.maps.Marker({
      position,
      map,
      title: title || "Marker"
    });
  };

  const value: GoogleMapsContextValue = {
    isLoaded,
    loadError,
    map,
    initMap,
    addMarker
  };

  return (
    <GoogleMapsContext.Provider value={value}>
      {children}
    </GoogleMapsContext.Provider>
  );
};

export default GoogleMapsContext;
