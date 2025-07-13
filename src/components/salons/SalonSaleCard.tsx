import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Calendar, Home, DollarSign, Phone, Mail, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { SalonSale } from '@/types/salonSale';
import { useAuth } from '@/context/auth';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface SalonSaleCardProps {
  salon: SalonSale;
  onViewDetails: () => void;
  className?: string;
}

const SalonSaleCard: React.FC<SalonSaleCardProps> = ({
  salon,
  onViewDetails,
  className = ""
}) => {
  const { isSignedIn } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Navigation functions for image gallery
  const nextImage = () => {
    const images = salon.images || [];
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    const images = salon.images || [];
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  // Get featured badge styling
  const getBadgeStyle = () => {
    if (salon.is_urgent) {
      return "bg-red-100 text-red-800 border-red-200";
    }
    if (salon.is_featured) {
      return "bg-purple-100 text-purple-800 border-purple-200";
    }
    return "bg-green-100 text-green-800 border-green-200";
  };

  const getBadgeText = () => {
    if (salon.is_urgent) return "URGENT";
    if (salon.is_featured) return "FEATURED";
    return "PREMIUM";
  };

  // Get the main image to display
  const getCurrentImage = () => {
    const images = salon.images || [];
    if (images.length > 0 && images[currentImageIndex]) {
      return images[currentImageIndex];
    }
    // Fallback to a default salon image
    return '/lovable-uploads/f7ba1d82-2928-4e73-a61b-112e5aaf5b7e.png';
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Get description (prioritize Vietnamese if available, fallback to English or combined)
  const getDescription = () => {
    if (salon.vietnamese_description) return salon.vietnamese_description;
    if (salon.english_description) return salon.english_description;
    if (salon.description_combined) return salon.description_combined;
    return salon.description || "Beautiful salon for sale";
  };

  // Get location string
  const getLocation = () => {
    if (salon.neighborhood && salon.city && salon.state) {
      return `${salon.neighborhood}, ${salon.city}, ${salon.state}`;
    }
    if (salon.city && salon.state) {
      return `${salon.city}, ${salon.state}`;
    }
    return salon.city || 'Location not specified';
  };

  const images = salon.images || [];

  return (
    <Card className={`group overflow-hidden bg-card border-border transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 ${className}`}>
      {/* Image Gallery */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <ImageWithFallback
          src={getCurrentImage()}
          alt={salon.salon_name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          businessName={salon.salon_name}
        />
        
        {/* Gallery Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            
            {/* Gallery Indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Badge */}
        <Badge className={`absolute top-3 right-3 ${getBadgeStyle()}`}>
          {getBadgeText()}
        </Badge>
      </div>

      <CardContent className="p-6 space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-playfair font-semibold text-xl text-foreground line-clamp-1">
              {salon.salon_name}
            </h3>
            <span className="font-inter font-bold text-lg text-primary whitespace-nowrap">
              {formatPrice(salon.asking_price)}
            </span>
          </div>
          
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="text-sm font-inter line-clamp-1">{getLocation()}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground font-inter line-clamp-2">
          {getDescription()}
        </p>

        {/* Features */}
        {salon.features && salon.features.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {salon.features.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
            {salon.features.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{salon.features.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Business Details */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          {salon.business_type && (
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4 text-muted-foreground" />
              <span className="font-inter">{salon.business_type}</span>
            </div>
          )}
          
          {salon.monthly_rent && (
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="font-inter">${salon.monthly_rent}/mo</span>
            </div>
          )}
          
          {salon.square_feet && (
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4 text-muted-foreground" />
              <span className="font-inter">{salon.square_feet} sq ft</span>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="font-inter">
              {new Date(salon.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Contact Info (Login Gated) */}
        {isSignedIn ? (
          <div className="space-y-1 text-sm">
            {salon.contact_name && (
              <p className="font-inter">Contact: {salon.contact_name}</p>
            )}
            {salon.contact_phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-3 w-3 text-muted-foreground" />
                <span className="font-inter">{salon.contact_phone}</span>
              </div>
            )}
            {salon.contact_email && (
              <div className="flex items-center gap-2">
                <Mail className="h-3 w-3 text-muted-foreground" />
                <span className="font-inter">{salon.contact_email}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <p className="text-sm text-muted-foreground font-inter">
              Sign in to view contact information
            </p>
          </div>
        )}

        {/* Action Button */}
        <Button 
          onClick={onViewDetails}
          className="w-full"
          variant="outline"
        >
          <Eye className="h-4 w-4 mr-2" />
          View Full Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default SalonSaleCard;