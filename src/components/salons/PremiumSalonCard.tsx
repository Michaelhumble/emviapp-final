import React from 'react';
import { Job } from '@/types/job';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, DollarSign, Home, Star, Crown, Sparkles, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface PremiumSalonCardProps {
  salon: Job;
  onViewDetails: () => void;
  className?: string;
}

const PremiumSalonCard: React.FC<PremiumSalonCardProps> = ({
  salon,
  onViewDetails,
  className = ""
}) => {
  // Get pricing tier display
  const getPricingTierDisplay = () => {
    const tier = salon.pricing_tier?.toLowerCase() || 'premium';
    switch (tier) {
      case 'diamond':
        return { 
          color: 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-200', 
          icon: <Crown className="h-3 w-3" />,
          text: 'Diamond',
          glow: 'shadow-blue-200/50'
        };
      case 'featured':
        return { 
          color: 'bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 border-purple-200', 
          icon: <Star className="h-3 w-3" />,
          text: 'Featured',
          glow: 'shadow-purple-200/50'
        };
      case 'vietnamese_featured':
        return { 
          color: 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border-orange-200', 
          icon: <Sparkles className="h-3 w-3" />,
          text: 'Vietnamese Featured',
          glow: 'shadow-orange-200/50'
        };
      case 'premium':
      default:
        return { 
          color: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200', 
          icon: <Star className="h-3 w-3" />,
          text: 'Premium',
          glow: 'shadow-green-200/50'
        };
    }
  };

  const pricingDisplay = getPricingTierDisplay();
  const isExpired = salon.status === 'expired';
  const isVietnamese = salon.is_vietnamese_listing;

  return (
    <Card className={`group relative overflow-hidden hover:shadow-xl transition-all duration-300 ${pricingDisplay.glow} ${isExpired ? 'opacity-75' : ''} ${className}`}>
      {/* Main Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={salon.image_url || salon.image || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop'}
          alt={salon.title || salon.company || 'Salon'}
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${isExpired ? 'grayscale' : ''}`}
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop';
          }}
        />
        
        {/* Price Badge */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-white/95 text-gray-900 border-white/20 backdrop-blur-sm font-bold text-lg px-3 py-1">
            {salon.price || 'Contact for Price'}
          </Badge>
        </div>

        {/* Tier Badge */}
        <div className="absolute top-3 right-3">
          <Badge className={`${pricingDisplay.color} flex items-center gap-1 backdrop-blur-sm`}>
            {pricingDisplay.icon}
            {pricingDisplay.text}
          </Badge>
        </div>

        {/* Expired Overlay */}
        {isExpired && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-lg">
              POSITION FILLED
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        {/* Title and Company */}
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">
            {salon.title || salon.company || 'Premium Salon'}
          </h3>
          <p className="text-gray-600 text-sm font-medium">
            {salon.company || salon.title || 'Luxury Salon'}
          </p>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <span className="text-sm">{salon.location || 'Premium Location'}</span>
        </div>

        {/* Square Footage and Rent */}
        <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
          {salon.square_feet && (
            <div className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span>{salon.square_feet} sqft</span>
            </div>
          )}
          {salon.monthly_rent && (
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              <span>${salon.monthly_rent}/mo</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
          {salon.description || 'Premium salon opportunity in excellent location with established clientele.'}
        </p>

        {/* Features */}
        {salon.salon_features && salon.salon_features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {salon.salon_features.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
            {salon.salon_features.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{salon.salon_features.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* FOMO Message for Expired */}
        {isExpired && (
          <div className="mb-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-xs text-amber-700 font-medium text-center">
              💔 This amazing opportunity has been filled. Sign up to unlock the next batch!
            </p>
          </div>
        )}

        {/* View Details Button */}
        <Button 
          onClick={onViewDetails}
          className={`w-full ${isExpired ? 'opacity-50' : ''}`}
          variant={isExpired ? "outline" : "default"}
          disabled={isExpired}
        >
          <Eye className="h-4 w-4 mr-2" />
          {isExpired ? 'View Details (Sold)' : 'View Details'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PremiumSalonCard;