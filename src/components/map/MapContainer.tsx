
import React from 'react';
import { MapProps } from '@/types/map';
import { useGoogleMapsScript } from '@/hooks/useGoogleMapsScript';
import { useGoogleMap } from '@/hooks/useGoogleMap';
import MapError from './MapError';
import { defaultMapStyles } from './mapStyles';

const MapContainer: React.FC<MapProps> = ({
  center = { lat: 34.0522, lng: -118.2437 }, // Los Angeles coordinates
  zoom = 11,
  height = '400px',
  width = '100%',
  className = '',
  mapTypeId = 'roadmap',
  styles = defaultMapStyles,
  title = "Los Angeles",
}) => {
  const { isLoaded, loadError } = useGoogleMapsScript();
  const { mapRef, initializeMap, initError } = useGoogleMap({
    center,
    zoom,
    mapTypeId,
    styles
  });

  // Initialize map when Google Maps script is loaded
  React.useEffect(() => {
    if (isLoaded && window.google) {
      initializeMap();
    }
  }, [isLoaded, initializeMap]);

  // Show error if loading failed
  const error = loadError || initError;
  if (error) {
    return <MapError error={error} height={height} width={width} />;
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
