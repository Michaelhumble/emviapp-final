
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Lock, Calendar } from "lucide-react";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import { Job } from "@/types/job";
import { Salon } from "@/types/salon";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { useTranslation } from "@/hooks/useTranslation";
import AuthAction from "@/components/common/AuthAction";
import { determineSalonCategory } from "@/utils/salonImageFallbacks";
import { Badge } from "@/components/ui/badge";

interface ListingCardProps {
  listing: Job | Salon;
  onViewDetails: () => void;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isSignedIn } = useAuth();
  const { t, isVietnamese } = useTranslation();
  const navigate = useNavigate();

  // Get the title based on language and listing type
  const getTitle = () => {
    if (isVietnamese && 'vietnamese_title' in listing && listing.vietnamese_title) {
      return listing.vietnamese_title;
    }
    if ('title' in listing && listing.title) return listing.title;
    if ('name' in listing && listing.name) return listing.name;
    if ('company' in listing && listing.company) return listing.company;
    return 'Listing';
  };

  // Get the description based on language and listing type
  const getDescription = () => {
    if (isVietnamese && 'vietnamese_description' in listing && listing.vietnamese_description) {
      return listing.vietnamese_description;
    }
    if ('description' in listing && listing.description) return listing.description;
    return '';
  };

  // Get the appropriate image based on listing type and category
  const getImage = () => {
    if ('imageUrl' in listing && listing.imageUrl) return listing.imageUrl;
    if ('image' in listing && listing.image) return listing.image;
    
    // Determine category for appropriate fallback image
    const category = determineSalonCategory(
      getDescription(),
      getTitle()
    );
    
    return '/placeholder.svg';
  };

  // Get the location
  const getLocation = () => {
    if ('location' in listing && listing.location) return listing.location;
    if ('city' in listing && 'state' in listing && listing.city && listing.state) {
      return `${listing.city}, ${listing.state}`;
    }
    return 'Location not specified';
  };

  // Get highlights to show in the card preview
  const getHighlights = () => {
    const highlights = [];
    
    // Check for salary or price
    if ('salary_range' in listing && listing.salary_range) {
      highlights.push(listing.salary_range);
    } else if ('price' in listing && listing.price) {
      highlights.push(typeof listing.price === 'number' ? `$${listing.price}` : listing.price);
    } else if ('asking_price' in listing && listing.asking_price) {
      highlights.push(typeof listing.asking_price === 'number' ? 
        `$${listing.asking_price}` : listing.asking_price);
    }
    
    // Add employment type if available
    if ('employment_type' in listing && listing.employment_type) {
      highlights.push(listing.employment_type);
    }
    
    // Add special perks
    if ('has_housing' in listing && listing.has_housing) {
      highlights.push('Housing');
    }
    if ('weekly_pay' in listing && listing.weekly_pay) {
      highlights.push('Weekly Pay');
    }
    if ('no_supply_deduction' in listing && listing.no_supply_deduction) {
      highlights.push('No Supply Fee');
    }
    
    return highlights.join(' • ');
  };

  // Get tags to display
  const getTags = () => {
    const tags = [];
    
    if ('weekly_pay' in listing && listing.weekly_pay) {
      tags.push('Weekly Pay');
    }
    if ('has_housing' in listing && listing.has_housing) {
      tags.push('Housing');
    }
    if ('no_supply_deduction' in listing && listing.no_supply_deduction) {
      tags.push('No Supply Fee');
    }
    if ('is_featured' in listing && listing.is_featured) {
      tags.push('Featured');
    }
    
    // Add business type if available
    if ('business_type' in listing && listing.business_type) {
      tags.push(listing.business_type);
    } else if ('salon_type' in listing && listing.salon_type) {
      tags.push(listing.salon_type);
    } else if ('specialties' in listing && listing.specialties && listing.specialties.length > 0) {
      if (typeof listing.specialties === 'string') {
        tags.push(listing.specialties);
      } else {
        tags.push(listing.specialties[0]);
      }
    }
    
    return tags;
  };

  return (
    <Card 
      className={`overflow-hidden transition-all duration-200 ${
        isHovered ? 'shadow-lg transform translate-y-[-2px]' : 'shadow-md'
      } h-full flex flex-col`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-video relative overflow-hidden">
        <ImageWithFallback
          src={getImage()}
          alt={getTitle()}
          className="w-full h-full object-cover"
          businessName={getTitle()}
          category={'salon_type' in listing ? listing.salon_type : undefined}
        />
        
        {!isSignedIn && (
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] flex items-center justify-center">
            <Button 
              variant="outline"
              className="bg-white/90 text-primary hover:bg-white"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/sign-in?redirect=${encodeURIComponent(window.location.pathname)}`);
              }}
            >
              <Lock className="h-4 w-4 mr-2" />
              Sign Up to View
            </Button>
          </div>
        )}
        
        {/* Tags display */}
        <div className="absolute top-2 right-2 flex flex-wrap gap-1 justify-end">
          {getTags().map((tag, index) => (
            <Badge 
              key={index}
              variant={
                tag === 'Featured' ? 'default' :
                tag === 'Weekly Pay' || tag === 'Housing' || tag === 'No Supply Fee' ? 'secondary' :
                'outline'
              }
              className={
                tag === 'Featured' ? 'bg-amber-500 text-white' :
                tag === 'Weekly Pay' || tag === 'Housing' || tag === 'No Supply Fee' ? 'bg-white/80 text-gray-800' :
                'bg-white/60 text-gray-700'
              }
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      
      <CardContent className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold mb-1 line-clamp-1">{getTitle()}</h3>
        
        <div className="flex items-center text-gray-500 mb-2 text-sm">
          <MapPin className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
          <span className="truncate">{getLocation()}</span>
        </div>
        
        {getHighlights() && (
          <div className="text-sm text-gray-600 mb-3 flex items-center">
            <DollarSign className="h-3.5 w-3.5 mr-1.5 flex-shrink-0 text-emerald-600" />
            <span className="truncate">{getHighlights()}</span>
          </div>
        )}
        
        {'created_at' in listing && listing.created_at && (
          <div className="text-xs text-gray-400 mb-2 flex items-center">
            <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
            <span>
              {new Date(listing.created_at).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
        )}
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">
          {getDescription()}
        </p>
        
        <AuthAction
          onAction={() => {
            onViewDetails();
            return true;
          }}
          customTitle="Sign in to view full details"
          fallbackContent={
            <Button variant="default" className="w-full">
              <Lock className="h-4 w-4 mr-2" />
              View Full Details
            </Button>
          }
          authenticatedContent={
            <Button variant="default" className="w-full" onClick={onViewDetails}>
              View Full Details
            </Button>
          }
        />
      </CardContent>
    </Card>
  );
};

export default ListingCard;
