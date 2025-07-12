import React from 'react';
import { Job } from '@/types/job';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, DollarSign, Home, Star, Crown, Sparkles, Eye, Clock, Users } from 'lucide-react';
import { useAuth } from '@/context/auth';

interface UniversalSalonCardProps {
  salon: Job;
  onViewDetails: () => void;
  className?: string;
  showAdmin?: boolean;
  onEdit?: () => void;
  onPromote?: () => void;
  onRenew?: () => void;
  onArchive?: () => void;
}

const UniversalSalonCard: React.FC<UniversalSalonCardProps> = ({
  salon,
  onViewDetails,
  className = "",
  showAdmin = false,
  onEdit,
  onPromote,
  onRenew,
  onArchive
}) => {
  const { isSignedIn } = useAuth();

  // Get pricing tier display configuration
  const getPricingTierDisplay = () => {
    const tier = salon.pricing_tier?.toLowerCase() || 'premium';
    switch (tier) {
      case 'diamond':
        return { 
          color: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white', 
          icon: <Crown className="h-3 w-3" />,
          text: 'DIAMOND',
          glow: 'shadow-blue-500/25',
          border: 'border-blue-200'
        };
      case 'featured':
        return { 
          color: 'bg-gradient-to-r from-purple-600 to-violet-600 text-white', 
          icon: <Star className="h-3 w-3" />,
          text: 'FEATURED',
          glow: 'shadow-purple-500/25',
          border: 'border-purple-200'
        };
      case 'vietnamese_featured':
        return { 
          color: 'bg-gradient-to-r from-orange-600 to-amber-600 text-white', 
          icon: <Sparkles className="h-3 w-3" />,
          text: 'VIETNAMESE FEATURED',
          glow: 'shadow-orange-500/25',
          border: 'border-orange-200'
        };
      case 'premium':
      default:
        return { 
          color: 'bg-gradient-to-r from-green-600 to-emerald-600 text-white', 
          icon: <Star className="h-3 w-3" />,
          text: 'PREMIUM',
          glow: 'shadow-green-500/25',
          border: 'border-green-200'
        };
    }
  };

  const pricingDisplay = getPricingTierDisplay();
  const isExpired = salon.status === 'expired';
  const isVietnamese = salon.is_vietnamese_listing;

  // Format price display
  const formatPrice = (price?: string) => {
    if (!price) return 'Contact for Price';
    if (price.includes('SOLD')) return price;
    return price.startsWith('$') ? price : `$${price}`;
  };

  // Get industry-specific fallback image
  const getIndustryFallback = () => {
    const category = salon.category?.toLowerCase() || 'nails';
    const industryImages = {
      'nail tech': 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//generated%20(003).png',
      'nails': 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//generated%20(01).png',
      'hair': 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair//generated%20(1).png',
      'barber': 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/barber//generated%20(1).png',
      'tattoo': 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/tattoo//generated%20(1).png',
      'massage': 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/massage//generated%20(1).png',
      'skincare': 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/facial-skincare//generated%20(1).png',
      'facial': 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/facial-skincare//generated%20(2).png',
      'makeup': 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/makeup//generated-45.png',
      'brows': 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/brow-lashes//generated-11.png',
      'lashes': 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/brow-lashes//generated-12.png'
    };
    
    for (const [key, url] of Object.entries(industryImages)) {
      if (category.includes(key)) return url;
    }
    
    return industryImages['nails']; // Default to nails
  };

  return (
    <Card className={`group relative overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 ${pricingDisplay.glow} shadow-xl ${isExpired ? 'opacity-75' : ''} ${className} w-full max-w-sm mx-auto lg:max-w-none`}>
      {/* Admin Controls */}
      {showAdmin && !isExpired && (
        <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-1">
            {onEdit && (
              <Button size="sm" variant="outline" className="h-7 px-2 text-xs bg-white/90">
                Edit
              </Button>
            )}
            {onPromote && (
              <Button size="sm" variant="outline" className="h-7 px-2 text-xs bg-white/90">
                Promote
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Main Image */}
      <div className="relative h-48 sm:h-56 md:h-64 lg:h-56 overflow-hidden">
        <img
          src={salon.image_url || salon.image || getIndustryFallback()}
          alt={salon.title || salon.company || 'Salon'}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${isExpired ? 'grayscale' : ''}`}
          onError={(e) => {
            e.currentTarget.src = getIndustryFallback();
          }}
        />
        
        {/* Price Badge */}
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
          <Badge className="bg-black/80 text-white border-none backdrop-blur-sm font-bold text-sm sm:text-base px-2 sm:px-4 py-1 sm:py-2 shadow-lg">
            {formatPrice(salon.price)}
          </Badge>
        </div>

        {/* Tier Badge */}
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
          <Badge className={`${pricingDisplay.color} flex items-center gap-1 backdrop-blur-sm font-bold px-2 sm:px-3 py-1 text-xs shadow-lg`}>
            {pricingDisplay.icon}
            <span className="hidden sm:inline">{pricingDisplay.text}</span>
            <span className="sm:hidden">{pricingDisplay.text.split(' ')[0]}</span>
          </Badge>
        </div>

        {/* Expired Overlay */}
        {isExpired && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <div className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold text-xl shadow-2xl transform rotate-12">
              POSITION FILLED
            </div>
          </div>
        )}

        {/* FOMO Message Overlay */}
        {salon.fomo_message && !isExpired && (
          <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
            <div className="bg-red-600 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-bold text-center shadow-lg animate-pulse">
              {salon.fomo_message}
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-4 sm:p-6">
        {/* Title and Company */}
        <div className="mb-3 sm:mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-purple-600 transition-colors">
            {salon.title || salon.company || 'Premium Salon Opportunity'}
          </h3>
          {salon.company && salon.title !== salon.company && (
            <p className="text-gray-600 text-sm font-medium">
              {salon.company}
            </p>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <MapPin className="h-4 w-4 flex-shrink-0 text-purple-500" />
          <span className="text-sm font-medium">{salon.location || 'Premium Location'}</span>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm">
          {salon.square_feet && (
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4 text-blue-500" />
              <span className="font-medium">{salon.square_feet} sqft</span>
            </div>
          )}
          {salon.monthly_rent && (
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-500" />
              <span className="font-medium">${salon.monthly_rent}/mo</span>
            </div>
          )}
          {salon.created_at && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-xs text-gray-500">
                {new Date(salon.created_at).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
          {isVietnamese && salon.vietnamese_description && !isSignedIn 
            ? salon.vietnamese_description 
            : salon.description || 'Premium salon opportunity in excellent location with established clientele and growth potential.'}
        </p>

        {/* Features */}
        {salon.salon_features && salon.salon_features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {salon.salon_features.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                {feature}
              </Badge>
            ))}
            {salon.salon_features.length > 3 && (
              <Badge variant="secondary" className="text-xs px-2 py-1">
                +{salon.salon_features.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Vietnamese Description Toggle */}
        {isVietnamese && salon.vietnamese_description && isSignedIn && (
          <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-xs text-orange-700 font-medium mb-1">Vietnamese Description:</p>
            <p className="text-sm text-orange-600 line-clamp-2">
              {salon.vietnamese_description}
            </p>
          </div>
        )}

        {/* FOMO Message for Expired */}
        {isExpired && (
          <div className="mb-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-xs text-amber-700 font-medium text-center">
              💔 This amazing opportunity has been filled. Sign up for alerts to catch the next one!
            </p>
          </div>
        )}

        {/* Auth Gate Message */}
        {!isSignedIn && (
          <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-700 font-medium text-center">
              🔒 Sign in to view contact info, full details, and pricing
            </p>
          </div>
        )}

        {/* View Details Button */}
        <Button 
          onClick={onViewDetails}
          className={`w-full ${isExpired ? 'opacity-50' : 'hover:bg-purple-700 bg-purple-600'} transition-all duration-300 font-medium`}
          variant={isExpired ? "outline" : "default"}
        >
          <Eye className="h-4 w-4 mr-2" />
          {isExpired ? 'View Details (Sold)' : 'View Full Details'}
        </Button>

        {/* Admin Action Buttons */}
        {showAdmin && !isExpired && (
          <div className="flex gap-2 mt-3">
            {onRenew && (
              <Button size="sm" variant="outline" onClick={onRenew} className="flex-1 text-xs">
                Renew
              </Button>
            )}
            {onArchive && (
              <Button size="sm" variant="outline" onClick={onArchive} className="flex-1 text-xs">
                Archive
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UniversalSalonCard;