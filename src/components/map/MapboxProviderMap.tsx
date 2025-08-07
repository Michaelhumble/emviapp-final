import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Map, MapPin, Star, Zap, Filter, Navigation, 
  Search, X, Clock, Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface Provider {
  id: string;
  full_name: string;
  avatar_url: string;
  specialty: string;
  location: string;
  latitude: number;
  longitude: number;
  rating: number;
  reviews_count: number;
  is_online: boolean;
  instant_book: boolean;
  price_range: string;
  next_available: string;
}

interface MapboxProviderMapProps {
  onProviderSelect?: (provider: Provider) => void;
  onClose?: () => void;
}

const MapboxProviderMap: React.FC<MapboxProviderMapProps> = ({ 
  onProviderSelect, 
  onClose 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [searchRadius, setSearchRadius] = useState(5);
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  // Mock providers data
  const mockProviders: Provider[] = [
    {
      id: '1',
      full_name: 'Maya Chen',
      avatar_url: '',
      specialty: 'Nail Art',
      location: 'Beverly Hills, CA',
      latitude: 34.0736,
      longitude: -118.4004,
      rating: 4.9,
      reviews_count: 156,
      is_online: true,
      instant_book: true,
      price_range: '$60-120',
      next_available: '2024-01-15T14:00:00Z'
    },
    {
      id: '2',
      full_name: 'Sophia Rodriguez',
      avatar_url: '',
      specialty: 'Makeup',
      location: 'West Hollywood, CA',
      latitude: 34.0900,
      longitude: -118.3617,
      rating: 4.8,
      reviews_count: 203,
      is_online: false,
      instant_book: false,
      price_range: '$80-200',
      next_available: '2024-01-16T10:00:00Z'
    },
    {
      id: '3',
      full_name: 'Elena Vasquez',
      avatar_url: '',
      specialty: 'Hair Styling',
      location: 'Santa Monica, CA',
      latitude: 34.0195,
      longitude: -118.4912,
      rating: 4.7,
      reviews_count: 89,
      is_online: true,
      instant_book: true,
      price_range: '$70-150',
      next_available: '2024-01-15T16:00:00Z'
    }
  ];

  useEffect(() => {
    setProviders(mockProviders);
    getUserLocation();
  }, []);

  useEffect(() => {
    if (mapboxToken && mapContainer.current && !map.current) {
      initializeMap();
    }
  }, [mapboxToken]);

  useEffect(() => {
    if (map.current && providers.length > 0) {
      addProviderMarkers();
    }
  }, [providers, showOnlineOnly]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location: [number, number] = [
            position.coords.longitude,
            position.coords.latitude
          ];
          setUserLocation(location);
        },
        (error) => {
          console.warn('Geolocation error:', error);
          // Default to Los Angeles
          setUserLocation([-118.2437, 34.0522]);
        }
      );
    } else {
      // Default to Los Angeles
      setUserLocation([-118.2437, 34.0522]);
    }
  };

  const initializeMap = () => {
    if (!mapContainer.current || !userLocation) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: userLocation,
      zoom: 11,
      pitch: 0,
      bearing: 0
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add user location marker
    new mapboxgl.Marker({
      color: '#8B5CF6',
      scale: 0.8
    })
      .setLngLat(userLocation)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML('<div class="text-center p-2"><strong>You are here</strong></div>')
      )
      .addTo(map.current);

    // Add search radius circle
    addSearchRadiusCircle();
  };

  const addSearchRadiusCircle = () => {
    if (!map.current || !userLocation) return;

    const radiusInMeters = searchRadius * 1609.34; // Convert miles to meters
    
    map.current.on('load', () => {
      if (!map.current) return;

      map.current.addSource('search-radius', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: userLocation
          }
        }
      });

      map.current.addLayer({
        id: 'search-radius-circle',
        type: 'circle',
        source: 'search-radius',
        paint: {
          'circle-radius': {
            stops: [
              [0, 0],
              [20, radiusInMeters / 100]
            ],
            base: 2
          },
          'circle-color': '#8B5CF6',
          'circle-opacity': 0.1,
          'circle-stroke-color': '#8B5CF6',
          'circle-stroke-width': 2,
          'circle-stroke-opacity': 0.3
        }
      });
    });
  };

  const addProviderMarkers = () => {
    if (!map.current) return;

    const filteredProviders = showOnlineOnly 
      ? providers.filter(p => p.is_online) 
      : providers;

    filteredProviders.forEach((provider) => {
      const el = document.createElement('div');
      el.className = 'provider-marker';
      el.style.backgroundImage = `url(${provider.avatar_url || '/placeholder.svg'})`;
      el.style.width = '40px';
      el.style.height = '40px';
      el.style.borderRadius = '50%';
      el.style.border = provider.is_online ? '3px solid #10B981' : '3px solid #6B7280';
      el.style.backgroundSize = 'cover';
      el.style.backgroundPosition = 'center';
      el.style.cursor = 'pointer';
      el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';

      // Add online indicator
      if (provider.is_online) {
        const indicator = document.createElement('div');
        indicator.style.position = 'absolute';
        indicator.style.bottom = '2px';
        indicator.style.right = '2px';
        indicator.style.width = '12px';
        indicator.style.height = '12px';
        indicator.style.backgroundColor = '#10B981';
        indicator.style.borderRadius = '50%';
        indicator.style.border = '2px solid white';
        el.appendChild(indicator);
      }

      const popup = new mapboxgl.Popup({ 
        offset: 25,
        closeButton: false,
        className: 'provider-popup'
      }).setHTML(`
        <div class="p-3 min-w-[200px]">
          <div class="flex items-start space-x-3">
            <img src="${provider.avatar_url || '/placeholder.svg'}" 
                 alt="${provider.full_name}" 
                 class="w-12 h-12 rounded-full object-cover" />
            <div class="flex-1">
              <h3 class="font-semibold text-gray-900">${provider.full_name}</h3>
              <p class="text-sm text-gray-600">${provider.specialty}</p>
              <div class="flex items-center mt-1">
                <span class="text-yellow-500">★</span>
                <span class="text-sm text-gray-700 ml-1">${provider.rating} (${provider.reviews_count})</span>
              </div>
              <div class="flex items-center justify-between mt-2">
                <span class="text-sm font-medium text-purple-600">${provider.price_range}</span>
                ${provider.instant_book ? '<span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">⚡ Instant</span>' : ''}
              </div>
            </div>
          </div>
          <button class="w-full mt-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-all">
            View Profile
          </button>
        </div>
      `);

      const marker = new mapboxgl.Marker(el)
        .setLngLat([provider.longitude, provider.latitude])
        .setPopup(popup)
        .addTo(map.current!);

      el.addEventListener('click', () => {
        setSelectedProvider(provider);
        popup.addTo(map.current!);
      });
    });
  };

  const handleProviderSelect = (provider: Provider) => {
    onProviderSelect?.(provider);
    toast.success(`Selected ${provider.full_name}`);
  };

  if (!mapboxToken) {
    return (
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Map className="h-5 w-5 mr-2" />
            Map View
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300 text-sm">
            To enable the map view, please enter your Mapbox access token:
          </p>
          <Input
            type="password"
            placeholder="Mapbox access token"
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          />
          <p className="text-xs text-gray-400">
            Get your token at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">mapbox.com</a>
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative h-[600px] rounded-lg overflow-hidden">
      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-10 space-y-2">
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2 mb-3">
              <Search className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium">Search within {searchRadius} miles</span>
            </div>
            <div className="space-y-2">
              <input
                type="range"
                min="1"
                max="25"
                value={searchRadius}
                onChange={(e) => setSearchRadius(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="online-only"
                  checked={showOnlineOnly}
                  onChange={(e) => setShowOnlineOnly(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="online-only" className="text-sm">Online only</label>
              </div>
            </div>
          </CardContent>
        </Card>

        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="bg-white/90 hover:bg-white text-gray-900"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Provider Stats */}
      <div className="absolute top-4 right-4 z-10">
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardContent className="p-3">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">
                {showOnlineOnly ? providers.filter(p => p.is_online).length : providers.length}
              </div>
              <div className="text-xs text-gray-600">Providers nearby</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Map Container */}
      <div ref={mapContainer} className="w-full h-full" />

      {/* Selected Provider Details */}
      <AnimatePresence>
        {selectedProvider && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-4 right-4 z-10"
          >
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={selectedProvider.avatar_url || '/placeholder.svg'} 
                      alt={selectedProvider.full_name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedProvider.full_name}</h3>
                      <p className="text-sm text-gray-600">{selectedProvider.specialty}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm ml-1">{selectedProvider.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">({selectedProvider.reviews_count})</span>
                        {selectedProvider.is_online && (
                          <Badge className="bg-green-100 text-green-800">Online</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleProviderSelect(selectedProvider)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    Select
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MapboxProviderMap;