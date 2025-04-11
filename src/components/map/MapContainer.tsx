
import React, { useRef, useEffect } from 'react';
import { MapProps } from '@/types/map';
import { useGoogleMaps } from '@/context/maps/GoogleMapsContext';
import MapError from './MapError';

const MapContainer: React.FC<MapProps> = ({
  center = { lat: 34.0522, lng: -118.2437 }, // Los Angeles coordinates
  zoom = 11,
  height = '400px',
  width = '100%',
  className = '',
  mapTypeId = 'roadmap',
  styles,
  title = "Los Angeles",
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { isLoaded, loadError, initMap } = useGoogleMaps();

  // Initialize map when Google Maps script is loaded
  useEffect(() => {
    if (isLoaded && mapRef.current) {
      initMap(mapRef.current, {
        center,
        zoom,
        mapTypeId,
        styles
      });
    }
  }, [isLoaded, center, zoom, mapTypeId, styles, initMap]);

  // Show error if loading failed
  if (loadError) {
    return <MapError error={loadError} height={height} width={width} />;
  }

  return (
    <div className={`google-map-container ${className}`} style={{ position: 'relative' }}>
      <div 
        ref={mapRef} 
        style={{ 
          height, 
          width,
          backgroundColor: '#f1f1f1'
        }}
        aria-label={`Map showing ${title}`}
      />
    </div>
  );
};

export default MapContainer;
