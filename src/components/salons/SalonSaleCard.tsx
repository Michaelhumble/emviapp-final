import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Calendar, Home, DollarSign, Phone, Mail, ChevronLeft, ChevronRight, Eye, Edit, Trash2 } from 'lucide-react';
import { SalonSale } from '@/types/salonSale';
import { useAuth } from '@/context/auth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
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
  const { isSignedIn, user, userRole } = useAuth();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Check if current user owns this listing
  const isOwner = user && salon.user_id === user.id;
  const isAdmin = userRole === 'admin';
  const canEdit = isOwner || isAdmin;

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/posting/salon?edit=${salon.id}`);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!confirm('Are you sure you want to delete this listing?')) return;
    
    try {
      const { error } = await supabase
        .from('salon_sales')
        .delete()
        .eq('id', salon.id);
        
      if (error) throw error;
      
      toast.success('Listing deleted successfully');
      // Auto-refresh will happen via the parent component
    } catch (error) {
      console.error('Error deleting listing:', error);
      toast.error('Failed to delete listing');
    }
  };

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

  // Get description (prioritize Vietnamese for nail salons, English for others)
  const getDescription = () => {
    const isNailSalon = salon.business_type?.toLowerCase().includes('nail');
    
    if (isNailSalon && salon.vietnamese_description) {
      return salon.vietnamese_description;
    }
    if (salon.english_description) return salon.english_description;
    if (salon.vietnamese_description) return salon.vietnamese_description;
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
  console.log('SalonSaleCard salon:', salon.salon_name, 'images:', images);

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
        
        {/* Gallery Navigation - Mobile optimized */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-1.5 sm:p-1 rounded-full sm:opacity-0 sm:group-hover:opacity-100 transition-opacity touch-manipulation"
            >
              <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-1.5 sm:p-1 rounded-full sm:opacity-0 sm:group-hover:opacity-100 transition-opacity touch-manipulation"
            >
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
            
            {/* Gallery Indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Badge */}
        <Badge className={`absolute top-2 sm:top-3 right-2 sm:right-3 text-xs ${getBadgeStyle()}`}>
          {getBadgeText()}
        </Badge>
      </div>

      <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-playfair font-semibold text-lg sm:text-xl text-foreground line-clamp-1 min-w-0">
              {salon.salon_name}
            </h3>
            <span className="font-inter font-bold text-base sm:text-lg text-primary whitespace-nowrap flex-shrink-0">
              {formatPrice(salon.asking_price)}
            </span>
          </div>
          
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-inter line-clamp-1">{getLocation()}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-muted-foreground font-inter line-clamp-2">
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

        {/* Business Details - Mobile optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
          {salon.business_type && (
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <Home className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
              <span className="font-inter truncate">{salon.business_type}</span>
            </div>
          )}
          
          {salon.monthly_rent && (
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
              <span className="font-inter truncate">${salon.monthly_rent}/mo</span>
            </div>
          )}
          
          {salon.square_feet && (
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <Home className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
              <span className="font-inter truncate">{salon.square_feet} sq ft</span>
            </div>
          )}

          {salon.number_of_staff && (
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <span className="text-muted-foreground flex-shrink-0">👥</span>
              <span className="font-inter truncate">{salon.number_of_staff} Staff</span>
            </div>
          )}

          {salon.number_of_chairs && (
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <span className="text-muted-foreground flex-shrink-0">💺</span>
              <span className="font-inter truncate">{salon.number_of_chairs} Chairs</span>
            </div>
          )}

          {salon.number_of_tables && (
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <span className="text-muted-foreground flex-shrink-0">🪑</span>
              <span className="font-inter truncate">{salon.number_of_tables} Tables</span>
            </div>
          )}
          
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
            <span className="font-inter truncate">
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
            <p className="text-xs sm:text-sm text-muted-foreground font-inter">
              Sign in to view contact information
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            onClick={onViewDetails}
            className="flex-1 text-sm sm:text-base"
            variant="outline"
          >
            <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            View Details
          </Button>
          {canEdit && (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleEdit}
                className="px-3"
              >
                <Edit className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleDelete}
                className="px-3 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonSaleCard;