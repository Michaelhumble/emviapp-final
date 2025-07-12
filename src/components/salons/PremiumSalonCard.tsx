import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Calendar, Home, DollarSign, Phone, Mail, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { RealSalonListing } from '@/data/salons/realSalonListings';

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
            {/* Main Gallery Image - Responsive height */}
            <div className="relative h-44 sm:h-48 md:h-52 overflow-hidden">
              <img
                src={salon.images[currentImageIndex]}
                alt={salon.name}
                className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
              />
              
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
              
              {/* Photo count badge */}
              <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-md text-xs font-medium z-10">
                📸 {salon.images.length}
              </div>
            </div>
            
            {/* Responsive Thumbnail Row - Jobs card style */}
            {salon.images.length > 1 && (
              <div className="px-3 sm:px-4 py-2 bg-gray-50 border-t">
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
                  
                  {/* Mobile: Show 2 thumbnails */}
                  <div className="flex md:hidden gap-2 overflow-x-auto flex-shrink-0">
                    {salon.images.slice(0, 2).map((imageUrl, index) => (
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
                    {salon.images.length > 2 && (
                      <div className="w-16 h-12 rounded border-2 border-gray-200 bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-600 text-xs font-medium">+{salon.images.length - 2}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          // Responsive placeholder when no images
          <div className="h-44 sm:h-48 md:h-52 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-3xl sm:text-4xl mb-2">📷</div>
              <div className="text-sm font-medium">Photos Coming Soon</div>
              <div className="text-xs">Owner will add gallery</div>
            </div>
          </div>
        )}
        
        {/* Status Badge - Responsive positioning */}
        <div className="absolute top-3 left-3 z-10">
          <Badge className={`${getBadgeStyle()} flex items-center gap-1 font-semibold px-2 py-1 text-xs shadow-md`}>
            {getBadgeText()}
          </Badge>
        </div>

        {/* Price Badge - Responsive sizing */}
        <div className="absolute top-3 right-14 z-10">
          <Badge className="bg-white text-gray-900 font-bold text-xs sm:text-sm px-2 sm:px-3 py-1 shadow-md">
            {salon.price}
          </Badge>
        </div>
      </div>

      {/* Card Content */}
      <CardContent className="p-4 sm:p-5 flex-grow flex flex-col">
        {/* Title and Location */}
        <div className="mb-3">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-purple-600 transition-colors">
            {salon.name}
          </h3>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <MapPin className="h-4 w-4 flex-shrink-0 text-purple-500" />
            <span className="font-medium">{salon.location}</span>
          </div>
        </div>

        {/* Key Stats - Jobs card style */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 text-xs sm:text-sm">
          {salon.sqft && (
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4 text-blue-500" />
              <span className="font-medium">{salon.sqft.toLocaleString()} sqft</span>
            </div>
          )}
          {salon.monthlyRent && (
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-500" />
              <span className="font-medium">${salon.monthlyRent.toLocaleString()}/mo</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-xs text-gray-500">{salon.datePosted}</span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4 flex-grow">
          <p className="text-gray-600 text-sm line-clamp-3 mb-2 leading-relaxed">
            {salon.description_en}
          </p>
          {salon.description_vi && (
            <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">
              {salon.description_vi}
            </p>
          )}
        </div>

        {/* Features Tags */}
        {salon.features && salon.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {salon.features.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                {feature}
              </Badge>
            ))}
            {salon.features.length > 3 && (
              <Badge variant="secondary" className="text-xs px-2 py-1">
                +{salon.features.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Contact Info Preview - Jobs card style */}
        <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="text-xs text-gray-600 space-y-1">
            {salon.contact.name && (
              <div className="flex items-center gap-2">
                <span className="font-medium">Contact: {salon.contact.name}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Phone className="h-3 w-3" />
              <span>{salon.contact.phone || 'Contact via EmviApp'}</span>
            </div>
            {salon.contact.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-3 w-3" />
                <span className="truncate">{salon.contact.email}</span>
              </div>
            )}
          </div>
        </div>

        {/* View Details Button - Jobs card style */}
        <Button 
          onClick={onViewDetails}
          className="w-full hover:bg-purple-700 bg-purple-600 transition-all duration-300 font-medium"
          variant="default"
        >
          <Eye className="h-4 w-4 mr-2" />
          View Full Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default PremiumSalonCard;