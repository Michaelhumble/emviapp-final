
import React from 'react';
import { useSalonListingsFromDatabase } from '@/hooks/useSalonListingsFromDatabase';
import { Job } from '@/types/job';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, DollarSign } from 'lucide-react';

interface DatabaseSalonListingsSectionProps {
  onViewDetails: (salon: Job) => void;
}

const DatabaseSalonListingsSection: React.FC<DatabaseSalonListingsSectionProps> = ({ onViewDetails }) => {
  const { listingsByTier, loading, error, totalCount } = useSalonListingsFromDatabase();

  if (loading) {
    return (
      <div className="space-y-8 mt-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Live Salon Listings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert className="my-8 bg-red-50 border-red-200">
        <AlertDescription className="text-red-800">
          Unable to load live salon listings: {error}
        </AlertDescription>
      </Alert>
    );
  }

  if (totalCount === 0) {
    // Return nothing if no database listings - don't show empty section
    return null;
  }

  const SalonCard = ({ salon }: { salon: Job }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">{salon.company}</h3>
            <div className="flex items-center text-gray-600 mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{salon.location}</span>
            </div>
          </div>
          
          {salon.description && (
            <p className="text-gray-600 text-sm line-clamp-3">{salon.description}</p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600">
              <DollarSign className="h-4 w-4 mr-1" />
              <span className="text-sm">Contact for pricing</span>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${
              salon.pricingTier === 'diamond' ? 'bg-purple-100 text-purple-800' :
              salon.pricingTier === 'premium' ? 'bg-yellow-100 text-yellow-800' :
              salon.pricingTier === 'gold' ? 'bg-orange-100 text-orange-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {salon.pricingTier === 'free' ? 'Basic' : salon.pricingTier || 'Basic'}
            </span>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => onViewDetails(salon)}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8 mt-12">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Live Salon Listings</h2>
        <p className="text-gray-600 mb-8">Recently posted business opportunities</p>
      </div>

      {/* Diamond Tier Database Listings */}
      {listingsByTier.diamond.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-center">💎 Diamond Listings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listingsByTier.diamond.map((salon) => (
              <SalonCard key={salon.id} salon={salon} />
            ))}
          </div>
        </div>
      )}

      {/* Premium Tier Database Listings */}
      {listingsByTier.premium.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-center">⭐ Premium Listings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listingsByTier.premium.map((salon) => (
              <SalonCard key={salon.id} salon={salon} />
            ))}
          </div>
        </div>
      )}

      {/* Gold Tier Database Listings */}
      {listingsByTier.gold.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-center">🥇 Gold Listings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listingsByTier.gold.map((salon) => (
              <SalonCard key={salon.id} salon={salon} />
            ))}
          </div>
        </div>
      )}

      {/* Free Tier Database Listings (displayed as "Basic Listings") */}
      {listingsByTier.free.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-center">📝 Basic Listings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listingsByTier.free.map((salon) => (
              <SalonCard key={salon.id} salon={salon} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatabaseSalonListingsSection;
