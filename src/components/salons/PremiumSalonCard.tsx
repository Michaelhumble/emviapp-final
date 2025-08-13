import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Calendar, Home, DollarSign, Phone, Mail, ChevronLeft, ChevronRight, Eye, Lock } from 'lucide-react';
import { RealSalonListing } from '@/data/salons/realSalonListings';
import { useAuth } from '@/context/auth';
import PremiumContactGate from '@/components/common/PremiumContactGate';

interface PremiumSalonCardProps {
  salon: RealSalonListing;
  onViewDetails: () => void;
  className?: string;
}

const PremiumSalonCard: React.FC<PremiumSalonCardProps> = ({
  salon,
  onViewDetails,
  className = ""
}) => {
  const { isSignedIn, user, session, loading } = useAuth();
  
  // Smart lock detection: Only lock premium/featured content for non-signed users
  const shouldLock = !isSignedIn && (salon.featured || salon.urgent || salon.contact.phone || salon.contact.email);
  
  // 🔍 DEBUG: Log auth state for PremiumSalonCard
  console.log('🔍 [PREMIUM-SALON-CARD] Auth state:', {
    isSignedIn,
    shouldLock,
    salonName: salon.name
  });
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Navigation functions for image gallery
  const nextImage = () => {
    if (salon.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % salon.images.length);
    }
  };

  const prevImage = () => {
    if (salon.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + salon.images.length) % salon.images.length);
    }
  };

  // Get featured badge styling
  const getBadgeStyle = () => {
    if (salon.urgent) {
      return "bg-red-100 text-red-800 border-red-200";
    }
    if (salon.featured) {
      return "bg-purple-100 text-purple-800 border-purple-200";
    }
    return "bg-green-100 text-green-800 border-green-200";
  };

  const getBadgeText = () => {
    if (salon.urgent) return "URGENT";
    if (salon.featured) return "FEATURED";
    return "PREMIUM";
  };

  return (
    <Card className={`group relative overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 shadow-lg border-0 bg-white h-full flex flex-col ${className}`}>
      {/* Image Gallery Section - Always on top, Jobs card style */}
      <div className="relative overflow-hidden">
        {salon.images.length > 0 ? (
          <>
            {/* Main Gallery Image - Mobile optimized height */}
            <div className="relative h-32 sm:h-44 md:h-52 overflow-hidden">
              <img
                src={salon.images[currentImageIndex]}
                alt={salon.name}
                className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${shouldLock ? 'blur-sm brightness-75 saturate-50 scale-[1.02]' : ''}`}
                style={shouldLock ? { imageRendering: 'pixelated' as any } : undefined}
              />
              {shouldLock && (
                <div className="pointer-events-none absolute inset-0 bg-white/40 backdrop-blur-sm flex flex-col items-center justify-center text-center z-10">
                  <div className="relative mb-2">
                    <div className="absolute inset-0 bg-yellow-400/60 rounded-full blur-md opacity-70"></div>
                    <div className="relative bg-yellow-500 p-2 rounded-full shadow">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 font-medium">Sign in to view full details and clear images</p>
                </div>
              )}
              
              {/* Desktop Gallery Navigation */}
              {salon.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/60 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/80 z-20"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/60 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/80 z-20"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}
              
              {/* Photo count badge - Mobile optimized */}
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-black/70 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs font-medium z-10">
                📸 {salon.images.length}
              </div>
            </div>
            
            {/* Responsive Thumbnail Row - Mobile optimized */}
            {salon.images.length > 1 && (
              <div className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-gray-50 border-t">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                  {/* Desktop: Show up to 5 thumbnails */}
                  <div className="hidden lg:flex gap-2 flex-shrink-0">
                    {salon.images.slice(0, 5).map((imageUrl, index) => (
                      <button
                        key={index}
                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                        className={`relative w-12 h-12 rounded border-2 overflow-hidden bg-white shadow-sm flex-shrink-0 ${
                          index === currentImageIndex ? 'border-purple-500' : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={imageUrl}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => e.currentTarget.style.display = 'none'}
                        />
                        {index === currentImageIndex && (
                          <div className="absolute inset-0 bg-purple-500/20"></div>
                        )}
                      </button>
                    ))}
                    {salon.images.length > 5 && (
                      <div className="w-12 h-12 rounded border-2 border-gray-200 bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-600 text-xs font-medium">+{salon.images.length - 5}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Tablet: Show 3 thumbnails */}
                  <div className="hidden md:flex lg:hidden gap-2 flex-shrink-0">
                    {salon.images.slice(0, 3).map((imageUrl, index) => (
                      <button
                        key={index}
                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                        className={`relative w-16 h-12 rounded border-2 overflow-hidden bg-white shadow-sm flex-shrink-0 ${
                          index === currentImageIndex ? 'border-purple-500' : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={imageUrl}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => e.currentTarget.style.display = 'none'}
                        />
                        {index === currentImageIndex && (
                          <div className="absolute inset-0 bg-purple-500/20"></div>
                        )}
                      </button>
                    ))}
                    {salon.images.length > 3 && (
                      <div className="w-16 h-12 rounded border-2 border-gray-200 bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-600 text-xs font-medium">+{salon.images.length - 3}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Mobile: Show 2 thumbnails - Smaller size */}
                  <div className="flex md:hidden gap-1.5 overflow-x-auto flex-shrink-0">
                    {salon.images.slice(0, 2).map((imageUrl, index) => (
                      <button
                        key={index}
                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                        className={`relative w-12 h-8 rounded border-2 overflow-hidden bg-white shadow-sm flex-shrink-0 ${
                          index === currentImageIndex ? 'border-purple-500' : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={imageUrl}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => e.currentTarget.style.display = 'none'}
                        />
                        {index === currentImageIndex && (
                          <div className="absolute inset-0 bg-purple-500/20"></div>
                        )}
                      </button>
                    ))}
                    {salon.images.length > 2 && (
                      <div className="w-12 h-8 rounded border-2 border-gray-200 bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-600 text-xs font-medium">+{salon.images.length - 2}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          // Mobile optimized placeholder when no images
          <div className="h-32 sm:h-44 md:h-52 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-3xl sm:text-4xl mb-2">📷</div>
              <div className="text-sm font-medium">Photos Coming Soon</div>
              <div className="text-xs">Owner will add gallery</div>
            </div>
          </div>
        )}
        
        {/* Status Badge - Mobile optimized positioning */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
          <Badge className={`${getBadgeStyle()} flex items-center gap-1 font-semibold px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs shadow-md`}>
            {getBadgeText()}
          </Badge>
        </div>

        {/* Price Badge - Mobile optimized sizing */}
        <div className="absolute top-2 right-12 sm:top-3 sm:right-14 z-10">
          <Badge className="bg-white text-gray-900 font-bold text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 shadow-md">
            {salon.price}
          </Badge>
        </div>
      </div>

      {/* Card Content - Mobile optimized padding */}
      <CardContent className="p-3 sm:p-4 md:p-5 flex-grow flex flex-col">
        {/* Title and Location - Mobile optimized */}
        <div className="mb-2 sm:mb-3">
          <h3 className={`text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-purple-600 transition-colors ${shouldLock ? 'opacity-60' : ''}`}>
            {salon.name}
          </h3>
          <div className={`flex items-center gap-1.5 sm:gap-2 text-gray-600 text-xs sm:text-sm ${shouldLock ? 'opacity-60' : ''}`}>
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 text-purple-500" />
            <span className="font-medium">{salon.location}</span>
          </div>
        </div>

        {/* Key Stats - Mobile optimized */}
        <div className={`grid grid-cols-2 gap-1.5 sm:gap-2 md:gap-3 mb-2 sm:mb-3 text-xs ${shouldLock ? 'opacity-60' : ''}`}>
          {salon.sqft && (
            <div className="flex items-center gap-1 sm:gap-2">
              <Home className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
              <span className="font-medium text-xs sm:text-sm">{salon.sqft.toLocaleString()} sqft</span>
            </div>
          )}
          {salon.monthlyRent && (
            <div className="flex items-center gap-1 sm:gap-2">
              <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
              <span className="font-medium text-xs sm:text-sm">${salon.monthlyRent.toLocaleString()}/mo</span>
            </div>
          )}
          <div className="flex items-center gap-1 sm:gap-2 col-span-2">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
            <span className="text-xs text-gray-500">{salon.datePosted}</span>
          </div>
        </div>

        {/* Description - Mobile optimized, Vietnamese-first for nails */}
        <div className="mb-3 sm:mb-4 flex-grow">
          {salon.category === 'nails' ? (
            <>
              {/* Vietnamese first for nails */}
              {salon.description_vi ? (
                <>
                  <p className="text-gray-700 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 mb-1 sm:mb-2 leading-relaxed font-medium">
                    {salon.description_vi}
                  </p>
                  <p className="text-gray-500 text-xs line-clamp-1 sm:line-clamp-2 leading-relaxed">
                    {salon.description_en}
                  </p>
                </>
              ) : (
                <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 mb-1 sm:mb-2 leading-relaxed">
                  {salon.description_en}
                </p>
              )}
            </>
          ) : (
            <>
              {/* English first for other categories */}
              <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 mb-1 sm:mb-2 leading-relaxed">
                {salon.description_en}
              </p>
              {salon.description_vi && (
                <p className="text-gray-500 text-xs line-clamp-1 sm:line-clamp-2 leading-relaxed">
                  {salon.description_vi}
                </p>
              )}
            </>
          )}
        </div>

        {/* Features Tags - Mobile optimized */}
        {salon.features && salon.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
            {salon.features.slice(0, 2).map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs px-1.5 py-0.5 sm:px-2 sm:py-1">
                {feature}
              </Badge>
            ))}
            {salon.features.length > 2 && (
              <Badge variant="secondary" className="text-xs px-1.5 py-0.5 sm:px-2 sm:py-1">
                +{salon.features.length - 2} more
              </Badge>
            )}
          </div>
        )}

        {/* Contact Info Preview - Mobile optimized, Auth Gated */}
        <PremiumContactGate contactName={salon.contact.name} contactPhone={salon.contact.phone} contactEmail={salon.contact.email}>
        <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="text-xs text-gray-600 space-y-1">
            {salon.contact.name && (
              <div className="flex items-center gap-2">
                <span className="font-medium">Contact: {salon.contact.name}</span>
              </div>
            )}
            {salon.contact.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-3 w-3 text-green-600" />
                <span className="font-medium text-green-600">{salon.contact.phone}</span>
              </div>
            )}
            {salon.contact.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-3 w-3 text-blue-600" />
                <span className="font-medium text-blue-600">{salon.contact.email}</span>
              </div>
            )}
            {!salon.contact.phone && !salon.contact.email && (
              <div className="flex items-center gap-2">
                <Phone className="h-3 w-3" />
                <span className="font-medium">Contact via EmviApp only</span>
              </div>
            )}
          </div>
        </div>
        </PremiumContactGate>

        {/* View Details Button - Mobile optimized */}
        <Button 
          onClick={onViewDetails}
          className="w-full hover:bg-purple-700 bg-purple-600 transition-all duration-300 font-medium text-sm sm:text-base py-2 sm:py-3"
          variant="default"
        >
          <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
          View Full Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default PremiumSalonCard;