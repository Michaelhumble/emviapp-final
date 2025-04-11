
export interface MapOptions {
  center: { lat: number; lng: number };
  zoom: number;
  mapTypeId: string;
  styles?: Array<{
    featureType?: string;
    elementType?: string;
    stylers: Array<Record<string, any>>;
  }>;
}

export interface MapProps extends Partial<MapOptions> {
  height?: string;
  width?: string;
  className?: string;
  title?: string;
}
