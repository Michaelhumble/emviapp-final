
import { useEffect, useRef, useState } from 'react';

interface MapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  height?: string;
  width?: string;
  className?: string;
}

const Map = ({
  center = { lat: 34.0522, lng: -118.2437 }, // Los Angeles coordinates
  zoom = 11,
  height = '400px',
  width = '100%',
  className = '',
}: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    // Function to load the Google Maps script
    const loadGoogleMapsScript = () => {
      const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      
      if (!googleMapsApiKey) {
        setLoadError('Google Maps API key is missing');
        return;
      }

      // Check if script is already loaded
      if (window.google && window.google.maps) {
        initializeMap();
        return;
      }

      // Create script element
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.id = 'google-maps-script';
      
      script.addEventListener('load', () => {
        setIsLoaded(true);
        initializeMap();
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
    };

    // Function to initialize the map
    const initializeMap = () => {
      if (!mapRef.current || !window.google) return;
      
      try {
        new window.google.maps.Map(mapRef.current, {
          center,
          zoom,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          zoomControl: true,
        });
      } catch (error) {
        console.error('Error initializing Google Map:', error);
        setLoadError('Error initializing map');
      }
    };

    loadGoogleMapsScript();
  }, [center, zoom]);

  return (
    <div className={`google-map-container ${className}`} style={{ position: 'relative' }}>
      {loadError && (
        <div 
          style={{ 
            padding: '20px', 
            backgroundColor: '#f8d7da', 
            color: '#721c24', 
            textAlign: 'center',
            height,
            width,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {loadError}
        </div>
      )}
      <div 
        ref={mapRef} 
        style={{ 
          height, 
          width,
          backgroundColor: '#f1f1f1'
        }}
      />
    </div>
  );
};

export default Map;
