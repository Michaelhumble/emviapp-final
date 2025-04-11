
import React from 'react';
import { GoogleMapsProvider } from '@/context/maps/GoogleMapsContext';
import MapContainer from './map/MapContainer';

interface MapProps extends React.ComponentProps<typeof MapContainer> {}

const Map = (props: MapProps) => {
  return (
    <GoogleMapsProvider>
      <MapContainer {...props} />
    </GoogleMapsProvider>
  );
};

export default Map;
