
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
      Map: new (mapDiv: HTMLElement, options: any) => google.maps.Map;
      Marker: new (options: any) => google.maps.Marker;
      MapTypeId: {
        ROADMAP: string;
        SATELLITE: string;
        HYBRID: string;
        TERRAIN: string;
      };
      NavigationControl: new () => any;
      LatLng: new (lat: number, lng: number) => google.maps.LatLng;
      LatLngLiteral: {lat: number, lng: number};
      MapOptions: any;
      MapTypeStyle: any[];
      event: {
        addListener: (instance: any, eventName: string, handler: Function) => google.maps.MapsEventListener;
      };
    };
  };
}

// Add Google Maps namespace
declare namespace google.maps {
  class Map {
    constructor(mapDiv: HTMLElement, options: MapOptions);
    setCenter(latLng: LatLngLiteral): void;
    getCenter(): any;
    setZoom(zoom: number): void;
    getZoom(): number;
    setMapTypeId(mapTypeId: string): void;
    setOptions(options: MapOptions): void;
    setFog(options: any): void;
    addListener(eventName: string, handler: Function): MapsEventListener;
    addControl(control: any, position: string): void;
    easeTo(options: any): void;
  }
  
  class Marker {
    constructor(options: MarkerOptions);
    setMap(map: Map | null): void;
    getPosition(): LatLng;
    setPosition(latLng: LatLngLiteral): void;
    setTitle(title: string): void;
  }
  
  interface LatLng {
    lat(): number;
    lng(): number;
  }
  
  interface LatLngLiteral {
    lat: number;
    lng: number;
  }
  
  interface MapOptions {
    center?: LatLngLiteral;
    zoom?: number;
    mapTypeId?: string;
    mapTypeControl?: boolean;
    streetViewControl?: boolean;
    fullscreenControl?: boolean;
    zoomControl?: boolean;
    styles?: MapTypeStyle[];
    [key: string]: any;
  }
  
  interface MarkerOptions {
    position: LatLngLiteral;
    map?: Map;
    title?: string;
    [key: string]: any;
  }
  
  interface MapTypeStyle {
    featureType?: string;
    elementType?: string;
    stylers: Array<{[key: string]: any}>;
  }
  
  interface MapsEventListener {
    remove(): void;
  }
}
