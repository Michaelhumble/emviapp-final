import { useEffect, useState } from 'react';
import { useGoogleMaps } from '@/context/maps/GoogleMapsContext';

interface MapInteractionOptions {
  center?: { lat: number; lng: number };
  onMapClick?: (event: google.maps.MapMouseEvent) => void;
  enableMarkers?: boolean;
}

export const useMapInteraction = (options: MapInteractionOptions = {}) => {
  const { isLoaded, map, addMarker } = useGoogleMaps();
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

  // Set up map interactions
  useEffect(() => {
    if (!isLoaded || !map) return;

    // Set center if provided
    if (options.center) {
      map.setCenter(options.center);
    }

    // Add click handler if needed
    if (options.onMapClick) {
      const clickListener = map.addListener('click', options.onMapClick);
      return () => clickListener.remove();
    }
  }, [isLoaded, map, options.center, options.onMapClick]);

  // Add a marker to the map and keep track of it
  const createMarker = (position: google.maps.LatLngLiteral, title?: string) => {
    const marker = addMarker(position, title);
    if (marker) {
      setMarkers(prev => [...prev, marker]);
      return marker;
    }
    return null;
  };

  // Clear all markers
  const clearMarkers = () => {
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);
  };

  return {
    isLoaded,
    map,
    createMarker,
    clearMarkers,
    markers
  };
};
