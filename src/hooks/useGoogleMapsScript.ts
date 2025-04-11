
import { useState, useEffect } from 'react';

interface UseGoogleMapsScriptOptions {
  onLoad?: () => void;
  onError?: (error: string) => void;
}

export const useGoogleMapsScript = (options?: UseGoogleMapsScriptOptions) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      
      if (!googleMapsApiKey) {
        const error = 'Google Maps API key is missing';
        setLoadError(error);
        options?.onError?.(error);
        return;
      }

      // Check if script is already loaded
      if (window.google && window.google.maps) {
        setIsLoaded(true);
        options?.onLoad?.();
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
        options?.onLoad?.();
      });
      
      script.addEventListener('error', () => {
        const error = 'Failed to load Google Maps API';
        setLoadError(error);
        options?.onError?.(error);
      });

      document.head.appendChild(script);
    };

    loadGoogleMapsScript();

    return () => {
      // Clean up function
      if (document.getElementById('google-maps-script')) {
        document.getElementById('google-maps-script')?.remove();
      }
    };
  }, [options]);

  return { isLoaded, loadError };
};
