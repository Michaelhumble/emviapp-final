
import { useEffect, useRef, useState } from 'react';

interface MapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  height?: string;
  width?: string;
  className?: string;
  mapTypeId?: string;
  styles?: Array<{
    featureType?: string;
    elementType?: string;
    stylers: Array<Record<string, any>>;
  }>;
}

const Map = ({
  center = { lat: 34.0522, lng: -118.2437 }, // Los Angeles coordinates
  zoom = 11,
  height = '400px',
  width = '100%',
  className = '',
  mapTypeId = 'roadmap',
  styles = [
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#e9e9e9" }, { lightness: 17 }]
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [{ color: "#f5f5f5" }, { lightness: 20 }]
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [{ color: "#ffffff" }, { lightness: 17 }]
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }]
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [{ color: "#ffffff" }, { lightness: 18 }]
    },
    {
      featureType: "road.local",
      elementType: "geometry",
      stylers: [{ color: "#ffffff" }, { lightness: 16 }]
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#f5f5f5" }, { lightness: 21 }]
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#dedede" }, { lightness: 21 }]
    },
    {
      elementType: "labels.text.stroke",
      stylers: [{ visibility: "on" }, { color: "#ffffff" }, { lightness: 16 }]
    },
    {
      elementType: "labels.text.fill",
      stylers: [{ saturation: 36 }, { color: "#333333" }, { lightness: 40 }]
    },
    {
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#f2f2f2" }, { lightness: 19 }]
    },
    {
      featureType: "administrative",
      elementType: "geometry.fill",
      stylers: [{ color: "#fefefe" }, { lightness: 20 }]
    },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [{ color: "#fefefe" }, { lightness: 17 }, { weight: 1.2 }]
    }
  ]
}: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [map, setMap] = useState<any | null>(null);

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
          title: "Los Angeles"
        });
      } catch (error) {
        console.error('Error initializing Google Map:', error);
        setLoadError('Error initializing map');
      }
    };

    loadGoogleMapsScript();
    
    // Cleanup function
    return () => {
      if (map) {
        // Remove any event listeners or other cleanup if needed
      }
    };
  }, [center, zoom, mapTypeId, styles]);

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
