
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Add Google Maps API type definitions
interface Window {
  google?: {
    maps: {
      Map: new (mapDiv: HTMLElement, options: any) => any;
      Marker: new (options: any) => any;
      MapTypeId: {
        ROADMAP: string;
        SATELLITE: string;
        HYBRID: string;
        TERRAIN: string;
      };
      MapTypeStyle: Array<{
        featureType?: string;
        elementType?: string;
        stylers: Array<Record<string, any>>;
      }>;
    };
  };
}

