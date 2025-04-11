
import React from 'react';
import { GoogleMapsProvider } from '@/context/maps/GoogleMapsContext';
import MapContainer from './map/MapContainer';

const Map = (props: React.ComponentProps<typeof MapContainer>) => {
  return (
    <GoogleMapsProvider>
      <MapContainer {...props} />
    </GoogleMapsProvider>
  );
};

export default Map;
