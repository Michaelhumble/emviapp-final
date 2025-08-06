import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  MapPin, 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Navigation,
  Award,
  DollarSign,
  Zap
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import BookingCalendarFlow from '../booking/enhanced/BookingCalendarFlow';

interface Provider {
  id: string;
  name: string;
  avatar_url?: string;
  rating: number;
  reviewCount: number;
  location: string;
  distance: number;
  specialty: string;
  isVerified: boolean;
  isTopRated: boolean;
  responseTime: string;
  priceRange: string;
  availability: 'available' | 'busy' | 'offline';
  services: Array<{
    id: string;
    title: string;
    price: number;
    duration: number;
    description: string;
  }>;
}

const mockProviders: Provider[] = [
  {
    id: '1',
    name: 'Sofia Chen',
    avatar_url: '/api/placeholder/64/64',
    rating: 4.9,
    reviewCount: 127,
    location: 'Downtown Austin',
    distance: 0.8,
    specialty: 'Nail Art & Design',
    isVerified: true,
    isTopRated: true,
    responseTime: '< 1 hour',
    priceRange: '$60-120',
    availability: 'available',
    services: [
      { id: '1', title: 'Gel Manicure', price: 65, duration: 60, description: 'Long-lasting gel polish' },
      { id: '2', title: 'Nail Art Design', price: 95, duration: 90, description: 'Custom nail art' }
    ]
  },
  {
    id: '2',
    name: 'Maria Rodriguez',
    avatar_url: '/api/placeholder/64/64',
    rating: 4.8,
    reviewCount: 89,
    location: 'East Austin',
    distance: 2.1,
    specialty: 'Hair Styling',
    isVerified: true,
    isTopRated: false,
    responseTime: '2-3 hours',
    priceRange: '$80-200',
    availability: 'busy',
    services: [
      { id: '3', title: 'Cut & Style', price: 85, duration: 75, description: 'Precision cut with styling' },
      { id: '4', title: 'Color & Highlights', price: 180, duration: 180, description: 'Professional coloring' }
    ]
  },
  {
    id: '3',
    name: 'Jessica Kim',
    avatar_url: '/api/placeholder/64/64',
    rating: 4.7,
    reviewCount: 156,
    location: 'South Austin',
    distance: 3.5,
    specialty: 'Makeup Artist',
    isVerified: true,
    isTopRated: true,
    responseTime: '< 30 min',
    priceRange: '$45-150',
    availability: 'available',
    services: [
      { id: '5', title: 'Bridal Makeup', price: 120, duration: 120, description: 'Wedding day makeup' },
      { id: '6', title: 'Event Makeup', price: 75, duration: 90, description: 'Special occasion makeup' }
    ]
  }
];

const LocationBasedDiscovery: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>(mockProviders);
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>(mockProviders);
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('distance');
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [showBookingDialog, setShowBookingDialog] = useState(false);

  useEffect(() => {
    let filtered = [...providers];

    // Filter by specialty
    if (selectedSpecialty !== 'all') {
      filtered = filtered.filter(provider => 
        provider.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase())
      );
    }

    // Filter by price range
    if (priceRange !== 'all') {
      filtered = filtered.filter(provider => {
        const [min, max] = provider.priceRange.replace('$', '').split('-').map(Number);
        switch (priceRange) {
          case 'budget': return max <= 75;
          case 'mid': return min >= 50 && max <= 150;
          case 'premium': return min >= 100;
          default: return true;
        }
      });
    }

    // Sort providers
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return a.distance - b.distance;
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return parseInt(a.priceRange.split('-')[0].replace('$', '')) - 
                 parseInt(b.priceRange.split('-')[0].replace('$', ''));
        case 'price-high':
          return parseInt(b.priceRange.split('-')[1]) - 
                 parseInt(a.priceRange.split('-')[1]);
        default:
          return 0;
      }
    });

    setFilteredProviders(filtered);
  }, [providers, selectedSpecialty, priceRange, sortBy]);

  const handleBookProvider = (provider: Provider) => {
    setSelectedProvider(provider);
    setShowBookingDialog(true);
  };

  const handleBookingComplete = (bookingData: any) => {
    console.log('Booking completed:', bookingData);
    // Handle booking completion
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'bg-green-500';
      case 'busy':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'Available Now';
      case 'busy':
        return 'Busy';
      case 'offline':
        return 'Offline';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">
          Find Beauty Professionals Near You
        </h1>
        <p className="text-gray-600">
          Discover top-rated artists and salons in your area
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Enter your location..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder="Specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                <SelectItem value="nail">Nail Services</SelectItem>
                <SelectItem value="hair">Hair Styling</SelectItem>
                <SelectItem value="makeup">Makeup</SelectItem>
                <SelectItem value="skincare">Skincare</SelectItem>
                <SelectItem value="massage">Massage</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="budget">Budget ($0-75)</SelectItem>
                <SelectItem value="mid">Mid-range ($50-150)</SelectItem>
                <SelectItem value="premium">Premium ($100+)</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distance">Distance</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          {filteredProviders.length} professionals found near you
        </p>
        <Button variant="outline" size="sm">
          <Navigation className="h-4 w-4 mr-2" />
          Use My Location
        </Button>
      </div>

      {/* Provider Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProviders.map((provider, index) => (
          <motion.div
            key={provider.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6">
                {/* Provider Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={provider.avatar_url} />
                      <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getAvailabilityColor(provider.availability)}`}></div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                      {provider.isVerified && (
                        <Badge variant="secondary" className="text-xs">
                          <Award className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{provider.specialty}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{provider.rating}</span>
                        <span>({provider.reviewCount})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{provider.distance}mi</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {provider.isTopRated && (
                    <Badge className="bg-purple-100 text-purple-700 text-xs">
                      <Zap className="h-3 w-3 mr-1" />
                      Top Rated
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {provider.responseTime}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <DollarSign className="h-3 w-3 mr-1" />
                    {provider.priceRange}
                  </Badge>
                </div>

                {/* Services Preview */}
                <div className="space-y-2 mb-4">
                  <h4 className="font-medium text-sm">Popular Services:</h4>
                  {provider.services.slice(0, 2).map((service) => (
                    <div key={service.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{service.title}</span>
                      <span className="font-medium">${service.price}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Availability:</span>
                    <span className={`font-medium ${
                      provider.availability === 'available' ? 'text-green-600' : 
                      provider.availability === 'busy' ? 'text-yellow-600' : 'text-gray-600'
                    }`}>
                      {getAvailabilityText(provider.availability)}
                    </span>
                  </div>
                  
                  <Button
                    onClick={() => handleBookProvider(provider)}
                    className="w-full"
                    disabled={provider.availability === 'offline'}
                  >
                    {provider.availability === 'available' ? 'Book Now' : 
                     provider.availability === 'busy' ? 'Request Booking' : 'Unavailable'}
                  </Button>
                  
                  <Button variant="outline" className="w-full" size="sm">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Professionals
        </Button>
      </div>

      {/* Booking Dialog */}
      {selectedProvider && (
        <BookingCalendarFlow
          provider={selectedProvider}
          services={selectedProvider.services}
          onBookingComplete={handleBookingComplete}
          isOpen={showBookingDialog}
          onOpenChange={setShowBookingDialog}
        />
      )}
    </div>
  );
};

export default LocationBasedDiscovery;