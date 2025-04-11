
import { useRef, useState, useEffect } from 'react';
import { MapOptions } from '@/types/map';

export const useGoogleMap = (options: MapOptions) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any | null>(null);
  const [initError, setInitError] = useState<string | null>(null);

  const { center, zoom, mapTypeId, styles } = options;

  // Function to initialize the map
  const initializeMap = () => {
    if (!mapRef.current || !window.google) {
      return;
    }
    
    try {
      const mapOptions = {
        center,
        zoom,
        mapTypeId,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
        styles
      };

      const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
      setMap(newMap);
      
      // Add a marker at the center location
      new window.google.maps.Marker({
        position: center,
        map: newMap,
        title: "Location"
      });
    } catch (error) {
      console.error('Error initializing Google Map:', error);
      setInitError('Error initializing map');
    }
  };

  // Reset map if center, zoom, or mapTypeId changes
  useEffect(() => {
    if (map && window.google) {
      map.setCenter(center);
      map.setZoom(zoom);
      map.setMapTypeId(mapTypeId);
      
      if (styles) {
        map.setOptions({ styles });
      }
    }
  }, [center, zoom, mapTypeId, styles, map]);

  return { mapRef, map, initializeMap, initError };
};
